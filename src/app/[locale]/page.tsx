'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { LandingPage } from '@/features/landing-page/components/LandingPage';
import { LoginModal } from '@/features/auth/components/LoginModal';

export default function HomePage() {
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogin = () => {
    setShowLoginModal(false);
    // Redirect to transactions dashboard after successful login
    router.push(`/${locale}/transactions`);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleRecruitingClick = () => {
    router.push(`/${locale}/recruiting`);
  };

  const handleLogoClick = () => {
    // Check if user is logged in (you can adjust this based on your auth implementation)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    if (isLoggedIn) {
      // Redirect to dashboard if logged in
      router.push(`/${locale}/transactions`);
    } else {
      // Redirect to homepage if not logged in
      router.push(`/${locale}`);
    }
  };

  return (
    <div className="min-h-screen">
      <LandingPage
        onLoginClick={handleLoginClick}
        onRecruitingClick={handleRecruitingClick}
        onLogoClick={handleLogoClick}
      />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}