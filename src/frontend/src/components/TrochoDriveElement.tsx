import React from 'react';

export function TrochoDriveElement() {
  return (
    <div className="trochodrive-container flex flex-col items-center justify-center py-16 px-4">
      {/* Official X39 Matrix Logo - Central main emblem with enhanced faint mist effects */}
      <div className="triangle-wrapper relative animate-fade-in-up mb-6">
        {/* Enhanced faint mist effects surrounding the triangle with slow cyclical movement */}
        <div className="absolute inset-0 -m-12 pointer-events-none">
          {/* Primary mist layer - top left */}
          <div 
            className="absolute top-0 left-0 w-40 h-40 bg-red-500/8 rounded-full blur-3xl animate-mist-float" 
            style={{ animationDuration: '8s', animationDelay: '0s' }}
          />
          {/* Secondary mist layer - top right */}
          <div 
            className="absolute top-0 right-0 w-36 h-36 bg-red-500/10 rounded-full blur-3xl animate-mist-float" 
            style={{ animationDuration: '10s', animationDelay: '2s' }}
          />
          {/* Tertiary mist layer - bottom center */}
          <div 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-red-500/7 rounded-full blur-3xl animate-mist-float" 
            style={{ animationDuration: '12s', animationDelay: '4s' }}
          />
          {/* Additional atmospheric fog - left side */}
          <div 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 w-32 h-32 bg-red-500/6 rounded-full blur-3xl animate-mist-float" 
            style={{ animationDuration: '9s', animationDelay: '1s' }}
          />
          {/* Additional atmospheric fog - right side */}
          <div 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 w-32 h-32 bg-red-500/6 rounded-full blur-3xl animate-mist-float" 
            style={{ animationDuration: '11s', animationDelay: '3s' }}
          />
          {/* Subtle center fog for depth */}
          <div 
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-red-500/5 rounded-full blur-3xl animate-mist-float" 
            style={{ animationDuration: '14s', animationDelay: '5s' }}
          />
        </div>
        
        <img
          src="/assets/generated/x39matrix-official-logo.dim_200x200.png"
          alt="X39 Matrix - Official Logo"
          className="triangle-image w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 object-contain animate-triangle-pulse relative z-10"
          style={{
            filter: 'drop-shadow(0 0 20px rgba(255, 0, 0, 0.7)) drop-shadow(0 0 40px rgba(255, 0, 0, 0.5))'
          }}
        />
        <div className="absolute inset-0 rounded-full bg-red-500/30 blur-3xl animate-glow-pulse" />
      </div>

      {/* X39 Matrix Text Label - Positioned directly beneath triangle with smaller font and red color */}
      <div className="animate-fade-in-up">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-red-500 neon-text-red font-orbitron tracking-wider text-center"
          style={{
            textShadow: '0 0 20px rgba(255, 0, 0, 0.8), 0 0 40px rgba(255, 0, 0, 0.6), 0 0 60px rgba(255, 0, 0, 0.4)',
            filter: 'drop-shadow(0 0 10px rgba(255, 0, 0, 0.5))'
          }}>
          X39 Matrix
        </h2>
      </div>
    </div>
  );
}
