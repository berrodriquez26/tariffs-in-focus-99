
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { HomeIcon, MapPinIcon, MessageSquare, TrendingUp, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleNavigation = (path: string) => {
    setSelected(path);
    navigate(path);
    onClose();
  };

  const menuItems = [
    { label: 'Análisis General', path: '/dashboard', icon: HomeIcon },
    { label: 'Por Estados', path: '/dashboard#estados', icon: MapPinIcon },
    { label: 'Opiniones', path: '/opiniones', icon: MessageSquare },
    { label: 'Tendencias', path: '/tendencias', icon: TrendingUp },
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
    onClose();
  };

  return (
    <Drawer open={open} onOpenChange={onClose}>
      <DrawerContent className="max-h-[90vh] overflow-y-auto">
        <DrawerHeader className="flex justify-between items-center border-b pb-2">
          <DrawerTitle className="text-sm sm:text-base">Menú de Navegación</DrawerTitle>
          <DrawerClose className="rounded-full p-1 hover:bg-gray-100">
            <X className="h-4 w-4 sm:h-5 sm:w-5" />
          </DrawerClose>
        </DrawerHeader>
        <div className="px-2 sm:px-4 py-4 sm:py-6 flex flex-col gap-1 sm:gap-2">
          {menuItems.map((item) => {
            const isActive = selected === item.path;
            
            // Special handling for states section
            if (item.path === '/dashboard#estados') {
              return (
                <button
                  key={item.path}
                  className={cn(
                    "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-md transition-colors w-full",
                    "hover:bg-gray-100",
                    isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                  )}
                  onClick={handleStateSection}
                >
                  <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  <span className="text-sm sm:text-base truncate">{item.label}</span>
                </button>
              );
            }
            
            return (
              <button
                key={item.path}
                className={cn(
                  "flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 sm:py-3 rounded-md transition-colors w-full",
                  "hover:bg-gray-100",
                  isActive ? "bg-blue-50 text-blue-700 font-medium" : "text-gray-700"
                )}
                onClick={() => handleNavigation(item.path)}
              >
                <item.icon className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                <span className="text-sm sm:text-base truncate">{item.label}</span>
              </button>
            );
          })}
          
          {/* Add login and register buttons at the bottom of mobile menu */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <Link 
              to="/login" 
              className="flex items-center px-2 sm:px-4 py-2 sm:py-3 text-gray-700 hover:bg-gray-100 rounded-md transition-colors w-full"
              onClick={onClose}
            >
              <span className="text-sm sm:text-base">Iniciar Sesión</span>
            </Link>
            <Link 
              to="/register" 
              className="mt-2 w-full"
              onClick={onClose}
            >
              <Button className="w-full" variant="default">
                Registrarse
              </Button>
            </Link>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileMenu;
