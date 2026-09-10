import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Send,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Sparkles,
  Bot,
  User,
  ExternalLink,
  Link2,
  RefreshCw,
  Settings,
  HelpCircle,
  Package,
  RotateCcw,
  Globe,
  Radio,
  Search,
  CheckCircle2,
  Phone,
  Cpu,
} from 'lucide-react';
import { AnimatedAvatar } from './AnimatedAvatar';
import { ChatMessage, AvatarEmotion, ProductItem, CreatorProfile, SearchSource } from '../types';
import { useSpeech } from '../hooks/useSpeech';
import { generateClientTomReply } from '../services/tomBrainEngine';
import { TOM_BOUNDARY_FAILURES } from '../data/tomRuntimeSpecification';
import { BambiLearnerSection } from './BambiLearnerSection';

interface AIChatSectionProps {
  profile: CreatorProfile;
  products: ProductItem[];
  sharedChatUrl?: string;
  onUpdateSharedUrl?: (newUrl: string) => void;
  externalPrompt?: string;
  onClearExternalPrompt?: () => void;
}

export const AIChatSection: React.FC<AIChatSectionProps> = ({
  profile,
  products,
  externalPrompt,
  onClearExternalPrompt,
}) => {
  const [activeTab, setActiveTab] = useState<'avatar-chat' | 'rsm-learner'>('avatar-chat');
  const [selectedBoundaryKey, setSelectedBoundaryKey] = useState<string>('relief');
  const [activeStageIndex, setActiveStageIndex] = useState<number>(0);
  const [inputMessage, setInputMessage] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [avatarEmotion, setAvatarEmotion] = useState<AvatarEmotion>('greeting');

  // Voice speech hook with continuous conversation support
  const {
    isSpeaking,
    mouthOpenAmount,
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
  } = useSpeech();

  // Chat message history initialized with Tom's curb persona
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome-tom',
      sender: 'bot',
      text: `I'm Tom. Sitting on the curb. No lectures, no hurry. What are you carrying today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      emotion: 'greeting',
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isThinking]);

  // Handle external prompt when user clicks "Ask Tom" from another section
  useEffect(() => {
    if (externalPrompt) {
      setActiveTab('avatar-chat');
      handleSendMessage(externalPrompt);
      if (onClearExternalPrompt) onClearExternalPrompt();
    }
  }, [externalPrompt]);

  // Click on avatar to speak or stop speaking
  const handleAvatarClick = () => {
    if (isSpeaking) {
      stopSpeaking();
    } else {
      setAvatarEmotion('happy');
      speak(
        "Hey! I'm Tom, Bambi's peer support mentor. You don't have to carry this backpack alone. Tap the mic or type anytime, and I can also search Google for live resources.",
        () => setAvatarEmotion('idle')
      );
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query || isThinking) return;

    setInputMessage('');
    stopSpeaking();

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isVoiceInput: isListening,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);
    setAvatarEmotion('thoughtful');

    try {
      let botReply = '';
      let detectedEmotion: AvatarEmotion = 'explaining';
      let searchQueries: string[] | undefined;
      let searchSources: Array<{ title: string; uri: string }> | undefined;

      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: query,
            history: messages,
            profileContext: profile,
            products: products,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          if (data.reply) {
            botReply = data.reply;
            detectedEmotion = data.avatarEmotion || 'explaining';
            searchQueries = data.searchQueries;
            searchSources = data.searchSources;
          }
        }
      } catch (networkErr) {
        console.log('GitHub Pages / offline mode: using standalone Tom brain engine', networkErr);
      }

      // Standalone Universal Engine Fallback (GitHub Pages bambiboy602.com / Offline)
      if (!botReply) {
        const localBrain = generateClientTomReply(query, messages);
        botReply = localBrain.reply;
        detectedEmotion = localBrain.avatarEmotion;
        searchQueries = localBrain.searchQueries;
        searchSources = localBrain.searchSources;
      }

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emotion: detectedEmotion,
        searchQueries,
        searchSources,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsThinking(false);
      setAvatarEmotion(detectedEmotion);

      // Speak aloud through the animated avatar with lip-sync
      speak(botReply, () => {
        setAvatarEmotion('idle');
      });
    } catch (err) {
      console.error('Chat error:', err);
      setIsThinking(false);
      setAvatarEmotion('thoughtful');
      const fallback = generateClientTomReply(query, messages);
      const fallbackMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: fallback.reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        emotion: fallback.avatarEmotion,
        searchQueries: fallback.searchQueries,
        searchSources: fallback.searchSources,
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speak(fallback.reply, () => setAvatarEmotion('idle'));
    }
  };

  const handleVoiceToggle = () => {
    if (isListening) {
      stopVoiceInput();
    } else {
      startVoiceInput((transcript) => {
        setInputMessage(transcript);
        handleSendMessage(transcript);
      });
    }
  };

  const handleToggleContinuousVoice = () => {
    const nextState = !continuousMode;
    setContinuousMode(nextState);
    if (nextState) {
      // Start listening right away
      startVoiceInput((transcript) => {
        handleSendMessage(transcript);
      });
    } else {
      stopVoiceInput();
    }
  };

  const quickQuestions = [
    'I slipped up and relapsed.',
    'I feel like a failure carrying all this.',
    'How does the Pathway Domino Effect game work?',
    'Tell me about the B.A.M.B.I. Participant Workbook',
    'Where do I find emergency shelter in Phoenix?',
    'Sudo Tom',
  ];

  return (
    <section id="interactive-ai-avatar" className="py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      {/* Container Card */}
      <div className="bg-white dark:bg-stone-900 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl overflow-hidden">
        {/* Top Header Bar */}
        <div className="p-4 sm:p-6 bg-stone-50 dark:bg-stone-950/70 border-b border-stone-200 dark:border-stone-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-emerald-700 text-white shadow-sm">
                <Bot className="w-5 h-5" />
              </span>
              <div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-stone-900 dark:text-stone-100 font-serif flex flex-wrap items-center gap-2">
                  <span>Tom AI Peer Support Mentor</span>
                  <span className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                    <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
                    Voice Avatar
                  </span>
                  <span className="text-xs font-sans font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center gap-1">
                    <Globe className="w-3 h-3 text-blue-600" />
                    Google Search Data
                  </span>
                </h2>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Two-way voice conversations with animated lip-sync & real-time search for shelter, treatment, and recovery tools
                </p>
              </div>
            </div>
          </div>

          {/* Mode Switcher: Avatar Voice Chat vs Shared ChatGPT Embed */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-200/70 dark:bg-stone-800/80 border border-stone-300/60 dark:border-stone-700 self-stretch sm:self-auto justify-center">
            <button
              onClick={() => setActiveTab('avatar-chat')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'avatar-chat'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Voice Avatar Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('rsm-learner')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'rsm-learner'
                  ? 'bg-white dark:bg-stone-900 text-stone-900 dark:text-stone-100 shadow-sm'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100'
              }`}
            >
              <Cpu className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>B.A.M.B.I. Learner & RSM</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Animated Avatar Voice Chat with Google Search Grounding */}
        {activeTab === 'avatar-chat' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[560px]">
            {/* Left Column: Animated Speaking Avatar Stage */}
            <div className="lg:col-span-4 p-6 bg-gradient-to-b from-stone-50 via-stone-100 to-emerald-50/40 dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950/20 border-b lg:border-b-0 lg:border-r border-stone-200 dark:border-stone-800 flex flex-col items-center justify-between">
              {/* Top controls: Mute & Continuous Voice Mode */}
              <div className="w-full flex items-center justify-between text-xs">
                <button
                  onClick={handleToggleContinuousVoice}
                  className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    continuousMode
                      ? 'bg-emerald-600 text-white ring-2 ring-emerald-400'
                      : 'bg-stone-200/80 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300'
                  }`}
                  title="Enable hands-free continuous voice conversation"
                >
                  <Radio className={`w-3.5 h-3.5 ${continuousMode ? 'animate-pulse' : ''}`} />
                  <span>{continuousMode ? 'Voice Mode: ON' : 'Voice Mode: OFF'}</span>
                </button>

                <button
                  onClick={toggleMute}
                  className="p-1.5 rounded-xl text-stone-600 dark:text-stone-400 hover:bg-stone-200 dark:hover:bg-stone-800 transition-colors"
                  title={isMuted ? 'Unmute Tom' : 'Mute Tom'}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-rose-500" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  )}
                </button>
              </div>

              {/* Avatar Illustration */}
              <div className="py-6 flex flex-col items-center justify-center">
                <AnimatedAvatar
                  emotion={avatarEmotion}
                  isSpeaking={isSpeaking}
                  mouthOpenAmount={mouthOpenAmount}
                  isListening={isListening}
                  isThinking={isThinking}
                  onAvatarClick={handleAvatarClick}
                  statusText="Tom • B.A.M.B.I. Mentor"
                />

                <p className="mt-6 text-center text-xs text-stone-500 dark:text-stone-400 max-w-xs">
                  Tap Tom or press the mic to talk. He speaks aloud with real-time lip sync and searches Google for local recovery resources.
                </p>
              </div>

              {/* Support Quick Pill */}
              <div className="w-full p-3 rounded-2xl bg-white/90 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 text-xs space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-amber-500" />
                    Direct Contact
                  </span>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    Phoenix, AZ
                  </span>
                </div>
                <p className="text-[11px] text-stone-600 dark:text-stone-300">
                  Call or text Bambi directly: <strong className="text-stone-900 dark:text-stone-100">602-767-2147</strong>
                </p>
              </div>
            </div>

            {/* Right Column: Chat History, Google Search Metadata & Inputs */}
            <div className="lg:col-span-8 flex flex-col justify-between p-4 sm:p-6 bg-white dark:bg-stone-900">
              {/* Messages Scroll Area */}
              <div className="space-y-4 overflow-y-auto max-h-[420px] pr-2 pb-2">
                {messages.map((msg) => {
                  const isBot = msg.sender === 'bot';

                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      {isBot && (
                        <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 text-xs font-bold mt-1 shadow-sm">
                          TOM
                        </div>
                      )}

                      <div
                        className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                          isBot
                            ? 'bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 border border-stone-200/80 dark:border-stone-700/80'
                            : 'bg-emerald-700 text-white shadow-md'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        {/* Google Search Grounding Section */}
                        {isBot && ((msg.searchQueries && msg.searchQueries.length > 0) || (msg.searchSources && msg.searchSources.length > 0)) && (
                          <div className="mt-3 pt-3 border-t border-stone-200 dark:border-stone-700 space-y-2">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-700 dark:text-blue-400">
                              <Search className="w-3.5 h-3.5" />
                              <span>Google Search Grounding Data:</span>
                            </div>

                            {/* Queries used */}
                            {msg.searchQueries && msg.searchQueries.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {msg.searchQueries.map((q, i) => (
                                  <span
                                    key={i}
                                    className="px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 text-[10px] font-mono border border-blue-200 dark:border-blue-800"
                                  >
                                    "{q}"
                                  </span>
                                ))}
                              </div>
                            )}

                            {/* Clickable search sources */}
                            {msg.searchSources && msg.searchSources.length > 0 && (
                              <div className="space-y-1">
                                <span className="text-[10px] text-stone-500 dark:text-stone-400 font-semibold">
                                  Verified Web Sources:
                                </span>
                                <div className="flex flex-wrap gap-1.5">
                                  {msg.searchSources.map((source, idx) => (
                                    <a
                                      key={idx}
                                      href={source.uri}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-stone-200/70 dark:bg-stone-700/70 hover:bg-stone-300 text-stone-800 dark:text-stone-200 text-[10px] transition-colors"
                                    >
                                      <Globe className="w-3 h-3 text-blue-500" />
                                      <span className="truncate max-w-[140px]">{source.title || 'Web Resource'}</span>
                                      <ExternalLink className="w-2.5 h-2.5 text-stone-400" />
                                    </a>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        <div className="mt-1 flex items-center justify-between text-[10px] opacity-70">
                          <span>{msg.timestamp}</span>
                          {msg.isVoiceInput && <span>🎤 Spoken</span>}
                        </div>
                      </div>

                      {!isBot && (
                        <div className="w-8 h-8 rounded-full bg-stone-300 dark:bg-stone-700 text-stone-800 dark:text-stone-200 flex items-center justify-center shrink-0 text-xs font-semibold mt-1">
                          <User className="w-4 h-4" />
                        </div>
                      )}
                    </motion.div>
                  );
                })}

                {/* Thinking / Searching Indicator */}
                {isThinking && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-xs font-bold">
                      TOM
                    </div>
                    <div className="px-4 py-3 rounded-2xl bg-stone-100 dark:bg-stone-800 text-xs text-stone-600 dark:text-stone-300 flex items-center gap-2 border border-stone-200 dark:border-stone-700">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-spin" />
                      <span>Tom is checking resources and searching Google...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Prompts Bar */}
              <div className="pt-3 pb-2">
                <p className="text-[11px] font-bold text-stone-500 dark:text-stone-400 mb-1.5 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>Ask Tom:</span>
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {quickQuestions.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(q)}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/60 text-stone-700 dark:text-stone-300 hover:text-emerald-800 dark:hover:text-emerald-300 border border-stone-200 dark:border-stone-700 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Mic warning if unsupported */}
              {recognitionError && (
                <div className="py-1 text-xs text-amber-600 dark:text-amber-400">
                  {recognitionError}
                </div>
              )}

              {/* Input Form Bar */}
              <div className="pt-2">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <div className="relative flex-1">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      placeholder={isListening ? "Listening to your voice..." : "Type your message or question for Tom..."}
                      className="w-full py-3 pl-4 pr-12 rounded-2xl bg-stone-100 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 text-stone-900 dark:text-stone-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />

                    {/* Mic Button in Input */}
                    <button
                      type="button"
                      onClick={handleVoiceToggle}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-xl transition-all ${
                        isListening
                          ? 'bg-rose-600 text-white animate-pulse'
                          : 'text-stone-500 hover:text-emerald-600 hover:bg-stone-200 dark:hover:bg-stone-700'
                      }`}
                      title={isListening ? "Stop listening" : "Click to speak with Tom"}
                    >
                      {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={!inputMessage.trim() || isThinking}
                    className="p-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 disabled:opacity-40 text-white shadow-md transition-all active:scale-95 shrink-0"
                    title="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: B.A.M.B.I. Learner & RSM Behavioral Loop */
          <div className="p-4 sm:p-6 bg-stone-50 dark:bg-stone-950/40">
            <BambiLearnerSection
              onAskTom={(prompt) => {
                setActiveTab('avatar-chat');
                handleSendMessage(prompt);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
};
