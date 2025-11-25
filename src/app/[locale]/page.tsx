'use client';

import { useState } from 'react';
import { LandingPage } from '@/features/landing-page/components/LandingPage';
import { LoginModal } from '@/features/auth/components/LoginModal';
import { TransactionsDashboard } from '@/features/transactions/components/TransactionsDashboard';
import { TransactionDetail } from '@/features/transactions/components/TransactionDetail';
import { AdminProfile } from '@/features/admin/components/AdminProfile';
import { WebsiteSettings } from '@/features/admin/components/WebsiteSettings';
import type { Transaction } from '@/types/transaction';

type View = 'dashboard' | 'detail' | 'profile' | 'settings';

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setShowLoginModal(false);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleViewTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setCurrentView('detail');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setSelectedTransaction(null);
  };

  const handleViewProfile = () => {
    setCurrentView('profile');
  };

  const handleViewSettings = () => {
    setCurrentView('settings');
  };

  return (
    <div className="min-h-screen">
      {!isAuthenticated ? (
        <>
          <LandingPage onLoginClick={handleLoginClick} />
          <LoginModal
            open={showLoginModal}
            onClose={() => setShowLoginModal(false)}
            onLogin={handleLogin}
          />
        </>
      ) : (
        <div className="min-h-screen bg-gray-50">
          {currentView === 'dashboard' && (
            <TransactionsDashboard
              onViewTransaction={handleViewTransaction}
              onViewProfile={handleViewProfile}
              onViewDemoForm={handleBackToDashboard}
              onViewSettings={handleViewSettings}
            />
          )}
          {currentView === 'detail' && selectedTransaction && (
            <TransactionDetail
              transaction={selectedTransaction}
              onBack={handleBackToDashboard}
            />
          )}
          {currentView === 'profile' && (
            <AdminProfile />
          )}
          {currentView === 'settings' && (
            <WebsiteSettings onBack={handleBackToDashboard} />
          )}
        </div>
      )}
    </div>
  );
}