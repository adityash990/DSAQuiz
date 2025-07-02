import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Home, CheckCircle, XCircle } from 'lucide-react';
import { Question } from '../types/quiz';
import { QuestionCard } from './QuestionCard';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface QuizReviewProps {
  questions: Question[];
  answers: (number | null)[];
  onBack: () => void;
}

export const QuizReview: React.FC<QuizReviewProps> = ({ questions, answers, onBack }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextQuestion = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1));
  };

  const prevQuestion = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const goToQuestion = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-4xl font-bold gradient-text-bw mb-4 mono">PERFORMANCE ANALYSIS</h1>
        <p className="text-gray-400 text-lg mono">ANALYZE EACH QUESTION TO IMPROVE UNDERSTANDING</p>
      </motion.div>

      {/* Question Navigation */}
      <GlassCard className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 text-center mono">QUESTION NAVIGATOR</h3>
        <div className="flex flex-wrap gap-3 justify-center">
          {questions.map((_, index) => {
            const isCorrect = answers[index] === questions[index]?.correct;
            const isAnswered = answers[index] !== null;
            
            return (
              <motion.button
                key={index}
                onClick={() => goToQuestion(index)}
                className={`w-12 h-12 rounded-xl border-2 font-bold transition-all duration-300 mono ${
                  index === currentIndex
                    ? 'bg-white text-black border-white scale-110 shadow-lg neon-glow-bw'
                    : !isAnswered
                    ? 'glass-bw border-white/20 text-gray-400 hover:border-white/30'
                    : isCorrect
                    ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white border-green-300 hover:scale-105 shadow-md'
                    : 'bg-gradient-to-r from-red-400 to-rose-500 text-white border-red-300 hover:scale-105 shadow-md'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: index === currentIndex ? 1.1 : 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: index === currentIndex ? 1.1 : 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {index + 1}
              </motion.button>
            );
          })}
        </div>
        
        {/* Legend */}
        <div className="flex justify-center space-x-6 mt-6 text-sm">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span className="text-gray-400 mono">CORRECT</span>
          </div>
          <div className="flex items-center space-x-2">
            <XCircle className="w-4 h-4 text-red-400" />
            <span className="text-gray-400 mono">INCORRECT</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-gray-600 rounded-full"></div>
            <span className="text-gray-400 mono">UNANSWERED</span>
          </div>
        </div>
      </GlassCard>

      {/* Current Question */}
      <QuestionCard
        question={questions[currentIndex]}
        selectedAnswer={answers[currentIndex]}
        onAnswerSelect={() => {}}
        onNext={() => {}}
        showResult={true}
        isReview={true}
        questionNumber={currentIndex + 1}
        totalQuestions={questions.length}
        timeLeft={0}
      />

      {/* Navigation Controls */}
      <GlassCard className="p-6">
        <div className="flex justify-between items-center">
          <motion.button
            onClick={prevQuestion}
            disabled={currentIndex === 0}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 mono ${
              currentIndex === 0
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 shadow-lg'
            }`}
            whileHover={currentIndex === 0 ? {} : { scale: 1.05 }}
            whileTap={currentIndex === 0 ? {} : { scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            PREVIOUS
          </motion.button>

          <div className="text-center">
            <div className="text-sm text-gray-400 mono">QUESTION</div>
            <div className="font-bold text-lg text-white mono">
              {currentIndex + 1} / {questions.length}
            </div>
          </div>

          <motion.button
            onClick={nextQuestion}
            disabled={currentIndex === questions.length - 1}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 mono ${
              currentIndex === questions.length - 1
                ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 shadow-lg'
            }`}
            whileHover={currentIndex === questions.length - 1 ? {} : { scale: 1.05 }}
            whileTap={currentIndex === questions.length - 1 ? {} : { scale: 0.95 }}
          >
            NEXT
            <ArrowRight className="w-4 h-4 ml-2" />
          </motion.button>
        </div>
      </GlassCard>

      {/* Back to Results */}
      <div className="text-center">
        <motion.button
          onClick={onBack}
          className="flex items-center justify-center mx-auto px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg neon-glow-bw mono"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Home className="w-5 h-5 mr-2" />
          BACK TO RESULTS
        </motion.button>
      </div>
    </motion.div>
  );
};