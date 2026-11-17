import React from 'react';
import { SavingsView } from '@/components/modules/savings';
import { mockSavingsGoals } from '@/lib/mock-data';

export const metadata = {
  title: 'Savings Goals — Pennywise',
  description: 'Plan and track your targets for purchases, vacations, and emergency funds.',
};

export default function SavingsPage() {
  return <SavingsView initialGoals={mockSavingsGoals} />;
}
