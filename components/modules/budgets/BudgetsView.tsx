'use client';

import React, { useState } from 'react';
import { Budget } from '@/types';
import { BudgetSummary } from './BudgetSummary';
import { BudgetGrid } from './BudgetGrid';
import { CreateBudgetModal } from './CreateBudgetModal';
import { Button } from '@/components/ui/Button';
import { IconPlus } from '@/components/ui/Icons';

interface BudgetsViewProps {
  initialBudgets: Budget[];
}

export function BudgetsView({ initialBudgets }: BudgetsViewProps) {
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBudget = (newBudget: Omit<Budget, 'id'>) => {
    const created: Budget = {
      ...newBudget,
      id: `b-${Date.now()}`,
    };
    setBudgets((prev) => [created, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Category Budgets
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Set and track spending boundaries for every category
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          leftIcon={<IconPlus size={16} />}
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto"
        >
          Create Budget
        </Button>
      </div>

      <BudgetSummary budgets={budgets} />

      <BudgetGrid budgets={budgets} />

      <CreateBudgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddBudget={handleAddBudget}
      />
    </div>
  );
}
