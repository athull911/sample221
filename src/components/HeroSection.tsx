import React from 'react';
import { motion } from 'motion/react';
import { Trophy, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';
import { EasterEggMoon } from './EasterEggMoon';

interface HeroSectionProps {
  onPredictClick: () => void;
  onLeaderboardClick: () => void;
  onUnlockAchievement: (title: string, message: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPredictClick,
  onLeaderboardClick,
  onUnlockAchievement
}) => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-10 pb-16 overflow-hidden">
      {/* Background Rotating Planet / Celestial Object */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 opacity-60 scale-75 sm:scale-100 pointer-events-auto">
        <EasterEggMoon onUnlockAchievement={onUnlockAchievement} size="lg" />
      </div>

      {/* Decorative orbital halo */}
      <div className="absolute w-[600px] sm:w-[900px] h-[300px] sm:h-[450px] border border-purple-500/10 rounded-[100%] -rotate-12 pointer-events-none -z-10" />

      {/* Hero Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border-purple-500/30 text-purple-300 text-xs font-mono-cosmic mb-6 shadow-lg shadow-purple-950/40"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <span className="tracking-wide">ASTROLOGICALLY PROBABLY™</span>
        <span className="text-slate-500">•</span>
        <span className="text-slate-300 italic">Accuracy not included</span>
      </motion.div>

      {/* Hero Headings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="max-w-4xl mx-auto space-y-4"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display text-white drop-shadow-sm leading-[1.08]">
          WHAT DOES THE UNIVERSE HAVE{' '}
          <span className="bg-gradient-to-r from-purple-300 via-violet-200 to-cyan-300 bg-clip-text text-transparent">
            PLANNED FOR YOU?
          </span>
        </h1>

        <p className="text-lg sm:text-2xl text-slate-300 font-medium max-w-2xl mx-auto pt-2">
          Probably nothing. <span className="text-purple-300">But let's check anyway.</span>
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.25 }}
        className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
      >
        {/* Primary Button */}
        <button
          onClick={onPredictClick}
          id="hero-predict-future-button"
          className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-extrabold text-base tracking-wider font-display shadow-xl shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 cursor-pointer group"
        >
          <span className="text-xl group-hover:scale-125 transition-transform">🔮</span>
          <span>PREDICT MY FUTURE</span>
          <Zap className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* Secondary Button */}
        <button
          onClick={onLeaderboardClick}
          id="hero-view-leaderboard-button"
          className="w-full sm:w-auto px-6 py-4 rounded-2xl glass-panel glass-panel-hover text-slate-200 hover:text-white font-semibold text-sm tracking-wide font-display border border-slate-700/70 hover:border-amber-500/40 flex items-center justify-center gap-2.5 cursor-pointer shadow-lg"
        >
          <Trophy className="w-4 h-4 text-amber-400" />
          <span>VIEW COSMIC LEADERBOARD</span>
        </button>
      </motion.div>

      {/* Disclaimers & Micro Humor */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-12 max-w-lg mx-auto"
      >
        <div className="glass-panel rounded-xl p-3.5 border-slate-800/80 text-xs font-mono-cosmic text-slate-400 flex items-start gap-3 text-left">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="text-slate-300 font-semibold">⚠️ 100% scientifically unverified. 0% responsible for your future.</p>
            <p className="text-[11px] text-slate-400">
              Your cosmic identity stays in this browser. We don't need your actual identity to predict that you will probably check your phone again.
            </p>
          </div>
        </div>

        <p className="mt-4 text-[11px] text-slate-400 font-mono-cosmic tracking-wide uppercase">
          Tip: Try poking the moon behind this text. It appreciates polite company.
        </p>
      </motion.div>
    </section>
  );
};
