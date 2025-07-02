import React, { useState } from 'react';
import { Brain, Play, Trophy, Settings, ArrowLeft, ArrowRight, Home, Target, Zap, Code } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster, toast } from 'react-hot-toast';
import { useQuiz } from './hooks/useQuiz';
import { QuestionCard } from './components/QuestionCard';
import { QuizTimer } from './components/QuizTimer';
import { QuizResults } from './components/QuizResults';
import { QuizReview } from './components/QuizReview';
import { Leaderboard } from './components/Leaderboard';
import { ParticleBackground } from './components/ParticleBackground';
import { GlassCard } from './components/GlassCard';
import { FeatureModal } from './components/FeatureModal';

type AppState = 'home' | 'quiz' | 'results' | 'review' | 'leaderboard';

function App() {
  const [appState, setAppState] = useState<AppState>('home');
  const [selectedDifficulty, setSelectedDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
  const [questionCount, setQuestionCount] = useState(10);
  const [modalFeature, setModalFeature] = useState<'adaptive' | 'feedback' | 'leaderboard' | null>(null);
  
  const {
    quizState,
    leaderboard,
    playerName,
    setPlayerName,
    startQuiz,
    selectAnswer,
    nextQuestion,
    previousQuestion,
    submitQuiz,
    resetQuiz,
    timeUp,
    canGoBack
  } = useQuiz();

  const handleStartQuiz = () => {
    if (playerName.trim()) {
      startQuiz(selectedDifficulty, questionCount);
      setAppState('quiz');
      toast.success(`${selectedDifficulty.toUpperCase()} quiz started! 🚀`, {
        style: { background: '#000', color: '#fff', border: '1px solid #333' }
      });
    } else {
      toast.error('Please enter your name to start the quiz', {
        style: { background: '#000', color: '#fff', border: '1px solid #333' }
      });
    }
  };

  const handleQuizComplete = () => {
    submitQuiz();
    setAppState('results');
  };

  const handleRestart = () => {
    resetQuiz();
    setAppState('home');
    toast.success('Ready for another challenge? 💪', {
      style: { background: '#000', color: '#fff', border: '1px solid #333' }
    });
  };

  const handleReview = () => {
    setAppState('review');
  };

  const handleHome = () => {
    resetQuiz();
    setAppState('home');
  };

  const handleAnswerSelect = (answerIndex: number) => {
    selectAnswer(answerIndex);
    toast.success('Answer selected! ✨', {
      style: { background: '#000', color: '#fff', border: '1px solid #333' }
    });
  };

  const handleNextQuestion = () => {
    nextQuestion();
  };

  // Auto-complete quiz when finished
  React.useEffect(() => {
    if (quizState.isCompleted && appState === 'quiz') {
      handleQuizComplete();
    }
  }, [quizState.isCompleted, appState]);

  const difficultyConfig = {
    easy: { 
      color: 'from-green-400 to-emerald-500', 
      icon: '🟢', 
      description: 'Perfect for beginners',
      questions: '5-10 questions'
    },
    medium: { 
      color: 'from-yellow-400 to-orange-500', 
      icon: '🟡', 
      description: 'Intermediate level',
      questions: '10-15 questions'
    },
    hard: { 
      color: 'from-red-400 to-rose-500', 
      icon: '🔴', 
      description: 'Expert challenge',
      questions: '15+ questions'
    }
  };

  const renderHome = () => (
    <motion.div
      className="max-w-6xl mx-auto space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div
        className="text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, type: "spring" }}
      >
        <div className="flex items-center justify-center mb-8">
          <motion.div
            className="relative"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            <Brain className="w-20 h-20 text-white mr-6" />
            <motion.div
              className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Code className="w-3 h-3 text-black" />
            </motion.div>
          </motion.div>
          <div>
            <h1 className="text-6xl font-black gradient-text-bw mb-4 mono">
              DSA QUIZ MASTER
            </h1>
            <div className="flex items-center justify-center space-x-2 text-gray-400">
              <Zap className="w-5 h-5" />
              <span className="text-lg font-semibold mono">ENTERPRISE EDITION</span>
              <Zap className="w-5 h-5" />
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
          Master Data Structures and Algorithms with our enterprise-grade quiz platform. 
          Built with Python, C++, and SQL for maximum performance and scalability.
        </p>
      </motion.div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {[
          { 
            icon: Target, 
            title: "Adaptive Learning", 
            desc: "AI-powered difficulty adjustment using machine learning algorithms",
            feature: 'adaptive' as const
          },
          { 
            icon: Zap, 
            title: "Real-time Feedback", 
            desc: "Instant analysis with C++ performance optimization",
            feature: 'feedback' as const
          },
          { 
            icon: Trophy, 
            title: "Global Leaderboard", 
            desc: "SQL-powered rankings with advanced analytics",
            feature: 'leaderboard' as const
          }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.1 }}
          >
            <GlassCard 
              className="text-center p-6" 
              hover 
              delay={index * 0.1}
              onClick={() => setModalFeature(feature.feature)}
            >
              <feature.icon className="w-12 h-12 text-white mx-auto mb-4" />
              <h3 className="text-lg font-bold text-white mb-2 mono">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
              <div className="mt-4 text-xs text-gray-500 mono">Click to explore →</div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Quiz Setup */}
      <GlassCard className="p-8 max-w-2xl mx-auto">
        <motion.h2
          className="text-3xl font-bold text-center gradient-text-bw mb-8 mono"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5 }}
        >
          INITIALIZE CHALLENGE
        </motion.h2>
        
        <div className="space-y-8">
          {/* Player Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <label className="block text-sm font-semibold text-gray-400 mb-3 mono">
              PLAYER IDENTIFIER
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full px-6 py-4 glass-bw rounded-xl border border-white/20 focus:ring-4 focus:ring-white/20 focus:border-white/40 transition-all duration-300 text-white placeholder-gray-500 mono bg-black/20"
              placeholder="Enter your name to begin..."
            />
          </motion.div>

          {/* Difficulty Selection */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <label className="block text-sm font-semibold text-gray-400 mb-4 mono">
              SELECT DIFFICULTY LEVEL
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {(Object.keys(difficultyConfig) as Array<keyof typeof difficultyConfig>).map((difficulty) => {
                const config = difficultyConfig[difficulty];
                return (
                  <motion.button
                    key={difficulty}
                    onClick={() => setSelectedDifficulty(difficulty)}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 mono ${
                      selectedDifficulty === difficulty
                        ? `bg-gradient-to-r ${config.color} text-white border-transparent shadow-xl scale-105 neon-glow-bw`
                        : 'glass-bw border-white/20 text-gray-300 hover:border-white/30 hover:scale-102'
                    }`}
                    whileHover={{ scale: selectedDifficulty === difficulty ? 1.05 : 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-2xl mb-2">{config.icon}</div>
                    <div className="font-bold text-lg uppercase">{difficulty}</div>
                    <div className="text-sm opacity-90 mb-1">{config.description}</div>
                    <div className="text-xs opacity-75">{config.questions}</div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Question Count */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
          >
            <label className="block text-sm font-semibold text-gray-400 mb-3 mono">
              QUESTION COUNT: <span className="text-white font-bold">{questionCount}</span>
            </label>
            <div className="relative">
              <input
                type="range"
                min="5"
                max="15"
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full h-3 bg-gradient-to-r from-gray-800 to-gray-600 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2 mono">
                <span>5 questions</span>
                <span>15 questions</span>
              </div>
            </div>
          </motion.div>

          {/* Start Button */}
          <motion.button
            onClick={handleStartQuiz}
            disabled={!playerName.trim()}
            className={`w-full py-6 rounded-xl font-bold text-lg transition-all duration-300 mono ${
              playerName.trim()
                ? 'bg-white text-black hover:bg-gray-200 shadow-xl hover:shadow-2xl transform hover:scale-105 neon-glow-bw'
                : 'bg-gray-700 text-gray-500 cursor-not-allowed'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            whileHover={playerName.trim() ? { scale: 1.05 } : {}}
            whileTap={playerName.trim() ? { scale: 0.95 } : {}}
          >
            <Play className="w-6 h-6 inline mr-3" />
            INITIALIZE QUIZ SEQUENCE
          </motion.button>
        </div>
      </GlassCard>

      {/* Navigation */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          onClick={() => setAppState('leaderboard')}
          className="flex items-center px-8 py-4 bg-white text-black rounded-xl hover:bg-gray-200 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl mono neon-glow-bw"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Trophy className="w-5 h-5 mr-2" />
          VIEW LEADERBOARD
        </motion.button>
      </motion.div>
    </motion.div>
  );

  const renderQuiz = () => (
    <motion.div
      className="max-w-4xl mx-auto space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${difficultyConfig[selectedDifficulty].color} text-white font-bold mono`}>
              {difficultyConfig[selectedDifficulty].icon} {selectedDifficulty.toUpperCase()} QUIZ
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-400 mono">PLAYER</div>
            <div className="font-semibold text-white mono">{playerName}</div>
          </div>
        </div>
      </GlassCard>

      {/* Timer */}
      <QuizTimer
        timeLeft={quizState.timeLeft}
        maxTime={30}
        onTimeUp={timeUp}
        isActive={quizState.isActive}
      />

      {/* Question */}
      <QuestionCard
        question={quizState.questions[quizState.currentQuestionIndex]}
        selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
        onAnswerSelect={handleAnswerSelect}
        onNext={handleNextQuestion}
        questionNumber={quizState.currentQuestionIndex + 1}
        totalQuestions={quizState.questions.length}
        timeLeft={quizState.timeLeft}
      />

      {/* Navigation */}
      <GlassCard className="p-6" hover={false}>
        <div className="flex justify-between items-center">
          <motion.button
            onClick={previousQuestion}
            disabled={!canGoBack}
            className={`flex items-center px-6 py-3 rounded-xl font-semibold transition-all duration-300 mono ${
              canGoBack
                ? 'bg-white/10 text-white hover:bg-white/20 shadow-lg'
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
            whileHover={canGoBack ? { scale: 1.05 } : {}}
            whileTap={canGoBack ? { scale: 0.95 } : {}}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            PREVIOUS
          </motion.button>

          <div className="text-center">
            <div className="text-sm text-gray-400 mono">PROGRESS</div>
            <div className="font-semibold text-white mono">
              {quizState.currentQuestionIndex + 1} / {quizState.questions.length}
            </div>
          </div>

          <div className="w-24"></div> {/* Spacer for alignment */}
        </div>
      </GlassCard>
    </motion.div>
  );

  const renderResults = () => (
    <QuizResults
      score={quizState.score}
      totalQuestions={quizState.questions.length}
      questions={quizState.questions}
      answers={quizState.answers}
      difficulty={quizState.difficulty}
      onRestart={handleRestart}
      onReview={handleReview}
      onHome={handleHome}
    />
  );

  const renderReview = () => (
    <QuizReview
      questions={quizState.questions}
      answers={quizState.answers}
      onBack={() => setAppState('results')}
    />
  );

  const renderLeaderboard = () => (
    <motion.div
      className="max-w-4xl mx-auto space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <GlassCard className="p-6" hover={false}>
        <div className="flex items-center justify-between">
          <motion.button
            onClick={() => setAppState('home')}
            className="flex items-center px-6 py-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all duration-300 font-semibold shadow-lg mono"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            BACK TO HOME
          </motion.button>
        </div>
      </GlassCard>
      
      <Leaderboard 
        entries={leaderboard} 
        currentScore={quizState.isCompleted ? quizState.score : undefined}
      />
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 container mx-auto py-8 px-4">
        <AnimatePresence mode="wait">
          {appState === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              {renderHome()}
            </motion.div>
          )}
          {appState === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              {renderQuiz()}
            </motion.div>
          )}
          {appState === 'results' && (
            <motion.div
              key="results"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              {renderResults()}
            </motion.div>
          )}
          {appState === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              {renderReview()}
            </motion.div>
          )}
          {appState === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
            >
              {renderLeaderboard()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <FeatureModal
        isOpen={modalFeature !== null}
        onClose={() => setModalFeature(null)}
        feature={modalFeature}
      />
      
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            color: '#fff',
            fontFamily: 'JetBrains Mono, monospace',
          },
        }}
      />
    </div>
  );
}

export default App;