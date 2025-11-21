import { useState } from 'react';
import { TransactionsDashboard } from './src/pages/TransactionsDashboard';
import { TransactionDetail } from './components/TransactionDetail';
import { AdminProfile } from './components/AdminProfile';
import { DemoForm } from './components/DemoForm';
import { WebsiteSettings } from './components/WebsiteSettings';
import { NewsPage } from './src/pages/NewsPage';
import { WebsiteConfigProvider } from './contexts/WebsiteConfigContext';
import { HomePage } from './src/pages/HomePage';
import { LoginModal } from './src/components/LoginModal';

export type Transaction = {
  id: string;
  clientName: string;
  address: string;
  city: string;
  state: string;
  zipCode?: string;
  price: number;
  type: 'Purchase' | 'Listing' | 'Lease Listing';
  status: 'Pre-contract' | 'Under Contract' | 'Closed';
  closingDate?: string;
  listDate?: string;
  contractDate?: string;
  image: string;
  mlsNumber?: string;
  modifiedDate?: string;
  lostDeals?: number;
};

export type View = 'dashboard' | 'detail' | 'profile' | 'demoform' | 'settings' | 'news';

export default function App() {
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

  const handleViewDemoForm = () => {
    setCurrentView('demoform');
  };

  const handleViewSettings = () => {
    setCurrentView('settings');
  };

  const handleViewNews = () => {
    setCurrentView('news');
  };

  const handleNavigate = (view: string) => {
    if (view === 'dashboard' || view === 'detail' || view === 'profile' || view === 'demoform' || view === 'settings' || view === 'news') {
      setCurrentView(view as View);
    }
  };

  return (
    <WebsiteConfigProvider>
      {!isAuthenticated ? (
        <>
          <HomePage onLoginClick={handleLoginClick} />
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
              onViewDemoForm={handleViewDemoForm}
              onViewSettings={handleViewSettings}
              onViewNews={handleViewNews}
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
          {currentView === 'demoform' && (
            <DemoForm onBack={handleBackToDashboard} />
          )}
          {currentView === 'settings' && (
            <WebsiteSettings onBack={handleBackToDashboard} />
          )}
          {currentView === 'news' && (
            <NewsPage 
              onNavigate={handleNavigate}
              onViewProfile={handleViewProfile}
            />
          )}
        </div>
      )}
    </WebsiteConfigProvider>
  );
}