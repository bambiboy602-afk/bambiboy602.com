import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Mic, Bot, User, Radio, Disc, Volume2 } from 'lucide-react';
import { AvatarEmotion } from '../types';

export type AvatarStyle =
  | 'webbee'
  | 'webbee-photo'
  | 'me55-photo'
  | 'street-mentor'
  | 'clean-cap'
  | 'photo'
  | 'orb';

interface AnimatedAvatarProps {
  emotion?: AvatarEmotion;
  isSpeaking: boolean;
  mouthOpenAmount: number; // 0 to 1
  isListening?: boolean;
  isThinking?: boolean;
  onAvatarClick?: () => void;
  statusText?: string;
  avatarStyle?: AvatarStyle;
  customPhotoUrl?: string;
}

export const AnimatedAvatar: React.FC<AnimatedAvatarProps> = ({
  emotion = 'idle',
  isSpeaking,
  mouthOpenAmount,
  isListening = false,
  isThinking = false,
  onAvatarClick,
  statusText = 'Tom • Peer Support Mentor',
  avatarStyle = 'webbee',
  customPhotoUrl = '/webbee1.jpg',
}) => {
  const [isBlinking, setIsBlinking] = useState(false);
  const [headTilt, setHeadTilt] = useState(0);

  // Natural blinking interval
  useEffect(() => {
    let blinkTimer: any;
    const scheduleNextBlink = () => {
      const delay = 2400 + Math.random() * 3000;
      blinkTimer = setTimeout(() => {
        setIsBlinking(true);
        setTimeout(() => {
          setIsBlinking(false);
          scheduleNextBlink();
        }, 160);
      }, delay);
    };

    scheduleNextBlink();
    return () => clearTimeout(blinkTimer);
  }, []);

  // Subtle head bob & tilt when speaking or thinking
  useEffect(() => {
    if (isSpeaking) {
      const interval = setInterval(() => {
        setHeadTilt((prev) => (prev > 0 ? -1.6 : 1.6));
      }, 380);
      return () => clearInterval(interval);
    } else if (isThinking) {
      setHeadTilt(2.5);
    } else {
      setHeadTilt(0);
    }
  }, [isSpeaking, isThinking]);

  // Eyebrow offset based on emotion
  const getEyebrowOffset = () => {
    if (isThinking) return -3.5;
    if (emotion === 'greeting' || emotion === 'happy') return -4;
    if (emotion === 'explaining') return -2;
    return 0;
  };

  // Mouth calculation
  const mouthHeight = isSpeaking ? Math.max(5, mouthOpenAmount * 26) : 4;
  const mouthWidth = isSpeaking ? 30 + mouthOpenAmount * 8 : 26;

  // Determine photo path for the photo modes
  const resolvedPhoto =
    avatarStyle === 'webbee-photo'
      ? '/webbee1.jpg'
      : avatarStyle === 'me55-photo'
      ? '/me55.jpg'
      : customPhotoUrl || '/93f853.png';

  return (
    <div
      id="animated-avatar-container"
      className="relative flex flex-col items-center justify-center select-none"
    >
      {/* Ambient Halo / Glow rings when speaking or listening */}
      <AnimatePresence>
        {isSpeaking && (
          <>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: [1, 1.25, 1], opacity: [0.35, 0.75, 0.35] }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
              className="absolute w-56 h-56 rounded-full bg-emerald-500/25 blur-xl pointer-events-none"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: [1.05, 1.4, 1.05], opacity: [0.2, 0.55, 0.2] }}
              exit={{ opacity: 0 }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
              className="absolute w-64 h-64 rounded-full bg-amber-400/20 blur-2xl pointer-events-none"
            />
          </>
        )}
        {isListening && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.4, 0.85, 0.4] }}
            exit={{ opacity: 0 }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            className="absolute w-60 h-60 rounded-full bg-rose-500/30 blur-xl pointer-events-none"
          />
        )}
      </AnimatePresence>

      {/* Main Avatar Character Stage */}
      <motion.div
        animate={{
          y: isSpeaking ? [0, -4, 0] : isThinking ? [0, -2, 0] : [0, -3, 0],
          rotate: headTilt,
        }}
        transition={{
          repeat: Infinity,
          duration: isSpeaking ? 2.4 : 3.8,
          ease: 'easeInOut',
        }}
        onClick={onAvatarClick}
        className="relative cursor-pointer group"
      >
        {/* MODE 1: PHOTO AVATAR (WebBee Art or Bambi / me55 or Custom Photo) */}
        {avatarStyle === 'photo' ||
        avatarStyle === 'webbee-photo' ||
        avatarStyle === 'me55-photo' ? (
          <div className="relative w-40 h-40 sm:w-48 sm:h-48 flex items-center justify-center">
            {/* Outer Animated Cyber Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: isSpeaking ? 12 : 24, ease: 'linear' }}
              className="absolute inset-0 rounded-full p-1 bg-gradient-to-tr from-emerald-500 via-amber-400 to-teal-400 shadow-2xl opacity-90"
              style={{ padding: '3px' }}
            >
              <div className="w-full h-full rounded-full bg-stone-950 border border-emerald-400/40" />
            </motion.div>

            {/* Speaking Audio Pulse Waves outside */}
            {isSpeaking && (
              <>
                <motion.div
                  animate={{ scale: [1, 1.18, 1], opacity: [0.7, 0.1, 0.7] }}
                  transition={{ repeat: Infinity, duration: 1.2 }}
                  className="absolute inset-0 rounded-full border-2 border-emerald-400 pointer-events-none"
                />
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ repeat: Infinity, duration: 1.8, delay: 0.2 }}
                  className="absolute inset-0 rounded-full border border-amber-400 pointer-events-none"
                />
              </>
            )}

            {/* Image Container with Inner Ring */}
            <div className="relative w-34 h-34 sm:w-42 sm:h-42 rounded-full overflow-hidden bg-stone-900 border-2 border-emerald-500/60 shadow-inner group-hover:scale-102 transition-transform duration-300">
              <img
                src={resolvedPhoto}
                alt="Tom Avatar Profile"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  if (!e.currentTarget.src.endsWith('/93f853.png')) {
                    e.currentTarget.src = '/93f853.png';
                  }
                }}
              />

              {/* Holographic Honeycomb / Tech Grid Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent pointer-events-none" />

              {/* Dynamic Equalizer Waves when speaking */}
              {isSpeaking && (
                <div className="absolute inset-x-0 bottom-2.5 flex items-center justify-center gap-1 px-4 pointer-events-none">
                  {[...Array(7)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{
                        height: [4, 14 + ((i * 3) % 8) + mouthOpenAmount * 18, 4],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.3 + (i % 4) * 0.1,
                        ease: 'easeInOut',
                      }}
                      className="w-1.5 rounded-full bg-gradient-to-t from-emerald-400 to-amber-300 shadow-sm"
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Top Micro Badge */}
            <div className="absolute top-0 right-2 px-2 py-0.5 rounded-full bg-stone-950/90 border border-emerald-500/60 text-[9px] font-black text-amber-400 tracking-wider shadow-md uppercase">
              {avatarStyle === 'webbee-photo'
                ? 'WebBee'
                : avatarStyle === 'me55-photo'
                ? 'Bambi'
                : 'Mentor'}
            </div>
          </div>
        ) : avatarStyle === 'orb' ? (
          /* MODE 2: AUDIO HOLOGRAPHIC ORB */
          <div className="relative w-36 h-36 sm:w-44 sm:h-44 flex items-center justify-center">
            <motion.div
              animate={{
                scale: isSpeaking ? [1, 1.12 + mouthOpenAmount * 0.2, 1] : [1, 1.05, 1],
                rotate: 360,
              }}
              transition={{
                scale: { repeat: Infinity, duration: isSpeaking ? 0.8 : 3 },
                rotate: { repeat: Infinity, duration: 20, ease: 'linear' },
              }}
              className="absolute inset-2 rounded-full bg-gradient-to-tr from-emerald-600/35 via-amber-500/25 to-teal-400/35 blur-md"
            />
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-emerald-900 via-stone-950 to-emerald-950 border border-emerald-400/50 shadow-2xl flex flex-col items-center justify-center p-4">
              <Radio
                className={`w-8 h-8 ${
                  isSpeaking ? 'text-emerald-300 animate-pulse' : 'text-stone-400'
                }`}
              />
              <span className="text-[10px] font-bold text-emerald-300 mt-1 uppercase tracking-wider">
                Tom Audio
              </span>
              <div className="flex items-center gap-1 mt-1.5 h-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: isSpeaking ? [3, 10 + mouthOpenAmount * 12, 3] : [2, 4, 2],
                    }}
                    transition={{ repeat: Infinity, duration: 0.3 + i * 0.08 }}
                    className="w-1 bg-emerald-400 rounded-full"
                  />
                ))}
              </div>
            </div>
          </div>
        ) : avatarStyle === 'webbee' ? (
          /* MODE 3: THE BRAND NEW "WEBBEE" VECTOR AVATAR */
          <svg
            viewBox="0 0 200 200"
            className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              {/* WebBee Skin Gradient */}
              <linearGradient id="wbSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F7D8C2" />
                <stop offset="100%" stopColor="#D4946E" />
              </linearGradient>

              {/* Cyber Street Jacket */}
              <linearGradient id="wbJacketGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0F172A" />
                <stop offset="60%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0B132B" />
              </linearGradient>

              {/* Honeycomb Gold accent */}
              <linearGradient id="wbGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#FBBF24" />
              </linearGradient>

              {/* Headphone Metallic Rim */}
              <linearGradient id="wbEarGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>

              {/* Modern Sunglasses Gradient */}
              <linearGradient id="wbShadesGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0F172A" stopOpacity="0.92" />
              </linearGradient>

              <filter id="wbGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#10B981" floodOpacity="0.3" />
              </filter>
            </defs>

            {/* Back Headphone Arch */}
            <path
              d="M 44 86 C 44 40, 70 24, 100 24 C 130 24, 156 40, 156 86"
              fill="none"
              stroke="url(#wbEarGrad)"
              strokeWidth="7"
              strokeLinecap="round"
            />
            {/* Headphone padding top strip */}
            <path
              d="M 72 31 C 82 27, 118 27, 128 31"
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Tech High-Collar Street Jacket */}
            <path
              d="M 38 180 C 38 144, 68 134, 100 134 C 132 134, 162 144, 162 180 L 170 200 L 30 200 Z"
              fill="url(#wbJacketGrad)"
            />

            {/* Honeycomb Golden Geometric Accents on Shoulder */}
            <path
              d="M 52 165 L 59 161 L 66 165 L 66 173 L 59 177 L 52 173 Z"
              fill="#F59E0B"
              opacity="0.75"
            />
            <path
              d="M 134 165 L 141 161 L 148 165 L 148 173 L 141 177 L 134 173 Z"
              fill="#10B981"
              opacity="0.8"
            />

            {/* Asymmetrical Tech Zipper with Emerald Neon Glow */}
            <path d="M 100 134 L 100 200" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
            <path d="M 98 142 L 102 142" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M 98 152 L 102 152" stroke="#F59E0B" strokeWidth="2.5" />
            <path d="M 98 162 L 102 162" stroke="#F59E0B" strokeWidth="2.5" />

            {/* B.A.M.B.I. WebBee Chest Shield Badge */}
            <rect
              x="54"
              y="144"
              width="24"
              height="12"
              rx="3"
              fill="#064E3B"
              stroke="#F59E0B"
              strokeWidth="1"
            />
            <text
              x="66"
              y="152.5"
              fill="#FFFFFF"
              fontSize="6"
              fontWeight="900"
              textAnchor="middle"
              letterSpacing="0.6"
            >
              BAMBI
            </text>

            {/* Neck */}
            <rect x="88" y="114" width="24" height="26" rx="6" fill="#D08E66" />
            {/* Neck shadow */}
            <ellipse cx="100" cy="120" rx="14" ry="4" fill="#A86742" opacity="0.3" />

            {/* Head */}
            <ellipse cx="100" cy="92" rx="45" ry="47" fill="url(#wbSkinGrad)" />

            {/* Stylish Hair: Textured Fade / Modern Crop */}
            <path
              d="M 54 82 C 54 44, 72 34, 100 34 C 128 34, 146 44, 146 82 C 146 64, 136 50, 100 50 C 64 50, 54 64, 54 82 Z"
              fill="#18181B"
            />
            {/* Hair texture waves */}
            <path d="M 70 46 Q 100 40 130 46" stroke="#27272A" strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 76 54 Q 100 49 124 54" stroke="#27272A" strokeWidth="2.5" strokeLinecap="round" fill="none" />

            {/* Sculpted Beard & Goatee (WebBee Signature Look) */}
            <g opacity="0.88">
              {/* Jawline beard contour */}
              <path
                d="M 65 98 C 65 125, 78 139, 100 139 C 122 139, 135 125, 135 98 C 129 110, 118 123, 100 123 C 82 123, 71 110, 65 98 Z"
                fill="#27272A"
              />
              {/* Refined Moustache */}
              <path
                d="M 86 108 Q 100 105 114 108 Q 100 113 86 108 Z"
                fill="#18181B"
              />
              {/* Center Soul Patch */}
              <ellipse cx="100" cy="124" rx="4.5" ry="3.5" fill="#18181B" />
            </g>

            {/* Eyebrows */}
            <g transform={`translate(0, ${getEyebrowOffset()})`}>
              <path
                d={
                  isThinking
                    ? 'M 66 73 Q 78 68 90 74'
                    : emotion === 'happy' || emotion === 'greeting'
                    ? 'M 66 71 Q 78 66 90 73'
                    : 'M 66 73 Q 78 69 90 73'
                }
                stroke="#18181B"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
              <path
                d={
                  isThinking
                    ? 'M 110 74 Q 122 68 134 72'
                    : emotion === 'happy' || emotion === 'greeting'
                    ? 'M 110 73 Q 122 66 134 71'
                    : 'M 110 73 Q 122 69 134 73'
                }
                stroke="#18181B"
                strokeWidth="3.6"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* Eyes & Gaze */}
            {isBlinking ? (
              <g>
                <path d="M 68 87 Q 78 93 88 87" stroke="#18181B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
                <path d="M 112 87 Q 122 93 132 87" stroke="#18181B" strokeWidth="3.2" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              <g>
                {/* Left Eye */}
                <ellipse cx="78" cy="86" rx="8" ry="9" fill="#18181B" />
                <circle cx="76" cy="83.5" r="3" fill="#FFFFFF" />
                <circle cx="80" cy="88" r="1.4" fill="#FFFFFF" />
                <circle cx="78" cy="86" r="5" fill="#10B981" opacity="0.3" />

                {/* Right Eye */}
                <ellipse cx="122" cy="86" rx="8" ry="9" fill="#18181B" />
                <circle cx="120" cy="83.5" r="3" fill="#FFFFFF" />
                <circle cx="124" cy="88" r="1.4" fill="#FFFFFF" />
                <circle cx="122" cy="86" r="5" fill="#10B981" opacity="0.3" />
              </g>
            )}

            {/* Nose */}
            <path
              d="M 98 92 Q 100 102 104 101"
              stroke="#A86742"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Dynamic Interactive Mouth (Synchronized Lip Sync) */}
            {isSpeaking ? (
              <g>
                {/* Mouth Cavity */}
                <ellipse
                  cx="100"
                  cy={115 + mouthHeight / 4}
                  rx={mouthWidth / 2}
                  ry={mouthHeight / 2}
                  fill="#7F1D1D"
                />
                {/* Upper Teeth */}
                {mouthHeight > 7 && (
                  <rect
                    x={100 - mouthWidth / 3}
                    y={115 - mouthHeight / 6}
                    width={(mouthWidth * 2) / 3}
                    height={mouthHeight / 4}
                    rx="2"
                    fill="#FFFFFF"
                  />
                )}
                {/* Tongue */}
                {mouthHeight > 9 && (
                  <ellipse
                    cx="100"
                    cy={115 + mouthHeight / 2.2}
                    rx={mouthWidth / 3}
                    ry={mouthHeight / 4}
                    fill="#FB7185"
                  />
                )}
                {/* Lip outline */}
                <ellipse
                  cx="100"
                  cy={115 + mouthHeight / 4}
                  rx={mouthWidth / 2}
                  ry={mouthHeight / 2}
                  fill="none"
                  stroke="#991B1B"
                  strokeWidth="1.8"
                />
              </g>
            ) : (
              /* Idle Warm Confident Smile */
              <path
                d={
                  emotion === 'happy' || emotion === 'greeting'
                    ? 'M 88 114 Q 100 124 112 114'
                    : 'M 90 115 Q 100 120 110 115'
                }
                stroke="#881337"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
              />
            )}

            {/* Studio Earcups with Live Visualizer LEDs */}
            {/* Left Earcup */}
            <g>
              <rect x="42" y="74" width="13" height="28" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              {/* Earcup LED Meter */}
              <circle cx="48.5" cy="80" r="1.6" fill={isSpeaking ? '#10B981' : '#334155'} />
              <circle
                cx="48.5"
                cy="88"
                r="1.6"
                fill={isSpeaking && mouthOpenAmount > 0.3 ? '#F59E0B' : '#334155'}
              />
              <circle
                cx="48.5"
                cy="96"
                r="1.6"
                fill={isSpeaking && mouthOpenAmount > 0.6 ? '#EF4444' : '#334155'}
              />
            </g>

            {/* Right Earcup */}
            <g>
              <rect x="145" y="74" width="13" height="28" rx="6" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
              <circle cx="151.5" cy="80" r="1.6" fill={isSpeaking ? '#10B981' : '#334155'} />
              <circle
                cx="151.5"
                cy="88"
                r="1.6"
                fill={isSpeaking && mouthOpenAmount > 0.3 ? '#F59E0B' : '#334155'}
              />
              <circle
                cx="151.5"
                cy="96"
                r="1.6"
                fill={isSpeaking && mouthOpenAmount > 0.6 ? '#EF4444' : '#334155'}
              />
            </g>

            {/* Comm Mic Boom extending towards mouth */}
            <path
              d="M 46 96 Q 58 114 74 112"
              stroke="#334155"
              strokeWidth="2.4"
              fill="none"
              strokeLinecap="round"
            />
            {/* Glowing Mic Capsule */}
            <circle
              cx="74"
              cy="112"
              r="3.2"
              fill={isSpeaking ? '#10B981' : isListening ? '#F43F5E' : '#F59E0B'}
              filter="url(#wbGlow)"
            />
          </svg>
        ) : (
          /* MODE 4: CLASSIC STREET-MENTOR OR CLEAN-CAP */
          <svg
            viewBox="0 0 200 200"
            className="w-40 h-40 sm:w-48 sm:h-48 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
          >
            <defs>
              <linearGradient id="tomSkinGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#F5D0B5" />
                <stop offset="100%" stopColor="#D99B77" />
              </linearGradient>
              <linearGradient id="tomCapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id="tomHoodieGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                {avatarStyle === 'street-mentor' ? (
                  <>
                    <stop offset="0%" stopColor="#1C2421" />
                    <stop offset="100%" stopColor="#0E1715" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#165B40" />
                    <stop offset="100%" stopColor="#0F3F2C" />
                  </>
                )}
              </linearGradient>
              <linearGradient id="tomVisorGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#1E293B" />
              </linearGradient>
            </defs>

            <path
              d="M 45 176 C 45 148, 72 138, 100 138 C 128 138, 155 148, 155 176 L 164 200 L 36 200 Z"
              fill="url(#tomHoodieGrad)"
            />
            <path d="M 88 138 L 100 156 L 112 138 Z" fill="#D1891C" opacity="0.8" />
            <line x1="93" y1="156" x2="91" y2="178" stroke="#F5F5F4" strokeWidth="2" strokeLinecap="round" />
            <line x1="107" y1="156" x2="109" y2="178" stroke="#F5F5F4" strokeWidth="2" strokeLinecap="round" />
            <rect x="88" y="118" width="24" height="26" rx="6" fill="#D4936F" />
            <ellipse cx="100" cy="94" rx="46" ry="48" fill="url(#tomSkinGrad)" />

            {/* Stubble for street mentor */}
            {avatarStyle === 'street-mentor' && (
              <g opacity="0.38">
                <path
                  d="M 64 100 C 64 126, 78 138, 100 138 C 122 138, 136 126, 136 100 C 130 112, 118 123, 100 123 C 82 123, 70 112, 64 100 Z"
                  fill="#292524"
                />
                <ellipse cx="100" cy="126" rx="4.5" ry="3" fill="#292524" />
              </g>
            )}

            {/* Eyes */}
            {isBlinking ? (
              <g>
                <path d="M 68 90 Q 78 96 88 90" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
                <path d="M 112 90 Q 122 96 132 90" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" fill="none" />
              </g>
            ) : (
              <g>
                <ellipse cx="78" cy="90" rx="7.5" ry="8.5" fill="#1E293B" />
                <circle cx="76" cy="87" r="2.8" fill="#FFFFFF" />
                <ellipse cx="122" cy="90" rx="7.5" ry="8.5" fill="#1E293B" />
                <circle cx="120" cy="87" r="2.8" fill="#FFFFFF" />
              </g>
            )}

            <path d="M 98 96 Q 100 105 104 104" stroke="#B5724C" strokeWidth="2.4" strokeLinecap="round" fill="none" />

            {/* Mouth */}
            {isSpeaking ? (
              <g>
                <ellipse
                  cx="100"
                  cy={116 + mouthHeight / 4}
                  rx={mouthWidth / 2}
                  ry={mouthHeight / 2}
                  fill="#881337"
                />
              </g>
            ) : (
              <path d="M 90 115 Q 100 121 110 115" stroke="#881337" strokeWidth="2.8" strokeLinecap="round" fill="none" />
            )}

            {/* Cap or Beanie */}
            {avatarStyle === 'street-mentor' ? (
              <g>
                <path d="M 52 74 C 52 32, 70 20, 100 20 C 130 20, 148 32, 148 74 Z" fill="#0F172A" />
                <rect x="48" y="62" width="104" height="18" rx="6" fill="#1E293B" stroke="#334155" strokeWidth="1" />
                <rect x="74" y="66" width="22" height="10" rx="2" fill="#165B40" stroke="#D1891C" strokeWidth="0.8" />
                <text x="85" y="74" fill="#FFFFFF" fontSize="6.5" fontWeight="900" textAnchor="middle" letterSpacing="0.4">
                  BAMBI
                </text>
              </g>
            ) : (
              <g>
                <path d="M 52 76 C 52 40, 72 26, 100 26 C 128 26, 148 40, 148 76 Z" fill="url(#tomCapGrad)" />
                <circle cx="100" cy="26" r="4.5" fill="#334155" />
                <path
                  d="M 44 74 C 44 68, 70 66, 100 66 C 130 66, 156 68, 156 74 C 156 82, 126 84, 100 84 C 74 84, 44 82, 44 74 Z"
                  fill="url(#tomVisorGrad)"
                  stroke="#0F172A"
                  strokeWidth="1.5"
                />
                <rect x="88" y="44" width="24" height="14" rx="3" fill="#165B40" stroke="#D1891C" strokeWidth="1" />
                <text x="100" y="54" fill="#FFFFFF" fontSize="7" fontWeight="900" textAnchor="middle" letterSpacing="0.5">
                  BAMBI
                </text>
              </g>
            )}

            <circle cx="52" cy="98" r="4.5" fill="#0F172A" stroke="#165B40" strokeWidth="1.5" />
            <path d="M 52 98 Q 62 110 74 110" stroke="#334155" strokeWidth="2.2" fill="none" strokeLinecap="round" />
            <circle cx="74" cy="110" r="2.5" fill={isSpeaking ? '#10B981' : isListening ? '#F43F5E' : '#D1891C'} />
          </svg>
        )}

        {/* Status Pill attached under avatar */}
        <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-stone-900/95 backdrop-blur-md border border-emerald-500/40 text-white shadow-xl text-xs font-medium whitespace-nowrap z-10">
          {isSpeaking ? (
            <>
              <div className="flex items-center gap-0.5 h-3">
                <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.6s_infinite_ease-in-out]" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.8s_infinite_ease-in-out_0.1s]" />
                <span className="w-1 bg-emerald-400 rounded-full animate-[bounce_0.5s_infinite_ease-in-out_0.2s]" />
              </div>
              <span className="text-[11px] text-emerald-300 font-semibold">Tom Speaking...</span>
            </>
          ) : isListening ? (
            <>
              <Mic className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span className="text-[11px] text-rose-300 font-semibold">Listening to you</span>
            </>
          ) : isThinking ? (
            <>
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" />
              <span className="text-[11px] text-amber-200 font-medium">Searching & thinking...</span>
            </>
          ) : (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] text-stone-200 font-medium">{statusText}</span>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
