
import { MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

interface PerceptionCardProps {
  description: string;
  className?: string;
}

const PerceptionCard = ({ description, className }: PerceptionCardProps) => {
  const { t } = useLanguage();
  
  return (
    <Card className={cn("shadow-md overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
        <CardTitle className="text-xl font-medium flex items-center">
          <MessageSquare size={20} className="text-blue-500 mr-2" />
          <span>{t('common.perception')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="relative">
          <span className="absolute top-0 left-0 text-gray-200 text-4xl font-serif">"</span>
          <p className="relative z-10 pt-6 pl-4 text-gray-700 text-sm leading-relaxed" data-translate="true">
            {description}
          </p>
          <span className="absolute bottom-0 right-0 text-gray-200 text-4xl font-serif">"</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PerceptionCard;
