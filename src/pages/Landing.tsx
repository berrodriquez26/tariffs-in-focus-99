
import React, { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

// Import components
import LandingHeader from '@/components/landing/LandingHeader';
import HeroSection from '@/components/landing/HeroSection';
import TechSection from '@/components/landing/TechSection';
import PricingSection from '@/components/landing/PricingSection';
import DashboardsSection from '@/components/landing/DashboardsSection';
import AboutSection from '@/components/landing/AboutSection';
import TeamSection from '@/components/landing/TeamSection';
import ContactSection from '@/components/landing/ContactSection';
import FooterSection from '@/components/landing/FooterSection';
import { Toaster } from '@/components/ui/toaster';

declare global {
  interface Window {
    VANTA: {
      NET: (config: any) => any;
    };
  }
}

const Landing: React.FC = () => {
  const [imageExpanded, setImageExpanded] = useState(false);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  
  const toggleImageExpansion = () => {
    setImageExpanded(!imageExpanded);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    if (imageExpanded && !(e.target as HTMLElement).closest('.hero-image')) {
      setImageExpanded(false);
    }
  };
  
  // Attach and detach event listener for outside clicks
  React.useEffect(() => {
    if (imageExpanded) {
      document.addEventListener('click', handleOutsideClick);
    }
    
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [imageExpanded]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-black">
      <LandingHeader />

      <main className="flex-grow relative z-40 pt-[73px]">
        <HeroSection 
          toggleImageExpansion={toggleImageExpansion} 
          imageExpanded={imageExpanded} 
        />
        <TechSection />
        <PricingSection />
        <DashboardsSection />
        <AboutSection />
        <TeamSection />
        <ContactSection />
      </main>

      <FooterSection />
      <Toaster />
    </div>
  );
};

export default Landing;
