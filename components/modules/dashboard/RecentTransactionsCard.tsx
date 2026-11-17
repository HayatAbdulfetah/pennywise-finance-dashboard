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
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest financial activity across your accounts</CardDescription>
          </div>
          <Link
            href="/transactions"
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <span>View All</span>
            <IconChevronRight size={14} />
          </Link>
        </div>
      </CardHeader>

      <CardContent className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
        {recent.map((tx) => {
          const isIncome = tx.type === 'income';
          const catConfig = CATEGORY_CONFIG[tx.category];

          return (
            <div
              key={tx.id}
              className="flex items-center justify-between py-3 first:pt-0 last:pb-0"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${catConfig.bgColor} ${catConfig.textColor}`}
                >
                  <CategoryIcon category={tx.category} size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                    {tx.description}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                    <span>{formatDate(tx.date, 'short')}</span>
                    <span>&bull;</span>
                    <span>{tx.account}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    isIncome
                      ? 'text-emerald-600 dark:text-emerald-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {isIncome ? '+' : '-'}
                  {formatCurrency(tx.amount)}
                </p>
                <Badge variant={isIncome ? 'success' : 'default'} className="mt-0.5 text-[10px] py-0 px-2">
                  {catConfig.label.split(' ')[0]}
                </Badge>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
