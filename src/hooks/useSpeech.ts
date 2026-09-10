import { useState, useEffect, useRef, useCallback } from 'react';

export interface SpeechOptions {
  voiceIndex?: number;
  rate?: number;
  pitch?: number;
  volume?: number;
}

export function useSpeech() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mouthOpenAmount, setMouthOpenAmount] = useState(0); // 0 (closed) to 1 (wide open)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceIndex, setSelectedVoiceIndex] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tom_voice_index');
      if (saved) return parseInt(saved, 10) || 0;
    }
    return 0;
  });
  const [pitch, setPitchState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tom_voice_pitch');
      if (saved) return parseFloat(saved) || 0.85;
    }
    return 0.85; // Deeper, more grounded default tone
  });
  const [rate, setRateState] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('tom_voice_rate');
      if (saved) return parseFloat(saved) || 0.95;
    }
    return 0.95; // Unhurried, conversational pace
  });

  const setPitch = (val: number) => {
    setPitchState(val);
    if (typeof window !== 'undefined') localStorage.setItem('tom_voice_pitch', val.toString());
  };

  const setRate = (val: number) => {
    setRateState(val);
    if (typeof window !== 'undefined') localStorage.setItem('tom_voice_rate', val.toString());
  };

  const setVoiceIndex = (idx: number) => {
    setSelectedVoiceIndex(idx);
    if (typeof window !== 'undefined') localStorage.setItem('tom_voice_index', idx.toString());
  };
  const [isMuted, setIsMuted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const [recognitionSupported, setRecognitionSupported] = useState(false);
  const [recognitionError, setRecognitionError] = useState<string | null>(null);
  const [continuousMode, setContinuousMode] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const animFrameRef = useRef<number | null>(null);
  const recognitionRef = useRef<any>(null);
  const continuousModeRef = useRef(false);
  const onContinuousResultRef = useRef<((transcript: string) => void) | null>(null);

  useEffect(() => {
    continuousModeRef.current = continuousMode;
  }, [continuousMode]);

  // Initialize synthesis and available voices
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);

      const updateVoices = () => {
        const available = window.speechSynthesis.getVoices();
        if (available && available.length > 0) {
          setVoices(available);
          const savedVoice = localStorage.getItem('tom_voice_index');
          if (savedVoice !== null) {
            const parsed = parseInt(savedVoice, 10);
            if (!isNaN(parsed) && available[parsed]) {
              setSelectedVoiceIndex(parsed);
              return;
            }
          }
          // Prefer warm English voice (Natural US English, Aaron, Daniel, David, Tom, Google US English)
          const preferredIdx = available.findIndex(
            (v) =>
              v.lang.startsWith('en') &&
              (v.name.includes('Natural') ||
                v.name.includes('Aaron') ||
                v.name.includes('David') ||
                v.name.includes('Daniel') ||
                v.name.includes('Google US') ||
                v.name.includes('Guy'))
          );
          if (preferredIdx !== -1) {
            setSelectedVoiceIndex(preferredIdx);
          } else {
            const anyEnglish = available.findIndex((v) => v.lang.startsWith('en'));
            if (anyEnglish !== -1) setSelectedVoiceIndex(anyEnglish);
          }
        }
      };

      updateVoices();
      window.speechSynthesis.onvoiceschanged = updateVoices;

      return () => {
        if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, []);

  // Initialize Speech Recognition if supported
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        setRecognitionSupported(true);
      }
    }
  }, []);

  // Lip-sync animator when speaking
  const startLipSyncAnimation = useCallback(() => {
    let phase = 0;
    const animate = () => {
      phase += 0.28;
      // Fluctuating mouth openness simulating speech syllables
      const open = Math.max(0, Math.sin(phase) * 0.72 + Math.sin(phase * 1.7) * 0.28);
      setMouthOpenAmount(open);
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
  }, []);

  const stopLipSyncAnimation = useCallback(() => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    setMouthOpenAmount(0);
  }, []);

  const speak = useCallback(
    (text: string, onEndCallback?: () => void) => {
      if (!text || isMuted || typeof window === 'undefined' || !('speechSynthesis' in window)) {
        if (onEndCallback) onEndCallback();
        return;
      }

      try {
        window.speechSynthesis.cancel();

        // Clean text from emojis, urls or markdown symbols for crisp speech
        const cleanText = text
          .replace(/[#*_~`]/g, '')
          .replace(/B\.A\.M\.B\.I\./gi, 'Bambi')
          .replace(/\bhttps?:\/\/\S+/gi, 'the link on screen')
          .replace(/\b602-767-2147\b/g, '6 0 2, 7 6 7, 2 1 4 7')
          .trim();

        if (!cleanText) return;

        const utterance = new SpeechSynthesisUtterance(cleanText);
        utteranceRef.current = utterance;

        if (voices.length > 0 && voices[selectedVoiceIndex]) {
          utterance.voice = voices[selectedVoiceIndex];
        }

        utterance.rate = Math.max(0.6, Math.min(1.6, rate));
        utterance.pitch = Math.max(0.5, Math.min(1.5, pitch)); // Configured pitch

        utterance.onstart = () => {
          setIsSpeaking(true);
          startLipSyncAnimation();
        };

        const handleFinish = () => {
          setIsSpeaking(false);
          stopLipSyncAnimation();
          if (onEndCallback) onEndCallback();

          // If continuous voice conversation mode is enabled, resume listening after Tom stops speaking!
          if (continuousModeRef.current && onContinuousResultRef.current) {
            setTimeout(() => {
              if (continuousModeRef.current && onContinuousResultRef.current) {
                startVoiceInput(onContinuousResultRef.current);
              }
            }, 400);
          }
        };

        utterance.onend = handleFinish;
        utterance.onerror = (e) => {
          console.warn('Speech synthesis warning:', e);
          handleFinish();
        };

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.error('TTS execution error:', err);
        setIsSpeaking(false);
        stopLipSyncAnimation();
      }
    },
    [isMuted, voices, selectedVoiceIndex, startLipSyncAnimation, stopLipSyncAnimation]
  );

  const stopSpeaking = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    stopLipSyncAnimation();
  }, [stopLipSyncAnimation]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      if (!prev && isSpeaking) {
        stopSpeaking();
      }
      return !prev;
    });
  }, [isSpeaking, stopSpeaking]);

  const startVoiceInput = useCallback(
    (onResult: (transcript: string) => void) => {
      if (typeof window === 'undefined') return;
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        setRecognitionError('Speech recognition is not supported in this browser. You can type in the input below.');
        return;
      }

      try {
        if (recognitionRef.current) {
          try {
            recognitionRef.current.abort();
          } catch (_) {}
        }

        onContinuousResultRef.current = onResult;
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onstart = () => {
          setIsListening(true);
          setRecognitionError(null);
        };

        recognition.onresult = (event: any) => {
          const transcript = event.results?.[0]?.[0]?.transcript;
          if (transcript) {
            onResult(transcript);
          }
        };

        recognition.onerror = (event: any) => {
          if (event.error !== 'no-speech') {
            console.warn('Speech recognition status:', event.error);
            setRecognitionError(`Mic: ${event.error}`);
          }
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognition.start();
      } catch (err: any) {
        console.warn('Error starting speech recognition:', err);
        setIsListening(false);
      }
    },
    []
  );

  const stopVoiceInput = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (_) {}
      setIsListening(false);
    }
  }, []);

  return {
    isSpeaking,
    mouthOpenAmount,
    voices,
    selectedVoiceIndex,
    setSelectedVoiceIndex: setVoiceIndex,
    pitch,
    rate,
    setPitch,
    setRate,
    isMuted,
    toggleMute,
    isListening,
    speak,
    stopSpeaking,
    startVoiceInput,
    stopVoiceInput,
    speechSupported,
    recognitionSupported,
    recognitionError,
    continuousMode,
    setContinuousMode,
  };
}
