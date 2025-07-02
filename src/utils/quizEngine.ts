import { Question, QuizState, LeaderboardEntry } from '../types/quiz';
import { questionBank } from '../data/questions';

export class QuizEngine {
  private questions: Question[] = [];
  private questionHistory: number[] = []; // Stack for navigation

  // DSA Concept: Sorting Algorithm (Fisher-Yates Shuffle)
  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  // DSA Concept: Filtering and Sorting
  getQuestionsByDifficulty(difficulty: 'easy' | 'medium' | 'hard', count: number = 10): Question[] {
    const filtered = questionBank.filter(q => q.difficulty === difficulty);
    const shuffled = this.shuffleArray(filtered);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  // DSA Concept: Binary Search for finding questions
  findQuestionById(id: number): Question | null {
    const sortedQuestions = questionBank.sort((a, b) => a.id - b.id);
    let left = 0;
    let right = sortedQuestions.length - 1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedQuestions[mid].id === id) {
        return sortedQuestions[mid];
      } else if (sortedQuestions[mid].id < id) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    return null;
  }

  // DSA Concept: Stack operations for navigation
  pushToHistory(questionIndex: number): void {
    this.questionHistory.push(questionIndex);
  }

  popFromHistory(): number | null {
    return this.questionHistory.pop() || null;
  }

  canGoBack(): boolean {
    return this.questionHistory.length > 0;
  }

  // DSA Concept: Recursive algorithm for adaptive difficulty
  getAdaptiveDifficulty(correctAnswers: number, totalAnswers: number): 'easy' | 'medium' | 'hard' {
    if (totalAnswers === 0) return 'easy';
    
    const accuracy = correctAnswers / totalAnswers;
    
    // Recursive decision tree
    return this.adaptiveDifficultyRecursive(accuracy, 0);
  }

  private adaptiveDifficultyRecursive(accuracy: number, depth: number): 'easy' | 'medium' | 'hard' {
    if (depth > 3) return 'medium'; // Base case to prevent infinite recursion
    
    if (accuracy >= 0.8) {
      return depth === 0 ? 'hard' : this.adaptiveDifficultyRecursive(accuracy * 0.9, depth + 1);
    } else if (accuracy >= 0.6) {
      return 'medium';
    } else {
      return depth === 0 ? 'easy' : this.adaptiveDifficultyRecursive(accuracy * 1.1, depth + 1);
    }
  }

  // DSA Concept: Sorting leaderboard
  sortLeaderboard(entries: LeaderboardEntry[]): LeaderboardEntry[] {
    // Implementation of merge sort for leaderboard
    return this.mergeSort(entries, (a, b) => b.score - a.score || b.percentage - a.percentage);
  }

  private mergeSort<T>(arr: T[], compareFn: (a: T, b: T) => number): T[] {
    if (arr.length <= 1) return arr;

    const mid = Math.floor(arr.length / 2);
    const left = this.mergeSort(arr.slice(0, mid), compareFn);
    const right = this.mergeSort(arr.slice(mid), compareFn);

    return this.merge(left, right, compareFn);
  }

  private merge<T>(left: T[], right: T[], compareFn: (a: T, b: T) => number): T[] {
    const result: T[] = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (compareFn(left[i], right[j]) <= 0) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    return result.concat(left.slice(i)).concat(right.slice(j));
  }

  calculateScore(answers: (number | null)[], questions: Question[]): number {
    let correct = 0;
    answers.forEach((answer, index) => {
      if (answer !== null && answer === questions[index]?.correct) {
        correct++;
      }
    });
    return correct;
  }

  getTimeBonus(timeLeft: number, maxTime: number): number {
    const timeRatio = timeLeft / maxTime;
    return Math.floor(timeRatio * 10); // Bonus points for quick answers
  }
}