import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  opacity: number;
  char: string;
}

export function X39MatrixLaunchAmbientEffects() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix characters
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Initialize particles
    const particles: Particle[] = [];
    for (let i = 0; i < columns; i++) {
      particles.push({
        x: i * fontSize,
        y: Math.random() * canvas.height,
        speed: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
        char: chars[Math.floor(Math.random() * chars.length)],
      });
    }

    // Animation loop
    let animationId: number;
    const animate = () => {
      // Fade effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.forEach((particle) => {
        // Randomly change character
        if (Math.random() > 0.95) {
          particle.char = chars[Math.floor(Math.random() * chars.length)];
        }

        // Alternate between sky blue and red
        const color = Math.random() > 0.5 ? `rgba(56, 189, 248, ${particle.opacity})` : `rgba(255, 0, 0, ${particle.opacity})`;
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(particle.char, particle.x, particle.y);

        // Move particle
        particle.y += particle.speed;

        // Reset particle when it goes off screen
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.opacity = Math.random() * 0.5 + 0.3;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
}
