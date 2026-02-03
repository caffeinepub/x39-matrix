import { useState, useEffect, useRef } from 'react';
import { useLanguage } from './LanguageContext';

interface ChopinVideoPlayerProps {
  isPlaying: boolean;
  onComplete: () => void;
}

export function ChopinVideoPlayer({ isPlaying, onComplete }: ChopinVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [timeRemaining, setTimeRemaining] = useState(45);

  useEffect(() => {
    if (!isPlaying) return;

    const video = videoRef.current;
    if (!video) return;

    // Start playing the video
    video.play().catch((error) => {
      console.error('Error playing video:', error);
    });

    // Set up timer for 45 seconds
    const startTime = Date.now();
    const duration = 45000; // 45 seconds in milliseconds

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, Math.ceil((duration - elapsed) / 1000));
      setTimeRemaining(remaining);

      if (elapsed >= duration) {
        clearInterval(interval);
        if (video) {
          video.pause();
        }
        onComplete();
      }
    }, 100);

    return () => {
      clearInterval(interval);
      if (video) {
        video.pause();
      }
    };
  }, [isPlaying, onComplete]);

  if (!isPlaying) return null;

  return (
    <div className="fixed inset-0 z-40 bg-black">
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        muted
        playsInline
        loop={false}
      >
        {/* Placeholder for Chopin 9 video - replace with actual video source */}
        <source src="/assets/chopin9.mp4" type="video/mp4" />
        <source src="/assets/chopin9.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay with site content visible */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

      {/* Timer Display */}
      <div className="absolute top-24 right-8 z-50 bg-black/80 backdrop-blur-md border border-red-500/50 rounded-lg px-6 py-3 shadow-red-glow">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
          <span className="text-white font-orbitron text-lg font-bold">
            {timeRemaining}s
          </span>
        </div>
      </div>

      {/* Video Title Overlay */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-black/80 backdrop-blur-md border border-red-500/50 rounded-lg px-8 py-4 shadow-red-glow">
        <h3 className="text-white font-orbitron text-xl font-bold text-center neon-text-red">
          🎵 Chopin 9
        </h3>
      </div>
    </div>
  );
}
