import { Achievement, DailyChallenge, LeaderboardEntry, PredictionResult } from '../types';
import { INITIAL_LEADERBOARD } from '../data/mockLeaderboard';

const STORAGE_KEYS = {
  PREDICTIONS: 'astro_prob_predictions',
  CURRENT_PREDICTION: 'astro_prob_current_result',
  LEADERBOARD: 'astro_prob_leaderboard',
  ACHIEVEMENTS: 'astro_prob_achievements',
  DAILY_CHALLENGE: 'astro_prob_daily_challenge',
  STATS: 'astro_prob_stats',
  MOON_POKES: 'astro_prob_moon_pokes',
  LOGO_CLICKS: 'astro_prob_logo_clicks',
  NONSENSE_MODE: 'astro_prob_nonsense_mode'
};

export const INITIAL_ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_prediction',
    title: 'First Prediction',
    description: 'Generate your first cosmic prediction.',
    icon: '🔮',
    unlocked: false
  },
  {
    id: 'professional_nonsense',
    title: 'Professional Nonsense',
    description: 'Generate 10 absurd predictions.',
    icon: '🤡',
    unlocked: false
  },
  {
    id: 'moon_harasser',
    title: 'Moon Harasser',
    description: 'Poke the decorative moon 5 times until it retaliates.',
    icon: '🌙',
    unlocked: false
  },
  {
    id: 'banana_prophet',
    title: 'Banana Prophet',
    description: 'Enter "banana" into the celestial database.',
    icon: '🍌',
    unlocked: false
  },
  {
    id: 'chronically_curious',
    title: 'Chronically Curious',
    description: 'Generate 25 predictions in search of meaning.',
    icon: '📱',
    unlocked: false
  },
  {
    id: 'beyond_useless',
    title: 'Beyond Useless',
    description: 'Receive a legendary 99.5+ uselessness score.',
    icon: '💀',
    unlocked: false
  },
  {
    id: 'alien_approved',
    title: 'Alien Approved',
    description: 'Score 95%+ extraterrestrial compatibility.',
    icon: '👽',
    unlocked: false
  },
  {
    id: 'cosmic_celebrity',
    title: 'Cosmic Celebrity',
    description: 'Submit your useless destiny to the leaderboard.',
    icon: '🏆',
    unlocked: false
  },
  {
    id: 'professional_clicker',
    title: 'Professional Clicker',
    description: 'Click the brand logo 10 times to discover nothing.',
    icon: '🖱️',
    unlocked: false
  },
  {
    id: 'cosmic_hacker',
    title: 'Cosmic Codebreaker',
    description: 'Trigger the Konami sequence for maximum nonsense.',
    icon: '👾',
    unlocked: false
  }
];

export function getStoredPredictions(): PredictionResult[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PREDICTIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function savePredictionToHistory(result: PredictionResult): void {
  try {
    const history = getStoredPredictions();
    const updated = [result, ...history.filter(p => p.id !== result.id)].slice(0, 30);
    localStorage.setItem(STORAGE_KEYS.PREDICTIONS, JSON.stringify(updated));
    localStorage.setItem(STORAGE_KEYS.CURRENT_PREDICTION, JSON.stringify(result));
    incrementStatsCounter();
  } catch (e) {
    console.error('Failed to save prediction', e);
  }
}

export function getCurrentPrediction(): PredictionResult | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CURRENT_PREDICTION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function getStoredLeaderboard(): LeaderboardEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.LEADERBOARD);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(INITIAL_LEADERBOARD));
      return INITIAL_LEADERBOARD;
    }
    return JSON.parse(raw);
  } catch {
    return INITIAL_LEADERBOARD;
  }
}

export function addLeaderboardEntry(entry: Omit<LeaderboardEntry, 'id' | 'rank' | 'timestamp'>): LeaderboardEntry[] {
  const current = getStoredLeaderboard();
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: 'user-' + Date.now(),
    rank: 1,
    timestamp: Date.now(),
    isUser: true
  };

  const combined = [newEntry, ...current];
  combined.sort((a, b) => b.uselessness - a.uselessness);

  const reRanked = combined.map((item, index) => ({
    ...item,
    rank: index + 1
  })).slice(0, 50);

  localStorage.setItem(STORAGE_KEYS.LEADERBOARD, JSON.stringify(reRanked));
  return reRanked;
}

export function getStoredAchievements(): Achievement[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(INITIAL_ACHIEVEMENTS));
      return INITIAL_ACHIEVEMENTS;
    }
    const saved: Achievement[] = JSON.parse(raw);
    return INITIAL_ACHIEVEMENTS.map(base => {
      const found = saved.find(s => s.id === base.id);
      return found ? { ...base, unlocked: found.unlocked, unlockedAt: found.unlockedAt } : base;
    });
  } catch {
    return INITIAL_ACHIEVEMENTS;
  }
}

export function unlockAchievement(id: string): { unlocked: boolean; achievement?: Achievement } {
  const list = getStoredAchievements();
  const target = list.find(a => a.id === id);
  if (!target || target.unlocked) return { unlocked: false };

  target.unlocked = true;
  target.unlockedAt = Date.now();
  localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(list));
  return { unlocked: true, achievement: target };
}

export function getDailyChallenge(): DailyChallenge {
  const todayKey = new Date().toISOString().slice(0, 10);
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.DAILY_CHALLENGE);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.date === todayKey) {
        return parsed.challenge;
      }
    }
  } catch {}

  // Challenges pool
  const challenges = [
    {
      id: 'daily_banana',
      title: 'The Yellow Destiny',
      description: 'Generate a prediction containing the word "banana" or trigger banana mode.',
      rewardPoints: 500,
      completed: false
    },
    {
      id: 'daily_uselessness',
      title: 'Pure Garbage Seeker',
      description: 'Receive a uselessness score above 98.5.',
      rewardPoints: 500,
      completed: false
    },
    {
      id: 'daily_alien',
      title: 'Extraterrestrial Diplomat',
      description: 'Achieve an Alien Compatibility of at least 80%.',
      rewardPoints: 500,
      completed: false
    },
    {
      id: 'daily_snack',
      title: 'Cosmic Munchies',
      description: 'Generate a lucky food that contains pizza, biscuit, or cheese.',
      rewardPoints: 500,
      completed: false
    }
  ];

  // Pick deterministically based on date string
  const hash = todayKey.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const selected = challenges[hash % challenges.length];

  localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify({
    date: todayKey,
    challenge: selected
  }));

  return selected;
}

export function completeDailyChallenge(): DailyChallenge {
  const current = getDailyChallenge();
  current.completed = true;
  const todayKey = new Date().toISOString().slice(0, 10);
  localStorage.setItem(STORAGE_KEYS.DAILY_CHALLENGE, JSON.stringify({
    date: todayKey,
    challenge: current
  }));
  return current;
}

export function getStatsCount(): number {
  try {
    const count = localStorage.getItem(STORAGE_KEYS.STATS);
    return count ? parseInt(count, 10) : 0;
  } catch {
    return 0;
  }
}

function incrementStatsCounter(): void {
  const current = getStatsCount();
  localStorage.setItem(STORAGE_KEYS.STATS, (current + 1).toString());
}
