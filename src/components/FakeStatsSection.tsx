import React, { useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { Activity, Users, Target, AlertOctagon, Orbit, Ban } from 'lucide-react';

interface FakeStatsSectionProps {
  userPredictionCount: number;
}

export const FakeStatsSection: React.FC<FakeStatsSectionProps> = ({ userPredictionCount }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  // Base stats
  const basePredictions = 8492193 + userPredictionCount;
  const baseConfused = 7921441 + userPredictionCount;

  const [displayPredictions, setDisplayPredictions] = useState(8490000);
  const [displayConfused, setDisplayConfused] = useState(7920000);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const startTime = performance.now();

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(1, elapsed / duration);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      setDisplayPredictions(Math.floor(8490000 + (basePredictions - 8490000) * eased));
      setDisplayConfused(Math.floor(7920000 + (baseConfused - 7920000) * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, basePredictions, baseConfused]);

  const stats = [
    {
      label: 'Predictions Generated',
      value: displayPredictions.toLocaleString(),
      icon: Activity,
      color: 'text-purple-400',
      border: 'border-purple-500/20'
    },
    {
      label: 'People Confused',
      value: displayConfused.toLocaleString(),
      icon: Users,
      color: 'text-cyan-400',
      border: 'border-cyan-500/20'
    },
    {
      label: 'Cosmic Accuracy',
      value: '99.7%',
      icon: Target,
      color: 'text-emerald-400',
      border: 'border-emerald-500/20'
    },
    {
      label: 'Scientists Concerned',
      value: '42',
      icon: AlertOctagon,
      color: 'text-amber-400',
      border: 'border-amber-500/20'
    },
    {
      label: 'Planets Consulted',
      value: '8.5',
      icon: Orbit,
      color: 'text-indigo-400',
      border: 'border-indigo-500/20'
    },
    {
      label: 'Useful Predictions',
      value: '0',
      icon: Ban,
      color: 'text-rose-400',
      border: 'border-rose-500/20'
    }
  ];

  return (
    <section ref={containerRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-widest">
          EMPIRICAL PROOF OF USELESSNESS
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-1">
          PLANETARY TELEMETRY DASHBOARD
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Strictly monitored by our quantum nonsense satellites orbiting high above Earth.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className={`p-4 rounded-2xl glass-panel ${stat.border} flex flex-col items-center text-center justify-between min-h-[140px]`}
            >
              <div className={`p-2 rounded-xl bg-slate-900/80 mb-2 ${stat.color}`}>
                <Icon className="w-5 h-5" />
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-black font-mono-cosmic text-white">
                  {stat.value}
                </div>
                <div className="text-[11px] font-medium text-slate-400 mt-1 font-display leading-tight">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
