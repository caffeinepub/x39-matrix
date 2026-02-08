import { useState, useEffect } from 'react';
import { LAUNCH_DATE } from '../config/launchDate';

export interface CountdownState {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isLaunched: boolean;
  totalSeconds: number;
}

export function useLaunchCountdown(): CountdownState {
  const [countdown, setCountdown] = useState<CountdownState>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isLaunched: false,
    totalSeconds: 0,
  });

  useEffect(() => {
    const calculateCountdown = () => {
      const now = new Date().getTime();
      const launchTime = LAUNCH_DATE.getTime();
      const difference = launchTime - now;

      if (difference <= 0) {
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isLaunched: true,
          totalSeconds: 0,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days,
        hours,
        minutes,
        seconds,
        isLaunched: false,
        totalSeconds: Math.floor(difference / 1000),
      });
    };

    calculateCountdown();
    const interval = setInterval(calculateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  return countdown;
}
