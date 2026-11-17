'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { SavingsGoal } from '@/types';

interface NewGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddGoal?: (goal: Omit<SavingsGoal, 'id'>) => void;
}

export function NewGoalModal({ isOpen, onClose, onAddGoal }: NewGoalModalProps) {
  const [name, setName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [initialAmount, setInitialAmount] = useState('');
  const [targetDate, setTargetDate] = useState('2027-12-31');
  const [category, setCategory] = useState<SavingsGoal['category']>('purchase');
  const [monthlyContribution, setMonthlyContribution] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTarget = parseFloat(targetAmount);
    if (!name || isNaN(parsedTarget) || parsedTarget <= 0) return;

    if (onAddGoal) {
      onAddGoal({
        name,
        targetAmount: parsedTarget,
        currentAmount: parseFloat(initialAmount) || 0,
        targetDate,
        category,
        monthlyContribution: parseFloat(monthlyContribution) || undefined,
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setTargetAmount('');
      setInitialAmount('');
      setMonthlyContribution('');
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Savings Goal"
      description="Define a new financial target and track contribution progress."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Goal Name
          </label>
          <input
            type="text"
            required
            placeholder="e.g. MacBook Pro, Tokyo Vacation, Emergency Fund"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Target Amount ($)
            </label>
            <input
              type="number"
              step="50"
              required
              placeholder="3,000.00"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Already Saved ($)
            </label>
            <input
              type="number"
              step="50"
              placeholder="0.00"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as SavingsGoal['category'])}
              className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
            >
              <option value="emergency">Emergency Fund</option>
              <option value="travel">Travel & Vacation</option>
              <option value="purchase">Large Purchase</option>
              <option value="investment">Investment & Real Estate</option>
              <option value="education">Education</option>
              <option value="other">Other Goal</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
              Target Date
            </label>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Monthly Contribution Target ($ optional)
          </label>
          <input
            type="number"
            step="10"
            placeholder="e.g. 200"
            value={monthlyContribution}
            onChange={(e) => setMonthlyContribution(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {isSuccess ? 'Created!' : 'Add Goal'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
