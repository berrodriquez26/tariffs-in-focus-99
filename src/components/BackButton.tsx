
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton = ({ 
  to = '/dashboard', 
  label = 'Volver', 
  className 
}: BackButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button 
      variant="outline" 
      className={cn("flex items-center", className)} 
      onClick={handleClick}
    >
      <ChevronLeft className="mr-1" size={18} />
      {label}
    </Button>
  );
};

export default BackButton;
