import React from 'react';
import { IconSearch } from '@/components/ui/Icons';
import { TransactionCategory, TransactionType } from '@/types';
import { CATEGORY_CONFIG } from '@/lib/constants';

interface TransactionFiltersProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  typeFilter: 'all' | TransactionType;
  onTypeFilterChange: (t: 'all' | TransactionType) => void;
  categoryFilter: 'all' | TransactionCategory;
  onCategoryFilterChange: (c: 'all' | TransactionCategory) => void;
  accountFilter: string;
  onAccountFilterChange: (a: string) => void;
  uniqueAccounts: string[];
}

export function TransactionFilters({
  searchQuery,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  accountFilter,
  onAccountFilterChange,
  uniqueAccounts,
}: TransactionFiltersProps) {
  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      {/* Search Input */}
      <div className="relative flex-1 max-w-md">
        <IconSearch
          size={15}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400"
        />
        <input
          type="text"
          placeholder="Filter by description or account..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full rounded-lg border border-zinc-200/90 bg-white py-2 pl-9 pr-3 text-xs sm:text-sm text-zinc-900 placeholder-zinc-400 focus:border-emerald-500 focus:outline-hidden focus:ring-1 focus:ring-emerald-500 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder-zinc-500 dark:focus:border-emerald-500 transition-colors"
        />
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Type Filter Buttons */}
        <div className="flex rounded-lg border border-zinc-200/90 bg-zinc-50/80 p-0.5 dark:border-zinc-800 dark:bg-zinc-900">
          {(['all', 'income', 'expense'] as const).map((t) => (
            <button
              key={t}
              onClick={() => onTypeFilterChange(t)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-all cursor-pointer ${
                typeFilter === t
                  ? 'bg-white text-zinc-900 shadow-2xs font-semibold dark:bg-zinc-800 dark:text-zinc-50'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Category Select */}
        <select
          value={categoryFilter}
          onChange={(e) =>
            onCategoryFilterChange(e.target.value as 'all' | TransactionCategory)
          }
          className="rounded-lg border border-zinc-200/90 bg-white px-3 py-1.5 text-xs text-zinc-700 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-emerald-500 transition-colors"
        >
          <option value="all">All Categories</option>
          {Object.entries(CATEGORY_CONFIG).map(([key, config]) => (
            <option key={key} value={key}>
              {config.label}
            </option>
          ))}
        </select>

        {/* Account Select */}
        <select
          value={accountFilter}
          onChange={(e) => onAccountFilterChange(e.target.value)}
          className="rounded-lg border border-zinc-200/90 bg-white px-3 py-1.5 text-xs text-zinc-700 focus:border-emerald-500 focus:outline-hidden dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:focus:border-emerald-500 transition-colors"
        >
          <option value="all">All Accounts</option>
          {uniqueAccounts.map((acc) => (
            <option key={acc} value={acc}>
              {acc}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
