import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { FinancialOverview } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function CashFlowCard({ overview }: { overview: FinancialOverview }) {
  const totalFlow = overview.monthlyIncome;
  const expenseRatio = totalFlow > 0 ? (overview.monthlyExpenses / totalFlow) * 100 : 0;
  const savingsRatio = totalFlow > 0 ? (overview.netSavings / totalFlow) * 100 : 0;

  return (
    <Card className="flex flex-col justify-between p-5 sm:p-6">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Cash Flow</CardTitle>
            <CardDescription>Income distribution for November</CardDescription>
          </div>
          <span className="rounded-md border border-emerald-200/60 bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-800 dark:border-emerald-800/60 dark:bg-emerald-950/50 dark:text-emerald-300">
            {overview.savingsRate}% Saved
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Visual Stacked Bar */}
        <div className="space-y-2">
          <div className="flex h-3 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
            <div
              className="h-full bg-rose-500 transition-all duration-300"
              style={{ width: `${expenseRatio}%` }}
              title={`Expenses: ${expenseRatio.toFixed(1)}%`}
            />
            <div
              className="h-full bg-emerald-500 transition-all duration-300"
              style={{ width: `${savingsRatio}%` }}
              title={`Savings: ${savingsRatio.toFixed(1)}%`}
            />
          </div>

          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-rose-500" />
              <span>Expenses ({expenseRatio.toFixed(0)}%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Net Savings ({savingsRatio.toFixed(0)}%)</span>
            </div>
          </div>
        </div>

        {/* Breakdown Metrics */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 rounded-xl border border-zinc-100 bg-zinc-50/70 p-4 dark:border-zinc-800/60 dark:bg-zinc-900/50">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total Inflow
            </p>
            <p className="mt-1 text-base sm:text-lg font-bold tabular-nums text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(overview.monthlyIncome)}
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total Outflow
            </p>
            <p className="mt-1 text-base sm:text-lg font-bold tabular-nums text-rose-600 dark:text-rose-400">
              -{formatCurrency(overview.monthlyExpenses)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
