import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Copy, Check, Share2, Sparkles } from 'lucide-react';
import { PredictionResult } from '../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  prediction: PredictionResult;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, prediction }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareText = `🔮 ASTROLOGICALLY PROBABLY™\nName: ${prediction.userInput.name}\nPrediction: "${prediction.mainPrediction}"\nCosmic Accuracy: ${prediction.cosmicAccuracy}%\nUselessness: ${prediction.uselessnessScore}/100 (${prediction.uselessnessRank})\nLucky Food: ${prediction.luckyFood}\n\n100% scientifically unverified. Accuracy not included!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-md bg-[#0d1228] border border-purple-500/40 rounded-3xl p-6 shadow-2xl shadow-purple-950/70"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-3">
          <Share2 className="w-4 h-4" />
          <span>BROADCAST YOUR DESTINY</span>
        </div>

        {/* Styled Card Preview */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-950/80 via-slate-900 to-slate-950 border border-purple-500/30 text-left space-y-3 shadow-xl mb-6">
          <div className="flex items-center justify-between border-b border-purple-500/20 pb-3">
            <span className="font-extrabold text-xs font-display text-white tracking-wider">
              ASTROLOGICALLY PROBABLY™
            </span>
            <span className="text-[10px] font-mono-cosmic text-purple-300">
              {prediction.cosmicAccuracy}% ACCURATE
            </span>
          </div>

          <div>
            <span className="text-[10px] font-mono-cosmic text-purple-400 uppercase">Cosmic Dossier</span>
            <h4 className="text-base font-bold text-white font-display">
              {prediction.userInput.name} ({prediction.userInput.zodiac})
            </h4>
          </div>

          <p className="text-sm font-semibold text-purple-200 italic leading-snug">
            "{prediction.mainPrediction}"
          </p>

          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono-cosmic pt-2 border-t border-purple-500/20">
            <div>
              <span className="text-slate-400">Uselessness:</span>{' '}
              <strong className="text-rose-300">{prediction.uselessnessScore}/100</strong>
            </div>
            <div>
              <span className="text-slate-400">Lucky Food:</span>{' '}
              <strong className="text-amber-300 truncate block">{prediction.luckyFood}</strong>
            </div>
          </div>
        </div>

        {/* Copy Button */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={handleCopy}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider font-display flex items-center justify-center gap-2 shadow-lg shadow-purple-950 cursor-pointer transition hover:scale-[1.02] active:scale-[0.98]"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>COSMIC TELEGRAM COPIED!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>COPY SHARE TEXT TO CLIPBOARD</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-slate-500 font-mono-cosmic">
            Paste in your group chats to spread planetary misinformation.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
