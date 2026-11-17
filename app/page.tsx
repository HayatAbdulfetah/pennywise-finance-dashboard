import React from 'react';
import {
  OverviewHero,
  CashFlowCard,
  AccountsSummaryCard,
  RecentTransactionsCard,
  BudgetOverviewCard,
  SavingsGoalsSnapshot,
} from '@/components/modules/dashboard';
import {
  mockFinancialOverview,
  mockAccounts,
  mockTransactions,
  mockBudgets,
  mockSavingsGoals,
} from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 4 Core Financial Stat Cards */}
      <OverviewHero overview={mockFinancialOverview} />

      {/* Cash Flow Allocation & Accounts */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <CashFlowCard overview={mockFinancialOverview} />
        <AccountsSummaryCard accounts={mockAccounts} />
      </div>

      {/* Detailed Domain Snapshots: Transactions, Budgets, Savings */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <RecentTransactionsCard transactions={mockTransactions} />
        </div>
        <div className="lg:col-span-1">
          <BudgetOverviewCard budgets={mockBudgets} />
        </div>
        <div className="lg:col-span-1">
          <SavingsGoalsSnapshot goals={mockSavingsGoals} />
        </div>
      </div>
    </div>
  );
}
