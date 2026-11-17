import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CategoryIcon } from '@/components/ui/Icons';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_CONFIG } from '@/lib/constants';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          No transactions match your criteria
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Try resetting the search query or selecting a different category filter.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0 border border-zinc-200/80 dark:border-zinc-800/80">
      {/* Table header for desktop */}
      <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 bg-zinc-50/60 dark:bg-zinc-900/60 border-b border-zinc-100 dark:border-zinc-800/60 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
        <div className="col-span-6">Description & Account</div>
        <div className="col-span-3">Category</div>
        <div className="col-span-3 text-right">Amount & Date</div>
      </div>

      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';
          const catConfig = CATEGORY_CONFIG[tx.category] || CATEGORY_CONFIG.other;

          return (
            <div
              key={tx.id}
              className="flex sm:grid sm:grid-cols-12 sm:gap-4 items-center justify-between p-4 sm:px-6 transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-850/30"
            >
              {/* Description & Account */}
              <div className="flex items-center gap-3 sm:gap-3.5 col-span-6 min-w-0">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${catConfig.bgColor} ${catConfig.textColor}`}
                >
                  <CategoryIcon category={tx.category} size={16} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {tx.description}
                  </p>
                  <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                    {tx.account}
                    {tx.notes && (
                      <span className="hidden md:inline italic ml-1.5 text-zinc-400">
                        &bull; {tx.notes}
                      </span>
                    )}
                  </p>
                </div>
              </div>

              {/* Category */}
              <div className="hidden sm:flex items-center col-span-3">
                <Badge
                  variant={isIncome ? 'success' : 'default'}
                  className="text-[11px] py-0.5 px-2"
                >
                  {catConfig.label}
                </Badge>
              </div>

              {/* Amount & Date */}
              <div className="text-right sm:col-span-3 shrink-0 ml-3">
                <p
                  className={`text-xs sm:text-sm font-bold tabular-nums tracking-tight ${
                    isIncome
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </p>
                <p className="text-[10px] sm:text-[11px] text-zinc-400 dark:text-zinc-500 tabular-nums">
                  {formatDate(tx.date, 'short')}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
