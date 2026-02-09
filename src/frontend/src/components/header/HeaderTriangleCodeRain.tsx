import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  speed: number;
  size: number;
  opacity: number;
  rotation: number;
  rotationSpeed: number;
  drift: number; // Horizontal drift for variation
  speedBand: number; // Speed multiplier for distinct motion bands
}

export function HeaderTriangleCodeRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2)); // Cap DPR at 2 for performance

      // Reset transform before scaling to prevent compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);

      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.scale(dpr, dpr);

      // Reinitialize particles when size changes
      initParticles(rect.width, rect.height);
    };

    const initParticles = (width: number, height: number) => {
      // Aggressive density: more particles for intensity
      const area = width * height;
      const particleCount = Math.min(Math.floor(area / 2000), 120); // Max 120 particles, higher density

      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        // Speed bands: 40% fast, 40% medium, 20% slow for visible variation
        const speedBand = Math.random() < 0.4 ? 2.5 : Math.random() < 0.8 ? 1.5 : 0.8;
        
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height - height, // Start above viewport
          speed: (0.8 + Math.random() * 1.2) * speedBand, // Base speed * band multiplier
          size: 2.5 + Math.random() * 4, // Smaller triangles for elegance
          opacity: 0.5 + Math.random() * 0.5, // Higher base opacity for intensity
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.08, // More rotation variance
          drift: (Math.random() - 0.5) * 0.4, // Horizontal drift for irregular motion
          speedBand,
        });
      }
    };

    const drawTriangle = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      rotation: number,
      opacity: number
    ) => {
      // Guard against invalid values
      if (!isFinite(x) || !isFinite(y) || !isFinite(size) || !isFinite(rotation) || !isFinite(opacity)) {
        return;
      }

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);

      // Stroke-forward approach: tighter glow, crisp edges
      // Reduced shadowBlur for controlled glow (not blurry blobs)
      ctx.shadowBlur = 8;
      ctx.shadowColor = `rgba(255, 0, 0, ${Math.min(1, opacity * 0.8)})`;
      
      // Stroke is primary, fill is subtle
      ctx.strokeStyle = `rgba(255, 0, 0, ${Math.min(1, opacity)})`;
      ctx.fillStyle = `rgba(255, 0, 0, ${Math.min(1, opacity * 0.3)})`; // Reduced fill dominance
      ctx.lineWidth = 1.5; // Thicker stroke for edge definition

      // Draw triangle
      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.lineTo(-size * 0.866, size * 0.5);
      ctx.lineTo(size * 0.866, size * 0.5);
      ctx.closePath();
      
      ctx.fill(); // Subtle fill first
      ctx.stroke(); // Crisp stroke on top

      ctx.restore();
    };

    const animate = () => {
      if (!canvas || !ctx) return;

      const width = canvas.width / (Math.max(1, Math.min(window.devicePixelRatio || 1, 2)));
      const height = canvas.height / (Math.max(1, Math.min(window.devicePixelRatio || 1, 2)));

      // Guard against invalid dimensions
      if (!isFinite(width) || !isFinite(height) || width <= 0 || height <= 0) {
        return;
      }

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        // Update position with drift and speed variation
        particle.y += particle.speed;
        particle.x += particle.drift; // Horizontal drift for irregular motion
        particle.rotation += particle.rotationSpeed;

        // Wrap horizontally if drifted off screen
        if (particle.x < -particle.size) {
          particle.x = width + particle.size;
        } else if (particle.x > width + particle.size) {
          particle.x = -particle.size;
        }

        // Reset particle when it goes off screen (bottom)
        if (particle.y > height + particle.size) {
          particle.y = -particle.size;
          particle.x = Math.random() * width;
          // Occasionally change drift direction for more chaos
          if (Math.random() < 0.3) {
            particle.drift = (Math.random() - 0.5) * 0.4;
          }
        }

        // Draw triangle
        drawTriangle(ctx, particle.x, particle.y, particle.size, particle.rotation, particle.opacity);
      });

      if (!prefersReducedMotion) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    // Initialize
    updateCanvasSize();

    // Setup ResizeObserver for responsive sizing
    resizeObserverRef.current = new ResizeObserver(() => {
      updateCanvasSize();
    });

    if (canvas.parentElement) {
      resizeObserverRef.current.observe(canvas.parentElement);
    }

    // Start animation or render single frame
    if (prefersReducedMotion) {
      // Render single static frame
      animate();
    } else {
      // Start continuous animation
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    // Cleanup
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
