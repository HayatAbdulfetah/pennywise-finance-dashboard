import React from 'react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { CategoryIcon } from '@/components/ui/Icons';
import { Budget } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { CATEGORY_CONFIG } from '@/lib/constants';

interface BudgetGridProps {
  budgets: Budget[];
}

export function BudgetGrid({ budgets }: BudgetGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {budgets.map((b) => {
        const catConfig = CATEGORY_CONFIG[b.category] || CATEGORY_CONFIG.other;
        const remaining = b.limit - b.spent;
        const isOver = b.spent > b.limit;
        const percent = (b.spent / b.limit) * 100;

        return (
          <Card key={b.id} hoverable className="flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${catConfig.bgColor} ${catConfig.textColor}`}
                  >
                    <CategoryIcon category={b.category} size={18} />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {b.name}
                    </h4>
                    <p className="text-xs text-zinc-400 capitalize">{b.period}</p>
                  </div>
                </div>

                <Badge
                  variant={isOver ? 'danger' : percent >= 85 ? 'warning' : 'success'}
                  className="text-[11px]"
                >
                  {isOver ? 'Over' : `${percent.toFixed(0)}%`}
                </Badge>
              </div>

              <div>
                <div className="flex items-baseline justify-between">
                  <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {formatCurrency(b.spent)}
                  </span>
                  <span className="text-xs text-zinc-400">
                    of {formatCurrency(b.limit)}
                  </span>
                </div>

                <div className="mt-2">
                  <ProgressBar value={b.spent} max={b.limit} size="md" />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-zinc-100 pt-3 text-xs dark:border-zinc-800/60">
              <span className="text-zinc-500 dark:text-zinc-400">
                {isOver ? 'Exceeded by' : 'Remaining'}
              </span>
              <span
                className={`font-semibold ${
                  isOver
                    ? 'text-rose-600 dark:text-rose-400'
                    : 'text-zinc-900 dark:text-zinc-100'
                }`}
              >
                {formatCurrency(Math.abs(remaining))}
              </span>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
