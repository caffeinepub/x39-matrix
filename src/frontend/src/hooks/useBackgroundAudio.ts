import { useEffect, useRef, useState } from 'react';

export interface UseBackgroundAudioReturn {
  isPlaying: boolean;
  isMuted: boolean;
  isLoaded: boolean;
  error: string | null;
  remainingSeconds: number;
  toggleMute: () => void;
  play: () => Promise<void>;
  stop: () => void;
}

const AUDIO_DURATION_SECONDS = 45;
const MUTE_STORAGE_KEY = 'x39-audio-muted';

/**
 * Hook that manages background audio lifecycle:
 * - Loads audio from static asset
 * - Plays for exactly 45 seconds (no loop)
 * - Handles autoplay restrictions gracefully
 * - Persists mute preference in localStorage
 */
export function useBackgroundAudio(
  audioSrc: string,
  autoPlayAfterIntro: boolean = false
): UseBackgroundAudioReturn {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(() => {
    // Load mute preference from localStorage
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem(MUTE_STORAGE_KEY);
    return stored === 'true';
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [remainingSeconds, setRemainingSeconds] = useState(AUDIO_DURATION_SECONDS);
  const stopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.preload = 'auto';
    audio.volume = 0.3; // 30% volume
    audioRef.current = audio;

    const handleCanPlay = () => {
      setIsLoaded(true);
      setError(null);
    };

    const handleError = (e: ErrorEvent | Event) => {
      console.error('[BackgroundAudio] Load error:', e);
      setError('Failed to load audio');
      setIsLoaded(false);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setRemainingSeconds(AUDIO_DURATION_SECONDS);
    };

    audio.addEventListener('canplay', handleCanPlay);
    audio.addEventListener('error', handleError);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('canplay', handleCanPlay);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc]);

  // Auto-play after intro (if enabled and not muted)
  useEffect(() => {
    if (autoPlayAfterIntro && isLoaded && !isMuted) {
      // Small delay to ensure intro has completed
      const timer = setTimeout(() => {
        play().catch((err) => {
          console.warn('[BackgroundAudio] Auto-play failed (expected on some browsers):', err);
        });
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [autoPlayAfterIntro, isLoaded, isMuted]);

  // Sync mute state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  const play = async (): Promise<void> => {
    if (!audioRef.current || !isLoaded) {
      throw new Error('Audio not ready');
    }

    try {
      // Reset to beginning
      audioRef.current.currentTime = 0;
      await audioRef.current.play();
      setIsPlaying(true);
      setRemainingSeconds(AUDIO_DURATION_SECONDS);
      setError(null);

      // Set up 45-second auto-stop timer
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
      stopTimerRef.current = setTimeout(() => {
        stop();
      }, AUDIO_DURATION_SECONDS * 1000);

      // Set up countdown timer (updates every second)
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
      let elapsed = 0;
      countdownTimerRef.current = setInterval(() => {
        elapsed++;
        const remaining = AUDIO_DURATION_SECONDS - elapsed;
        setRemainingSeconds(Math.max(0, remaining));
        if (remaining <= 0) {
          if (countdownTimerRef.current) {
            clearInterval(countdownTimerRef.current);
          }
        }
      }, 1000);
    } catch (err: any) {
      console.error('[BackgroundAudio] Play error:', err);
      setError(err.message || 'Playback failed');
      setIsPlaying(false);
      throw err;
    }
  };

  const stop = (): void => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setRemainingSeconds(AUDIO_DURATION_SECONDS);

    if (stopTimerRef.current) {
      clearTimeout(stopTimerRef.current);
      stopTimerRef.current = null;
    }
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
  };

  const toggleMute = (): void => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    // Persist to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(MUTE_STORAGE_KEY, String(newMuted));
    }
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (stopTimerRef.current) {
        clearTimeout(stopTimerRef.current);
      }
      if (countdownTimerRef.current) {
        clearInterval(countdownTimerRef.current);
      }
    };
  }, []);

  return {
    isPlaying,
    isMuted,
    isLoaded,
    error,
    remainingSeconds,
    toggleMute,
    play,
    stop,
  };
}
