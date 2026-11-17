'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import {
  IconDashboard,
  IconTransactions,
  IconBudgets,
  IconSavings,
} from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

export function MobileNav() {
  const pathname = usePathname();

  const getNavIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard':
        return <IconDashboard size={18} />;
      case 'transactions':
        return <IconTransactions size={18} />;
      case 'budgets':
        return <IconBudgets size={18} />;
      case 'savings':
        return <IconSavings size={18} />;
      default:
        return <IconDashboard size={18} />;
    }
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 lg:hidden border-t border-zinc-200/80 bg-white/95 backdrop-blur-md dark:border-zinc-800/80 dark:bg-zinc-950/95">
      <div className="flex h-16 items-center justify-around px-2">
        {NAV_ITEMS.map((item) => {
          const isActive =
            item.href === '/'
              ? pathname === '/'
              : pathname?.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center flex-1 py-1.5 transition-colors',
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 font-normal'
              )}
            >
              <div
                className={cn(
                  'flex h-7 w-7 items-center justify-center rounded-lg transition-all',
                  isActive && 'bg-emerald-50 dark:bg-emerald-950/60'
                )}
              >
                {getNavIcon(item.icon)}
              </div>
              <span className="text-[11px] leading-tight mt-0.5">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
