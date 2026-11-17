'use client';

import React, { useState } from 'react';
import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Budget, TransactionCategory } from '@/types';
import { CATEGORY_CONFIG } from '@/lib/constants';

interface CreateBudgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBudget?: (budget: Omit<Budget, 'id'>) => void;
}

export function CreateBudgetModal({
  isOpen,
  onClose,
  onAddBudget,
}: CreateBudgetModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<TransactionCategory>('groceries');
  const [limit, setLimit] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedLimit = parseFloat(limit);
    if (isNaN(parsedLimit) || parsedLimit <= 0) return;

    if (onAddBudget) {
      onAddBudget({
        name: name || CATEGORY_CONFIG[category].label,
        category,
        limit: parsedLimit,
        spent: 0,
        period: 'monthly',
      });
    }

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setName('');
      setLimit('');
      onClose();
    }, 600);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Category Budget"
      description="Define a monthly spending allowance for a specific category."
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as TransactionCategory)}
            className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
          >
            {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
              <option key={key} value={key}>
                {config.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Custom Budget Name (Optional)
          </label>
          <input
            type="text"
            placeholder={CATEGORY_CONFIG[category]?.label || 'e.g. Daily Groceries'}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300">
            Monthly Limit ($)
          </label>
          <input
            type="number"
            step="10"
            required
            placeholder="500.00"
            value={limit}
            onChange={(e) => setLimit(e.target.value)}
            className="mt-1 block w-full rounded-lg border border-zinc-200/90 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 transition-colors"
          />
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <Button type="button" variant="outline" size="sm" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="primary" size="sm">
            {isSuccess ? 'Created!' : 'Set Budget'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
