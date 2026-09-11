import React, { useState, useEffect } from 'react';
import { CosmicBackground } from './components/CosmicBackground';
import { FloatingPhrases } from './components/FloatingPhrases';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PredictionFormModal } from './components/PredictionFormModal';
import { LoadingSequence } from './components/LoadingSequence';
import { PredictionResultView } from './components/PredictionResultView';
import { LeaderboardModal } from './components/LeaderboardModal';
import { AchievementsModal } from './components/AchievementsModal';
import { DailyChallengeSection } from './components/DailyChallengeSection';
import { FakeStatsSection } from './components/FakeStatsSection';
import { FakeTestimonials } from './components/FakeTestimonials';
import { EasterEgg404Modal } from './components/EasterEgg404Modal';
import { AboutModal } from './components/AboutModal';
import { ShareModal } from './components/ShareModal';
import { NonsenseModeOverlay } from './components/NonsenseModeOverlay';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

import { Achievement, DailyChallenge, LeaderboardEntry, PredictionResult, ToastMessage, UserInput } from './types';
import { 
  addLeaderboardEntry, 
  completeDailyChallenge, 
  getCurrentPrediction, 
  getDailyChallenge, 
  getStatsCount, 
  getStoredAchievements, 
  getStoredLeaderboard, 
  getStoredPredictions, 
  savePredictionToHistory, 
  unlockAchievement 
} from './utils/storage';
import { generatePrediction } from './utils/predictionEngine';

