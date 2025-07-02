import React from 'react';
import { X, Code, Database, Cpu, Brain, Zap, Trophy, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeatureModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: 'adaptive' | 'feedback' | 'leaderboard' | null;
}

export const FeatureModal: React.FC<FeatureModalProps> = ({ isOpen, onClose, feature }) => {
  const getFeatureContent = () => {
    switch (feature) {
      case 'adaptive':
        return {
          title: 'Adaptive Learning Engine',
          icon: Brain,
          description: 'AI-powered difficulty adjustment based on performance',
          technologies: [
            { name: 'Python', icon: Code, color: 'text-yellow-400', desc: 'Machine learning algorithms for pattern recognition' },
            { name: 'C++', icon: Cpu, color: 'text-blue-400', desc: 'High-performance computation engine' },
            { name: 'SQL', icon: Database, color: 'text-green-400', desc: 'Performance analytics and user behavior tracking' }
          ],
          codeExample: `# Python - Adaptive Algorithm
class AdaptiveLearning:
    def __init__(self):
        self.user_performance = {}
    
    def adjust_difficulty(self, user_id, accuracy):
        if accuracy > 0.85:
            return self.increase_difficulty()
        elif accuracy < 0.60:
            return self.decrease_difficulty()
        return self.maintain_difficulty()`,
          features: [
            'Real-time difficulty adjustment',
            'Performance pattern analysis',
            'Personalized learning paths',
            'Predictive scoring algorithms'
          ]
        };
      case 'feedback':
        return {
          title: 'Real-time Feedback System',
          icon: Zap,
          description: 'Instant analysis and detailed explanations',
          technologies: [
            { name: 'Python', icon: Code, color: 'text-yellow-400', desc: 'Natural language processing for explanations' },
            { name: 'C++', icon: Cpu, color: 'text-blue-400', desc: 'Fast response time optimization' },
            { name: 'SQL', icon: Database, color: 'text-green-400', desc: 'Question analytics and explanation storage' }
          ],
          codeExample: `// C++ - Fast Feedback Engine
class FeedbackEngine {
private:
    unordered_map<int, string> explanations;
    
public:
    string generateFeedback(int questionId, bool isCorrect) {
        auto start = chrono::high_resolution_clock::now();
        string feedback = processAnswer(questionId, isCorrect);
        auto end = chrono::high_resolution_clock::now();
        return feedback; // < 50ms response time
    }
};`,
          features: [
            'Instant answer validation',
            'Detailed explanations',
            'Performance insights',
            'Learning recommendations'
          ]
        };
      case 'leaderboard':
        return {
          title: 'Global Leaderboard System',
          icon: Trophy,
          description: 'Competitive ranking with advanced analytics',
          technologies: [
            { name: 'Python', icon: Code, color: 'text-yellow-400', desc: 'Statistical analysis and ranking algorithms' },
            { name: 'C++', icon: Cpu, color: 'text-blue-400', desc: 'Efficient sorting and data structures' },
            { name: 'SQL', icon: Database, color: 'text-green-400', desc: 'Complex queries for rankings and statistics' }
          ],
          codeExample: `-- SQL - Advanced Leaderboard Query
WITH ranked_users AS (
  SELECT 
    user_id,
    score,
    difficulty,
    RANK() OVER (PARTITION BY difficulty ORDER BY score DESC) as rank,
    PERCENTILE_CONT(0.5) WITHIN GROUP (ORDER BY score) OVER (PARTITION BY difficulty) as median_score
  FROM quiz_results 
  WHERE created_at >= NOW() - INTERVAL '30 days'
)
SELECT * FROM ranked_users WHERE rank <= 100;`,
          features: [
            'Real-time global rankings',
            'Difficulty-based categories',
            'Statistical analysis',
            'Performance trends'
          ]
        };
      default:
        return null;
    }
  };

  const content = getFeatureContent();
  if (!content) return null;

  const IconComponent = content.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          <motion.div
            className="relative max-w-4xl w-full max-h-[90vh] overflow-y-auto glass-bw rounded-2xl p-8"
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="mb-8">
              <div className="flex items-center space-x-4 mb-4">
                <div className="p-4 bg-white/10 rounded-xl">
                  <IconComponent className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold gradient-text-bw">{content.title}</h2>
                  <p className="text-gray-400 text-lg">{content.description}</p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Cpu className="w-5 h-5 mr-2" />
                  Technologies Used
                </h3>
                <div className="space-y-4">
                  {content.technologies.map((tech, index) => {
                    const TechIcon = tech.icon;
                    return (
                      <motion.div
                        key={tech.name}
                        className="glass-dark rounded-xl p-4"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-start space-x-3">
                          <TechIcon className={`w-6 h-6 ${tech.color} mt-1`} />
                          <div>
                            <h4 className={`font-semibold ${tech.color}`}>{tech.name}</h4>
                            <p className="text-gray-400 text-sm">{tech.desc}</p>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-4 flex items-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Key Features
                </h3>
                <div className="space-y-3">
                  {content.features.map((feature, index) => (
                    <motion.div
                      key={feature}
                      className="flex items-center space-x-3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                Implementation Example
              </h3>
              <div className="code-block rounded-xl p-6 overflow-x-auto">
                <pre className="text-sm text-gray-300 mono">
                  <code>{content.codeExample}</code>
                </pre>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};