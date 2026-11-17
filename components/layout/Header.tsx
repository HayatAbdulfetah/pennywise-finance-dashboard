'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { IconPlus, IconWallet } from '@/components/ui/Icons';
import { Button } from '@/components/ui/Button';

interface HeaderProps {
  onOpenAddTransaction?: () => void;
}

export function Header({ onOpenAddTransaction }: HeaderProps) {
  const pathname = usePathname();

  const getPageTitle = () => {
    if (pathname === '/') return 'Financial Dashboard';
    if (pathname?.startsWith('/transactions')) return 'Transactions';
    if (pathname?.startsWith('/budgets')) return 'Monthly Budgets';
    if (pathname?.startsWith('/savings')) return 'Savings Goals';
    return 'Pennywise';
  };

  const getPageSubtitle = () => {
    if (pathname === '/') return 'Overview of your wealth, cash flow & budget health';
    if (pathname?.startsWith('/transactions')) return 'Monitor income and categorize daily expenses';
    if (pathname?.startsWith('/budgets')) return 'Keep your category spending on track for November';
    if (pathname?.startsWith('/savings')) return 'Plan and conquer your financial milestones';
    return '';
  };

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-zinc-200/80 bg-white/80 px-4 sm:px-8 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/80">
      {/* Left side: Mobile logo + title */}
      <div className="flex items-center gap-3">
        {/* Mobile-only logo */}
        <div className="flex lg:hidden h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
          <IconWallet size={18} />
        </div>

        <div>
          <h1 className="text-base sm:text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            {getPageTitle()}
          </h1>
          <p className="hidden sm:block text-xs text-zinc-500 dark:text-zinc-400">
            {getPageSubtitle()}
          </p>
        </div>
      </div>

      {/* Right side: Action buttons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {onOpenAddTransaction && (
          <Button
            size="sm"
            variant="primary"
            onClick={onOpenAddTransaction}
            leftIcon={<IconPlus size={16} />}
            className="shadow-xs text-xs font-semibold"
          >
            <span className="hidden xs:inline sm:inline">Add Transaction</span>
            <span className="xs:hidden sm:hidden">Add</span>
          </Button>
        )}
      </div>
    </header>
  );
}
