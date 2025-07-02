import { useState, useEffect, useCallback } from 'react';
import { QuizState, Question, LeaderboardEntry } from '../types/quiz';
import { QuizEngine } from '../utils/quizEngine';

const QUESTION_TIME = 30; // seconds per question
const STORAGE_KEY = 'quiz-leaderboard';

export const useQuiz = () => {
  const [quizEngine] = useState(() => new QuizEngine());
  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentQuestionIndex: 0,
    answers: [],
    score: 0,
    timeLeft: QUESTION_TIME,
    isActive: false,
    isCompleted: false,
    difficulty: 'easy',
    questionHistory: []
  });

  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerName, setPlayerName] = useState('');

  // Load leaderboard from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setLeaderboard(JSON.parse(saved));
    }
  }, []);

  // Save leaderboard to localStorage
  const saveLeaderboard = useCallback((entries: LeaderboardEntry[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
    setLeaderboard(entries);
  }, []);

  // Timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (quizState.isActive && quizState.timeLeft > 0 && !quizState.isCompleted) {
      interval = setInterval(() => {
        setQuizState(prev => ({
          ...prev,
          timeLeft: prev.timeLeft - 1
        }));
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [quizState.isActive, quizState.timeLeft, quizState.isCompleted]);

  const startQuiz = useCallback((difficulty: 'easy' | 'medium' | 'hard', count: number = 10) => {
    const questions = quizEngine.getQuestionsByDifficulty(difficulty, count);
    setQuizState({
      questions,
      currentQuestionIndex: 0,
      answers: new Array(questions.length).fill(null),
      score: 0,
      timeLeft: QUESTION_TIME,
      isActive: true,
      isCompleted: false,
      difficulty,
      questionHistory: []
    });
  }, [quizEngine]);

  const selectAnswer = useCallback((answerIndex: number) => {
    setQuizState(prev => {
      const newAnswers = [...prev.answers];
      newAnswers[prev.currentQuestionIndex] = answerIndex;
      
      // Add current question to history stack
      quizEngine.pushToHistory(prev.currentQuestionIndex);
      
      return {
        ...prev,
        answers: newAnswers
      };
    });
  }, [quizEngine]);

  const nextQuestion = useCallback(() => {
    setQuizState(prev => {
      if (prev.currentQuestionIndex < prev.questions.length - 1) {
        return {
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1,
          timeLeft: QUESTION_TIME
        };
      } else {
        // Quiz completed
        const finalScore = quizEngine.calculateScore(prev.answers, prev.questions);
        return {
          ...prev,
          score: finalScore,
          isActive: false,
          isCompleted: true
        };
      }
    });
  }, [quizEngine]);

  const previousQuestion = useCallback(() => {
    if (quizEngine.canGoBack()) {
      const prevIndex = quizEngine.popFromHistory();
      if (prevIndex !== null) {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prevIndex,
          timeLeft: QUESTION_TIME
        }));
      }
    }
  }, [quizEngine]);

  const submitQuiz = useCallback(() => {
    setQuizState(prev => {
      const finalScore = quizEngine.calculateScore(prev.answers, prev.questions);
      
      // Add to leaderboard if player name is provided
      if (playerName.trim()) {
        const newEntry: LeaderboardEntry = {
          name: playerName.trim(),
          score: finalScore,
          percentage: (finalScore / prev.questions.length) * 100,
          difficulty: prev.difficulty,
          timestamp: Date.now()
        };
        
        const updatedLeaderboard = quizEngine.sortLeaderboard([...leaderboard, newEntry]);
        saveLeaderboard(updatedLeaderboard.slice(0, 10)); // Keep top 10
      }
      
      return {
        ...prev,
        score: finalScore,
        isActive: false,
        isCompleted: true
      };
    });
  }, [quizEngine, playerName, leaderboard, saveLeaderboard]);

  const resetQuiz = useCallback(() => {
    setQuizState({
      questions: [],
      currentQuestionIndex: 0,
      answers: [],
      score: 0,
      timeLeft: QUESTION_TIME,
      isActive: false,
      isCompleted: false,
      difficulty: 'easy',
      questionHistory: []
    });
  }, []);

  const timeUp = useCallback(() => {
    nextQuestion();
  }, [nextQuestion]);

  return {
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
    canGoBack: quizEngine.canGoBack()
  };
};