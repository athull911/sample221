import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Clock, CheckCircle, Gift, ArrowRight } from 'lucide-react';
import { DailyChallenge } from '../types';

interface DailyChallengeSectionProps {
  challenge: DailyChallenge;
  onClaim: () => void;
  onGoPredict: () => void;
}

export const DailyChallengeSection: React.FC<DailyChallengeSectionProps> = ({
  challenge,
  onClaim,
  onGoPredict
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number }>({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      // Next midnight UTC
      const tomorrowUTC = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
      const diffMs = tomorrowUTC.getTime() - now.getTime();

      if (diffMs > 0) {
        const hours = Math.floor((diffMs / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diffMs / (1000 * 60)) % 60);
        const seconds = Math.floor((diffMs / 1000) % 60);
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatDigits = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative rounded-3xl p-6 sm:p-8 glass-panel border-cyan-500/30 bg-gradient-to-r from-slate-950 via-[#0d172e] to-slate-950 shadow-xl shadow-cyan-950/20 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-cyan-300 text-xs font-mono-cosmic">
              <Sparkles className="w-3.5 h-3.5" />
              <span>🌟 TODAY'S COSMIC CHALLENGE</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-bold font-display text-white">
              {challenge.title}
            </h3>

            <p className="text-sm text-slate-300 max-w-xl leading-relaxed">
              "{challenge.description}"
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-1 justify-center md:justify-start text-xs font-mono-cosmic">
              <div className="flex items-center gap-1.5 text-amber-300 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-lg">
                <Gift className="w-3.5 h-3.5" />
                <span>Reward: +{challenge.rewardPoints} Cosmic Nonsense Points</span>
              </div>

              <div className="flex items-center gap-1.5 text-slate-400">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  Resets in: {formatDigits(timeLeft.hours)}h {formatDigits(timeLeft.minutes)}m {formatDigits(timeLeft.seconds)}s
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col gap-3 shrink-0 w-full sm:w-auto">
            {challenge.completed ? (
              <div className="px-6 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-mono-cosmic flex items-center justify-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>CHALLENGE COMPLETED</span>
              </div>
            ) : (
              <>
                <button
                  onClick={onGoPredict}
                  className="px-6 py-3 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs tracking-wider font-display flex items-center justify-center gap-2 shadow-lg shadow-cyan-950 cursor-pointer hover:scale-105 active:scale-95 transition"
                >
                  <span>ATTEMPT NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={onClaim}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-cyan-300 text-[11px] font-mono-cosmic transition cursor-pointer text-center"
                >
                  Check Completion Status
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
