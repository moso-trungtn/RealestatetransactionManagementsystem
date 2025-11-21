import { Button } from '../../../components/ui/button';
import { CheckCircle2, TrendingUp } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

interface HeroSectionProps {
  onLoginClick: () => void;
}

export function HeroSection({ onLoginClick }: HeroSectionProps) {
  const { config } = useWebsiteConfig();

  return (
    <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-4">
              <span 
                className="px-4 py-2 rounded-full" 
                style={{ 
                  backgroundColor: `${config.primaryColor}1A`,
                  color: config.primaryColor,
                  fontSize: '14px' 
                }}
              >
                Trusted by Real Estate Professionals
              </span>
            </div>
            <h1 className="text-gray-900 mb-6" style={{ fontSize: '48px', fontWeight: '700', lineHeight: '1.1' }}>
              Streamline Your Real Estate Transactions
            </h1>
            <p className="text-gray-600 mb-8" style={{ fontSize: '20px', lineHeight: '1.6' }}>
              The complete admin system designed for real estate professionals. Manage transactions, track commissions, coordinate paperwork, and close deals faster.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onLoginClick}
                className="text-white" 
                style={{ 
                  backgroundColor: config.primaryColor,
                  fontSize: '18px', 
                  padding: '24px 32px', 
                  height: 'auto' 
                }}
              >
                Get Started
              </Button>
              <Button 
                variant="outline"
                className="border-gray-300 text-gray-700"
                style={{ fontSize: '18px', padding: '24px 32px', height: 'auto' }}
              >
                Watch Demo
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span className="text-gray-600">No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" style={{ color: config.primaryColor }} />
                <span className="text-gray-600">Setup in minutes</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback 
                src="https://images.unsplash.com/photo-1640109341881-1cd3eaf50909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZWFsJTIwZXN0YXRlJTIwb2ZmaWNlfGVufDF8fHx8MTc2MzY0NDA0MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Real Estate Office"
                className="w-full h-auto"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-6 border border-gray-100">
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${config.primaryColor}1A` }}
                >
                  <TrendingUp className="w-6 h-6" style={{ color: config.primaryColor }} />
                </div>
                <div>
                  <div className="text-gray-900" style={{ fontSize: '24px', fontWeight: '700' }}>98%</div>
                  <div className="text-gray-600" style={{ fontSize: '14px' }}>Success Transactions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
