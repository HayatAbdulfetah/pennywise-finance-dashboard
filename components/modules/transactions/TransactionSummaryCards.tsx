import React from 'react';
import { Card } from '@/components/ui/Card';
import { IconArrowUpRight, IconArrowDownRight, IconWallet } from '@/components/ui/Icons';
import { formatCurrency } from '@/lib/utils';

interface TransactionSummaryCardsProps {
  totalIncome: number;
  totalExpense: number;
  netAmount: number;
}

export function TransactionSummaryCards({
  totalIncome,
  totalExpense,
  netAmount,
}: TransactionSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Total Inflow
          </p>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400">
            <IconArrowUpRight size={15} />
          </div>
        </div>
        <p className="mt-2 text-xl sm:text-2xl font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
          +{formatCurrency(totalIncome)}
        </p>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Total Outflow
          </p>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
            <IconArrowDownRight size={15} />
          </div>
        </div>
        <p className="mt-2 text-xl sm:text-2xl font-bold tabular-nums text-rose-600 dark:text-rose-400">
          -{formatCurrency(totalExpense)}
        </p>
      </Card>

      <Card className="p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Net Cash Flow
          </p>
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
            <IconWallet size={15} />
          </div>
        </div>
        <p
          className={`mt-2 text-xl sm:text-2xl font-bold tabular-nums ${
            netAmount >= 0
              ? 'text-zinc-950 dark:text-zinc-50'
              : 'text-rose-600 dark:text-rose-400'
          }`}
        >
          {netAmount >= 0 ? '+' : ''}
          {formatCurrency(netAmount)}
        </p>
      </Card>
    </div>
  );
}
