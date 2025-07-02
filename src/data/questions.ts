import { Question } from '../types/quiz';

export const questionBank: Question[] = [
  // Easy Questions
  {
    id: 1,
    question: "What is the time complexity of accessing an element in an array by index?",
    options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
    correct: 0,
    difficulty: 'easy',
    category: 'Arrays',
    explanation: "Array access by index is O(1) because we can directly calculate the memory address."
  },
  {
    id: 2,
    question: "Which data structure follows the Last In First Out (LIFO) principle?",
    options: ["Queue", "Stack", "Array", "Linked List"],
    correct: 1,
    difficulty: 'easy',
    category: 'Stacks',
    explanation: "A stack follows LIFO - the last element added is the first one to be removed."
  },
  {
    id: 3,
    question: "What is the time complexity of linear search?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 2,
    difficulty: 'easy',
    category: 'Searching',
    explanation: "Linear search may need to check every element in the worst case, making it O(n)."
  },
  {
    id: 4,
    question: "Which sorting algorithm has the best average time complexity?",
    options: ["Bubble Sort", "Selection Sort", "Merge Sort", "Insertion Sort"],
    correct: 2,
    difficulty: 'easy',
    category: 'Sorting',
    explanation: "Merge Sort has O(n log n) average time complexity, which is optimal for comparison-based sorting."
  },
  {
    id: 5,
    question: "What does BFS stand for in graph algorithms?",
    options: ["Best First Search", "Breadth First Search", "Binary First Search", "Backward First Search"],
    correct: 1,
    difficulty: 'easy',
    category: 'Graphs',
    explanation: "BFS stands for Breadth First Search, which explores nodes level by level."
  },

  // Medium Questions
  {
    id: 6,
    question: "What is the worst-case time complexity of QuickSort?",
    options: ["O(n log n)", "O(n²)", "O(log n)", "O(n)"],
    correct: 1,
    difficulty: 'medium',
    category: 'Sorting',
    explanation: "QuickSort's worst case is O(n²) when the pivot is always the smallest or largest element."
  },
  {
    id: 7,
    question: "In a binary search tree, what is the average time complexity for search operations?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
    correct: 1,
    difficulty: 'medium',
    category: 'Trees',
    explanation: "In a balanced BST, search operations take O(log n) time on average."
  },
  {
    id: 8,
    question: "Which data structure is used to implement recursion?",
    options: ["Queue", "Stack", "Array", "Heap"],
    correct: 1,
    difficulty: 'medium',
    category: 'Recursion',
    explanation: "The call stack is used to manage recursive function calls."
  },
  {
    id: 9,
    question: "What is the space complexity of merge sort?",
    options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
    correct: 2,
    difficulty: 'medium',
    category: 'Sorting',
    explanation: "Merge sort requires O(n) extra space for the temporary arrays used during merging."
  },
  {
    id: 10,
    question: "In a hash table with chaining, what happens when a collision occurs?",
    options: ["The new element overwrites the old one", "The new element is stored in the next available slot", "The new element is added to a linked list at that index", "The hash function is recalculated"],
    correct: 2,
    difficulty: 'medium',
    category: 'Hashing',
    explanation: "With chaining, collisions are handled by maintaining a linked list at each hash table index."
  },

  // Hard Questions
  {
    id: 11,
    question: "What is the time complexity of finding the diameter of a binary tree?",
    options: ["O(n)", "O(n log n)", "O(n²)", "O(log n)"],
    correct: 0,
    difficulty: 'hard',
    category: 'Trees',
    explanation: "The diameter can be found in O(n) time using a single traversal with optimized approach."
  },
  {
    id: 12,
    question: "Which algorithmic technique is used in the Knapsack problem?",
    options: ["Greedy", "Divide and Conquer", "Dynamic Programming", "Backtracking"],
    correct: 2,
    difficulty: 'hard',
    category: 'Dynamic Programming',
    explanation: "The 0/1 Knapsack problem is optimally solved using Dynamic Programming."
  },
  {
    id: 13,
    question: "What is the minimum number of comparisons needed to find both maximum and minimum elements in an array of n elements?",
    options: ["2n - 2", "3n/2 - 2", "n - 1", "2n - 3"],
    correct: 1,
    difficulty: 'hard',
    category: 'Arrays',
    explanation: "By comparing elements in pairs, we can find both min and max in 3n/2 - 2 comparisons."
  },
  {
    id: 14,
    question: "In the context of graph algorithms, what does the 'cut property' refer to?",
    options: ["A property of minimum spanning trees", "A property of shortest paths", "A property of maximum flow", "A property of topological sorting"],
    correct: 0,
    difficulty: 'hard',
    category: 'Graphs',
    explanation: "The cut property is fundamental to proving the correctness of MST algorithms like Kruskal's and Prim's."
  },
  {
    id: 15,
    question: "What is the worst-case time complexity of building a heap from an unsorted array?",
    options: ["O(n)", "O(n log n)", "O(log n)", "O(n²)"],
    correct: 0,
    difficulty: 'hard',
    category: 'Heaps',
    explanation: "Building a heap from an unsorted array using the bottom-up approach takes O(n) time."
  }
];