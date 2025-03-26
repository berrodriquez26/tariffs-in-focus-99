
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HomeIcon, MapPinIcon, MessageSquare, TrendingUp, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const MainMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);
  const isMobile = useIsMobile();

  const handleNavigation = (path: string) => {
    setSelected(path);
    navigate(path);
  };

  const menuItems = [
    { label: "Vista General", path: '/dashboard', icon: HomeIcon },
    { label: "Por Estado", path: '/dashboard#estados', icon: MapPinIcon },
    { label: "Opiniones", path: '/opinions', icon: MessageSquare },
    { label: "Tendencias", path: '/trends', icon: TrendingUp },
  ];

  const handleStateSection = () => {
    if (location.pathname === '/dashboard') {
      // If we're already on dashboard, scroll to states section
      const statesSection = document.getElementById('estados-section');
      if (statesSection) {
        statesSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // Navigate to dashboard and add hash for states section
      navigate('/dashboard#estados');
    }
    setSelected('/dashboard#estados');
  };

  const renderMenuItems = () => (
    <>
      {menuItems.map((item) => {
        const isActive = selected === item.path;
        
        // Special handling for "Vista General" button
        if (item.path === '/dashboard') {
          return (
            <button
              key={item.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors text-sm",
                isActive 
                  ? "border border-white text-blue-700 font-medium" 
                  : "text-gray-700 hover:bg-gray-100"
              )}
              onClick={() => handleNavigation(item.path)}
            >
              <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        }
        
        // Special handling for states section
        if (item.path === '/dashboard#estados') {
          return (
            <button
              key={item.path}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors text-sm",
                "hover:bg-gray-100",
                isActive ? "bg-gray-200 text-gray-800 font-medium" : "text-gray-700"
              )}
              onClick={handleStateSection}
            >
              <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
              <span className="whitespace-nowrap">{item.label}</span>
            </button>
          );
        }
        
        return (
          <button
            key={item.path}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-colors text-sm",
              "hover:bg-gray-100",
              isActive ? "bg-gray-200 text-gray-800 font-medium" : "text-gray-700"
            )}
            onClick={() => handleNavigation(item.path)}
          >
            <item.icon className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="whitespace-nowrap">{item.label}</span>
          </button>
        );
      })}
    </>
  );

  return (
    <motion.div
      className="bg-white shadow-md rounded-md p-2 mb-8 w-full max-w-full overflow-hidden"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {!isMobile ? (
        <div className="flex flex-wrap justify-center gap-1 md:gap-2">
          {renderMenuItems()}
        </div>
      ) : (
        <Sheet>
          <SheetTrigger asChild>
            <button className="w-full flex items-center justify-center px-4 py-2 rounded-md hover:bg-gray-100">
              <Menu className="h-5 w-5 mr-2" />
              <span className="text-sm sm:text-base">Menú</span>
            </button>
          </SheetTrigger>
          <SheetContent className="w-[250px] sm:w-[300px] overflow-y-auto max-h-screen">
            <div className="flex flex-col gap-4 pt-10">
              {renderMenuItems()}
            </div>
          </SheetContent>
        </Sheet>
      )}
    </motion.div>
  );
};

export default MainMenu;
