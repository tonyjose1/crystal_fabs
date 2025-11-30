'use client';

import { useEffect, useRef, useCallback } from 'react';

interface InteractiveDotsProps {
  backgroundColor?: string;
  dotColor?: string;
  gridSpacing?: number;
  animationSpeed?: number;
  removeWaveLine?: boolean;
}

const InteractiveDots = ({
  backgroundColor = '#F0EEE6',
  dotColor = '#666666',
  gridSpacing = 30,
  animationSpeed = 0.005,
  removeWaveLine = true
}: InteractiveDotsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeRef = useRef<number>(0);
  const animationFrameId = useRef<number | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, isDown: false });
  const ripples = useRef<
    Array<{ x: number; y: number; time: number; intensity: number }>
  >([]);
  const dotsRef = useRef<
    Array<{
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      phase: number;
    }>
  >([]);
  const dprRef = useRef<number>(1);

  const getMouseInfluence = (x: number, y: number): number => {
    const dx = x - mouseRef.current.x;
    const dy = y - mouseRef.current.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 150;
    return Math.max(0, 1 - distance / maxDistance);
  };

  const getRippleInfluence = (
    x: number,
    y: number,
    currentTime: number
  ): number => {
    let totalInfluence = 0;
    ripples.current.forEach((ripple) => {
      const age = currentTime - ripple.time;
      const maxAge = 3000;
      if (age < maxAge) {
        const dx = x - ripple.x;
        const dy = y - ripple.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const rippleRadius = (age / maxAge) * 300;
        const rippleWidth = 60;
        if (Math.abs(distance - rippleRadius) < rippleWidth) {
          const rippleStrength = (1 - age / maxAge) * ripple.intensity;
          const proximityToRipple =
            1 - Math.abs(distance - rippleRadius) / rippleWidth;
          totalInfluence += rippleStrength * proximityToRipple;
        }
      }
    });
    return Math.min(totalInfluence, 2);
  };

  const initializeDots = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const dots: Array<{
      x: number;
      y: number;
      originalX: number;
      originalY: number;
      phase: number;
    }> = [];

    // Create grid of dots
    for (let x = gridSpacing / 2; x < width; x += gridSpacing) {
      for (let y = gridSpacing / 2; y < height; y += gridSpacing) {
        dots.push({
          x,
          y,
          originalX: x,
          originalY: y,
          phase: Math.random() * Math.PI * 2, // Random phase for subtle animation
        });
      }
    }

    dotsRef.current = dots;
  }, [gridSpacing]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = window.devicePixelRatio || 1;
    dprRef.current = dpr;

    const rect = canvas.getBoundingClientRect();
    const displayWidth = rect.width;
    const displayHeight = rect.height;

    // Set the actual size in memory (scaled up for high DPI)
    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;

    // Scale the canvas back down using CSS
    canvas.style.width = displayWidth + 'px';
    canvas.style.height = displayHeight + 'px';

    // Scale the drawing context so everything draws at the correct size
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    initializeDots();
  }, [initializeDots]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    mouseRef.current.isDown = true;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ripples.current.push({
      x,
      y,
      time: Date.now(),
      intensity: 2,
    });

    const now = Date.now();
    ripples.current = ripples.current.filter(
      (ripple) => now - ripple.time < 3000
    );
  }, []);

  const handleMouseUp = useCallback(() => {
    mouseRef.current.isDown = false;
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    mouseRef.current.isDown = false;
  }, []);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    try {
      timeRef.current += animationSpeed;
      const currentTime = Date.now();

      // Clear canvas with absolute certainty
      // We use opaque fillRect to ensure complete erasure of previous frame
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform to clear physical pixels
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.restore();

      // Ensure correct scale for drawing
      const dpr = dprRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Update and draw dots
      dotsRef.current.forEach((dot) => {
        const mouseInfluence = getMouseInfluence(dot.originalX, dot.originalY);
        const rippleInfluence = getRippleInfluence(
          dot.originalX,
          dot.originalY,
          currentTime
        );
        const totalInfluence = mouseInfluence + rippleInfluence;

        // Keep dots at original positions - no movement
        dot.x = dot.originalX;
        dot.y = dot.originalY;

        // Calculate dot properties based on influences - only scaling
        const baseDotSize = 2;
        const dotSize =
          baseDotSize +
          totalInfluence * 6 +
          Math.sin(timeRef.current + dot.phase) * 0.5;
        const opacity = Math.max(
          0.3,
          0.6 +
          totalInfluence * 0.4 +
          Math.abs(Math.sin(timeRef.current * 0.5 + dot.phase)) * 0.1
        );

        // Draw dot
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2);

        // Color with opacity
        const red = parseInt(dotColor.slice(1, 3), 16);
        const green = parseInt(dotColor.slice(3, 5), 16);
        const blue = parseInt(dotColor.slice(5, 7), 16);
        ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`;
        ctx.fill();
      });

      // Draw ripple effects
      if (!removeWaveLine) {
        ripples.current.forEach((ripple) => {
          const age = currentTime - ripple.time;
          const maxAge = 3000;
          if (age < maxAge) {
            const progress = age / maxAge;
            const radius = progress * 300;
            const alpha = (1 - progress) * 0.3 * ripple.intensity;

            // Outer ripple
            ctx.beginPath();
            ctx.strokeStyle = `rgba(100, 100, 100, ${alpha})`;
            ctx.lineWidth = 2;
            ctx.arc(ripple.x, ripple.y, radius, 0, 2 * Math.PI);
            ctx.stroke();

            // Inner ripple
            const innerRadius = progress * 150;
            const innerAlpha = (1 - progress) * 0.2 * ripple.intensity;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(120, 120, 120, ${innerAlpha})`;
            ctx.lineWidth = 1;
            ctx.arc(ripple.x, ripple.y, innerRadius, 0, 2 * Math.PI);
            ctx.stroke();
          }
        });
      }
    } catch (error) {
      console.error('Animation error:', error);
    }

    animationFrameId.current = requestAnimationFrame(animate);
  }, [backgroundColor, dotColor, removeWaveLine, animationSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvas();

    const handleResize = () => resizeCanvas();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);

      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
        animationFrameId.current = null;
      }
      ripples.current = [];
      dotsRef.current = [];
    };
  }, [animate, resizeCanvas, handleMouseMove, handleMouseDown, handleMouseUp, handleMouseLeave]);

  return (
    <div
      className='absolute inset-0 w-full h-full overflow-hidden'
      style={{ backgroundColor }}
    >
      <canvas ref={canvasRef} className='block w-full h-full' />
    </div>
  );
};

export default InteractiveDots;
