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
      <Card className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          No transactions found
        </p>
        <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Try adjusting your search query or filter settings.
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden p-0">
      <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {transactions.map((tx) => {
          const isIncome = tx.type === 'income';
          const catConfig = CATEGORY_CONFIG[tx.category] || CATEGORY_CONFIG.other;

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between p-4 sm:px-6 transition-colors hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30"
            >
              <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${catConfig.bgColor} ${catConfig.textColor}`}
                >
                  <CategoryIcon category={tx.category} size={18} />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {tx.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{formatDate(tx.date, 'short')}</span>
                    <span>&bull;</span>
                    <span className="truncate">{tx.account}</span>
                    {tx.notes && (
                      <>
                        <span className="hidden sm:inline">&bull;</span>
                        <span className="hidden sm:inline truncate max-w-xs italic text-zinc-400">
                          {tx.notes}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 ml-4">
                <p
                  className={`text-sm sm:text-base font-bold tracking-tight ${
                    isIncome
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </p>
                <div className="mt-0.5 flex justify-end">
                  <Badge
                    variant={isIncome ? 'success' : 'default'}
                    className="text-[10px] py-0 px-2 font-medium"
                  >
                    {catConfig.label}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
