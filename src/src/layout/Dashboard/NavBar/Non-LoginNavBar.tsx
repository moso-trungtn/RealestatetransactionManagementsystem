import { Button } from '../../../../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../../../../components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

interface NonLoginNavBarProps {
  onLoginClick: () => void;
}

export function NonLoginNavBar({ onLoginClick }: NonLoginNavBarProps) {
  const languages = [
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'ES', name: 'Spanish', flag: '🇪🇸' },
    { code: 'VI', name: 'Vietnamese', flag: '🇻🇳' },
    { code: 'ZH', name: 'Chinese', flag: '🇨🇳' },
    { code: 'HE', name: 'Hebrew', flag: '🇮🇱' },
  ];

  return (
    <nav className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img 
              src="https://lf-homepage-444859640964.us-central1.run.app/images/logo/loanfactory.svg" 
              alt="LoanFactory Logo"
              className="h-10 w-auto"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button 
              onClick={onLoginClick}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Login
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
