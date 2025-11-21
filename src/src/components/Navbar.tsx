import { Bell, Home, FileText, Newspaper } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../../components/ui/avatar';
import { ImageWithFallback } from '../../components/figma/ImageWithFallback';
import { useWebsiteConfig } from '../../contexts/WebsiteConfigContext';
import { Badge } from '../../components/ui/badge';

export type NavItem = 'home' | 'transactions' | 'news' | 'demoform' | 'settings' | 'templates';

interface NavbarProps {
  activeItem?: NavItem;
  onNavigate?: (item: NavItem) => void;
  onProfileClick?: () => void;
  userName?: string;
  userInitials?: string;
  userAvatar?: string;
  notificationCount?: number;
}

export function Navbar({
  activeItem = 'transactions',
  onNavigate,
  onProfileClick,
  userName = 'Admin',
  userInitials = 'A',
  userAvatar,
  notificationCount = 0,
}: NavbarProps) {
  const { config } = useWebsiteConfig();

  const handleNavClick = (item: NavItem) => {
    if (onNavigate) {
      onNavigate(item);
    }
  };

  const navItems = [
    { id: 'home' as NavItem, label: 'Home', icon: Home },
    { id: 'transactions' as NavItem, label: 'Transactions', icon: FileText },
    { id: 'news' as NavItem, label: 'News', icon: Newspaper },
    { id: 'demoform' as NavItem, label: 'Demo Form', icon: null },
    { id: 'settings' as NavItem, label: 'Website Settings', icon: null },
    { id: 'templates' as NavItem, label: 'Templates', icon: null },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left Section - Logo and Navigation */}
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <ImageWithFallback 
              src={config.companyLogo}
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </div>
          
          {/* Navigation Links */}
          <nav className="flex gap-2">
            {navItems.map((item) => {
              const isActive = activeItem === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        
        {/* Right Section - Notifications and User */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <div className="relative">
            <Button 
              variant="ghost" 
              size="icon"
              className="relative"
            >
              <Bell className="h-5 w-5 text-gray-600" />
              {notificationCount > 0 && (
                <Badge 
                  className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                  style={{ 
                    backgroundColor: config.primaryColor,
                    color: 'white',
                  }}
                >
                  {notificationCount > 9 ? '9+' : notificationCount}
                </Badge>
              )}
            </Button>
          </div>

          {/* User Avatar */}
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onProfileClick}
            className="rounded-full hover:bg-gray-100"
            title={userName}
          >
            <Avatar className="h-8 w-8">
              {userAvatar && <AvatarImage src={userAvatar} alt={userName} />}
              <AvatarFallback className="bg-yellow-400 text-white">
                {userInitials}
              </AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
    </header>
  );
}
