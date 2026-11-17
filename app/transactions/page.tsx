import React from 'react';
import { TransactionsView } from '@/components/modules/transactions';
import { mockTransactions } from '@/lib/mock-data';

export const metadata = {
  title: 'Transactions — Pennywise',
  description: 'Track and categorize all expenses, income, and account movements.',
};

export default function TransactionsPage() {
  return <TransactionsView initialTransactions={mockTransactions} />;
}
