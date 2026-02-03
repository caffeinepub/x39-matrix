import { useEffect, useState, useRef } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const TRIANGLE_DURATION = 2000; // 2 seconds only

  useEffect(() => {
    const triangleTimer = setTimeout(() => {
      onComplete();
    }, TRIANGLE_DURATION);

    return () => clearTimeout(triangleTimer);
  }, [onComplete]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];
    
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.shadowBlur = 5;
        ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        ctx.fillStyle = '#000000';
        ctx.fillText('X', x, y);

        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(255, 0, 0, 0.8)';
        ctx.fillStyle = '#FF0000';
        ctx.fillText('39', x + fontSize * 0.6, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        drops[i]++;
      }
    };

    const animationId = setInterval(draw, 50);

    return () => {
      clearInterval(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100] bg-black overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/assets/generated/cyberpunk-intro-background@1920x1080.png')`,
        }}
      />
      
      <div className="absolute inset-0 bg-black/70" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-60"
        style={{ pointerEvents: 'none' }}
      />

      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(255, 0, 0, 0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-center mb-8 animate-pulse-glow font-orbitron tracking-wider">
          <span className="block mb-4 neon-text-red-intense">X39 MATRIX</span>
        </h1>

        <div className="absolute inset-0 pointer-events-none">
          <div className="scan-line" />
        </div>
      </div>
    </div>
  );
}
