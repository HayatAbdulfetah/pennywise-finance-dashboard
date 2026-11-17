import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { SavingsGoal } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { IconCheckCircle } from '@/components/ui/Icons';

export function SavingsSummary({ goals }: { goals: SavingsGoal[] }) {
  const totalTarget = goals.reduce((acc, g) => acc + g.targetAmount, 0);
  const totalSaved = goals.reduce((acc, g) => acc + g.currentAmount, 0);
  const remaining = totalTarget - totalSaved;
  const progress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;
  const completedGoals = goals.filter((g) => g.currentAmount >= g.targetAmount);

  return (
    <Card className="p-5 sm:p-7 border border-zinc-200/80 dark:border-zinc-800/80">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Total Accumulated Reserves
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-zinc-950 dark:text-zinc-50">
              {formatCurrency(totalSaved)}
            </span>
            <span className="text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500 tabular-nums">
              of {formatCurrency(totalTarget)} target
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.max(0, remaining))}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">remaining to reach all milestones</span>
            </div>

            <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-semibold">
              <IconCheckCircle size={14} />
              <span>
                {completedGoals.length} of {goals.length} goals fully achieved
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Overall Progress */}
        <div className="w-full lg:max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-600 dark:text-zinc-400">Overall Milestone Progress</span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold tabular-nums">
              {progress.toFixed(1)}%
            </span>
          </div>
          <ProgressBar value={totalSaved} max={totalTarget} variant="emerald" size="lg" />
          <div className="flex items-center justify-between text-[11px] text-zinc-400 dark:text-zinc-500">
            <span>{goals.length} Active Targets</span>
            <span>Est. Full Horizon: 2028</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
