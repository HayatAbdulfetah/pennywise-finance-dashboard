'use client';

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { MobileNav } from './MobileNav';
import { AddTransactionModal } from '@/components/modules/transactions/AddTransactionModal';

export function AppShell({ children }: { children: React.ReactNode }) {
  const [isAddTxOpen, setIsAddTxOpen] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50/80 text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-50">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col lg:pl-64">
        <Header onOpenAddTransaction={() => setIsAddTxOpen(true)} />

        <main className="flex-1 px-4 sm:px-8 py-8 sm:py-10 pb-28 lg:pb-14 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar */}
      <MobileNav />

      {/* Global Add Transaction Modal */}
      <AddTransactionModal
        isOpen={isAddTxOpen}
        onClose={() => setIsAddTxOpen(false)}
        onAddTransaction={() => {
          // Client state updated
        }}
      />
    </div>
  );
}
