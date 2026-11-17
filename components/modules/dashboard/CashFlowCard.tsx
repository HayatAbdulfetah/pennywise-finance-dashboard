import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { FinancialOverview } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function CashFlowCard({ overview }: { overview: FinancialOverview }) {
  const totalFlow = overview.monthlyIncome;
  const expenseRatio = (overview.monthlyExpenses / totalFlow) * 100;
  const savingsRatio = (overview.netSavings / totalFlow) * 100;

  return (
    <Card className="flex flex-col justify-between">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Monthly Cash Flow</CardTitle>
            <CardDescription>Income vs expense allocation for November</CardDescription>
          </div>
          <span className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
            {overview.savingsRate}% Saved
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Visual Stacked Progress Bar */}
        <div className="space-y-2">
          <div className="flex h-4 w-full overflow-hidden rounded-full bg-zinc-100 p-0.5 dark:bg-zinc-800">
            <div
              className="h-full rounded-l-full bg-rose-500 transition-all duration-500"
              style={{ width: `${expenseRatio}%` }}
              title={`Expenses: ${expenseRatio.toFixed(1)}%`}
            />
            <div
              className="h-full rounded-r-full bg-emerald-500 transition-all duration-500"
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

        {/* Cash Flow Breakdown Metrics */}
        <div className="grid grid-cols-2 gap-4 rounded-xl bg-zinc-50 p-4 dark:bg-zinc-900/60 border border-zinc-100 dark:border-zinc-800/60">
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Inflow</p>
            <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
              +{formatCurrency(overview.monthlyIncome)}
            </p>
          </div>
          <div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Total Outflow</p>
            <p className="text-lg font-bold text-rose-600 dark:text-rose-400">
              -{formatCurrency(overview.monthlyExpenses)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
