import React from 'react';
import { motion } from 'motion/react';
import { X, Award, CheckCircle, Lock } from 'lucide-react';
import { Achievement } from '../types';

interface AchievementsModalProps {
  isOpen: boolean;
  onClose: () => void;
  achievements: Achievement[];
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  onClose,
  achievements
}) => {
  if (!isOpen) return null;

  const unlockedCount = achievements.filter(a => a.unlocked).length;
  const progressPercent = Math.round((unlockedCount / achievements.length) * 100);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-3xl max-h-[90vh] bg-[#0c1022] border border-purple-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-purple-950/50 flex flex-col overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-1">
            <Award className="w-4 h-4" />
            <span>COSMIC RECOGNITION</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            ASTRONOMICAL ACHIEVEMENTS
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Proof that you spent meaningful Earth minutes pursuing total cosmic nonsense.
          </p>

          {/* Progress bar */}
          <div className="mt-4 p-3 rounded-2xl glass-panel border-purple-500/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono-cosmic text-slate-300 font-semibold">
                Unlocked: {unlockedCount} of {achievements.length} badges ({progressPercent}%)
              </span>
            </div>
            <div className="w-full sm:w-60 bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* Grid of Badges */}
        <div className="flex-1 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {achievements.map((item) => {
            return (
              <div
                key={item.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                  item.unlocked
                    ? 'bg-purple-950/30 border-purple-500/40 text-white shadow-md shadow-purple-950/40'
                    : 'bg-slate-900/40 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${
                    item.unlocked
                      ? 'bg-purple-600/20 border border-purple-400/40 shadow-inner'
                      : 'bg-slate-800/50 border border-slate-700/50 filter grayscale'
                  }`}
                >
                  {item.unlocked ? item.icon : <Lock className="w-5 h-5 text-slate-500" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className={`text-sm font-bold font-display truncate ${item.unlocked ? 'text-purple-200' : 'text-slate-400'}`}>
                      {item.title}
                    </h4>
                    {item.unlocked ? (
                      <span className="text-[10px] font-mono-cosmic text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/30 shrink-0">
                        UNLOCKED
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono-cosmic text-slate-500 bg-slate-800/40 px-2 py-0.5 rounded-full shrink-0">
                        LOCKED
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                  {item.unlockedAt && (
                    <div className="text-[10px] font-mono-cosmic text-purple-400/70 mt-1.5">
                      Earned: {new Date(item.unlockedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
