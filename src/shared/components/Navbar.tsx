import {Button} from "@/components/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/dropdown-menu";
import {Globe} from 'lucide-react';

interface NavbarProps {
    onLoginClick: () => void,
    onViewTransactions?: () => void,
    onLogoClick?: () => void
}

export function Navbar({onLoginClick, onViewTransactions, onLogoClick}: NavbarProps) {
    const languages = [
        {code: 'EN', name: 'English', flag: '🇺🇸'},
        {code: 'ES', name: 'Spanish', flag: '🇪🇸'},
        {code: 'VI', name: 'Vietnamese', flag: '🇻🇳'},
        {code: 'ZH', name: 'Chinese', flag: '🇨🇳'},
        {code: 'HE', name: 'Hebrew', flag: '🇮🇱'},
    ];

    return (
        <nav className="bg-white sticky top-0 z-50" style={{ height: '71px', borderBottom: '1px solid #DEE2E6' }}>
            <div className="max-w-9xl mx-auto px-8 h-full">
                <div className="flex justify-between items-center h-full">
                    {/* Logo */}
                    <div className="flex items-center">
                        <button
                            onClick={onLogoClick}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                        >
                            <img
                                src="/main-logo.svg"
                                alt="Moso Logo"
                                className="h-8 w-auto"
                            />
                        </button>
                    </div>

                    {/* Center Navigation Links */}
                    <div className="flex items-center gap-12">
                        <a
                            href="#about"
                            className="text-sm font-normal hover:text-orange-500 transition-colors"
                            style={{ color: '#2E2E2E' }}
                        >
                            About Us
                        </a>
                        <a
                            href="#services"
                            className="text-sm font-normal hover:text-orange-500 transition-colors"
                            style={{ color: '#2E2E2E' }}
                        >
                            Our Services
                        </a>
                        <a
                            href="#contact"
                            className="text-sm font-normal hover:text-orange-500 transition-colors"
                            style={{ color: '#2E2E2E' }}
                        >
                            Contact Us
                        </a>
                    </div>

                    {/* Sign in Button */}
                    <div className="flex items-center gap-8">
                        <Button
                            onClick={onLoginClick}
                            className="text-white rounded-full px-8 py-2.5 text-sm font-semibold"
                            style={{ backgroundColor: '#F36F23' }}
                        >
                            Sign in
                        </Button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="w-10 h-10 rounded-full border-gray-300"
                                >
                                    🇺🇸
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-32">
                                {languages.map((lang) => (
                                    <DropdownMenuItem
                                        key={lang.code}
                                        className="cursor-pointer flex items-center gap-2"
                                    >
                                        <span className="text-lg">{lang.flag}</span>
                                        <span>{lang.code}</span>
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>
            </div>
        </nav>
    );
}