import { TransactionCategory } from './transaction';

export type BudgetPeriod = 'monthly' | 'weekly' | 'annual';

export interface Budget {
  id: string;
  category: TransactionCategory;
  name: string;
  limit: number;
  spent: number;
  period: BudgetPeriod;
  iconName?: string;
  color?: string;
}

export interface BudgetSummaryData {
  totalBudgeted: number;
  totalSpent: number;
  remaining: number;
  percentSpent: number;
  categoriesOverBudget: number;
}
