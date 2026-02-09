import React, { useEffect, useState } from 'react';

interface IntroScreenProps {
  onComplete: () => void;
}

export function IntroScreen({ onComplete }: IntroScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade out after 1.8 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);

    // Complete intro after 2 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center transition-opacity duration-200 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Triangle Animation */}
      <div className="relative mb-6 sm:mb-8">
        <div className="absolute inset-0 -m-4 sm:-m-6 bg-red-500/30 rounded-full blur-2xl sm:blur-3xl animate-glow-pulse pointer-events-none" />
        <img
          src="/assets/generated/triangle-holographic-3d.dim_400x400.png"
          alt="X39 Matrix"
          className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain animate-triangle-pulse relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.9)) drop-shadow(0 0 40px rgba(0, 100, 255, 0.6))',
          }}
        />
      </div>

      {/* X39 Matrix Text with proper spacing to prevent clipping */}
      <div className="text-center px-4 no-clip-glow">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-red-500 neon-text-red font-orbitron tracking-wider animate-title-glow"
          style={{
            textShadow: '0 0 25px rgba(255, 0, 0, 0.9), 0 0 50px rgba(255, 0, 0, 0.7)',
            lineHeight: '1.4',
            paddingTop: '0.2em',
            paddingBottom: '0.2em',
          }}
        >
          X39 MATRIX
        </h1>
      </div>
    </div>
  );
}
