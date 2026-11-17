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
  IconWallet,
} from '@/components/ui/Icons';
import { cn } from '@/lib/utils';

export function Sidebar() {
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
    <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 z-30 border-r border-zinc-200/80 bg-white dark:border-zinc-800/80 dark:bg-zinc-950">
      {/* Brand Logo */}
      <div className="flex h-16 items-center gap-3 px-6 border-b border-zinc-100 dark:border-zinc-800/60">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-xs">
          <IconWallet size={20} />
        </div>
        <div>
          <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Pennywise
          </span>
          <span className="block text-[10px] font-medium uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Finance OS
          </span>
        </div>
      </div>

      {/* Main Nav Links */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-1">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Menu
          </p>
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
                  'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-xs'
                    : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-100'
                )}
              >
                <span
                  className={cn(
                    'shrink-0',
                    isActive
                      ? 'text-white dark:text-zinc-900'
                      : 'text-zinc-400 dark:text-zinc-500'
                  )}
                >
                  {getNavIcon(item.icon)}
                </span>
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Quick Info Card */}
      <div className="p-4 border-t border-zinc-100 dark:border-zinc-800/60">
        <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3 dark:bg-zinc-900/60 border border-zinc-200/60 dark:border-zinc-800/60">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-sm font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            JD
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-zinc-900 dark:text-zinc-100">
              John Doe
            </p>
            <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
              Personal Vault
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
