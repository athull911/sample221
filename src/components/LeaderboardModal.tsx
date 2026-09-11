import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Trophy, Flame, Sparkles, Send, CheckCircle2, User } from 'lucide-react';
import { LeaderboardEntry } from '../types';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  entries: LeaderboardEntry[];
  totalGlobalScore: number;
  userScoreToSubmit?: number;
  userPredictionToSubmit?: string;
  userCosmicEnergyToSubmit?: string;
  onSubmitScore: (username: string) => void;
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  entries,
  totalGlobalScore,
  userScoreToSubmit,
  userPredictionToSubmit,
  userCosmicEnergyToSubmit,
  onSubmitScore
}) => {
  const [nickname, setNickname] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  // Pick top user as "Today's Most Useless User"
  const topUselessUser = entries.length > 0 ? entries[0] : null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim()) return;
    onSubmitScore(nickname.trim());
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="text-xl">🥇</span>;
    if (rank === 2) return <span className="text-xl">🥈</span>;
    if (rank === 3) return <span className="text-xl">🥉</span>;
    return <span className="font-mono-cosmic font-bold text-slate-400">#{rank}</span>;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c1022] border border-amber-500/30 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-amber-950/40 flex flex-col overflow-hidden"
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
          <div className="flex items-center gap-2 text-xs font-mono-cosmic text-amber-400 uppercase tracking-wider mb-1">
            <Trophy className="w-4 h-4" />
            <span>GLOBAL STANDINGS</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display flex items-center gap-3">
            <span>🏆 HALL OF USELESS DESTINY</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Honoring the brave souls whose celestial horoscopes achieved zero practical utility.
          </p>
        </div>

        {/* Top Feature Banners: Global Counter & Today's Most Useless User */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 shrink-0">
          {/* Global Cosmic Score */}
          <div className="glass-panel p-4 rounded-2xl border-purple-500/30 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-2xl">
              🌌
            </div>
            <div>
              <div className="text-[11px] font-mono-cosmic text-purple-300 uppercase">
                GLOBAL COSMIC SCORE
              </div>
              <div className="text-xl sm:text-2xl font-black font-mono-cosmic text-white">
                {totalGlobalScore.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-400 font-mono-cosmic">
                useless predictions generated worldwide
              </div>
            </div>
          </div>

          {/* Today's Most Useless User */}
          {topUselessUser && (
            <div className="glass-panel p-4 rounded-2xl border-amber-500/30 bg-amber-500/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl">
                <Flame className="w-6 h-6 text-amber-400 animate-pulse" />
              </div>
              <div>
                <div className="text-[11px] font-mono-cosmic text-amber-300 uppercase flex items-center gap-1.5 font-bold">
                  <span>🔥 TODAY'S MOST USELESS USER</span>
                </div>
                <div className="text-base sm:text-lg font-bold text-white font-display">
                  {topUselessUser.username}{' '}
                  <span className="text-xs font-mono-cosmic text-amber-400">
                    ({topUselessUser.uselessness} pts)
                  </span>
                </div>
                <div className="text-[10px] text-slate-300 italic truncate max-w-[240px] sm:max-w-xs">
                  "{topUselessUser.prediction}"
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit user's current score if available */}
        {userScoreToSubmit !== undefined && !submitted && (
          <form
            onSubmit={handleSubmit}
            className="mb-6 p-4 rounded-2xl glass-panel border-purple-500/40 bg-purple-950/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-500/30 flex items-center justify-center text-purple-300">
                <User className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">Submit your score ({userScoreToSubmit.toFixed(1)}) to the Hall!</div>
                <div className="text-[11px] text-slate-400 font-mono-cosmic truncate max-w-xs">
                  "{userPredictionToSubmit}"
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <input
                type="text"
                placeholder="Your cosmic nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                maxLength={20}
                required
                className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-white text-xs focus:outline-none focus:border-purple-400 font-mono-cosmic w-full sm:w-44"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-display flex items-center gap-1.5 shrink-0 cursor-pointer shadow-md shadow-purple-950"
              >
                <Send className="w-3 h-3" />
                <span>SUBMIT</span>
              </button>
            </div>
          </form>
        )}

        {submitted && (
          <div className="mb-6 p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono-cosmic flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Destiny recorded in the cosmic ledger! Your ranking has been updated.</span>
          </div>
        )}

        {/* Scrollable Leaderboard Table */}
        <div className="flex-1 overflow-y-auto pr-1 rounded-2xl border border-slate-800 bg-slate-950/50">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/80 sticky top-0 z-10 text-[11px] font-mono-cosmic text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 sm:px-4">Rank</th>
                <th className="py-3 px-3 sm:px-4">Username</th>
                <th className="py-3 px-3 sm:px-4">Uselessness</th>
                <th className="py-3 px-3 sm:px-4 hidden md:table-cell">Cosmic Energy</th>
                <th className="py-3 px-3 sm:px-4">Prediction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {entries.map((entry) => (
                <tr
                  key={entry.id}
                  className={`transition-colors ${
                    entry.isUser
                      ? 'bg-purple-950/40 text-purple-200 font-medium'
                      : 'hover:bg-slate-900/50 text-slate-300'
                  }`}
                >
                  <td className="py-3 px-3 sm:px-4 whitespace-nowrap">
                    {getRankBadge(entry.rank)}
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-semibold text-white whitespace-nowrap">
                    {entry.username}
                    {entry.isUser && (
                      <span className="ml-1.5 px-1.5 py-0.5 text-[9px] bg-purple-500/30 text-purple-300 rounded font-mono-cosmic">
                        YOU
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 sm:px-4 font-mono-cosmic text-amber-400 font-bold whitespace-nowrap">
                    {entry.uselessness.toFixed(1)}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-xs font-mono-cosmic text-slate-400 hidden md:table-cell whitespace-nowrap">
                    {entry.cosmicEnergy}
                  </td>
                  <td className="py-3 px-3 sm:px-4 text-xs italic text-slate-300 max-w-xs truncate sm:whitespace-normal">
                    "{entry.prediction}"
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};
