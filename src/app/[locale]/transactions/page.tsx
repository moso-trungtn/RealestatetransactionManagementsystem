'use client';

import { useRouter } from 'next/navigation';
import { TransactionsDashboard } from '@/features/transactions/components/TransactionsDashboard';
import type { Transaction } from '@/types/transaction';

export default function TransactionsPage() {
  const router = useRouter();

  const handleViewTransaction = (transaction: Transaction) => {
    router.push(`/transactions/${transaction.id}`);
  };

  const handleViewProfile = () => {
    // Navigate to profile page when it's created
    // router.push('/profile');
    console.log('Navigate to profile');
  };

  const handleViewDemoForm = () => {
    // Navigate to demo form when it's created
    console.log('Navigate to demo form');
  };

  const handleViewSettings = () => {
    // Navigate to settings page when it's created
    // router.push('/settings');
    console.log('Navigate to settings');
  };

  return (
    <TransactionsDashboard
      onViewTransaction={handleViewTransaction}
      onViewProfile={handleViewProfile}
      onViewDemoForm={handleViewDemoForm}
      onViewSettings={handleViewSettings}
    />
  );
}