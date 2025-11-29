'use client';

import { useEffect, useRef } from 'react';
import { animate } from 'motion';

const NUM_PARTICLES = 50; // Pool of particles to reuse

export default function WeldingSparkCursor() {
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const particleIdx = useRef(0);

  useEffect(() => {
    let mouseMoveHandler: ((e: MouseEvent) => void) | null = null;
    let resizeHandler: (() => void) | null = null;
    const styleTag = document.createElement('style');

    // --- Initial Setup ---
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'fixed';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100vw';
    particleContainer.style.height = '100vh';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '10000'; // Ensure it's on top
    document.body.appendChild(particleContainer);
    
    for (let i = 0; i < NUM_PARTICLES; i++) {
      const particle = document.createElement('div');
      particle.style.position = 'absolute';
      particle.style.top = '0';
      particle.style.left = '0';
      // Changed from circle to rectangle
      particle.style.width = `${Math.random() * 2 + 5}px`;
      particle.style.height = '1px';
      particle.style.pointerEvents = 'none';
      particle.style.opacity = '0';
      particleContainer.appendChild(particle);
      particlesRef.current.push(particle);
    }

    let mouse = { x: -100, y: -100 };

    const sparkColors = ['#FFD700', '#FFA500'];

    const createBurst = (x: number, y: number) => {
      const burstParticles = 5;
      for (let i = 0; i < burstParticles; i++) {
        const particle = particlesRef.current[particleIdx.current];
        particleIdx.current = (particleIdx.current + 1) % NUM_PARTICLES;

        const angle = Math.random() * 2 * Math.PI;
        const distance = Math.random() * 20 + 20;
        const destinationX = x + Math.cos(angle) * distance;
        const destinationY = y + Math.sin(angle) * distance;

        particle.style.backgroundColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
        particle.style.opacity = '1';
        particle.style.boxShadow = `0 0 8px 2px ${particle.style.backgroundColor}`;
        const initialRotation = `rotate(${angle + Math.PI / 2}rad)`;
        particle.style.transform = `translate(${x}px, ${y}px) ${initialRotation}`;

        animate(particle, {
          transform: [
            `translate(${x}px, ${y}px) ${initialRotation} scaleX(0.5)`,
            `translate(${destinationX}px, ${destinationY}px) ${initialRotation} scaleX(0)`
          ],
          opacity: [1, 0],
        }, { duration: 0.6 + Math.random() * 0.4, easing: 'ease-out' });
      }
    };

    const createParticle = (x: number, y: number) => {
      const particle = particlesRef.current[particleIdx.current];
      particleIdx.current = (particleIdx.current + 1) % NUM_PARTICLES;

      const isAsteroid = Math.random() < 0.05; // 5% chance of being an asteroid

      const angle = Math.random() * 2 * Math.PI;
      const distance = Math.random() * 80 + 50;
      const destinationX = x + Math.cos(angle) * distance;
      const destinationY = y + Math.sin(angle) * distance;

      particle.style.backgroundColor = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      particle.style.opacity = '1';
      particle.style.boxShadow = `0 0 8px 2px ${particle.style.backgroundColor}`;
      const initialRotation = `rotate(${angle + Math.PI / 2}rad)`;
      particle.style.transform = `translate(${x}px, ${y}px) ${initialRotation}`;
      
      // Vary length by randomizing initial scaleX
      const initialScaleX = 1 + Math.random();

      const animation = animate(particle, {
        transform: [
          `translate(${x}px, ${y}px) ${initialRotation} scaleX(${initialScaleX})`,
          `translate(${destinationX}px, ${destinationY}px) ${initialRotation} scaleX(0)`
        ],
        opacity: [1, 0],
      }, { 
        duration: 0.9 + Math.random() * 0.8, // Increased duration
        easing: 'ease-out' 
      });

      if (isAsteroid) {
        animation.finished.then(() => {
          createBurst(destinationX, destinationY);
        });
      }
    };

    mouseMoveHandler = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      createParticle(mouse.x, mouse.y);
    };

    window.addEventListener('mousemove', mouseMoveHandler);

    // --- Cleanup ---
    return () => {
      if (mouseMoveHandler) window.removeEventListener('mousemove', mouseMoveHandler);
      if (particleContainer.parentNode) particleContainer.parentNode.removeChild(particleContainer);
    };
  }, []);

  return null;
}
