import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowRight, ArrowLeft, Sparkles, Check, AlertCircle, Calendar, Compass, ShieldAlert } from 'lucide-react';
import { DestinyChoice, MoodType, PhoneCheckOption, UserInput } from '../types';
import { getZodiacFromBirthday, ZODIAC_SIGNS } from '../utils/zodiac';
import { unlockAchievement } from '../utils/storage';

interface PredictionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: UserInput) => void;
  onUnlockAchievement: (title: string, message: string) => void;
}

export const PredictionFormModal: React.FC<PredictionFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  onUnlockAchievement
}) => {
  const [step, setStep] = useState<number>(1);
  const totalSteps = 6;

  // Form State
  const [name, setName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('2000-01-01');
  const [zodiac, setZodiac] = useState<string>('Capricorn');
  const [mood, setMood] = useState<MoodType>('Existing');
  const [phoneChecks, setPhoneChecks] = useState<PhoneCheckOption>('21–50');
  const [destinyChoice, setDestinyChoice] = useState<DestinyChoice>('Pizza');

  // Easter egg states
  const [adminEasterEgg, setAdminEasterEgg] = useState<string | null>(null);

  // Sync zodiac when birthday changes
  useEffect(() => {
    if (birthday) {
      const calculated = getZodiacFromBirthday(birthday);
      setZodiac(calculated);
    }
  }, [birthday]);

  if (!isOpen) return null;

  const handleNext = () => {
    // Step 1 easter egg checks
    if (step === 1) {
      const trimmed = name.trim().toLowerCase();
      if (!trimmed) {
        setName('Mysterious Traveler');
      }

      if (trimmed === 'admin') {
        setAdminEasterEgg('ACCESSING SECRET COSMIC DATABASE...');
        setTimeout(() => {
          setAdminEasterEgg('Nice try. 🤡');
          setTimeout(() => {
            setAdminEasterEgg(null);
            setStep(2);
          }, 1500);
        }, 1200);
        return;
      }

      if (trimmed === 'banana') {
        const res = unlockAchievement('banana_prophet');
        if (res.unlocked) {
          onUnlockAchievement('🍌 Banana Prophet Unlocked!', 'You entered "banana" into the cosmic ledger.');
        }
      }
    }

    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Final submit
      onSubmit({
        name: name.trim() || 'Stargazer',
        birthday,
        zodiac,
        mood,
        phoneChecks,
        destinyChoice
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const moodOptions: { type: MoodType; emoji: string; label: string }[] = [
    { type: 'Happy', emoji: '😀', label: 'Happy' },
    { type: 'Existing', emoji: '😐', label: 'Existing' },
    { type: 'Emotionally buffering', emoji: '😭', label: 'Emotionally buffering' },
    { type: 'Unreasonably confident', emoji: '😎', label: 'Unreasonably confident' },
    { type: 'Questionable decisions', emoji: '🤡', label: 'Questionable decisions' },
    { type: 'No thoughts', emoji: '🗿', label: 'No thoughts' }
  ];

  const phoneOptions: PhoneCheckOption[] = [
    '0–5',
    '6–20',
    '21–50',
    '51–100',
    'I have lost count'
  ];

  const destinyOptions: { type: DestinyChoice; emoji: string; desc: string }[] = [
    { type: 'Pizza', emoji: '🍕', desc: 'Carbs of destiny' },
    { type: 'Money', emoji: '💸', desc: 'Imaginary riches' },
    { type: 'Sleep', emoji: '😴', desc: 'Horizontal enlightenment' },
    { type: 'Phone', emoji: '📱', desc: 'Dopamine rectangle' },
    { type: 'Gaming', emoji: '🎮', desc: 'Strategic escapism' },
    { type: 'Juice', emoji: '🧃', desc: 'Sweet hydration' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-xl bg-[#0d1127] border border-purple-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/80 overflow-hidden"
      >
        {/* Ambient top light */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer z-20"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header & Step progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-mono-cosmic text-purple-300 mb-2">
            <span>COSMIC TELEMETRY</span>
            <span>STEP {step} OF {totalSteps}</span>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(step / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Form Body with Smooth Transition */}
        <div className="min-h-[290px] flex flex-col justify-center">
          {adminEasterEgg ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-10 space-y-4"
            >
              <ShieldAlert className="w-12 h-12 text-rose-400 animate-pulse" />
              <div className="font-mono-cosmic text-lg text-rose-300 font-bold tracking-wider">
                {adminEasterEgg}
              </div>
              <p className="text-xs text-slate-400 font-mono-cosmic">Access protocol terminated by universal security.</p>
            </motion.div>
          ) : (
            <AnimatePresence mode="wait">
              {/* STEP 1: Name */}
              {step === 1 && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider">Step 1 — Identity</span>
                    <h2 className="text-2xl font-bold font-display text-white">What should the universe call you?</h2>
                    <p className="text-xs text-slate-400">Can be your name, nickname, or your primary excuse for being late.</p>
                  </div>

                  <div className="pt-2">
                    <input
                      type="text"
                      autoFocus
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                      placeholder="e.g. Stargazer Sam, Captain Naptime..."
                      maxLength={35}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-500/20 font-medium text-base transition"
                    />
                    <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-mono-cosmic">
                      <span>Easter egg hints: Try "admin" or "banana"</span>
                      <span>{name.length}/35</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Birthday */}
              {step === 2 && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider">Step 2 — Earth Arrival</span>
                    <h2 className="text-2xl font-bold font-display text-white">When did you arrive on Earth?</h2>
                    <p className="text-xs text-slate-400">Used strictly to calculate celestial alignments and approximate your next snack.</p>
                  </div>

                  <div className="pt-3">
                    <div className="relative">
                      <input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="w-full px-4 py-3.5 rounded-xl bg-slate-900/90 border border-purple-500/30 text-white focus:outline-none focus:border-purple-400 font-mono-cosmic text-base"
                      />
                      <Calendar className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400 pointer-events-none" />
                    </div>
                    <p className="text-xs text-purple-300 font-mono-cosmic mt-3">
                      Detected Zodiac: <strong className="text-white underline">{zodiac}</strong>
                    </p>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: Zodiac Sign */}
              {step === 3 && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider">Step 3 — Cosmic Sign</span>
                    <h2 className="text-2xl font-bold font-display text-white">Confirm or Override Zodiac</h2>
                    <p className="text-xs text-slate-400">We guessed from your birthday, but feel free to lie to the universe.</p>
                  </div>

                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-1 max-h-[220px] overflow-y-auto pr-1">
                    {ZODIAC_SIGNS.map((z) => {
                      const isSelected = zodiac.toLowerCase() === z.sign.toLowerCase();
                      return (
                        <button
                          key={z.sign}
                          type="button"
                          onClick={() => setZodiac(z.sign)}
                          className={`p-2 rounded-xl text-xs font-medium border text-left flex flex-col items-center justify-center transition cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-500/30'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-lg mb-0.5">{z.symbol}</span>
                          <span className="font-semibold">{z.sign}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 4: Current Mood */}
              {step === 4 && (
                <motion.div
                  key="step-4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider">Step 4 — Emotional Frequency</span>
                    <h2 className="text-2xl font-bold font-display text-white">What is your current vibe?</h2>
                    <p className="text-xs text-slate-400">Select the option that matches your internal server status.</p>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {moodOptions.map((item) => {
                      const isSelected = mood === item.type;
                      return (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => setMood(item.type)}
                          className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-500/20'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-xl">{item.emoji}</span>
                          <span className="text-xs font-medium leading-tight">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 5: Phone Checks */}
              {step === 5 && (
                <motion.div
                  key="step-5"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider">Step 5 — Critical Cosmic Telemetry</span>
                    <h2 className="text-2xl font-bold font-display text-white">How many times did you check your phone today?</h2>
                    <p className="text-xs text-slate-400">Be honest. The satellites can see your screen time reflections.</p>
                  </div>

                  <div className="space-y-2 pt-2">
                    {phoneOptions.map((opt) => {
                      const isSelected = phoneChecks === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setPhoneChecks(opt)}
                          className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-500/20'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-sm font-medium font-mono-cosmic">{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-purple-400" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 6: Pick Your Destiny */}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-3"
                >
                  <div className="space-y-1">
                    <span className="text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider">Step 6 — Final Decision</span>
                    <h2 className="text-2xl font-bold font-display text-white">Pick Your Destiny</h2>
                    <div className="p-2 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-[11px] font-mono-cosmic">
                      ⚠️ Note: This choice has absolutely no effect on your prediction.
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1">
                    {destinyOptions.map((item) => {
                      const isSelected = destinyChoice === item.type;
                      return (
                        <button
                          key={item.type}
                          type="button"
                          onClick={() => setDestinyChoice(item.type)}
                          className={`p-3 rounded-xl border text-center flex flex-col items-center justify-center transition cursor-pointer ${
                            isSelected
                              ? 'bg-purple-600/30 border-purple-400 text-white shadow-md shadow-purple-500/20'
                              : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <span className="text-2xl mb-1">{item.emoji}</span>
                          <span className="text-xs font-bold">{item.type}</span>
                          <span className="text-[10px] text-slate-400 mt-0.5">{item.desc}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Footer Controls */}
        <div className="mt-8 pt-4 border-t border-slate-800/80 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || !!adminEasterEgg}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
              step === 1 || adminEasterEgg
                ? 'opacity-0 pointer-events-none'
                : 'text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!!adminEasterEgg}
            id="form-next-submit-button"
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs tracking-wider font-display flex items-center gap-2 shadow-lg shadow-purple-950 cursor-pointer hover:scale-105 active:scale-95 transition"
          >
            <span>{step === totalSteps ? 'COMMENCE FAKE CALCULATION' : 'CONTINUE'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
