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

    return (
        <>
            <RecruitingProcess
                onBack={handleBack}
                onLoginClick={handleLoginClick}
            />
            <LoginModal
                open={showLoginModal}
                onClose={() => setShowLoginModal(false)}
                onLogin={handleLogin}
            />
        </>
    );
}