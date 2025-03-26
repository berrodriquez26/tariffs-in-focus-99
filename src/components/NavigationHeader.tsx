
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, MapPinIcon, MessageSquare, CalendarDays, TrendingUp, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import LanguageToggle from './LanguageToggle';

const NavigationHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 80) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Update selected when location changes
  useEffect(() => {
    setSelected(location.pathname);
  }, [location.pathname]);
  
  const handleNavigation = (path: string) => {
    setSelected(path);
    navigate(path);
    window.scrollTo(0, 0); // Scroll to top when navigating
  };
  
  const menuItems = [{
    label: "Vista General",
    path: '/dashboard',
    icon: HomeIcon
  }, {
    label: "Por Estado",
    path: '/dashboard#estados',
    icon: MapPinIcon
  }, {
    label: "Opiniones",
    path: '/opinions',
    icon: MessageSquare
  }, {
    label: "Tendencias",
    path: '/trends',
    icon: TrendingUp
  }];
  
  const handleStateSection = () => {
    if (location.pathname === '/dashboard') {
      // If we're already on dashboard, scroll to states section
      const statesSection = document.getElementById('estados-section');
      if (statesSection) {
        statesSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    } else {
      // Navigate to dashboard and add hash for states section
      navigate('/dashboard#estados');
    }
    setSelected('/dashboard#estados');
  };
  
  const renderNavigationItems = () => <>
    {menuItems.map(item => {
      const isActive = selected === item.path;

      // Special styling for "Vista General" button
      if (item.path === '/dashboard') {
        return <button 
          key={item.path} 
          className={cn(
            "flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors text-sm",
            isActive 
              ? "border border-white text-white font-medium" 
              : "text-gray-300 hover:bg-gray-700"
          )}
          onClick={() => handleNavigation(item.path)}
        >
          <item.icon className="h-3.5 w-3.5" />
          <span>{item.label}</span>
        </button>;
      }

      // Special handling for states section
      if (item.path === '/dashboard#estados') {
        return <button key={item.path} className={cn(
          "flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors text-sm", 
          "hover:bg-gray-700", 
          isActive ? "bg-gray-800 text-white font-medium" : "text-gray-300"
        )} onClick={handleStateSection}>
              <item.icon className="h-3.5 w-3.5" />
              <span>{item.label}</span>
            </button>;
      }
      
      return <button key={item.path} className={cn(
        "flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors text-sm", 
        "hover:bg-gray-700", 
        isActive ? "bg-gray-800 text-white font-medium" : "text-gray-300"
      )} onClick={() => handleNavigation(item.path)}>
            <item.icon className="h-3.5 w-3.5" />
            <span>{item.label}</span>
          </button>;
    })}
  </>;
  
  return <motion.div className={cn("fixed top-0 left-0 right-0 z-30 bg-black transition-all duration-300", scrolled ? "shadow-md py-2" : "py-4")} initial={{
    opacity: 0,
    y: -10
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.3
  }}>
    <div className="container mx-auto px-4">
      <div className="flex items-center justify-between">
        {/* Logo section - Added onClick to navigate to landing page */}
        <div className="flex items-center ml-2 md:ml-4">
          <img 
            src="/lovable-uploads/126136a6-6438-494f-857b-3b44cbe78dc4.png" 
            alt="QuienOpina Logo" 
            className={cn("transition-all duration-300 cursor-pointer", 
              scrolled ? "h-10" : "h-12", 
              isMobile && "ml-2"
            )} 
            onClick={() => navigate('/')}
          />
          <div className="ml-4 hidden sm:flex items-center text-sm text-gray-300">
            <CalendarDays className="h-4 w-4 mr-1" />
            <span>Análisis: 1-24 de marzo, 2025</span>
          </div>
        </div>
        
        {/* Navigation menu - Desktop */}
        {!isMobile && <div className="flex items-center">
          <div className="flex flex-wrap justify-end gap-1 md:gap-2">
            {renderNavigationItems()}
          </div>
          <div className="ml-2">
            <LanguageToggle size="xs" />
          </div>
        </div>}

        {/* Navigation menu - Mobile */}
        {isMobile && <div className="flex items-center gap-2 mr-0">
          <LanguageToggle size="xs" />
          <Sheet>
            <SheetTrigger asChild>
              <button className="p-0 rounded-md hover:bg-gray-800 text-gray-300 ml-auto">
                <Menu className="h-11 w-11" />
              </button>
            </SheetTrigger>
            <SheetContent className="w-[250px] sm:w-[300px] bg-black/95 border-white/20">
              <div className="flex flex-col gap-4 pt-10 text-gray-300">
                {renderNavigationItems()}
              </div>
            </SheetContent>
          </Sheet>
        </div>}
      </div>
    </div>
  </motion.div>;
};

export default NavigationHeader;
