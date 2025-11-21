import { Button } from '../../../components/ui/button';
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

interface CTASectionProps {
  onLoginClick: () => void;
}

export function CTASection({ onLoginClick }: CTASectionProps) {
  const { config } = useWebsiteConfig();

  return (
    <section 
      className="py-20"
      style={{ 
        background: `linear-gradient(to bottom right, ${config.primaryColor}, ${config.primaryColor}DD)` 
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-white mb-6" style={{ fontSize: '40px', fontWeight: '700' }}>
          Ready to Transform Your Real Estate Business?
        </h2>
        <p className="mb-8 max-w-2xl mx-auto" style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.9)' }}>
          Join thousands of real estate professionals who trust LoanFactory Transaction to manage their transactions efficiently and close more deals.
        </p>
        <Button 
          onClick={onLoginClick}
          className="bg-white text-gray-900 hover:bg-gray-100"
          style={{ fontSize: '18px', padding: '24px 32px', height: 'auto' }}
        >
          Start Your Free Trial
        </Button>
      </div>
    </section>
  );
}
