export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'housing'
  | 'groceries'
  | 'dining'
  | 'transport'
  | 'entertainment'
  | 'utilities'
  | 'shopping'
  | 'health'
  | 'salary'
  | 'freelance'
  | 'investments'
  | 'education'
  | 'other';

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  category: TransactionCategory;
  date: string; // ISO date string (YYYY-MM-DD)
  account: string;
  notes?: string;
}

export interface TransactionFilterOptions {
  searchQuery: string;
  type: 'all' | TransactionType;
  category: 'all' | TransactionCategory;
  account: 'all' | string;
  dateRange: 'all' | 'this_month' | 'last_month' | 'last_90_days';
}
