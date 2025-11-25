import { Button } from "@/components/button";
import { CheckCircle2, Clock, FileText, Users, TrendingUp, Shield, Zap } from 'lucide-react';
import { ImageWithFallback } from "@/components/figma/ImageWithFallback";
import { Navbar } from "@/shared/components/Navbar";
import { Footer } from "@/shared/components/Footer";

interface LandingPageProps {
  onLoginClick: () => void;
}

export function LandingPage({ onLoginClick }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <Navbar onLoginClick={onLoginClick} />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full" style={{ fontSize: '14px' }}>
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
                  className="bg-orange-500 hover:bg-orange-600 text-white" 
                  style={{ fontSize: '18px', padding: '24px 32px', height: 'auto' }}
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
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-600">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-orange-500" />
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
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-orange-600" />
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

      {/* Features Section */}
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
            {/* Feature 1 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <FileText className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                Transaction Management
              </h3>
              <p className="text-gray-600">
                Track all your deals in one place with detailed transaction cards, status updates, and quick access to critical information.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                Commission Splitting
              </h3>
              <p className="text-gray-600">
                Easily split commissions between loan factory, agents, and other parties with flexible, customizable calculations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                Timeline Tracking
              </h3>
              <p className="text-gray-600">
                Stay on top of every milestone with visual timelines, task management, and automated deadline reminders.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                Document Management
              </h3>
              <p className="text-gray-600">
                Organize and access all paperwork in one secure location. Upload, categorize, and share documents seamlessly.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                Quick Actions
              </h3>
              <p className="text-gray-600">
                Speed up your workflow with customizable quick actions for common tasks and automated status updates.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '22px', fontWeight: '600' }}>
                Analytics & Insights
              </h3>
              <p className="text-gray-600">
                Make data-driven decisions with comprehensive reports, performance metrics, and transaction analytics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-orange-500 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-white mb-6" style={{ fontSize: '40px', fontWeight: '700' }}>
            Ready to Transform Your Real Estate Business?
          </h2>
          <p className="text-orange-100 mb-8 max-w-2xl mx-auto" style={{ fontSize: '18px' }}>
            Join thousands of real estate professionals who trust LoanFactory Transaction  to manage their transactions efficiently and close more deals.
          </p>
          <Button 
            onClick={onLoginClick}
            className="bg-orange-600 text-white hover:bg-orange-700"
            style={{ fontSize: '18px', padding: '24px 32px', height: 'auto' }}
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}