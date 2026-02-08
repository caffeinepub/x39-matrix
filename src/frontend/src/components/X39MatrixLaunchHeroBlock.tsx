import React from 'react';
import { useLaunchCountdown } from '../hooks/useLaunchCountdown';
import { X39MatrixLaunchAmbientEffects } from './X39MatrixLaunchAmbientEffects';
import { Button } from './ui/button';
import { Zap, TrendingUp, Coins } from 'lucide-react';

export function X39MatrixLaunchHeroBlock() {
  const countdown = useLaunchCountdown();

  const scrollToTokenRegistration = () => {
    const element = document.getElementById('token-registration');
    if (element) {
      // Respect prefers-reduced-motion
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-black overflow-hidden">
      {/* Ambient Effects - Code Rain */}
      <X39MatrixLaunchAmbientEffects />

      {/* Background Texture */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: 'url(/assets/generated/x39-launch-bg.dim_1920x1080.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.4,
        }}
      />

      {/* Energy Streaks - Subtle neon accents */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-sky-500 to-transparent opacity-50 animate-pulse" />
      <div className="absolute top-1/4 right-0 w-1 h-64 bg-gradient-to-b from-transparent via-red-500 to-transparent opacity-50 animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50 animate-pulse" style={{ animationDelay: '2s' }} />

      {/* Main Content Container */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 min-h-screen flex flex-col justify-center">
        {/* Hero Layout - Two Column on Desktop, Stacked on Mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Column - Copy and CTA */}
          <div className="text-left space-y-8">
            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white font-orbitron leading-tight">
              <span className="block text-sky-400" style={{ textShadow: '0 0 30px rgba(56, 189, 248, 0.8)' }}>
                March 15
              </span>
              <span className="block mt-2">
                X39 Matrix is Born
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl sm:text-2xl md:text-3xl text-white font-montserrat leading-relaxed">
              <span className="text-red-500 font-bold" style={{ textShadow: '0 0 20px rgba(239, 68, 68, 0.8)' }}>
                The force galloping toward the future.
              </span>
            </p>

            {/* Body Copy */}
            <div className="space-y-4 text-base sm:text-lg text-gray-300 font-montserrat leading-relaxed">
              <p>
                In the <span className="text-sky-400 font-semibold">Year of the Horse</span>, symbol of energy, freedom, and progress, X39 Matrix emerges as a new era of digital prosperity.
              </p>
              <p>
                The horse does not stop. It runs toward the unknown, driven by the vision of a borderless future, where decentralization paves the way to abundance.
              </p>
              <p>
                This March 15, <span className="text-red-500 font-semibold">join the gallop of progress</span>, where each block of the Matrix network is a step forward—faster, stronger, freer.
              </p>
            </div>

            {/* Signature Line */}
            <div className="pt-4 border-t border-red-500/30">
              <p className="text-lg sm:text-xl text-white font-orbitron font-bold">
                <span className="text-red-500" style={{ textShadow: '0 0 15px rgba(239, 68, 68, 0.8)' }}>
                  X39 Dark
                </span>{' '}
                presents{' '}
                <span className="text-sky-400" style={{ textShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }}>
                  X39 Matrix
                </span>
              </p>
              <p className="text-base text-gray-400 font-montserrat mt-2">
                The project that takes the reins of change.
              </p>
            </div>

            {/* Countdown Timer */}
            <div className="bg-black/80 border-2 border-sky-500/50 rounded-lg p-6 backdrop-blur-sm">
              {countdown.isLaunched ? (
                <div className="text-center">
                  <p className="text-4xl sm:text-5xl font-bold text-sky-400 font-orbitron animate-pulse" style={{ textShadow: '0 0 30px rgba(56, 189, 248, 0.9)' }}>
                    NOW LIVE
                  </p>
                  <p className="text-lg text-white font-montserrat mt-2">
                    X39 Matrix has launched!
                  </p>
                </div>
              ) : (
                <div>
                  <p className="text-center text-sky-400 text-sm sm:text-base font-orbitron uppercase mb-4 tracking-wider">
                    Launch Countdown
                  </p>
                  <div className="grid grid-cols-4 gap-2 sm:gap-4">
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-orbitron" style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.8)' }}>
                        {countdown.days}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-montserrat mt-1">DAYS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-orbitron" style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.8)' }}>
                        {countdown.hours}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-montserrat mt-1">HOURS</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-orbitron" style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.8)' }}>
                        {countdown.minutes}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-montserrat mt-1">MIN</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white font-orbitron" style={{ textShadow: '0 0 20px rgba(56, 189, 248, 0.8)' }}>
                        {countdown.seconds}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400 font-montserrat mt-1">SEC</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <Button
                onClick={scrollToTokenRegistration}
                size="lg"
                className="w-full sm:w-auto px-8 py-6 text-lg font-bold font-orbitron uppercase tracking-wider bg-gradient-to-r from-sky-500 to-red-500 hover:from-sky-600 hover:to-red-600 text-white border-2 border-white/30 shadow-[0_0_30px_rgba(56,189,248,0.6)] hover:shadow-[0_0_50px_rgba(56,189,248,0.9)] transition-all duration-300"
              >
                JOIN THE GALLOP
              </Button>
            </div>
          </div>

          {/* Right Column - Horse of Code Visual */}
          <div className="flex justify-center items-center">
            <div className="relative">
              {/* Glow effect behind horse */}
              <div className="absolute inset-0 bg-gradient-radial from-sky-500/30 via-red-500/20 to-transparent blur-3xl animate-glow-pulse" />
              
              {/* Horse Image */}
              <img
                src="/assets/generated/x39-code-horse.dim_1400x1400.png"
                alt="Horse of Code - Symbol of Speed and Freedom"
                className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl object-contain animate-float"
                style={{
                  filter: 'drop-shadow(0 0 40px rgba(56, 189, 248, 0.6)) drop-shadow(0 0 60px rgba(239, 68, 68, 0.4))',
                }}
              />
            </div>
          </div>
        </div>

        {/* Three Supporting Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {/* Card 1: Year of the Horse */}
          <div className="bg-black/80 border-2 border-sky-500/50 rounded-lg p-6 backdrop-blur-sm hover:border-sky-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <Zap className="w-10 h-10 text-sky-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-sky-400 font-orbitron mb-3" style={{ textShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }}>
                  Year of the Horse = Year of Progress
                </h3>
                <p className="text-sm text-gray-300 font-montserrat leading-relaxed">
                  In Chinese culture, the horse symbolizes forward movement, success, and opportunities. The Year of the Horse brings unstoppable energy, courage to explore new horizons, and the momentum to achieve great things. X39 Matrix harnesses this spirit of advancement.
                </p>
              </div>
            </div>
          </div>

          {/* Card 2: March 15 = New Cycle */}
          <div className="bg-black/80 border-2 border-red-500/50 rounded-lg p-6 backdrop-blur-sm hover:border-red-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <TrendingUp className="w-10 h-10 text-red-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-400 font-orbitron mb-3" style={{ textShadow: '0 0 15px rgba(239, 68, 68, 0.8)' }}>
                  March 15 = New Cycle
                </h3>
                <p className="text-sm text-gray-300 font-montserrat leading-relaxed">
                  March marks the arrival of spring—a time of rebirth, renewal, and fresh beginnings. March 15 represents the perfect moment to launch new projects and embrace prosperity. It's a day of transformation, where the old gives way to the new, and X39 Matrix begins its journey.
                </p>
              </div>
            </div>
          </div>

          {/* Card 3: X39 Matrix = Decentralized Prosperity */}
          <div className="bg-black/80 border-2 border-sky-500/50 rounded-lg p-6 backdrop-blur-sm hover:border-sky-500 transition-all duration-300">
            <div className="flex items-start gap-4">
              <Coins className="w-10 h-10 text-sky-400 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-sky-400 font-orbitron mb-3" style={{ textShadow: '0 0 15px rgba(56, 189, 248, 0.8)' }}>
                  X39 Matrix = Decentralized Prosperity
                </h3>
                <p className="text-sm text-gray-300 font-montserrat leading-relaxed">
                  X39 Matrix opens a new path to financial freedom and expansion. Built on decentralized principles, it empowers individuals to take control of their digital future. Through innovation and community, X39 Matrix creates opportunities for abundance without borders.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
