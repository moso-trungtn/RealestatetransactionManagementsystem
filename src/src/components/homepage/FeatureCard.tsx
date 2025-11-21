import { LucideIcon } from 'lucide-react';
import { useWebsiteConfig } from '../../../contexts/WebsiteConfigContext';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function FeatureCard({ icon: Icon, title, description }: FeatureCardProps) {
  const { config } = useWebsiteConfig();

  return (
    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
      <div 
        className="w-12 h-12 rounded-lg flex items-center justify-center mb-6"
        style={{ 
          backgroundColor: `${config.primaryColor}1A`,
        }}
      >
        <Icon 
          className="w-6 h-6" 
          style={{ color: config.primaryColor }}
        />
      </div>
      <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
        {title}
      </h3>
      <p className="text-gray-600">
        {description}
      </p>
    </div>
  );
}
