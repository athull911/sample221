import React from 'react';
import { motion } from 'motion/react';
import { X, Sparkles, AlertCircle, ShieldAlert, Cpu } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-lg bg-[#0c1022] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
          <Sparkles className="w-4 h-4" />
          <span>ORIGIN MANIFESTO</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-4">
          ABOUT ASTROLOGICALLY PROBABLY™
        </h2>

        <div className="space-y-4 text-sm text-slate-300 leading-relaxed font-sans">
          <div className="p-4 rounded-2xl bg-purple-950/40 border border-purple-500/30 text-purple-200 font-medium italic">
            “We don't actually know anything about astrology. We just put planets behind buttons.”
          </div>

          <p>
            Astrologically Probably™ was founded on the radical premise that modern horoscopes are far too polite. We leverage zero quantum computers and zero actual astronomical data to deliver 100% scientifically unverified predictions that will have zero impact on your future.
          </p>

          <p>
            If you walked into a room and forgot why, you don't need planetary reconciliation—you just need sleep or a glass of water.
          </p>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono-cosmic">
            <span className="text-slate-400">Scientific credibility:</span>
            <span className="text-amber-400 font-bold">0.0001%</span>
          </div>

          <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400 font-mono-cosmic">
            🔒 <strong>Privacy Statement:</strong> Your cosmic identity stays strictly in this browser. We don't need your personal details to predict that you will probably check your phone again in 7 minutes.
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold font-display cursor-pointer transition"
          >
            UNDERSTOOD, CARRY ON
          </button>
        </div>
      </motion.div>
    </div>
  );
};
