export type MoodType = 
  | 'Happy' 
  | 'Existing' 
  | 'Emotionally buffering' 
  | 'Unreasonably confident' 
  | 'Questionable decisions' 
  | 'No thoughts';

export type PhoneCheckOption = '0–5' | '6–20' | '21–50' | '51–100' | 'I have lost count';

export type DestinyChoice = 'Pizza' | 'Money' | 'Sleep' | 'Phone' | 'Gaming' | 'Juice';

export interface UserInput {
  name: string;
  birthday: string;
  zodiac: string;
  mood: MoodType;
  phoneChecks: PhoneCheckOption;
  destinyChoice: DestinyChoice;
}

export type UselessnessRank = 
  | 'Mildly Useful'
  | 'Questionable'
  | 'Mostly Pointless'
  | 'Impressively Useless'
  | 'Cosmic Garbage'
  | 'LEGENDARY USELESSNESS';

export interface PredictionResult {
  id: string;
  userInput: UserInput;
  mainPrediction: string;
  cosmicEnergy: {
    percentage: number;
    label: string;
  };
  luckyNumber: string | number;
  luckyColor: {
    name: string;
    hex: string;
  };
  luckyFood: string;
  careerPrediction: string;
  romancePrediction: string;
  financialPrediction: string;
  techPrediction: string;
  alienCompatibility: {
    percentage: number;
    verdict: string;
  };
  cosmicAccuracy: number; // 96.1% to 99.9%
  uselessnessScore: number; // e.g. 98.4
  uselessnessRank: UselessnessRank;
  uselessnessDescription: string;
  timestamp: number;
  isBananaMode?: boolean;
  isExtremeUseless?: boolean;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  username: string;
  uselessness: number;
  cosmicEnergy: string;
  prediction: string;
  timestamp: number;
  isUser?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: number;
}

export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  rewardPoints: number;
  completed: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type?: 'cosmic' | 'achievement' | 'easter-egg' | 'alert';
}
