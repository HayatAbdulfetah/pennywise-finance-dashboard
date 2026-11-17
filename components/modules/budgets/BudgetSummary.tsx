import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Budget } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { IconAlertCircle, IconCheckCircle } from '@/components/ui/Icons';

export function BudgetSummary({ budgets }: { budgets: Budget[] }) {
  const totalLimit = budgets.reduce((acc, b) => acc + b.limit, 0);
  const totalSpent = budgets.reduce((acc, b) => acc + b.spent, 0);
  const remaining = totalLimit - totalSpent;
  const percentage = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;
  const overBudgetCategories = budgets.filter((b) => b.spent > b.limit);

  return (
    <Card className="p-5 sm:p-7 border border-zinc-200/80 dark:border-zinc-800/80">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Side: Core Numbers */}
        <div className="space-y-2">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Total Monthly Budget (November)
          </p>
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-3xl sm:text-4xl font-extrabold tracking-tight tabular-nums text-zinc-950 dark:text-zinc-50">
              {formatCurrency(totalSpent)}
            </span>
            <span className="text-xs sm:text-sm font-medium text-zinc-400 dark:text-zinc-500 tabular-nums">
              of {formatCurrency(totalLimit)} limit
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                {formatCurrency(Math.max(0, remaining))}
              </span>
              <span className="text-zinc-500 dark:text-zinc-400">remaining allowance</span>
            </div>

            {overBudgetCategories.length > 0 ? (
              <span className="inline-flex items-center gap-1 font-semibold text-rose-600 dark:text-rose-400">
                <IconAlertCircle size={14} />
                {overBudgetCategories.length} categor{overBudgetCategories.length > 1 ? 'ies' : 'y'} over limit
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                <IconCheckCircle size={14} />
                All budgets on track
              </span>
            )}
          </div>
        </div>

        {/* Right Side: Progress Meter */}
        <div className="w-full lg:max-w-md space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-zinc-600 dark:text-zinc-400">Monthly Consumption</span>
            <span className={`tabular-nums ${percentage > 100 ? 'text-rose-600' : 'text-zinc-900 dark:text-zinc-100'}`}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          <ProgressBar value={totalSpent} max={totalLimit} size="lg" />
          <p className="text-[11px] text-zinc-400 dark:text-zinc-500 text-right">
            13 days remaining in billing cycle
          </p>
        </div>
      </div>
    </Card>
  );
}
