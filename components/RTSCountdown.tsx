'use client';

import { useEffect, useState } from 'react';

// RTS Link target date: January 1, 2027 at midnight Singapore time (GMT+8)
const TARGET_DATE = new Date('2027-01-01T00:00:00+08:00').getTime();

interface TimeLeft {
  months: number;
  days: number;
  total: number;
}

function calculateTimeLeft(): TimeLeft {
  const now = Date.now();
  const difference = TARGET_DATE - now;

  if (difference <= 0) {
    return { months: 0, days: 0, total: 0 };
  }

  const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));
  const months = Math.floor(totalDays / 30.44);
  const days = Math.floor(totalDays % 30.44);

  return { months, days, total: difference };
}

export function RTSCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(calculateTimeLeft());

    // Update every hour (no need for seconds precision)
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 3600000);

    return () => clearInterval(interval);
  }, []);

  // Show static placeholder during SSR and initial hydration
  if (!isMounted || !timeLeft) {
    return (
      <div className="inline-flex flex-col items-center bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 md:px-8 md:py-5">
        <span className="text-xs md:text-sm text-gray-400 mb-2 uppercase tracking-wider">
          RTS Link Opening In
        </span>
        <div className="flex items-center gap-3 md:gap-4">
          <div className="text-center">
            <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              --
            </span>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-1">
              months
            </p>
          </div>
          <span className="text-3xl md:text-5xl font-bold text-white/40">:</span>
          <div className="text-center">
            <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
              --
            </span>
            <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-1">
              days
            </p>
          </div>
        </div>
      </div>
    );
  }

  // RTS is now open
  if (timeLeft.total <= 0) {
    return (
      <div className="inline-flex items-center gap-3 bg-emerald-500/20 backdrop-blur-md rounded-2xl px-6 py-4 md:px-8 md:py-5 border border-emerald-500/30">
        <span className="text-2xl">🚇</span>
        <span className="text-lg md:text-xl font-semibold text-white">
          RTS Link Now Open
        </span>
        <span className="text-2xl">🎉</span>
      </div>
    );
  }

  return (
    <div className="inline-flex flex-col items-center bg-black/60 backdrop-blur-md rounded-2xl px-6 py-4 md:px-8 md:py-5 border border-white/10">
      <span className="text-xs md:text-sm text-gray-400 mb-2 uppercase tracking-wider font-medium">
        RTS Link Opening In
      </span>
      <div className="flex items-center gap-3 md:gap-4">
        <div className="text-center">
          <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
            {String(timeLeft.months).padStart(2, '0')}
          </span>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-1 font-medium">
            months
          </p>
        </div>
        <span className="text-3xl md:text-5xl font-bold text-white/40">:</span>
        <div className="text-center">
          <span className="text-3xl md:text-5xl font-bold text-white tabular-nums">
            {String(timeLeft.days).padStart(2, '0')}
          </span>
          <p className="text-[10px] md:text-xs text-gray-400 uppercase tracking-wider mt-1 font-medium">
            days
          </p>
        </div>
      </div>
    </div>
  );
}
