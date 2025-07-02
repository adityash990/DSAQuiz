import React, { useState } from 'react';
import { Question } from '../types/quiz';
import { CheckCircle, XCircle, Clock, Brain, Lightbulb, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (answer: number) => void;
  onNext: () => void;
  showResult?: boolean;
  isReview?: boolean;
  questionNumber: number;
  totalQuestions: number;
  timeLeft: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  showResult = false,
  isReview = false,
  questionNumber,
  totalQuestions,
  timeLeft
}) => {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'from-green-400 to-emerald-500';
      case 'medium': return 'from-yellow-400 to-orange-500';
      case 'hard': return 'from-red-400 to-rose-500';
      default: return 'from-gray-400 to-slate-500';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult && !isReview) {
      if (selectedAnswer === index) {
        return 'bg-white text-black border-white shadow-lg neon-glow-bw';
      }
      if (hoveredOption === index) {
        return 'bg-white/10 border-white/30 text-white';
      }
      return 'glass-bw border-white/10 text-gray-300 hover:border-white/30';
    }

    if (index === question.correct) {
      return 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-400 shadow-lg';
    }

    if (selectedAnswer === index && index !== question.correct) {
      return 'bg-gradient-to-r from-red-500 to-rose-500 text-white border-red-400 shadow-lg';
    }

    return 'glass-bw border-white/10 text-gray-500';
  };

  const canProceed = selectedAnswer !== null || timeLeft === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-4xl mx-auto"
    >
      <GlassCard className="p-8" hover={false}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <motion.div
              className="flex items-center space-x-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Brain className="w-6 h-6 text-white" />
              <span className="text-lg font-semibold text-gray-300 mono">
                Question {questionNumber} of {totalQuestions}
              </span>
            </motion.div>
            
            <motion.div
              className={`px-4 py-2 rounded-full bg-gradient-to-r ${getDifficultyColor(question.difficulty)} text-white font-medium text-sm shadow-lg mono`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {getDifficultyIcon(question.difficulty)} {question.difficulty.toUpperCase()}
            </motion.div>
          </div>
          
          <motion.div
            className="text-sm text-gray-400 bg-black/30 px-3 py-1 rounded-full mono border border-white/10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {question.category}
          </motion.div>
        </div>

        {/* Progress Bar */}
        <motion.div
          className="w-full bg-gray-800 rounded-full h-2 mb-8 overflow-hidden border border-white/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-white via-gray-300 to-white rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </motion.div>

        {/* Question */}
        <motion.h2
          className="text-2xl font-bold text-white mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          {question.question}
        </motion.h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => !showResult && !isReview && onAnswerSelect(index)}
              disabled={showResult || isReview}
              onMouseEnter={() => setHoveredOption(index)}
              onMouseLeave={() => setHoveredOption(null)}
              className={`w-full p-6 rounded-xl border-2 text-left transition-all duration-300 transform ${getOptionStyle(index)}`}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: showResult || isReview ? 1 : 1.02 }}
              whileTap={{ scale: showResult || isReview ? 1 : 0.98 }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm mono ${
                    selectedAnswer === index || (showResult && index === question.correct)
                      ? 'bg-black/20 text-white'
                      : 'bg-white/10 text-gray-400'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="font-medium text-lg">{option}</span>
                </div>
                
                <AnimatePresence>
                  {(showResult || isReview) && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ duration: 0.3 }}
                    >
                      {index === question.correct ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : selectedAnswer === index ? (
                        <XCircle className="w-6 h-6 text-white" />
                      ) : null}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Next Button */}
        {!showResult && !isReview && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <motion.button
              onClick={onNext}
              disabled={!canProceed}
              className={`flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-300 mono ${
                canProceed
                  ? 'bg-white text-black hover:bg-gray-200 shadow-lg neon-glow-bw'
                  : 'bg-gray-700 text-gray-400 cursor-not-allowed'
              }`}
              whileHover={canProceed ? { scale: 1.05 } : {}}
              whileTap={canProceed ? { scale: 0.95 } : {}}
            >
              Next Question
              <ArrowRight className="w-5 h-5 ml-2" />
            </motion.button>
          </motion.div>
        )}

        {/* Explanation */}
        <AnimatePresence>
          {(showResult || isReview) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
              className="glass-dark rounded-xl p-6 border border-white/10 mt-6"
            >
              <div className="flex items-start space-x-3">
                <Lightbulb className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-white mb-2 mono">EXPLANATION:</h4>
                  <p className="text-gray-300 leading-relaxed">{question.explanation}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  );
};