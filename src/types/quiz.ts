export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  explanation: string;
}

export interface QuizState {
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | null)[];
  score: number;
  timeLeft: number;
  isActive: boolean;
  isCompleted: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  questionHistory: number[]; // Stack for navigation
}

export interface LeaderboardEntry {
  name: string;
  score: number;
  percentage: number;
  difficulty: string;
  timestamp: number;
}