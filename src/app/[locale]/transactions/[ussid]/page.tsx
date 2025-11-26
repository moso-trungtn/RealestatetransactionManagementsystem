'use client';

import { useRouter, useParams } from 'next/navigation';
import { TransactionDetail } from '@/features/transactions/components/TransactionDetail';
import { mockTransactions } from '@/features/transactions/data/mockTransactions';

export default function TransactionDetailPage() {
  const router = useRouter();
  const params = useParams();
  const ussid = params.ussid as string;

  // Find the transaction by ID
  const transaction = mockTransactions.find(t => t.id === ussid);

  // If transaction not found, redirect to transactions page
  if (!transaction) {
    router.push('/transactions');
    return null;
  }

  const handleBack = () => {
    router.back();
  };

  return (
    <TransactionDetail
      transaction={transaction}
      onBack={handleBack}
    />
  );
}