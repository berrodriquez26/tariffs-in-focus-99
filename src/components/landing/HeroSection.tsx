
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';
import TypewriterEffect from './TypewriterEffect';

interface HeroSectionProps {
  toggleImageExpansion: () => void;
  imageExpanded: boolean;
}

const HeroSection = ({ toggleImageExpansion, imageExpanded }: HeroSectionProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [vantaEffect, setVantaEffect] = useState<any>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!vantaEffect && heroRef.current && window.VANTA) {
      const newVantaEffect = window.VANTA.NET({
        el: heroRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xffffff,
        backgroundColor: 0x0,
        points: 9.00,
        maxDistance: 23.00,
        spacing: 20.00
      });
      setVantaEffect(newVantaEffect);
    }

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  // Handle image load event
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <section 
      ref={heroRef} 
      className="relative h-[calc(100vh-73px)] overflow-hidden"
    >
      <div className="vanta-container"></div>
      <div className="container mx-auto h-full flex items-center justify-between z-10 relative px-2 sm:px-4">
        <div className={`grid grid-cols-12 gap-2 md:gap-6 items-center h-full ${imageExpanded ? 'opacity-20 pointer-events-none' : 'opacity-100'}`}>
          <div className="col-span-12 md:col-span-5 z-10 space-y-3 md:space-y-6 text-white px-0 sm:px-2 md:pl-8 order-1 md:order-1 mt-4 md:mt-0">
            <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <TypewriterEffect />
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 px-3 py-1 rounded-md bg-black/60 inline-block">
              {t('landing.data.analysis')}
            </p>
            <div className="pt-2 md:pt-4">
              <Link to="/dashboard">
                <Button size="lg" className="group bg-white text-black hover:bg-white/90 tech-button text-lg">
                  {t('landing.explore.dashboard')}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="col-span-12 md:col-span-7 flex items-center justify-center md:justify-end order-2 md:order-2 mt-3 md:mt-0">
            <div className="relative z-10 w-full max-w-[95%] md:max-w-full">
              <img
                src="/lovable-uploads/83e22d72-a11e-4798-b491-86a89460c633.png"
                alt={t('landing.dashboard.analytics')}
                className={`hero-image rounded-lg shadow-2xl object-contain w-full hover:scale-105 transition-all duration-300 cursor-pointer ${
                  imageLoaded ? 'animate-fade-in opacity-100' : 'opacity-0'
                }`}
                onClick={toggleImageExpansion}
                onLoad={handleImageLoad}
              />
            </div>
          </div>
        </div>
      </div>
      
      {imageExpanded && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 cursor-pointer backdrop-blur-sm opacity-0 animate-fade-in"
          onClick={toggleImageExpansion}
          style={{ animation: 'fade-in 0.3s ease-in-out forwards' }}
        ></div>
      )}
      
      {imageExpanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center opacity-0 animate-fade-in" 
              style={{ animation: 'fade-in 0.4s ease-in-out forwards' }}>
          <img
            src="/lovable-uploads/83e22d72-a11e-4798-b491-86a89460c633.png"
            alt={t('landing.dashboard.analytics')}
            className="hero-image-expanded max-w-[80%] max-h-[80vh] rounded-lg shadow-2xl object-contain cursor-pointer"
            onClick={toggleImageExpansion}
            style={{ 
              transform: 'scale(0.9)',
              opacity: '0',
              animation: 'scale-in 0.5s ease-in-out forwards',
              animationDelay: '0.1s'
            }}
          />
        </div>
      )}
    </section>
  );
};

export default HeroSection;
