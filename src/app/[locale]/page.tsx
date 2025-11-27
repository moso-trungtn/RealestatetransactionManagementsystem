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

  return (
    <div className="min-h-screen">
      <LandingPage onLoginClick={handleLoginClick} onRecruitingClick={handleRecruitingClick} />
      <LoginModal
        open={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
}