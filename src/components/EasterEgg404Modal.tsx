import React from 'react';
import { motion } from 'motion/react';
import { Rocket, AlertTriangle, Compass, ArrowLeft } from 'lucide-react';

interface EasterEgg404ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EasterEgg404Modal: React.FC<EasterEgg404ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="relative w-full max-w-lg bg-[#0a0d1e] border border-rose-500/40 rounded-3xl p-8 text-center shadow-2xl shadow-rose-950/50"
      >
        <div className="w-20 h-20 rounded-2xl bg-rose-600/20 border border-rose-500/30 flex items-center justify-center mx-auto mb-6">
          <Rocket className="w-10 h-10 text-rose-400 -rotate-45 animate-bounce" />
        </div>

        <div className="inline-block px-3 py-1 rounded-full bg-rose-950 border border-rose-800 text-rose-300 text-xs font-mono-cosmic mb-3">
          ERROR 404: FUTURE MISSING
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mb-3">
          YOUR DESTINY COULD NOT BE FOUND.
        </h2>

        <p className="text-sm text-slate-300 mb-6 font-mono-cosmic leading-relaxed">
          The planetary satellite searched the multiverse and discovered that your timeline is currently buffering.
          Please verify that you exist in spacetime and try again.
        </p>

        <button
          onClick={onClose}
          className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-purple-600 to-rose-600 hover:from-purple-500 hover:to-rose-500 text-white font-bold text-xs tracking-wider font-display flex items-center justify-center gap-2 mx-auto cursor-pointer shadow-lg shadow-purple-950 transition hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO PRESENT</span>
        </button>
      </motion.div>
    </div>
  );
};
