import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CategoryIcon, IconChevronRight } from '@/components/ui/Icons';
import { Budget } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_CONFIG } from '@/lib/constants';

export function BudgetOverviewCard({ budgets }: { budgets: Budget[] }) {
  // Take top 4 budgets
  const topBudgets = budgets.slice(0, 4);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Health</CardTitle>
            <CardDescription>Top spending categories for this month</CardDescription>
          </div>
          <Link
            href="/budgets"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <span>All Budgets</span>
            <IconChevronRight size={14} />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {topBudgets.map((b) => {
          const catConfig = CATEGORY_CONFIG[b.category];
          const percent = (b.spent / b.limit) * 100;
          const isOver = percent > 100;

          return (
            <div key={b.id} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-md ${catConfig.bgColor} ${catConfig.textColor}`}
                  >
                    <CategoryIcon category={b.category} size={13} />
                  </div>
                  <span className="font-medium text-zinc-900 dark:text-zinc-100">
                    {b.name}
                  </span>
                </div>
                <div className="text-right">
                  <span className={isOver ? 'font-bold text-rose-600 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300'}>
                    {formatCurrency(b.spent)}
                  </span>
                  <span className="text-zinc-400"> / {formatCurrency(b.limit)}</span>
                </div>
              </div>

              <ProgressBar value={b.spent} max={b.limit} size="sm" />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
