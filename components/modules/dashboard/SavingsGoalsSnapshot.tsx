import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { IconChevronRight, IconPiggyBank, IconCheckCircle } from '@/components/ui/Icons';
import { SavingsGoal } from '@/types';
import { formatCurrency, calculateProgress } from '@/lib/utils';

export function SavingsGoalsSnapshot({ goals }: { goals: SavingsGoal[] }) {
  const topGoals = goals.slice(0, 3);

  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Milestones</CardTitle>
            <CardDescription>Target progress & savings rate</CardDescription>
          </div>
          <Link
            href="/savings"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            <span>View Goals</span>
            <IconChevronRight size={13} />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-3.5">
        {topGoals.map((goal) => {
          const progress = calculateProgress(goal.currentAmount, goal.targetAmount);
          const isComplete = goal.currentAmount >= goal.targetAmount;

          return (
            <div
              key={goal.id}
              className="rounded-lg border border-zinc-100 p-3 dark:border-zinc-800/60 dark:bg-zinc-900/30 space-y-2"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 items-center justify-center rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300">
                    <IconPiggyBank size={15} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                      {goal.name}
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 tabular-nums">
                      Target: {formatCurrency(goal.targetAmount)}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  {isComplete ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <IconCheckCircle size={12} /> Achieved
                    </span>
                  ) : (
                    <span className="text-xs font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
                      {progress}%
                    </span>
                  )}
                </div>
              </div>

              <ProgressBar
                value={goal.currentAmount}
                max={goal.targetAmount}
                variant={isComplete ? 'emerald' : 'emerald'}
                size="sm"
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