export default function App() {
  // Navigation & Modals
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isLoadingSequence, setIsLoadingSequence] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [is404Open, setIs404Open] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isNonsenseActive, setIsNonsenseActive] = useState(false);

  // Core Data State
  const [currentPrediction, setCurrentPrediction] = useState<PredictionResult | null>(null);
  const [pendingInput, setPendingInput] = useState<UserInput | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [dailyChallenge, setDailyChallenge] = useState<DailyChallenge>(getDailyChallenge());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [statsCount, setStatsCount] = useState<number>(0);

  // Procedural Web Audio Sound Effect Helper
  const playCosmicSound = (type: 'chime' | 'warp' | 'blip' | 'achievement') => {
    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();

      if (type === 'chime') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.5);
      } else if (type === 'achievement') {
        const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.12, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });
      } else if (type === 'warp') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.6);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.6);
      }
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  // Toast Helper
  const addToast = (title: string, message: string, type: ToastMessage['type'] = 'cosmic') => {
    const id = 'toast-' + Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, title, message, type }]);

    if (type === 'achievement') {
      playCosmicSound('achievement');
    } else {
      playCosmicSound('chime');
    }

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Initialization
  useEffect(() => {
    setLeaderboard(getStoredLeaderboard());
    setAchievements(getStoredAchievements());
    setStatsCount(getStatsCount());
    setDailyChallenge(getDailyChallenge());

    const savedPrediction = getCurrentPrediction();
    if (savedPrediction) {
      setCurrentPrediction(savedPrediction);
    }
  }, []);

  // Check achievements after prediction
  const evaluateAchievements = (result: PredictionResult) => {
    const allPredictions = getStoredPredictions();
    const totalCount = allPredictions.length;

    // First prediction
    const a1 = unlockAchievement('first_prediction');
    if (a1.unlocked) {
      addToast('🔮 Achievement Unlocked: First Prediction', 'You took your first step into astronomical irrelevance.', 'achievement');
    }

    // 10 predictions
    if (totalCount >= 10) {
      const a2 = unlockAchievement('professional_nonsense');
      if (a2.unlocked) {
        addToast('🤡 Achievement Unlocked: Professional Nonsense', 'You generated 10 predictions. Why?', 'achievement');
      }
    }

    // 25 predictions
    if (totalCount >= 25) {
      const a3 = unlockAchievement('chronically_curious');
      if (a3.unlocked) {
        addToast('📱 Achievement Unlocked: Chronically Curious', '25 predictions generated. The stars are officially exhausted.', 'achievement');
      }
    }

    // Beyond Useless (score >= 99.5)
    if (result.uselessnessScore >= 99.5) {
      const a4 = unlockAchievement('beyond_useless');
      if (a4.unlocked) {
        addToast('💀 Achievement Unlocked: Beyond Useless', 'You achieved 99.5+ uselessness. Pure scientific waste.', 'achievement');
      }
    }

    // Alien Approved (compatibility >= 95%)
    if (result.alienCompatibility.percentage >= 95) {
      const a5 = unlockAchievement('alien_approved');
      if (a5.unlocked) {
        addToast('👽 Achievement Unlocked: Alien Approved', 'Galactic federation deems you 95%+ acceptable.', 'achievement');
      }
    }

    // Check Daily Challenge conditions
    if (!dailyChallenge.completed) {
      if (dailyChallenge.id === 'daily_banana' && (result.isBananaMode || result.mainPrediction.toLowerCase().includes('banana'))) {
        const completed = completeDailyChallenge();
        setDailyChallenge(completed);
        addToast('🌟 Daily Challenge Complete!', `The Yellow Destiny fulfilled! +${completed.rewardPoints} Nonsense Points awarded.`, 'achievement');
      } else if (dailyChallenge.id === 'daily_uselessness' && result.uselessnessScore >= 98.5) {
        const completed = completeDailyChallenge();
        setDailyChallenge(completed);
        addToast('🌟 Daily Challenge Complete!', `Pure Garbage Seeker completed! +${completed.rewardPoints} Nonsense Points awarded.`, 'achievement');
      } else if (dailyChallenge.id === 'daily_alien' && result.alienCompatibility.percentage >= 80) {
        const completed = completeDailyChallenge();
        setDailyChallenge(completed);
        addToast('🌟 Daily Challenge Complete!', `Extraterrestrial Diplomat completed! +${completed.rewardPoints} Nonsense Points awarded.`, 'achievement');
      } else if (dailyChallenge.id === 'daily_snack') {
        const food = result.luckyFood.toLowerCase();
        if (food.includes('pizza') || food.includes('biscuit') || food.includes('cheese') || food.includes('snack')) {
          const completed = completeDailyChallenge();
          setDailyChallenge(completed);
          addToast('🌟 Daily Challenge Complete!', `Cosmic Munchies completed! +${completed.rewardPoints} Nonsense Points awarded.`, 'achievement');
        }
      }
    }

    // Refresh achievements in state
    setAchievements(getStoredAchievements());
  };

  // Submission of Form: Triggers Fake Loading Sequence
  const handleFormSubmit = (data: UserInput) => {
    setIsFormOpen(false);
    setPendingInput(data);
    setIsLoadingSequence(true);
    playCosmicSound('warp');
  };

  // Completion of Fake Loading Sequence
  const handleLoadingComplete = () => {
    setIsLoadingSequence(false);
    if (!pendingInput) return;

    const result = generatePrediction(pendingInput, false);
    setCurrentPrediction(result);
    savePredictionToHistory(result);
    setStatsCount((prev) => prev + 1);

    evaluateAchievements(result);

    // Scroll smoothly to prediction report view
    setTimeout(() => {
      const el = document.getElementById('prediction-report-view');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 150);
  };

  // Make It Even More Useless
  const handleMakeMoreUseless = () => {
    if (!currentPrediction) return;
    playCosmicSound('warp');
    const worseResult = generatePrediction(currentPrediction.userInput, true);
    setCurrentPrediction(worseResult);
    savePredictionToHistory(worseResult);
    evaluateAchievements(worseResult);
    addToast('🧠 Cosmic Degradation Applied', 'Prediction rendered 14% more useless.', 'cosmic');
  };

  // Submit to Leaderboard
  const handleSubmitToLeaderboard = (username: string) => {
    if (!currentPrediction) return;
    const updated = addLeaderboardEntry({
      username,
      uselessness: currentPrediction.uselessnessScore,
      cosmicEnergy: `${currentPrediction.cosmicEnergy.percentage}% ${currentPrediction.cosmicEnergy.label}`,
      prediction: currentPrediction.mainPrediction
    });

    setLeaderboard(updated);

    const aRes = unlockAchievement('cosmic_celebrity');
    if (aRes.unlocked) {
      addToast('🏆 Achievement Unlocked: Cosmic Celebrity', 'Your useless destiny is officially etched into the Hall of Fame.', 'achievement');
      setAchievements(getStoredAchievements());
    } else {
      addToast('Score Registered', `You are now listed in the Hall of Useless Destiny!`, 'cosmic');
    }
  };

  // Claim Daily Challenge manually
  const handleClaimDailyChallenge = () => {
    if (dailyChallenge.completed) {
      addToast('Already Claimed', 'You have already collected today’s celestial nonsense points.', 'cosmic');
    } else {
      addToast('Challenge Status', `Current objective: "${dailyChallenge.description}". Generate a prediction to complete!`, 'cosmic');
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalGlobalCalculated = 8492193 + statsCount;

  return (
    <div className="relative min-h-screen flex flex-col justify-between selection:bg-purple-600 selection:text-white">
      {/* Background Interactive Cosmic Canvas */}
      <CosmicBackground />

      {/* Floating Cosmic Phrases */}
      <FloatingPhrases />

      {/* Konami / Nonsense Mode Overlay */}
      <NonsenseModeOverlay
        active={isNonsenseActive}
        onToggle={setIsNonsenseActive}
        onUnlockAchievement={(title, msg) => addToast(title, msg, 'achievement')}
      />

      {/* Header & Navigation */}
      <Navbar
        onOpenPredict={() => setIsFormOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenDailyChallenge={() => {
          const el = document.getElementById('daily-challenge-section');
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpen404={() => setIs404Open(true)}
        onUnlockAchievement={(title, msg) => addToast(title, msg, 'achievement')}
        achievementCount={unlockedCount}
        totalPredictionsGenerated={totalGlobalCalculated}
      />

      {/* Main Content Area */}
      <main className="relative z-20 flex-1">
        {/* Hero Section */}
        <HeroSection
          onPredictClick={() => setIsFormOpen(true)}
          onLeaderboardClick={() => setIsLeaderboardOpen(true)}
          onUnlockAchievement={(title, msg) => addToast(title, msg, 'achievement')}
        />

        {/* Prediction Result Section (If user has generated one) */}
        {currentPrediction && (
          <div id="prediction-report-view">
            <PredictionResultView
              prediction={currentPrediction}
              onPredictAgain={() => setIsFormOpen(true)}
              onShare={() => setIsShareOpen(true)}
              onMakeMoreUseless={handleMakeMoreUseless}
              onSubmitLeaderboard={() => setIsLeaderboardOpen(true)}
            />
          </div>
        )}

        {/* Daily Cosmic Challenge Section */}
        <div id="daily-challenge-section">
          <DailyChallengeSection
            challenge={dailyChallenge}
            onClaim={handleClaimDailyChallenge}
            onGoPredict={() => setIsFormOpen(true)}
          />
        </div>

        {/* Telemetry Dashboard: Fake Statistics */}
        <FakeStatsSection userPredictionCount={statsCount} />

        {/* Fake Testimonials */}
        <FakeTestimonials />
      </main>

      {/* Footer */}
      <Footer
        onOpenPredict={() => setIsFormOpen(true)}
        onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        onOpenAchievements={() => setIsAchievementsOpen(true)}
        onOpenDailyChallenge={() => {
          const el = document.getElementById('daily-challenge-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Modals & Dialogs */}
      <PredictionFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        onUnlockAchievement={(title, msg) => addToast(title, msg, 'achievement')}
      />

      {isLoadingSequence && (
        <LoadingSequence onComplete={handleLoadingComplete} />
      )}

      <LeaderboardModal
        isOpen={isLeaderboardOpen}
        onClose={() => setIsLeaderboardOpen(false)}
        entries={leaderboard}
        totalGlobalScore={totalGlobalCalculated}
        userScoreToSubmit={currentPrediction?.uselessnessScore}
        userPredictionToSubmit={currentPrediction?.mainPrediction}
        userCosmicEnergyToSubmit={
          currentPrediction
            ? `${currentPrediction.cosmicEnergy.percentage}% ${currentPrediction.cosmicEnergy.label}`
            : undefined
        }
        onSubmitScore={handleSubmitToLeaderboard}
      />

      <AchievementsModal
        isOpen={isAchievementsOpen}
        onClose={() => setIsAchievementsOpen(false)}
        achievements={achievements}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <EasterEgg404Modal
        isOpen={is404Open}
        onClose={() => setIs404Open(false)}
      />

      {currentPrediction && (
        <ShareModal
          isOpen={isShareOpen}
          onClose={() => setIsShareOpen(false)}
          prediction={currentPrediction}
        />
      )}

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
