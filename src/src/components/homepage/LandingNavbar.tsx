import { Button } from "../../../components/ui/button";
import { ImageWithFallback } from "../../../components/figma/ImageWithFallback";
import { useWebsiteConfig } from "../../../contexts/WebsiteConfigContext";

interface LandingNavbarProps {
  onLoginClick: () => void;
}

export function LandingNavbar({
  onLoginClick,
}: LandingNavbarProps) {
  const { config } = useWebsiteConfig();

  return (
    <nav className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={config.companyLogo}
              alt="Logo"
              className="h-10 w-50 object-contain"
            />
          </div>
          <div className="flex items-center gap-4">
            <a
              href="#features"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#pricing"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="text-gray-600 hover:text-gray-900 transition-colors"
            >
              Contact
            </a>
            <Button
              onClick={onLoginClick}
              className="text-white"
              style={{ backgroundColor: config.primaryColor }}
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}