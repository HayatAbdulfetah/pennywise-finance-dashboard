'use client';

import React, { useState } from 'react';
import { SavingsGoal } from '@/types';
import { SavingsSummary } from './SavingsSummary';
import { SavingsGrid } from './SavingsGrid';
import { NewGoalModal } from './NewGoalModal';
import { Button } from '@/components/ui/Button';
import { IconPlus } from '@/components/ui/Icons';

interface SavingsViewProps {
  initialGoals: SavingsGoal[];
}

export function SavingsView({ initialGoals }: SavingsViewProps) {
  const [goals, setGoals] = useState<SavingsGoal[]>(initialGoals);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddGoal = (newGoal: Omit<SavingsGoal, 'id'>) => {
    const created: SavingsGoal = {
      ...newGoal,
      id: `sg-${Date.now()}`,
    };
    setGoals((prev) => [created, ...prev]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Savings Goals
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Automate and track your targets for purchases, vacations, and emergency reserves
          </p>
        </div>

        <Button
          size="sm"
          variant="outline"
          leftIcon={<IconPlus size={16} />}
          onClick={() => setIsModalOpen(true)}
          className="self-start sm:self-auto"
        >
          New Goal
        </Button>
      </div>

      <SavingsSummary goals={goals} />

      <SavingsGrid goals={goals} />

      <NewGoalModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddGoal={handleAddGoal}
      />
    </div>
  );
}
