import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {Bell, Globe, Info, LogOut, User2} from 'lucide-react';
import {languages, navigations} from "@/config/common";
import {usePathname, useRouter} from "next/navigation";
import {useLocaleSwitch} from "@/hooks/use-locale";
import {Locale} from "@/config/i18n";
import Link from "next/link";
import {FC, ReactNode} from "react";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {EmptyContent} from "@/components/custom/empty-content";

interface NavbarProps {
    onLoginClick: () => void,
    onViewTransactions?: () => void,
    onLogoClick?: () => void
}

export function Navbar({onLoginClick, onViewTransactions, onLogoClick}: NavbarProps) {

const { locale, setLocale } = useLocaleSwitch()
    function handleLanguageSwitch(lo: Locale) {
        setLocale(lo);
    }

    function hadleLogoutClick() {
        // todo: logic logout account here
    }

    return (
        <nav className="bg-white sticky top-0 z-50" style={{ height: '71px', borderBottom: '1px solid #DEE2E6' }}>
            <div className="max-w-9xl mx-auto px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <Logo onLogoClick={onLogoClick} />
                    {/* Center Navigation Links */}
                    <Navigations/>
                    {/* Sign in Button */}
                    <RightMenuUser handleLanguageSwitch={handleLanguageSwitch} onLogoutClick={() => hadleLogoutClick()} onLoginClick={onLoginClick} locale={locale as Locale} />
                </div>
            </div>
        </nav>
    );
}

type LogoProps = {
    onLogoClick?: () => void;
}
const Logo:FC<LogoProps> = ({onLogoClick}) => {
    return(
        <div className="flex items-center">
            <button
                onClick={(e) => onLogoClick?.()}
                className="cursor-pointer hover:opacity-80 transition-opacity"
            >
                <img
                    src={"/main-logo.svg"}
                    alt="Moso Logo"
                    className="h-8 w-auto"
                    loading="lazy"
                />
            </button>
        </div>
    )
}

const Navigations = () => {
    return(
        <div className="flex items-center gap-2">
            {
                navigations.map((nav) => (
                    <Link key={nav.value} href={nav.value} >
                        <Button variant="ghost" >
                            {nav.label}
                        </Button>
                    </Link>
                ))
            }
        </div>
    )
}

type RightMenuUserProps = {
    onLogoutClick?: () => void,
    onLoginClick?: () => void,
    locale?: Locale,
    handleLanguageSwitch?: (locale: Locale) => void,
}

const RightMenuUser:FC<RightMenuUserProps> = ({locale,handleLanguageSwitch,onLogoutClick,onLoginClick}) => {
    return(<div className="flex items-center gap-3.5">
        <Button
            onClick={onLoginClick}
            className="text-white rounded-full px-8 py-2.5 text-sm font-semibold"
            style={{ backgroundColor: '#F36F23' }}
        >
            Sign in
        </Button>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="">
                    <Bell strokeWidth={1.4} />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col min-w-xs min-h-20 px-2 py-3">
                <EmptyContent title="Oh, It's Empty" description="Notifications not found" />
            </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer shadow-transparent shadow hover:shadow-md">
                    <AvatarImage src="https://i.pravatar.cc/36" title="John Smith" />
                    <AvatarFallback />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
                <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href={`/${locale}/profile`}>
                        <User2 />Profile
                    </Link>
                </Button>
                <Button variant="ghost" className="w-full justify-start text-red-500 hover:text-red-500" onClick={onLogoutClick}><LogOut />Logout</Button>

            </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="w-10 h-10 rounded-full border-gray-300"
                >
                    {locale === "vi" ?
                        <span className="fi fi-vn"></span> :
                        <span className="fi fi-sh"></span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-32">
                {languages.map((lang) => (
                    <DropdownMenuItem
                        key={lang.value}
                        className="cursor-pointer flex items-center gap-2"
                        onClick={(e) => handleLanguageSwitch?.(lang.value as Locale)}
                    >
                        <div className="text-lg">{lang.value === "vi" ?
                            <span className="fi fi-vn"></span> :
                            <span className="fi fi-sh"></span>}</div>
                        <span>{lang.name}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>


    </div>)
}