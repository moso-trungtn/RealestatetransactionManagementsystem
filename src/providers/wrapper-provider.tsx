"use client"
import {Footer, Navbar} from "@/components/common";
import {FC} from "react";
import {useRouter} from "next/navigation";
import {WebsiteConfigProvider} from "@/contexts/WebsiteConfigContext";
import {LoginModal} from "@/features/auth/components/LoginModal";
import {useModalStore} from "@/stores/state/modal-state";
import {useLocaleSwitch} from "@/hooks/use-locale";

type WrapperProps = {
    children: React.ReactNode;
}
export const Wrapper:FC<WrapperProps> = ({children}) => {
    const router = useRouter()
    const {locale} = useLocaleSwitch()
    const {openLogin,isOpenLogin,closeLogin} = useModalStore()
    function onLoginHandleClick() {
        openLogin()
    }

    function onLogoHandleClick() {

        console.log("asdas")
    }

    function handleSubmitLogin() {
        router.push(`/${locale}/transactions`)
    }

    return <WebsiteConfigProvider>
        <Navbar onViewTransactions={() => null} onLoginClick={() => onLoginHandleClick()} onLogoClick={() => onLogoHandleClick()} />
        {children}
        <Footer />
        {isOpenLogin && <LoginModal open={isOpenLogin} onClose={closeLogin} onLogin={handleSubmitLogin}/>}
    </WebsiteConfigProvider>
}