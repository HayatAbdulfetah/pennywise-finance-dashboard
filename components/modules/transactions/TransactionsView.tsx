'use client';

import React, { useState, useMemo } from 'react';
import { Transaction, TransactionCategory, TransactionType } from '@/types';
import { TransactionSummaryCards } from './TransactionSummaryCards';
import { TransactionFilters } from './TransactionFilters';
import { TransactionList } from './TransactionList';

interface TransactionsViewProps {
  initialTransactions: Transaction[];
}

export function TransactionsView({ initialTransactions }: TransactionsViewProps) {
  const [transactions] = useState<Transaction[]>(initialTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | TransactionType>('all');
  const [categoryFilter, setCategoryFilter] = useState<'all' | TransactionCategory>('all');
  const [accountFilter, setAccountFilter] = useState('all');

  const uniqueAccounts = useMemo(() => {
    return Array.from(new Set(transactions.map((t) => t.account)));
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      // Search
      if (
        searchQuery &&
        !tx.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tx.account.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // Type
      if (typeFilter !== 'all' && tx.type !== typeFilter) {
        return false;
      }
      // Category
      if (categoryFilter !== 'all' && tx.category !== categoryFilter) {
        return false;
      }
      // Account
      if (accountFilter !== 'all' && tx.account !== accountFilter) {
        return false;
      }
      return true;
    });
  }, [transactions, searchQuery, typeFilter, categoryFilter, accountFilter]);

  const summary = useMemo(() => {
    let totalIncome = 0;
    let totalExpense = 0;

    filteredTransactions.forEach((tx) => {
      if (tx.type === 'income') totalIncome += tx.amount;
      else totalExpense += tx.amount;
    });

    return {
      totalIncome,
      totalExpense,
      netAmount: totalIncome - totalExpense,
    };
  }, [filteredTransactions]);

  return (
    <div className="space-y-6">
      {/* Summary Cards for Current Filter */}
      <TransactionSummaryCards
        totalIncome={summary.totalIncome}
        totalExpense={summary.totalExpense}
        netAmount={summary.netAmount}
      />

      {/* Filter and Search Bar */}
      <TransactionFilters
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        accountFilter={accountFilter}
        onAccountFilterChange={setAccountFilter}
        uniqueAccounts={uniqueAccounts}
      />

      {/* Transactions List */}
      <TransactionList transactions={filteredTransactions} />
    </div>
  );
}
