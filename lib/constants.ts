import { TransactionCategory } from '@/types';

export interface NavItem {
  name: string;
  href: string;
  icon: 'dashboard' | 'transactions' | 'budgets' | 'savings' | 'settings';
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { name: 'Dashboard', href: '/', icon: 'dashboard' },
  { name: 'Transactions', href: '/transactions', icon: 'transactions' },
  { name: 'Budgets', href: '/budgets', icon: 'budgets' },
  { name: 'Savings Goals', href: '/savings', icon: 'savings' },
];

export interface CategoryMeta {
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

export const CATEGORY_CONFIG: Record<TransactionCategory, CategoryMeta> = {
  housing: {
    label: 'Housing & Rent',
    color: '#6366f1',
    bgColor: 'bg-indigo-50 dark:bg-indigo-950/40',
    textColor: 'text-indigo-700 dark:text-indigo-400',
  },
  groceries: {
    label: 'Groceries',
    color: '#10b981',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/40',
    textColor: 'text-emerald-700 dark:text-emerald-400',
  },
  dining: {
    label: 'Dining & Drinks',
    color: '#f59e0b',
    bgColor: 'bg-amber-50 dark:bg-amber-950/40',
    textColor: 'text-amber-700 dark:text-amber-400',
  },
  transport: {
    label: 'Transportation',
    color: '#3b82f6',
    bgColor: 'bg-blue-50 dark:bg-blue-950/40',
    textColor: 'text-blue-700 dark:text-blue-400',
  },
  entertainment: {
    label: 'Entertainment',
    color: '#ec4899',
    bgColor: 'bg-pink-50 dark:bg-pink-950/40',
    textColor: 'text-pink-700 dark:text-pink-400',
  },
  utilities: {
    label: 'Bills & Utilities',
    color: '#06b6d4',
    bgColor: 'bg-cyan-50 dark:bg-cyan-950/40',
    textColor: 'text-cyan-700 dark:text-cyan-400',
  },
  shopping: {
    label: 'Shopping',
    color: '#8b5cf6',
    bgColor: 'bg-purple-50 dark:bg-purple-950/40',
    textColor: 'text-purple-700 dark:text-purple-400',
  },
  health: {
    label: 'Health & Fitness',
    color: '#14b8a6',
    bgColor: 'bg-teal-50 dark:bg-teal-950/40',
    textColor: 'text-teal-700 dark:text-teal-400',
  },
  salary: {
    label: 'Salary & Wages',
    color: '#22c55e',
    bgColor: 'bg-green-50 dark:bg-green-950/40',
    textColor: 'text-green-700 dark:text-green-400',
  },
  freelance: {
    label: 'Freelance & Consulting',
    color: '#84cc16',
    bgColor: 'bg-lime-50 dark:bg-lime-950/40',
    textColor: 'text-lime-700 dark:text-lime-400',
  },
  investments: {
    label: 'Investments & Dividends',
    color: '#0ea5e9',
    bgColor: 'bg-sky-50 dark:bg-sky-950/40',
    textColor: 'text-sky-700 dark:text-sky-400',
  },
  education: {
    label: 'Education',
    color: '#eab308',
    bgColor: 'bg-yellow-50 dark:bg-yellow-950/40',
    textColor: 'text-yellow-700 dark:text-yellow-400',
  },
  other: {
    label: 'General / Other',
    color: '#71717a',
    bgColor: 'bg-zinc-100 dark:bg-zinc-800/60',
    textColor: 'text-zinc-700 dark:text-zinc-300',
  },
};
