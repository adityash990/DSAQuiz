import React, { useEffect, useState } from 'react';
import { CheckCircle, XCircle, Award, RotateCcw, Home, Trophy, Star, Target } from 'lucide-react';
import { Question } from '../types/quiz';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';
import { AnimatedCounter } from './AnimatedCounter';
import { CircularProgress } from './CircularProgress';
import Confetti from 'react-confetti';

interface QuizResultsProps {
  score: number;
  totalQuestions: number;
  questions: Question[];
  answers: (number | null)[];
  difficulty: string;
  onRestart: () => void;
  onReview: () => void;
  onHome: () => void;
}

export const QuizResults: React.FC<QuizResultsProps> = ({
  score,
  totalQuestions,
  questions,
  answers,
  difficulty,
  onRestart,
  onReview,
  onHome
}) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const percentage = (score / totalQuestions) * 100;
  
  useEffect(() => {
    if (percentage >= 80) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [percentage]);
  
  const getPerformanceData = () => {
    if (percentage >= 90) return { 
      message: "EXCEPTIONAL PERFORMANCE", 
      color: "text-green-400",
      bgColor: "from-green-400 to-emerald-500",
      icon: Trophy,
      grade: "A+",
      emoji: "🏆"
    };
    if (percentage >= 80) return { 
      message: "EXCELLENT EXECUTION", 
      color: "text-blue-400",
      bgColor: "from-blue-400 to-cyan-500",
      icon: Award,
      grade: "A",
      emoji: "🥇"
    };
    if (percentage >= 70) return { 
      message: "SOLID PERFORMANCE", 
      color: "text-yellow-400",
      bgColor: "from-yellow-400 to-orange-500",
      icon: Star,
      grade: "B",
      emoji: "🥈"
    };
    if (percentage >= 60) return { 
      message: "ADEQUATE RESULTS", 
      color: "text-orange-400",
      bgColor: "from-orange-400 to-red-500",
      icon: Target,
      grade: "C",
      emoji: "🥉"
    };
    return { 
      message: "REQUIRES IMPROVEMENT", 
      color: "text-red-400",
      bgColor: "from-red-400 to-rose-500",
      icon: Target,
      grade: "D",
      emoji: "📚"
    };
  };

  const performance = getPerformanceData();
  const IconComponent = performance.icon;

  const stats = [
    { label: "CORRECT", value: score, color: "text-green-400", icon: CheckCircle },
    { label: "TOTAL", value: totalQuestions, color: "text-blue-400", icon: Target },
    { label: "ACCURACY", value: `${percentage.toFixed(1)}%`, color: "text-white", icon: Star },
    { label: "GRADE", value: performance.grade, color: "text-yellow-400", icon: Award },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto space-y-8"
    >
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
        />
      )}

      {/* Header */}
      <motion.div
        className="text-center"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
      >
        <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r ${performance.bgColor} mb-6 shadow-2xl`}>
          <IconComponent className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-4xl font-bold text-white mb-4 mono">QUIZ COMPLETED</h2>
        <p className={`text-2xl font-semibold ${performance.color} mono`}>{performance.message}</p>
      </motion.div>

      {/* Main Score Display */}
      <GlassCard className="text-center p-8">
        <div className="flex items-center justify-center mb-8">
          <CircularProgress percentage={percentage} size={200} strokeWidth={12} color="#ffffff">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2 mono">
                <AnimatedCounter value={percentage} />%
              </div>
              <div className="text-lg text-gray-400 mono">ACCURACY</div>
            </div>
          </CircularProgress>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const StatIcon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="glass-bw rounded-xl p-4 mb-3">
                  <StatIcon className={`w-8 h-8 ${stat.color} mx-auto mb-2`} />
                  <div className="text-3xl font-bold text-white mono">
                    {typeof stat.value === 'number' ? (
                      <AnimatedCounter value={stat.value} />
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="text-sm text-gray-400 font-medium mono">{stat.label}</div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Difficulty Badge */}
        <motion.div
          className="inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white text-black font-semibold shadow-lg mono"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span>{performance.emoji}</span>
          <span>{difficulty.toUpperCase()} LEVEL COMPLETED</span>
        </motion.div>
      </GlassCard>

      {/* Question Summary */}
      <GlassCard>
        <h3 className="text-xl font-bold text-white mb-6 text-center mono">QUESTION ANALYSIS</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
          {answers.map((answer, index) => {
            const isCorrect = answer === questions[index]?.correct;
            const isAnswered = answer !== null;
            
            return (
              <motion.div
                key={index}
                className={`aspect-square rounded-lg border-2 flex items-center justify-center font-bold text-sm mono ${
                  !isAnswered
                    ? 'bg-gray-800 border-gray-600 text-gray-500'
                    : isCorrect
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 border-green-300 text-white shadow-lg'
                    : 'bg-gradient-to-r from-red-400 to-rose-500 border-red-300 text-white shadow-lg'
                }`}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ scale: 1.1 }}
              >
                {!isAnswered ? (
                  <span>-</span>
                ) : isCorrect ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <XCircle className="w-4 h-4" />
                )}
              </motion.div>
            );
          })}
        </div>
      </GlassCard>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col sm:flex-row gap-4 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={onReview}
          className="flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold shadow-lg mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <CheckCircle className="w-5 h-5 mr-2" />
          REVIEW ANSWERS
        </motion.button>
        
        <motion.button
          onClick={onRestart}
          className="flex items-center justify-center px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg neon-glow-bw mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <RotateCcw className="w-5 h-5 mr-2" />
          TRY AGAIN
        </motion.button>
        
        <motion.button
          onClick={onHome}
          className="flex items-center justify-center px-8 py-4 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold shadow-lg mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home className="w-5 h-5 mr-2" />
          HOME
        </motion.button>
      </motion.div>
    </motion.div>
  );
};