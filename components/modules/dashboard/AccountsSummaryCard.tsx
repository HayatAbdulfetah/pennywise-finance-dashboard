import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import { Account } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { IconWallet } from '@/components/ui/Icons';

export function AccountsSummaryCard({ accounts }: { accounts: Account[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Accounts & Balances</CardTitle>
        <CardDescription>Liquid cash, savings, and active credit cards</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {accounts.map((account) => {
          const isNegative = account.balance < 0;

          return (
            <div
              key={account.id}
              className="flex items-center justify-between rounded-lg border border-zinc-100 p-3 transition-colors hover:bg-zinc-50/80 dark:border-zinc-800/60 dark:hover:bg-zinc-800/40"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                  <IconWallet size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                    {account.name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {account.institution} &bull; ****{account.accountNumberLast4}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p
                  className={`text-sm font-bold ${
                    isNegative
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
                >
                  {formatCurrency(account.balance)}
                </p>
                <p className="text-[11px] capitalize text-zinc-400 dark:text-zinc-500">
                  {account.type}
                </p>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
