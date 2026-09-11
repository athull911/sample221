import React, { useState } from 'react';
import { Sparkles, Trophy, Award, Calendar, HelpCircle, Compass } from 'lucide-react';
import { unlockAchievement } from '../utils/storage';

interface NavbarProps {
  onOpenPredict: () => void;
  onOpenLeaderboard: () => void;
  onOpenAchievements: () => void;
  onOpenDailyChallenge: () => void;
  onOpenAbout: () => void;
  onOpen404: () => void;
  onUnlockAchievement: (title: string, message: string) => void;
  achievementCount: number;
  totalPredictionsGenerated: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPredict,
  onOpenLeaderboard,
  onOpenAchievements,
  onOpenDailyChallenge,
  onOpenAbout,
  onOpen404,
  onUnlockAchievement,
  achievementCount,
  totalPredictionsGenerated
}) => {
  const [logoClicks, setLogoClicks] = useState(0);

  const handleLogoClick = () => {
    const next = logoClicks + 1;
    setLogoClicks(next);

    if (next === 5) {
      onUnlockAchievement('Curious Clicker', 'You clicked the logo 5 times. Still nothing.');
    } else if (next >= 10) {
      const res = unlockAchievement('professional_clicker');
      if (res.unlocked) {
        onUnlockAchievement(
          '🖱️ Achievement Unlocked: Professional Clicker',
          'You clicked the logo 10 times and discovered absolutely nothing.'
        );
      }
      setLogoClicks(0);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/70 backdrop-blur-xl transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Brand Logo with Easter Egg 5 */}
        <div
          onClick={handleLogoClick}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
          title="Astrologically Probably™ (Click repeatedly for science)"
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-violet-400 p-[1px] shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 transition-shadow">
            <div className="w-full h-full bg-[#090d1f] rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-wider text-sm sm:text-base text-white font-display">
                ASTROLOGICALLY PROBABLY<span className="text-purple-400 text-xs align-top">™</span>
              </span>
            </div>
            <p className="text-[10px] sm:text-xs text-purple-300/80 font-mono-cosmic hidden sm:block">
              Accuracy not included
            </p>
          </div>
        </div>

        {/* Center / Navigation items */}
        <nav className="hidden lg:flex items-center gap-1 sm:gap-2">
          <button
            onClick={onOpenPredict}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-purple-400" />
            <span>Predict Future</span>
          </button>
          <button
            onClick={onOpenLeaderboard}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Trophy className="w-3.5 h-3.5 text-amber-400" />
            <span>Leaderboard</span>
          </button>
          <button
            onClick={onOpenDailyChallenge}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Daily Challenge</span>
          </button>
          <button
            onClick={onOpenAchievements}
            className="relative px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
          >
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Achievements</span>
            {achievementCount > 0 && (
              <span className="ml-1 px-1.5 py-0.2 bg-purple-500/30 border border-purple-400/40 text-purple-200 text-[10px] font-mono-cosmic rounded-full">
                {achievementCount}
              </span>
            )}
          </button>
          <button
            onClick={onOpenAbout}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition flex items-center gap-1.5 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
            <span>About</span>
          </button>
          <button
            onClick={onOpen404}
            className="px-2.5 py-1 rounded-lg text-[11px] font-mono-cosmic text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 border border-slate-800 transition cursor-pointer"
            title="Lost in Space (404 Easter Egg)"
          >
            404
          </button>
        </nav>

        {/* Right Action button & ticker */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex flex-col items-end text-right">
            <span className="text-[10px] text-slate-400 font-mono-cosmic">Cosmic Waste:</span>
            <span className="text-xs font-mono-cosmic font-semibold text-purple-300">
              {totalPredictionsGenerated.toLocaleString()} predictions
            </span>
          </div>

          <button
            onClick={onOpenPredict}
            id="nav-predict-cta"
            className="relative group overflow-hidden rounded-xl p-[1px] font-semibold text-xs transition cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-400 animate-cosmic-pulse" />
            <span className="relative flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-slate-950 rounded-[11px] text-white group-hover:bg-slate-900 transition-colors">
              <span className="text-purple-300">🔮</span>
              <span className="tracking-wide font-display">PREDICT</span>
            </span>
          </button>
        </div>
      </div>

      {/* Mobile quick links bar */}
      <div className="lg:hidden flex items-center justify-around py-2 border-t border-white/5 bg-slate-950/80 px-2 text-[11px]">
        <button onClick={onOpenPredict} className="flex items-center gap-1 text-purple-300 py-1 px-2">
          <span>🔮 Predict</span>
        </button>
        <button onClick={onOpenLeaderboard} className="flex items-center gap-1 text-amber-300 py-1 px-2">
          <Trophy className="w-3 h-3" />
          <span>Ranks</span>
        </button>
        <button onClick={onOpenDailyChallenge} className="flex items-center gap-1 text-cyan-300 py-1 px-2">
          <Calendar className="w-3 h-3" />
          <span>Daily</span>
        </button>
        <button onClick={onOpenAchievements} className="flex items-center gap-1 text-slate-300 py-1 px-2">
          <Award className="w-3 h-3" />
          <span>Badges ({achievementCount})</span>
        </button>
        <button onClick={onOpenAbout} className="text-slate-400 py-1 px-1.5">
          <span>About</span>
        </button>
      </div>
    </header>
  );
};
