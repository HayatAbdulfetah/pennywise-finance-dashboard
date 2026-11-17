import React from 'react';
import { Card } from './Card';
import { IconArrowUpRight, IconArrowDownRight } from './Icons';
import { cn } from '@/lib/utils';

export interface StatCardProps {
  title: string;
  value: string;
  change?: {
    value: number; // e.g. 5.2 for +5.2%
    periodText?: string; // e.g. 'vs last month'
    inverse?: boolean; // if true, positive is bad (e.g. expenses went up)
  };
  subtitle?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({
  title,
  value,
  change,
  subtitle,
  icon,
  className,
}: StatCardProps) {
  const isPositive = change ? change.value >= 0 : false;
  const isFavorable = change ? (change.inverse ? !isPositive : isPositive) : true;

  return (
    <Card hoverable className={cn('flex flex-col justify-between p-5 sm:p-6', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <div className="text-2xl sm:text-3xl font-bold tracking-tight tabular-nums text-zinc-950 dark:text-zinc-50">
            {value}
          </div>
        </div>

        {icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200/80 bg-zinc-50 text-zinc-700 dark:border-zinc-800/80 dark:bg-zinc-800/60 dark:text-zinc-300">
            {icon}
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-xs font-semibold tabular-nums',
                isFavorable
                  ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                  : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-400'
              )}
            >
              {isPositive ? (
                <IconArrowUpRight size={13} />
              ) : (
                <IconArrowDownRight size={13} />
              )}
              {isPositive ? '+' : ''}
              {change.value.toFixed(1)}%
            </span>
          )}

          {change?.periodText && (
            <span className="text-zinc-500 dark:text-zinc-400 text-xs">
              {change.periodText}
            </span>
          )}

          {subtitle && !change && (
            <span className="text-zinc-500 dark:text-zinc-400 text-xs">{subtitle}</span>
          )}
        </div>
      )}
    </Card>
  );
}
