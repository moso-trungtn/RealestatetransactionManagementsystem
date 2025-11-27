'use client';

import {RecruitingProcess} from "@/features/recruiting-process/components/RecruitingProcess";
import { useRouter, useParams} from "next/navigation";
import { useState } from "react";
import { LoginModal } from "@/features/auth/components/LoginModal";

export default function ReCruitingPage() {

    const router = useRouter();
    const params = useParams();
    const locale = params.locale as string;
    const [showLoginModal, setShowLoginModal] = useState(false);

    const handleBack = () => {
        router.back();
    };

    const handleLoginClick = () => {
        setShowLoginModal(true);
    };

    const handleLogin = () => {
        setShowLoginModal(false);
        // Redirect to transactions dashboard after successful login
        router.push(`/${locale}/transactions`);
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
        <>
            <RecruitingProcess
                onBack={handleBack}
                onLoginClick={handleLoginClick}
                onLogoClick={handleLogoClick}
            />
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
            />
        </>
    );
}