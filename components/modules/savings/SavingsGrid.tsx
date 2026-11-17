import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { IconPiggyBank, IconCalendar, IconCheckCircle } from '@/components/ui/Icons';
import { SavingsGoal } from '@/types';
import { formatCurrency, formatDate, calculateProgress } from '@/lib/utils';

interface SavingsGridProps {
  goals: SavingsGoal[];
  onAddFunds?: (goalId: string, amount: number) => void;
}

export function SavingsGrid({ goals, onAddFunds }: SavingsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {goals.map((goal) => {
        const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
        const isComplete = goal.currentAmount >= goal.targetAmount;
        const remaining = Math.max(0, goal.targetAmount - goal.currentAmount);

        return (
          <Card key={goal.id} hoverable className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
                    <IconPiggyBank size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.name}
                    </h4>
                    <p className="text-xs text-zinc-400 capitalize">{goal.category}</p>
                  </div>
                </div>

                <Badge
                  variant={isComplete ? 'success' : 'info'}
                  className="text-[11px]"
                >
                  {isComplete ? 'Reached' : `${progress}%`}
                </Badge>
              </div>

              {/* Progress & Values */}
              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(goal.currentAmount)}
                  </span>
                  <span className="text-xs text-zinc-400">
                    of {formatCurrency(goal.targetAmount)}
                  </span>
                </div>

                <div className="mt-2">
                  <ProgressBar
                    value={goal.currentAmount}
                    max={goal.targetAmount}
                    variant={isComplete ? 'emerald' : 'indigo'}
                    size="md"
                  />
                </div>
              </div>

              {/* Monthly Contribution Pace */}
              {goal.monthlyContribution && !isComplete && (
                <div className="rounded-lg bg-zinc-50 px-3 py-2 text-xs text-zinc-600 dark:bg-zinc-800/40 dark:text-zinc-300">
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {formatCurrency(goal.monthlyContribution)}
                  </span>{' '}
                  monthly contribution pace
                </div>
              )}
            </div>

            {/* Footer / Meta */}
            <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800/60">
              <div className="flex items-center gap-1.5 text-zinc-400">
                <IconCalendar size={13} />
                <span>Target: {formatDate(goal.targetDate, 'short')}</span>
              </div>

              <div className="text-right">
                {isComplete ? (
                  <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                    <IconCheckCircle size={13} /> Done
                  </span>
                ) : (
                  <span className="text-zinc-500 dark:text-zinc-400">
                    {formatCurrency(remaining)} left
                  </span>
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
