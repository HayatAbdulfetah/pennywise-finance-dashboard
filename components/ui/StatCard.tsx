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
  // For expenses, an increase is typically marked warning/red unless inverted
  const isFavorable = change ? (change.inverse ? !isPositive : isPositive) : true;

  return (
    <Card hoverable className={cn('relative overflow-hidden', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {title}
          </p>
          <div className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {value}
          </div>
        </div>

        {icon && (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            {icon}
          </div>
        )}
      </div>

      {(change || subtitle) && (
        <div className="mt-4 flex items-center gap-2 text-xs">
          {change && (
            <span
              className={cn(
                'inline-flex items-center gap-0.5 font-semibold',
                isFavorable
                  ? 'text-emerald-600 dark:text-emerald-400'
                  : 'text-rose-600 dark:text-rose-400'
              )}
            >
              {isPositive ? (
                <IconArrowUpRight size={14} />
              ) : (
                <IconArrowDownRight size={14} />
              )}
              {isPositive ? '+' : ''}
              {change.value.toFixed(1)}%
            </span>
          )}

          {change?.periodText && (
            <span className="text-zinc-500 dark:text-zinc-400">
              {change.periodText}
            </span>
          )}

          {subtitle && !change && (
            <span className="text-zinc-500 dark:text-zinc-400">{subtitle}</span>
          )}
        </div>
      )}
    </Card>
  );
}
