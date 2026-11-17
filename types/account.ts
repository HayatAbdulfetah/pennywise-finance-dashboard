export type AccountType = 'checking' | 'savings' | 'credit' | 'investment';

export interface Account {
  id: string;
  name: string;
  type: AccountType;
  balance: number;
  accountNumberLast4: string;
  institution: string;
}

export interface FinancialOverview {
  totalNetWorth: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  netSavings: number;
  savingsRate: number; // percentage (e.g. 28.4)
  incomeChangePercent: number; // e.g. +4.5
  expenseChangePercent: number; // e.g. -2.1
  cashFlowRatio: number; // income / expense
}
