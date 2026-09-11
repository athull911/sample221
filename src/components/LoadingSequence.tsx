import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { FAKE_CALCULATION_STEPS } from '../data/predictionData';
import { Sparkles, Radio, Orbit } from 'lucide-react';

interface LoadingSequenceProps {
  onComplete: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({ onComplete }) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Total duration ~5.5 seconds through the hilarious steps
    const stepInterval = 450;
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < FAKE_CALCULATION_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setIsReady(true);
          return prev;
        }
      });
    }, stepInterval);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isReady) {
      // Fire cosmic particle burst
      try {
        confetti({
          particleCount: 80,
          spread: 80,
          origin: { y: 0.5 },
          colors: ['#a855f7', '#38bdf8', '#fbbf24', '#ec4899', '#ffffff']
        });
      } catch (e) {
        console.log('Confetti triggered', e);
      }

      const timer = setTimeout(() => {
        onComplete();
      }, 1400);

      return () => clearTimeout(timer);
    }
  }, [isReady, onComplete]);

  const currentMessage = FAKE_CALCULATION_STEPS[currentStepIndex];
  const progressPercent = Math.min(100, Math.round(((currentStepIndex + 1) / FAKE_CALCULATION_STEPS.length) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#060814]/90 backdrop-blur-xl">
      <div className="relative w-full max-w-lg flex flex-col items-center justify-center text-center p-8">
        {/* Glowing cosmic rings animation */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mb-8 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-purple-500/20 animate-spin-slow" />
          <div
            className="absolute inset-4 rounded-full border border-dashed border-cyan-400/40"
            style={{ animation: 'spin-slow 20s linear reverse infinite' }}
          />
          <div className="absolute inset-8 rounded-full border border-indigo-500/30 animate-pulse" />

          {/* Central orb */}
          <motion.div
            animate={{
              scale: isReady ? [1, 1.3, 1.1] : [1, 1.08, 1],
              boxShadow: isReady
                ? '0 0 60px rgba(168, 85, 247, 0.9)'
                : '0 0 30px rgba(147, 51, 234, 0.4)'
            }}
            transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-700 via-indigo-600 to-cyan-400 flex items-center justify-center relative shadow-2xl"
          >
            {isReady ? (
              <Sparkles className="w-10 h-10 text-white animate-bounce" />
            ) : (
              <Orbit className="w-10 h-10 text-white animate-spin" style={{ animationDuration: '4s' }} />
            )}
          </motion.div>

          {/* Radar sweeping indicator */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-purple-500/10 to-transparent animate-spin" style={{ animationDuration: '3s' }} />
        </div>

        {/* Message ticker */}
        <div className="h-20 flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStepIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              {isReady ? (
                <div className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-yellow-200 to-cyan-300 font-display tracking-wider">
                  ✨ YOUR COSMIC REPORT IS READY ✨
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center gap-2 text-xs font-mono-cosmic text-purple-400 mb-1">
                    <Radio className="w-3 h-3 animate-pulse text-cyan-400" />
                    <span>TRANSMITTING QUERY TO DEEP SPACE</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-mono-cosmic">
                    {currentMessage}
                  </h3>
                </>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Fake Progress Meter */}
        <div className="w-64 mt-6">
          <div className="flex justify-between text-[11px] font-mono-cosmic text-slate-400 mb-1.5">
            <span>Cosmic Synthesis</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden border border-slate-800">
            <motion.div
              className="h-full bg-gradient-to-r from-purple-500 via-indigo-400 to-cyan-400 rounded-full"
              style={{ width: `${progressPercent}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
