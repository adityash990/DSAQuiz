import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  type: 'dot' | 'line' | 'code';
}

export const ParticleBackground: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const createParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < 80; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          size: Math.random() * 2 + 1,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: (Math.random() - 0.5) * 0.3,
          opacity: Math.random() * 0.3 + 0.1,
          type: Math.random() > 0.7 ? 'code' : Math.random() > 0.5 ? 'line' : 'dot',
        });
      }
      setParticles(newParticles);
    };

    createParticles();

    const animateParticles = () => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: particle.x + particle.speedX,
        y: particle.y + particle.speedY,
        x: particle.x > window.innerWidth ? 0 : particle.x < 0 ? window.innerWidth : particle.x,
        y: particle.y > window.innerHeight ? 0 : particle.y < 0 ? window.innerHeight : particle.y,
      })));
    };

    const interval = setInterval(animateParticles, 50);
    return () => clearInterval(interval);
  }, []);

  const codeSymbols = ['{}', '[]', '()', '<>', '//', '/*', '*/', '=>', '==', '!=', '&&', '||'];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 neural-network">
      {particles.map(particle => (
        <div
          key={particle.id}
          className={`absolute ${particle.type === 'code' ? 'mono text-xs' : 'rounded-full'}`}
          style={{
            left: particle.x,
            top: particle.y,
            width: particle.type === 'code' ? 'auto' : particle.size,
            height: particle.type === 'code' ? 'auto' : particle.size,
            opacity: particle.opacity,
            background: particle.type === 'code' ? 'transparent' : 'rgba(255, 255, 255, 0.6)',
            color: particle.type === 'code' ? 'rgba(255, 255, 255, 0.4)' : 'transparent',
          }}
        >
          {particle.type === 'code' && codeSymbols[particle.id % codeSymbols.length]}
        </div>
      ))}
      
      {/* Matrix-style falling code */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute mono text-xs text-white opacity-10 matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j} className="mb-4">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};