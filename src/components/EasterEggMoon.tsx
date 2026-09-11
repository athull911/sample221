import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { unlockAchievement } from '../utils/storage';

interface EasterEggMoonProps {
  onUnlockAchievement: (title: string, message: string) => void;
  size?: 'sm' | 'md' | 'lg';
}

export const EasterEggMoon: React.FC<EasterEggMoonProps> = ({ onUnlockAchievement, size = 'lg' }) => {
  const [clicks, setClicks] = useState(0);
  const [moonState, setMoonState] = useState<'normal' | 'annoyed' | 'angry' | 'blocked'>('normal');
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);

  const handleMoonClick = () => {
    const nextClicks = clicks + 1;
    setClicks(nextClicks);

    if (nextClicks === 1) {
      setSpeechBubble('...did you just poke me?');
    } else if (nextClicks === 2) {
      setSpeechBubble('I am a celestial body, not a touchscreen.');
    } else if (nextClicks === 3) {
      setMoonState('annoyed');
      setSpeechBubble('Personal space. Look it up.');
    } else if (nextClicks === 4) {
      setMoonState('angry');
      setSpeechBubble('STOP POKING THE MOON.');
    } else if (nextClicks >= 5) {
      setMoonState('blocked');
      setSpeechBubble('Moon has blocked you. 🚫');
      const res = unlockAchievement('moon_harasser');
      if (res.unlocked) {
        onUnlockAchievement('🌙 Moon Harasser Unlocked!', 'You provoked an astronomical object into blocking you.');
      }
    }

    // Dismiss bubble after 3 seconds if not blocked
    if (nextClicks < 5) {
      setTimeout(() => {
        setSpeechBubble(null);
      }, 2500);
    }
  };

  const dimensionClasses = {
    sm: 'w-24 h-24',
    md: 'w-48 h-48',
    lg: 'w-72 h-72 md:w-96 md:h-96'
  }[size];

  return (
    <div className="relative flex items-center justify-center select-none">
      {/* Speech bubble */}
      <AnimatePresence>
        {speechBubble && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute -top-12 z-30 bg-slate-900/90 text-purple-200 border border-purple-500/40 px-3.5 py-1.5 rounded-xl text-xs font-mono-cosmic whitespace-nowrap shadow-xl shadow-purple-950/50 flex items-center gap-1.5 backdrop-blur-md"
          >
            <span className="text-yellow-400">🌙</span>
            <span>{speechBubble}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Outer Glow & Planet Container */}
      <div className="relative group cursor-pointer" onClick={handleMoonClick}>
        {/* Glow halo */}
        <div
          className={`absolute inset-0 rounded-full filter blur-2xl transition-all duration-700 pointer-events-none ${
            moonState === 'blocked'
              ? 'bg-rose-600/30'
              : moonState === 'angry'
              ? 'bg-orange-600/30'
              : 'bg-purple-600/20 group-hover:bg-purple-500/35'
          }`}
        />

        {/* Outer Orbit Rings */}
        <div className="absolute inset-[-14%] rounded-full border border-purple-500/20 pointer-events-none animate-spin-slow" />
        <div className="absolute inset-[-28%] rounded-full border border-slate-700/20 pointer-events-none" style={{ animation: 'spin-slow 140s linear reverse infinite' }} />

        {/* The Moon Sphere */}
        <motion.div
          whileHover={{ scale: moonState === 'blocked' ? 0.98 : 1.03 }}
          whileTap={{ scale: 0.95 }}
          className={`${dimensionClasses} rounded-full relative overflow-hidden transition-all duration-500 shadow-2xl border border-white/10 ${
            moonState === 'blocked'
              ? 'filter grayscale contrast-125'
              : moonState === 'angry'
              ? 'filter hue-rotate-[-40deg]'
              : ''
          }`}
          style={{
            background: 'radial-gradient(circle at 35% 35%, #e2e8f0 0%, #94a3b8 40%, #334155 75%, #0f172a 100%)',
            boxShadow: 'inset -25px -25px 40px rgba(0,0,0,0.8), 0 0 50px rgba(168, 85, 247, 0.25)'
          }}
        >
          {/* Surface Craters */}
          <div className="absolute top-[22%] left-[30%] w-[18%] h-[18%] rounded-full bg-slate-600/40 border border-slate-700/50 shadow-inner" />
          <div className="absolute top-[48%] left-[20%] w-[14%] h-[14%] rounded-full bg-slate-600/35 border border-slate-700/40 shadow-inner" />
          <div className="absolute top-[35%] left-[62%] w-[24%] h-[24%] rounded-full bg-slate-700/45 border border-slate-800/50 shadow-inner" />
          <div className="absolute top-[70%] left-[45%] w-[20%] h-[20%] rounded-full bg-slate-700/40 border border-slate-800/40 shadow-inner" />
          <div className="absolute top-[15%] left-[58%] w-[10%] h-[10%] rounded-full bg-slate-600/30 border border-slate-700/30 shadow-inner" />

          {/* Blocked Sunglasses or Eyes if blocked */}
          {moonState === 'blocked' && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[1px]">
              <div className="flex gap-4 mb-1">
                <div className="w-8 h-4 bg-slate-900 border border-slate-600 rounded-sm transform -rotate-6" />
                <div className="w-8 h-4 bg-slate-900 border border-slate-600 rounded-sm transform rotate-6" />
              </div>
              <span className="text-[10px] font-mono-cosmic text-rose-300 bg-black/70 px-2 py-0.5 rounded border border-rose-900/50">
                BLOCKED
              </span>
            </div>
          )}

          {/* Atmosphere limb light */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-purple-300/20 pointer-events-none" />
        </motion.div>
      </div>
    </div>
  );
};
