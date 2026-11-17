import React from 'react';
import { BudgetsView } from '@/components/modules/budgets';
import { mockBudgets } from '@/lib/mock-data';

export const metadata = {
  title: 'Budgets — Pennywise',
  description: 'Manage monthly budget allocations and monitor spending progress.',
};

export default function BudgetsPage() {
  return <BudgetsView initialBudgets={mockBudgets} />;
}
