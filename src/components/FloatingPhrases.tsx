import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { FLOATING_PHRASES } from '../data/predictionData';

interface PhraseItem {
  id: number;
  text: string;
  top: string;
  left?: string;
  right?: string;
  delay: number;
  duration: number;
}

const PHRASES: PhraseItem[] = [
  { id: 1, text: 'Mercury is suspicious.', top: '16%', left: '4%', delay: 0.2, duration: 6.2 },
  { id: 2, text: 'Your aura has buffering issues.', top: '22%', right: '5%', delay: 1.1, duration: 7.1 },
  { id: 3, text: 'Jupiter knows something.', top: '58%', left: '3%', delay: 1.8, duration: 6.8 },
  { id: 4, text: 'The stars are typing…', top: '48%', right: '4%', delay: 0.6, duration: 5.9 },
  { id: 5, text: 'Cosmic Wi-Fi: connected', top: '78%', left: '6%', delay: 2.2, duration: 7.5 },
  { id: 6, text: 'Your destiny is currently unavailable.', top: '82%', right: '7%', delay: 1.4, duration: 6.4 }
];

export const FloatingPhrases: React.FC = () => {
  const [activeReaction, setActiveReaction] = useState<Record<number, string>>({});

  const handleClick = (id: number) => {
    const funnyReactions = [
      'Stop eavesdropping on the cosmos!',
      'Planetary privacy violation!',
      'Signal strength degraded to 1G.',
      'Mercury noticed you looking.',
      'Chakra overloaded with sarcasm.',
      'Reconnecting to starlight...'
    ];
    const picked = funnyReactions[Math.floor(Math.random() * funnyReactions.length)];
    setActiveReaction(prev => ({ ...prev, [id]: picked }));

    setTimeout(() => {
      setActiveReaction(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    }, 2800);
  };

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 hidden md:block">
      {PHRASES.map((item) => {
        const displayText = activeReaction[item.id] || item.text;
        const isReacting = !!activeReaction[item.id];

        return (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: [0.7, 0.95, 0.7],
              y: [0, -10, 0],
              rotate: [-0.5, 0.5, -0.5]
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: item.delay
            }}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right
            }}
            className="pointer-events-auto"
          >
            <button
              onClick={() => handleClick(item.id)}
              className={`group flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-md border transition-all duration-300 cursor-pointer shadow-lg ${
                isReacting
                  ? 'bg-purple-950/80 border-purple-400 text-yellow-300 scale-105 shadow-purple-500/30'
                  : 'bg-slate-900/60 border-slate-700/60 text-slate-300 hover:text-purple-300 hover:border-purple-500/50 hover:bg-slate-800/80 shadow-black/40'
              }`}
            >
              <Sparkles className={`w-3 h-3 transition-transform group-hover:rotate-45 ${isReacting ? 'text-yellow-400 animate-spin' : 'text-purple-400'}`} />
              <span className="font-mono-cosmic tracking-tight">{displayText}</span>
            </button>
          </motion.div>
        );
      })}
    </div>
  );
};
