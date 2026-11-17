import React from 'react';
import { cn } from '@/lib/utils';

export interface ProgressBarProps {
  value: number; // current value
  max: number; // target / limit
  variant?: 'auto' | 'emerald' | 'indigo' | 'amber' | 'rose';
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  max,
  variant = 'auto',
  size = 'md',
  showLabel = false,
  className,
}: ProgressBarProps) {
  const percentage = max > 0 ? (value / max) * 100 : 0;
  const clampedDisplayWidth = Math.min(percentage, 100);

  // Auto determine color based on consumption ratio (e.g. for budgets)
  let barColor = 'bg-indigo-600 dark:bg-indigo-500';
  if (variant === 'auto') {
    if (percentage > 100) {
      barColor = 'bg-rose-500 dark:bg-rose-500';
    } else if (percentage >= 85) {
      barColor = 'bg-amber-500 dark:bg-amber-500';
    } else {
      barColor = 'bg-emerald-500 dark:bg-emerald-500';
    }
  } else if (variant === 'emerald') {
    barColor = 'bg-emerald-500 dark:bg-emerald-400';
  } else if (variant === 'indigo') {
    barColor = 'bg-indigo-600 dark:bg-indigo-500';
  } else if (variant === 'amber') {
    barColor = 'bg-amber-500 dark:bg-amber-400';
  } else if (variant === 'rose') {
    barColor = 'bg-rose-500 dark:bg-rose-500';
  }

  const heights = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-3.5',
  };

  return (
    <div className={cn('w-full space-y-1.5', className)}>
      <div
        className={cn(
          'w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800',
          heights[size]
        )}
      >
        <div
          className={cn(
            'h-full rounded-full transition-all duration-500 ease-out',
            barColor
          )}
          style={{ width: `${clampedDisplayWidth}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>

      {showLabel && (
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
          <span>{percentage.toFixed(0)}% used</span>
          {percentage > 100 && (
            <span className="font-semibold text-rose-600 dark:text-rose-400">
              Over budget
            </span>
          )}
        </div>
      )}
    </div>
  );
}
