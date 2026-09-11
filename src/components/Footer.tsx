import React from 'react';
import { Sparkles, Heart, ShieldAlert } from 'lucide-react';

interface FooterProps {
  onOpenPredict: () => void;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
  onOpenDailyChallenge: () => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPredict,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenDailyChallenge,
  onOpenAbout
}) => {
  return (
    <footer className="w-full border-t border-white/10 bg-[#060814] pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Giant Final Tagline */}
        <div className="text-center max-w-3xl mx-auto border-b border-white/10 pb-12">
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display text-white tracking-tight leading-none mb-2">
            “YOUR FUTURE IS UNCLEAR.
          </h2>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black font-display bg-gradient-to-r from-purple-400 via-violet-300 to-cyan-400 bg-clip-text text-transparent tracking-tight leading-none">
            OUR WEBSITE IS CLEARLY WORSE.”
          </h2>
        </div>

        {/* Middle Navigation & Disclaimers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 text-sm">
                🔮
              </div>
              <span className="font-extrabold text-white text-base tracking-wider font-display">
                ASTROLOGICALLY PROBABLY™
              </span>
            </div>
            <p className="text-xs text-purple-300 font-mono-cosmic italic">
              “Predicting the obvious since absolutely no year.”
            </p>
            <p className="text-xs text-slate-400 leading-relaxed">
              “We don't actually know anything about astrology. We just put planets behind buttons.”
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-left md:text-center">
            <div className="text-xs font-mono-cosmic text-slate-400 uppercase tracking-wider mb-2">
              Planetary Portals
            </div>
            <div className="flex flex-col md:items-center space-y-1.5 text-xs text-slate-300">
              <button onClick={onOpenPredict} className="hover:text-purple-300 transition cursor-pointer">
                Predict My Future
              </button>
              <button onClick={onOpenLeaderboard} className="hover:text-amber-300 transition cursor-pointer">
                Cosmic Leaderboard
              </button>
              <button onClick={onOpenAchievements} className="hover:text-purple-300 transition cursor-pointer">
                Achievements
              </button>
              <button onClick={onOpenDailyChallenge} className="hover:text-cyan-300 transition cursor-pointer">
                Daily Challenge
              </button>
              <button onClick={onOpenAbout} className="hover:text-slate-100 transition cursor-pointer">
                About & Manifesto
              </button>
            </div>
          </div>

          {/* Scientific Credibility & Privacy */}
          <div className="space-y-3 p-4 rounded-2xl glass-panel border-slate-800 text-xs font-mono-cosmic">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Scientific credibility:</span>
              <span className="text-amber-400 font-bold">0.0001%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Cosmic accuracy:</span>
              <span className="text-purple-300 font-bold">99.7% (Unverified)</span>
            </div>
            <p className="text-[11px] text-slate-400 pt-2 border-t border-slate-800 leading-normal">
              🔒 Your cosmic identity stays strictly in this browser. We don't need your actual identity to predict that you will probably check your phone again.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono-cosmic text-slate-400 gap-4">
          <div>
            © {new Date().getFullYear()} Astrologically Probably™. All planetary rights reserved (none of them legally enforceable).
          </div>
          <div className="flex items-center gap-1.5">
            <span>Built with pure starlight &amp; zero common sense</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
