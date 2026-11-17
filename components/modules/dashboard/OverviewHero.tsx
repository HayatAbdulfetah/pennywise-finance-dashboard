import React from 'react';
import { StatCard } from '@/components/ui/StatCard';
import {
  IconWallet,
  IconArrowUpRight,
  IconArrowDownRight,
  IconPiggyBank,
} from '@/components/ui/Icons';
import { FinancialOverview } from '@/types';
import { formatCurrency } from '@/lib/utils';

export function OverviewHero({ overview }: { overview: FinancialOverview }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Net Worth"
        value={formatCurrency(overview.totalNetWorth)}
        change={{
          value: 3.4,
          periodText: 'vs last month',
        }}
        icon={<IconWallet size={18} className="text-emerald-600 dark:text-emerald-400" />}
      />

      <StatCard
        title="Monthly Income"
        value={formatCurrency(overview.monthlyIncome)}
        change={{
          value: overview.incomeChangePercent,
          periodText: 'vs last month',
        }}
        icon={<IconArrowUpRight size={18} className="text-emerald-600 dark:text-emerald-400" />}
      />

      <StatCard
        title="Monthly Expenses"
        value={formatCurrency(overview.monthlyExpenses)}
        change={{
          value: overview.expenseChangePercent,
          periodText: 'vs last month',
          inverse: true,
        }}
        icon={<IconArrowDownRight size={18} className="text-rose-600 dark:text-rose-400" />}
      />

      <StatCard
        title="Net Savings"
        value={formatCurrency(overview.netSavings)}
        subtitle={`${overview.savingsRate}% monthly savings rate`}
        icon={<IconPiggyBank size={18} className="text-emerald-600 dark:text-emerald-400" />}
      />
    </div>
  );
}
