import React, { useEffect, useState } from 'react';
import { Clock, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CircularProgress } from './CircularProgress';

interface QuizTimerProps {
  timeLeft: number;
  maxTime: number;
  onTimeUp: () => void;
  isActive: boolean;
}

export const QuizTimer: React.FC<QuizTimerProps> = ({ timeLeft, maxTime, onTimeUp, isActive }) => {
  const [animationKey, setAnimationKey] = useState(0);
  const [isUrgent, setIsUrgent] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0 && isActive) {
      onTimeUp();
    }
  }, [timeLeft, isActive, onTimeUp]);

  useEffect(() => {
    setAnimationKey(prev => prev + 1);
  }, [maxTime]);

  useEffect(() => {
    setIsUrgent(timeLeft <= 10);
  }, [timeLeft]);

  const percentage = (timeLeft / maxTime) * 100;
  const getColor = () => {
    if (percentage <= 25) return "#EF4444";
    if (percentage <= 50) return "#F59E0B";
    return "#ffffff";
  };

  return (
    <motion.div 
      className="flex items-center justify-center mb-8"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <CircularProgress
          percentage={percentage}
          size={140}
          strokeWidth={12}
          color={getColor()}
        >
          <div className="text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={timeLeft}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`text-3xl font-bold mono ${
                  isUrgent ? 'text-red-400' : 'text-white'
                }`}
              >
                {timeLeft}
              </motion.div>
            </AnimatePresence>
            <div className="text-sm text-gray-400 font-medium mono">SECONDS</div>
          </div>
        </CircularProgress>
        
        {isUrgent && (
          <motion.div
            className="absolute -top-2 -right-2"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 0.5, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <div className="bg-red-500 text-white p-2 rounded-full">
              <Zap className="w-4 h-4" />
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};