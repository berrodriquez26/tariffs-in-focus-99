
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageToggle from '@/components/LanguageToggle';
import { useIsMobile } from '@/hooks/use-mobile';
import { useLanguage } from '@/contexts/LanguageContext';

const LandingHeader = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const { t } = useLanguage();
  const [isNavOpen, setIsNavOpen] = useState(false);
  
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    if (currentScrollY > 80) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
    
    if (currentScrollY < lastScrollY || currentScrollY <= 10) {
      setIsNavVisible(true);
    } else {
      setIsNavVisible(false);
    }
    
    setLastScrollY(currentScrollY);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (e.clientY < 60) {
      setIsNavVisible(true);
    }
  };
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
    setIsNavOpen(false);
  };

  return (
    <header 
      ref={navRef}
      className={`py-4 px-6 border-b border-white/10 fixed top-0 left-0 right-0 bg-black/90 backdrop-blur-sm z-50 transition-transform duration-300 ${
        isNavVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center -ml-4 md:-ml-6">
          <img 
            src="/lovable-uploads/126136a6-6438-494f-857b-3b44cbe78dc4.png" 
            alt="QuienOpina Logo" 
            className={`${isMobile ? "h-10 w-auto ml-0" : "h-8 w-auto"} cursor-pointer`}
            onClick={() => navigate('/')}
          />
        </div>
        
        {!isMobile && (
          <div className="flex flex-1 justify-center space-x-4">
            <button 
              onClick={() => scrollToSection('about-us')}
              className="text-gray-400 px-5 py-2 rounded-full text-base hover:text-white hover:underline transition-colors font-medium"
            >
              {t('landing.aboutUs')}
            </button>
            <button 
              onClick={() => scrollToSection('dashboards')}
              className="text-gray-400 px-5 py-2 rounded-full text-base hover:text-white hover:underline transition-colors font-medium"
            >
              {t('landing.dashboards')}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-gray-400 px-5 py-2 rounded-full text-base hover:text-white hover:underline transition-colors font-medium"
            >
              {t('landing.contact')}
            </button>
          </div>
        )}
        
        <div className="flex items-center gap-3">
          {!isMobile && (
            <>
              <Link to="/login" className="text-base font-medium text-gray-400 hover:text-white hover:underline px-3 py-2">
                {t('landing.login')}
              </Link>
              <Link to="/register">
                <Button size="default" className="bg-white text-black hover:bg-white/90 px-5 py-2 text-base font-medium">
                  {t('landing.register')}
                </Button>
              </Link>
            </>
          )}
          
          <LanguageToggle size="xs" />
          
          {isMobile && (
            <Sheet open={isNavOpen} onOpenChange={setIsNavOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-white p-0 absolute right-4 top-4"
                >
                  <Menu className="h-12 w-12" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-black/95 border-white/20 w-64">
                <div className="flex flex-col space-y-4 pt-10">
                  <button 
                    onClick={() => scrollToSection('about-us')}
                    className="text-gray-400 px-5 py-3 rounded-full text-lg hover:text-white hover:underline transition-colors w-full text-left font-medium"
                  >
                    {t('landing.aboutUs')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('dashboards')}
                    className="text-gray-400 px-5 py-3 rounded-full text-lg hover:text-white hover:underline transition-colors w-full text-left font-medium"
                  >
                    {t('landing.dashboards')}
                  </button>
                  <button 
                    onClick={() => scrollToSection('contact')}
                    className="text-gray-400 px-5 py-3 rounded-full text-lg hover:text-white hover:underline transition-colors w-full text-left font-medium"
                  >
                    {t('landing.contact')}
                  </button>
                  
                  <div className="pt-4 border-t border-white/10 mt-2">
                    <Link 
                      to="/login" 
                      className="text-gray-400 px-5 py-3 rounded-full text-lg hover:text-white hover:underline transition-colors w-full text-left block font-medium"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {t('landing.login')}
                    </Link>
                    <Link 
                      to="/register" 
                      className="bg-white text-black hover:bg-white/90 mt-3 px-5 py-3 rounded-md text-lg font-medium w-full text-center block"
                      onClick={() => setIsNavOpen(false)}
                    >
                      {t('landing.register')}
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          )}
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
