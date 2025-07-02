import React from 'react';
import { Trophy, Medal, Award, User, Crown, Star, Zap } from 'lucide-react';
import { LeaderboardEntry } from '../types/quiz';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentScore?: number;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ entries, currentScore }) => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return { icon: Crown, color: "text-yellow-400", bg: "bg-gradient-to-r from-yellow-400 to-orange-500" };
      case 2: return { icon: Trophy, color: "text-gray-300", bg: "bg-gradient-to-r from-gray-300 to-gray-500" };
      case 3: return { icon: Medal, color: "text-orange-400", bg: "bg-gradient-to-r from-orange-400 to-red-500" };
      default: return { icon: Star, color: "text-white", bg: "bg-gradient-to-r from-gray-600 to-gray-800" };
    }
  };

  const getRankStyle = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-400/30 shadow-xl shadow-yellow-500/10';
      case 2: return 'bg-gradient-to-r from-gray-900/20 to-slate-900/20 border-gray-400/30 shadow-xl shadow-gray-500/10';
      case 3: return 'bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-400/30 shadow-xl shadow-orange-500/10';
      default: return 'glass-bw border-white/10';
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    const styles = {
      easy: 'bg-gradient-to-r from-green-400 to-emerald-500 text-white',
      medium: 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white',
      hard: 'bg-gradient-to-r from-red-400 to-rose-500 text-white'
    };
    return styles[difficulty as keyof typeof styles] || 'bg-gradient-to-r from-gray-400 to-slate-500 text-white';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="max-w-4xl mx-auto p-8" hover={false}>
        <div className="text-center mb-8">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full mb-4 shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <Trophy className="w-8 h-8 text-black" />
          </motion.div>
          <h2 className="text-3xl font-bold gradient-text-bw mb-2 mono">GLOBAL LEADERBOARD</h2>
          <p className="text-gray-400 mono">TOP PERFORMERS IN DSA QUIZ MASTER</p>
        </div>

        {entries.length === 0 ? (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <User className="w-20 h-20 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mono">NO SCORES RECORDED. BE THE FIRST TO COMPLETE A QUIZ!</p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {entries.map((entry, index) => {
              const rank = index + 1;
              const rankData = getRankIcon(rank);
              const RankIcon = rankData.icon;
              const isCurrentScore = currentScore !== undefined && entry.score === currentScore;
              
              return (
                <motion.div
                  key={`${entry.name}-${entry.timestamp}`}
                  className={`p-6 rounded-2xl border-2 transition-all duration-300 ${getRankStyle(rank)} ${
                    isCurrentScore ? 'ring-4 ring-white/20 scale-105' : ''
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: isCurrentScore ? 1.05 : 1.02 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      {/* Rank Badge */}
                      <div className="relative">
                        <div className={`w-14 h-14 rounded-full ${rankData.bg} flex items-center justify-center shadow-lg`}>
                          <RankIcon className="w-7 h-7 text-white" />
                        </div>
                        {rank <= 3 && (
                          <motion.div
                            className="absolute -top-1 -right-1 w-6 h-6 bg-black rounded-full flex items-center justify-center shadow-md border border-white/20"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            <span className="text-xs font-bold text-white mono">#{rank}</span>
                          </motion.div>
                        )}
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-white mono">{entry.name}</h3>
                          {isCurrentScore && (
                            <motion.span
                              className="px-3 py-1 text-xs bg-white text-black rounded-full font-medium mono"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.3 }}
                            >
                              <Zap className="w-3 h-3 inline mr-1" />
                              YOU
                            </motion.span>
                          )}
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`px-3 py-1 text-xs rounded-full font-medium shadow-md mono ${getDifficultyBadge(entry.difficulty)}`}>
                            {entry.difficulty.toUpperCase()}
                          </span>
                          <span className="text-sm text-gray-400 font-medium mono">
                            {new Date(entry.timestamp).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Score */}
                    <div className="text-right">
                      <motion.div
                        className="text-3xl font-bold text-white mb-1 mono"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                      >
                        {entry.score}
                      </motion.div>
                      <div className="text-sm text-gray-400 font-medium mono">
                        {entry.percentage.toFixed(1)}% ACCURACY
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </GlassCard>
    </motion.div>
  );
};