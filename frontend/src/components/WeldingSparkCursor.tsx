'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

const NUM_PARTICLES = 50;

interface Particle {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  color: string;
  initialScaleX: number;
}

export default function WeldingSparkCursor() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdx = useRef(0);

  const createParticle = (x: number, y: number) => {
    const angle = Math.random() * 2 * Math.PI;
    const distance = Math.random() * 80 + 50;
    const color = ['#FFD700', '#FFA500'][Math.floor(Math.random() * 2)];
    const initialScaleX = 1 + Math.random();

    setParticles((prev) => [
      ...prev,
      {
        id: particleIdx.current++,
        x,
        y,
        angle,
        distance,
        color,
        initialScaleX,
      },
    ]);
  };

  const createBurst = (x: number, y: number) => {
    for (let i = 0; i < 5; i++) {
      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 20 + 20;
      const color = ['#FFD700', '#FFA500'][Math.floor(Math.random() * 2)];

      setParticles((prev) => [
        ...prev,
        {
          id: particleIdx.current++,
          x,
          y,
          angle,
          distance,
          color,
          initialScaleX: 0.5,
        },
      ]);
    }
  };

  useEffect(() => {
    const mouseMoveHandler = (e: MouseEvent) => {
      createParticle(e.clientX, e.clientY);
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    return () => {
      window.removeEventListener('mousemove', mouseMoveHandler);
    };
  }, []);

  return (
    <div>
      {particles.map((particle) => (
        <ParticleComponent
          key={particle.id}
          particle={particle}
          onComplete={() => {
            setParticles((prev) => prev.filter((p) => p.id !== particle.id));
            if (Math.random() < 0.05) {
              const destinationX = particle.x + Math.cos(particle.angle) * particle.distance;
              const destinationY = particle.y + Math.sin(particle.angle) * particle.distance;
              createBurst(destinationX, destinationY);
            }
          }}
        />
      ))}
    </div>
  );
}

const ParticleComponent = ({ particle, onComplete }: { particle: Particle; onComplete: () => void }) => {
  const controls = useAnimation();
  const { x, y, angle, distance, color, initialScaleX } = particle;

  useEffect(() => {
    const destinationX = x + Math.cos(angle) * distance;
    const destinationY = y + Math.sin(angle) * distance;
    const initialRotation = `rotate(${angle + Math.PI / 2}rad)`;

    controls.start({
      x: [x, destinationX],
      y: [y, destinationY],
      scaleX: [initialScaleX, 0],
      opacity: [1, 0],
      rotate: [initialRotation, initialRotation],
      transition: {
        duration: 0.9 + Math.random() * 0.8,
        ease: 'easeOut',
      },
    }).then(onComplete);
  }, [controls, x, y, angle, distance, initialScaleX, onComplete]);

  return (
    <motion.div
      className="absolute top-0 left-0"
      style={{
        backgroundColor: color,
        boxShadow: `0 0 8px 2px ${color}`,
        width: `${Math.random() * 2 + 5}px`,
        height: '1px',
      }}
      animate={controls}
    />
  );
};
function _useState(arg0: number): [any, any] {
    throw new Error('Function not implemented.');
}

