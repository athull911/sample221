import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, RotateCcw, Share2, Brain, Trophy, Zap, 
  Compass, Heart, DollarSign, Smartphone, Utensils, Palette, 
  Hash, Briefcase, HelpCircle, CheckCircle2, ChevronDown
} from 'lucide-react';
import { PredictionResult } from '../types';

interface PredictionResultViewProps {
  prediction: PredictionResult;
  onPredictAgain: () => void;
  onShare: () => void;
  onMakeMoreUseless: () => void;
  onSubmitLeaderboard: () => void;
}

export const PredictionResultView: React.FC<PredictionResultViewProps> = ({
  prediction,
  onPredictAgain,
  onShare,
  onMakeMoreUseless,
  onSubmitLeaderboard
}) => {
  const [shake, setShake] = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  const handleMakeWorse = () => {
    triggerShake();
    onMakeMoreUseless();
  };

  // Circular accuracy meter math
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  // Map 96%-100% to fill stroke for dramatic look
  const strokeDashoffset = circumference - (prediction.cosmicAccuracy / 100) * circumference;

  return (
    <section className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 transition-transform ${shake ? 'animate-wiggle' : ''}`}>
      {/* Top Banner Notice */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl glass-panel border-purple-500/30 mb-8"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-400/30 flex items-center justify-center text-xl">
            🔮
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white font-display">
              COSMIC DOSSIER FOR <span className="text-purple-300 uppercase">{prediction.userInput.name}</span>
            </h2>
            <p className="text-xs text-slate-400 font-mono-cosmic">
              Zodiac: {prediction.userInput.zodiac} • Mood: {prediction.userInput.mood} • Destiny: {prediction.userInput.destinyChoice}
            </p>
          </div>
        </div>

        {/* Uselessness Score Badge */}
        <div className="flex items-center gap-2.5 px-4 py-2 bg-slate-900/90 border border-rose-500/40 rounded-xl">
          <span className="text-xl">🗑️</span>
          <div>
            <div className="text-[10px] text-slate-400 font-mono-cosmic uppercase">Uselessness Score</div>
            <div className="text-sm font-bold text-rose-300 font-mono-cosmic">
              {prediction.uselessnessScore.toFixed(1)} / 100
            </div>
          </div>
        </div>
      </motion.div>

      {/* Hero Prediction: TODAY'S EXTREMELY ACCURATE PREDICTION */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative rounded-3xl p-6 sm:p-10 glass-panel border-purple-500/40 bg-gradient-to-br from-slate-900/90 via-[#101432]/95 to-slate-950/90 shadow-2xl shadow-purple-950/60 mb-8 overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-200 text-xs font-mono-cosmic">
              <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
              <span>TODAY'S EXTREMELY ACCURATE PREDICTION</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
              "{prediction.mainPrediction}"
            </h1>

            <p className="text-xs sm:text-sm text-slate-400 font-mono-cosmic italic">
              {prediction.uselessnessDescription}
            </p>
          </div>

          {/* Large Animated Accuracy Meter */}
          <div className="flex flex-col items-center justify-center p-4 bg-slate-950/70 border border-white/10 rounded-2xl shrink-0 w-52 sm:w-60 text-center shadow-lg">
            <span className="text-[11px] font-mono-cosmic text-purple-300 font-semibold tracking-wider uppercase mb-1">
              COSMIC ACCURACY
            </span>

            {/* Circular Gauge */}
            <div className="relative w-28 h-28 my-1 flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 110 110">
                {/* Background Track */}
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="stroke-slate-800"
                  strokeWidth="8"
                  fill="transparent"
                />
                {/* Animated Fill Track */}
                <circle
                  cx="55"
                  cy="55"
                  r={radius}
                  className="stroke-purple-500 transition-all duration-1000 ease-out"
                  strokeWidth="8"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl sm:text-2xl font-black font-mono-cosmic text-white">
                  {prediction.cosmicAccuracy.toFixed(1)}%
                </span>
              </div>
            </div>

            <p className="text-[10px] text-slate-400 font-mono-cosmic mt-1 leading-tight">
              “We have no idea how we calculated this.”
            </p>
          </div>
        </div>
      </motion.div>

      {/* Grid of Absurd Prediction Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* Card 1: Cosmic Energy */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>🌟 Cosmic Energy</span>
          </div>
          <div className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-purple-300 transition-colors">
            {prediction.cosmicEnergy.percentage}% {prediction.cosmicEnergy.label}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono-cosmic">
            Current celestial wattage output is surprisingly unstable.
          </p>
        </div>

        {/* Card 2: Lucky Number */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Hash className="w-4 h-4 text-emerald-400" />
            <span>🍀 Lucky Number</span>
          </div>
          <div className="text-2xl sm:text-3xl font-black font-mono-cosmic text-emerald-300 group-hover:scale-105 transition-transform origin-left">
            {prediction.luckyNumber}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono-cosmic">
            Use this in a lottery only if you enjoy losing money.
          </p>
        </div>

        {/* Card 3: Lucky Color */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Palette className="w-4 h-4 text-pink-400" />
            <span>🎨 Lucky Color</span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="w-5 h-5 rounded-full border border-white/20 shadow-md shrink-0"
              style={{ backgroundColor: prediction.luckyColor.hex }}
            />
            <span className="text-lg sm:text-xl font-bold font-display text-white">
              {prediction.luckyColor.name}
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono-cosmic">
            Hex: <code className="text-slate-300">{prediction.luckyColor.hex}</code>
          </p>
        </div>

        {/* Card 4: Lucky Food */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            <span>🍕 Lucky Food</span>
          </div>
          <div className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
            {prediction.luckyFood}
          </div>
          <p className="text-xs text-slate-400 mt-1 font-mono-cosmic">
            Nutritional value: theoretically questionable.
          </p>
        </div>

        {/* Card 5: Career Prediction */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Briefcase className="w-4 h-4 text-cyan-400" />
            <span>💼 Career Prediction</span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            {prediction.careerPrediction}
          </p>
        </div>

        {/* Card 6: Romance Prediction */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <span>❤️ Romance Prediction</span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            {prediction.romancePrediction}
          </p>
        </div>

        {/* Card 7: Financial Prediction */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <DollarSign className="w-4 h-4 text-emerald-400" />
            <span>💰 Financial Prediction</span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            {prediction.financialPrediction}
          </p>
        </div>

        {/* Card 8: Technology Prediction */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <Smartphone className="w-4 h-4 text-indigo-400" />
            <span>📱 Technology Prediction</span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            {prediction.techPrediction}
          </p>
        </div>

        {/* Card 9: Alien Compatibility */}
        <div className="rounded-2xl glass-panel p-5 border-slate-800 hover:border-purple-500/40 transition group">
          <div className="flex items-center gap-2.5 text-xs font-mono-cosmic text-purple-400 uppercase tracking-wider mb-2">
            <span className="text-base">👽</span>
            <span>Alien Compatibility: {prediction.alienCompatibility.percentage}%</span>
          </div>
          <p className="text-sm font-medium text-slate-200 leading-relaxed">
            “{prediction.alienCompatibility.verdict}”
          </p>
        </div>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 p-6 glass-panel rounded-2xl border-purple-500/20">
        <button
          onClick={onPredictAgain}
          id="btn-predict-again"
          className="px-5 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs tracking-wider font-display flex items-center gap-2 shadow-lg shadow-purple-950 cursor-pointer hover:scale-105 active:scale-95 transition"
        >
          <RotateCcw className="w-4 h-4" />
          <span>PREDICT AGAIN</span>
        </button>

        <button
          onClick={onShare}
          id="btn-share-destiny"
          className="px-5 py-3 rounded-xl glass-panel glass-panel-hover text-white font-bold text-xs tracking-wider font-display border border-purple-500/40 flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition"
        >
          <Share2 className="w-4 h-4 text-purple-300" />
          <span>SHARE MY DESTINY</span>
        </button>

        <button
          onClick={handleMakeWorse}
          id="btn-make-more-useless"
          className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 border border-amber-500/40 font-bold text-xs tracking-wider font-display flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition"
        >
          <Brain className="w-4 h-4 text-amber-400" />
          <span>MAKE IT EVEN MORE USELESS</span>
        </button>

        <button
          onClick={onSubmitLeaderboard}
          id="btn-submit-leaderboard"
          className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-500 hover:to-yellow-500 text-white font-bold text-xs tracking-wider font-display flex items-center gap-2 shadow-lg shadow-amber-950 cursor-pointer hover:scale-105 active:scale-95 transition"
        >
          <Trophy className="w-4 h-4" />
          <span>SUBMIT TO LEADERBOARD</span>
        </button>
      </div>
    </section>
  );
};
