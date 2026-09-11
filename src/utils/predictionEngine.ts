import { PredictionResult, UserInput, UselessnessRank } from '../types';
import {
  ALIEN_COMPATIBILITY,
  CAREER_PREDICTIONS,
  COSMIC_ENERGIES,
  FINANCIAL_PREDICTIONS,
  LUCKY_COLORS,
  LUCKY_FOODS,
  LUCKY_NUMBERS,
  MAIN_PREDICTIONS,
  MORE_USELESS_PREDICTIONS,
  ROMANCE_PREDICTIONS,
  TECH_PREDICTIONS
} from '../data/predictionData';

function getRandomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomNumber(min: number, max: number, decimals: number = 1): number {
  const factor = Math.pow(10, decimals);
  return Math.round((Math.random() * (max - min) + min) * factor) / factor;
}

export function calculateUselessnessRank(score: number): { rank: UselessnessRank; desc: string } {
  if (score < 21) {
    return {
      rank: 'Mildly Useful',
      desc: 'Alarming. A tiny fraction of this prediction might accidentally apply to your day.'
    };
  }
  if (score < 41) {
    return {
      rank: 'Questionable',
      desc: 'The celestial bodies attempted thought, but got distracted by a shiny satellite.'
    };
  }
  if (score < 61) {
    return {
      rank: 'Mostly Pointless',
      desc: 'Congratulations. Reading this burned approximately 0.04 calories.'
    };
  }
  if (score < 81) {
    return {
      rank: 'Impressively Useless',
      desc: 'A masterclass in astronomical irrelevance. Your ancestors are utterly indifferent.'
    };
  }
  if (score < 96) {
    return {
      rank: 'Cosmic Garbage',
      desc: 'Pure stellar detritus. Scientists at NASA have formally requested you disregard this.'
    };
  }
  return {
    rank: 'LEGENDARY USELESSNESS',
    desc: 'Congratulations. This prediction will have absolutely no impact on your life.'
  };
}

export function generatePrediction(userInput: UserInput, makeWorse: boolean = false): PredictionResult {
  const cleanName = userInput.name.trim().toLowerCase();
  const isBananaMode = cleanName === 'banana';

  if (isBananaMode) {
    const uselessScore = 100;
    const { rank, desc } = calculateUselessnessRank(uselessScore);
    return {
      id: 'pred-' + Date.now(),
      userInput,
      mainPrediction: '🍌 BANANA DESTINY ACTIVATED: You will slip on the metaphorical peel of destiny, but recover with unmatched cosmic flair.',
      cosmicEnergy: {
        percentage: 100,
        label: 'potassium-enriched chaos'
      },
      luckyNumber: 7,
      luckyColor: {
        name: 'Banana Yellow',
        hex: '#FACC15'
      },
      luckyFood: 'Fresh Banana (or heavily frosted Banana Bread)',
      careerPrediction: 'You have been appointed Senior Banana Consultant & Peel Risk Strategist.',
      romancePrediction: 'Bananas are high in potassium. You are high in sarcasm. A match engineered by the stars.',
      financialPrediction: 'Invest heavily in yellow curved produce. Your portfolio will ripen in 4-6 business days.',
      techPrediction: 'You will inadvertently type "banana" in a search bar while looking for your bank login.',
      alienCompatibility: {
        percentage: 100,
        verdict: 'The aliens find your yellow aura irresistible and wish to share fruit smoothies.'
      },
      cosmicAccuracy: 99.9,
      uselessnessScore: uselessScore,
      uselessnessRank: rank,
      uselessnessDescription: desc,
      timestamp: Date.now(),
      isBananaMode: true
    };
  }

  // Regular or Extra-Useless Generation
  let mainPrediction = getRandomItem(MAIN_PREDICTIONS);
  let uselessScore = getRandomNumber(96.2, 99.9, 1);

  if (makeWorse) {
    mainPrediction = getRandomItem(MORE_USELESS_PREDICTIONS);
    uselessScore = getRandomNumber(99.4, 100.0, 1);
  }

  // Ensure accuracy is strictly between 96.1% and 99.9%
  const cosmicAccuracy = getRandomNumber(96.1, 99.9, 1);
  const cosmicEnergy = getRandomItem(COSMIC_ENERGIES);
  const luckyNumber = getRandomItem(LUCKY_NUMBERS);
  const luckyColor = getRandomItem(LUCKY_COLORS);
  const luckyFood = getRandomItem(LUCKY_FOODS);
  const careerPrediction = getRandomItem(CAREER_PREDICTIONS);
  const romancePrediction = getRandomItem(ROMANCE_PREDICTIONS);
  const financialPrediction = getRandomItem(FINANCIAL_PREDICTIONS);
  const techPrediction = getRandomItem(TECH_PREDICTIONS);
  const alienCompatibility = getRandomItem(ALIEN_COMPATIBILITY);

  const { rank, desc } = calculateUselessnessRank(uselessScore);

  return {
    id: 'pred-' + Date.now(),
    userInput,
    mainPrediction,
    cosmicEnergy,
    luckyNumber,
    luckyColor,
    luckyFood,
    careerPrediction,
    romancePrediction,
    financialPrediction,
    techPrediction,
    alienCompatibility,
    cosmicAccuracy,
    uselessnessScore: uselessScore,
    uselessnessRank: rank,
    uselessnessDescription: desc,
    timestamp: Date.now(),
    isExtremeUseless: makeWorse
  };
}
