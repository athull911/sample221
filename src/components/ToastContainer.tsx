import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Sparkles, AlertCircle, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastContainerProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            className="pointer-events-auto p-4 rounded-2xl bg-gradient-to-r from-purple-950/95 via-slate-900/95 to-slate-950/95 border border-purple-500/40 shadow-2xl shadow-purple-950/60 backdrop-blur-xl flex items-start gap-3"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/20 border border-purple-400/30 flex items-center justify-center shrink-0 text-purple-300">
              {toast.type === 'achievement' ? (
                <Award className="w-5 h-5 text-amber-300 animate-bounce" />
              ) : (
                <Sparkles className="w-5 h-5 text-cyan-300" />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="text-xs font-bold font-display text-white truncate">
                {toast.title}
              </h4>
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                {toast.message}
              </p>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white transition p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
