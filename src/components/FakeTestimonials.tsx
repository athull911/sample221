import React from 'react';
import { motion } from 'motion/react';
import { Star, MessageSquareQuote } from 'lucide-react';
import { FAKE_TESTIMONIALS } from '../data/predictionData';

export const FakeTestimonials: React.FC = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-mono-cosmic text-amber-400 uppercase tracking-widest">
          COMMUNITY FEEDBACK
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display mt-1">
          ⭐ WHAT PEOPLE ARE SAYING
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-2">
          Verified reviews from human entities who have experienced our computational indifference.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {FAKE_TESTIMONIALS.map((item, idx) => (
          <motion.div
            key={item.author}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="p-6 rounded-3xl glass-panel border-slate-800 hover:border-amber-500/30 flex flex-col justify-between transition-all"
          >
            <div>
              <div className="flex items-center gap-1 text-amber-400 mb-4">
                {Array.from({ length: item.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>

              <p className="text-sm sm:text-base text-slate-200 italic font-medium leading-relaxed">
                "{item.quote}"
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center text-xs font-bold font-display">
                {item.author.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-white font-display">
                  — {item.author}
                </div>
                <div className="text-[10px] text-slate-400 font-mono-cosmic">
                  {item.title}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
