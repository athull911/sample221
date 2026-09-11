import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, X, Sparkles } from 'lucide-react';
import { unlockAchievement } from '../utils/storage';

interface NonsenseModeOverlayProps {
  onUnlockAchievement: (title: string, message: string) => void;
  active: boolean;
  onToggle: (active: boolean) => void;
}

export const NonsenseModeOverlay: React.FC<NonsenseModeOverlayProps> = ({
  onUnlockAchievement,
  active,
  onToggle
}) => {
  const [fallingItems, setFallingItems] = useState<{ id: number; char: string; left: number; speed: number; size: number }[]>([]);

  // Konami code detection: ArrowUp, ArrowUp, ArrowDown, ArrowDown, ArrowLeft, ArrowRight, ArrowLeft, ArrowRight, b, a
  useEffect(() => {
    const konamiSequence = [
      'ArrowUp', 'ArrowUp',
      'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight',
      'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let currentIndex = 0;

    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const expected = konamiSequence[currentIndex].toLowerCase();

      if (key === expected) {
        currentIndex++;
        if (currentIndex === konamiSequence.length) {
          // Triggered!
          currentIndex = 0;
          onToggle(true);
          const res = unlockAchievement('cosmic_hacker');
          if (res.unlocked) {
            onUnlockAchievement(
              '👾 Cosmic Codebreaker Unlocked!',
              'You entered the sacred Konami sequence and unhinged reality.'
            );
          }
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onToggle, onUnlockAchievement]);

  // Handle falling emojis when nonsense mode is active
  useEffect(() => {
    if (!active) {
      setFallingItems([]);
      return;
    }

    const emojis = ['🍕', '🍌', '👽', '🤡', '💸', '📱', '🗿', '🌙', '🧀', '✨', '🪐', '🛸'];
    const interval = setInterval(() => {
      setFallingItems(prev => [
        ...prev.slice(-30),
        {
          id: Date.now() + Math.random(),
          char: emojis[Math.floor(Math.random() * emojis.length)],
          left: Math.random() * 95,
          speed: Math.random() * 3 + 2,
          size: Math.random() * 20 + 20
        }
      ]);
    }, 250);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {/* Falling Emojis */}
      {fallingItems.map(item => (
        <motion.div
          key={item.id}
          initial={{ y: -50, x: `${item.left}vw`, opacity: 0.9, rotate: 0 }}
          animate={{ y: '105vh', rotate: 360 }}
          transition={{ duration: item.speed, ease: 'linear' }}
          className="absolute select-none"
          style={{ fontSize: `${item.size}px` }}
        >
          {item.char}
        </motion.div>
      ))}

      {/* Persistent Banner Indicator with close button */}
      <div className="fixed top-24 left-1/2 -translate-x-1/2 pointer-events-auto z-50">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.03, 1], opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-600 via-purple-600 to-amber-500 text-white font-mono-cosmic text-xs font-bold shadow-2xl shadow-purple-600/50 border border-white/30 backdrop-blur-md"
        >
          <Sparkles className="w-4 h-4 animate-spin text-yellow-300" />
          <span>MAXIMUM COSMIC NONSENSE MODE ACTIVATED</span>
          <button
            onClick={() => onToggle(false)}
            className="ml-2 p-1 rounded-full hover:bg-black/30 text-white transition cursor-pointer"
            title="Deactivate Nonsense Mode"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};
