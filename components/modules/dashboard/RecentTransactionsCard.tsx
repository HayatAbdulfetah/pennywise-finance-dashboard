import React from 'react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { CategoryIcon, IconChevronRight } from '@/components/ui/Icons';
import { Transaction } from '@/types';
import { formatCurrency, formatDate } from '@/lib/utils';
import { CATEGORY_CONFIG } from '@/lib/constants';

export function RecentTransactionsCard({ transactions }: { transactions: Transaction[] }) {
  const recent = transactions.slice(0, 5);

  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest posted transactions</CardDescription>
          </div>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors"
          >
            <span>View All</span>
            <IconChevronRight size={13} />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {recent.map((tx) => {
          const isIncome = tx.type === 'income';
          const catConfig = CATEGORY_CONFIG[tx.category] || CATEGORY_CONFIG.other;

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${catConfig.bgColor} ${catConfig.textColor}`}
                >
                  <CategoryIcon category={tx.category} size={15} />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {tx.description}
                  </p>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span>{formatDate(tx.date, 'short')}</span>
                    <span>&bull;</span>
                    <span className="truncate">{tx.account}</span>
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0 ml-3">
                <p
                  className={`text-xs sm:text-sm font-bold tabular-nums ${
                    isIncome
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </p>
                <div className="mt-0.5 flex justify-end">
                  <Badge variant={isIncome ? 'success' : 'default'} className="text-[10px] py-0 px-1.5 font-normal">
                    {catConfig.label.split(' ')[0]}
                  </Badge>
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
