import { LandingNavbar } from '../components/homepage/LandingNavbar';
import { HeroSection } from '../components/homepage/HeroSection';
import { FeaturesSection } from '../components/homepage/FeaturesSection';
import { CTASection } from '../components/homepage/CTASection';
import { Footer } from '../components/common/Footer';

interface HomePageProps {
  onLoginClick: () => void;
}

export function HomePage({ onLoginClick }: HomePageProps) {
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar onLoginClick={onLoginClick} />
      <HeroSection onLoginClick={onLoginClick} />
      <FeaturesSection />
      <CTASection onLoginClick={onLoginClick} />
      <Footer />
    </div>
  );
}