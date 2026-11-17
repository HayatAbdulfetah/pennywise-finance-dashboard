import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CategoryIcon, IconChevronRight } from '@/components/ui/Icons';
import { Budget } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_CONFIG } from '@/lib/constants';

export function BudgetOverviewCard({ budgets }: { budgets: Budget[] }) {
  const topBudgets = budgets.slice(0, 4);

  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Budget Health</CardTitle>
            <CardDescription>Top category spending for November</CardDescription>
          </div>
          <Link
            href="/budgets"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            <span>All Budgets</span>
            <IconChevronRight size={13} />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {topBudgets.map((b) => {
          const catConfig = CATEGORY_CONFIG[b.category] || CATEGORY_CONFIG.other;
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
                <div className="text-right tabular-nums">
                  <span className={isOver ? 'font-bold text-rose-600 dark:text-rose-400' : 'text-zinc-700 dark:text-zinc-300 font-medium'}>
                    {formatCurrency(b.spent)}
                  </span>
                  <span className="text-zinc-400 text-[11px]"> / {formatCurrency(b.limit)}</span>
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
