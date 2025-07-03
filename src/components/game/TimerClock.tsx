import React from 'react';
import { TimerIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TimerClockProps {
  progress: number; // 0-100
  className?: string;
}

const TimerClock: React.FC<TimerClockProps> = ({ progress, className }) => {
  const radius = 14;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative w-10 h-10", className)}>
      <TimerIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground/70" />
      <svg className="w-full h-full" viewBox="0 0 32 32">
        <circle
          className="stroke-muted/20"
          strokeWidth="3"
          fill="transparent"
          r={radius}
          cx="16"
          cy="16"
        />
        <circle
          className="stroke-primary transition-all duration-1000 linear"
          strokeWidth="3"
          strokeLinecap="round"
          fill="transparent"
          r={radius}
          cx="16"
          cy="16"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
            transform: 'rotate(-90deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
    </div>
  );
};

export default TimerClock;
