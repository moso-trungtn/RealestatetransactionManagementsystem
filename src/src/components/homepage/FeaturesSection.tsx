import { FileText, Users, Clock, Shield, Zap, TrendingUp } from 'lucide-react';
import { FeatureCard } from './FeatureCard';

const features = [
  {
    icon: FileText,
    title: 'Transaction Management',
    description: 'Track all your deals in one place with detailed transaction cards, status updates, and quick access to critical information.'
  },
  {
    icon: Users,
    title: 'Commission Splitting',
    description: 'Easily split commissions between loan factory, agents, and other parties with flexible, customizable calculations.'
  },
  {
    icon: Clock,
    title: 'Timeline Tracking',
    description: 'Stay on top of every milestone with visual timelines, task management, and automated deadline reminders.'
  },
  {
    icon: Shield,
    title: 'Document Management',
    description: 'Organize and access all paperwork in one secure location. Upload, categorize, and share documents seamlessly.'
  },
  {
    icon: Zap,
    title: 'Quick Actions',
    description: 'Speed up your workflow with customizable quick actions for common tasks and automated status updates.'
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Insights',
    description: 'Make data-driven decisions with comprehensive reports, performance metrics, and transaction analytics.'
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-gray-900 mb-4" style={{ fontSize: '40px', fontWeight: '700' }}>
            Everything You Need to Close Deals
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Powerful features designed to help real estate professionals manage transactions from start to finish
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
