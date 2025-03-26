
import { AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ConcernsCardProps {
  concerns: string[];
  className?: string;
}

const ConcernsCard = ({ concerns, className }: ConcernsCardProps) => {
  const { t } = useLanguage();
  
  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <Card className={cn("shadow-md overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 pb-2">
        <CardTitle className="text-xl font-medium flex items-center">
          <AlertTriangle size={20} className="text-amber-500 mr-2" />
          <span>{t('common.concerns')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.ul 
          className="space-y-3 mt-4"
          variants={listVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {concerns.map((concern, index) => (
            <motion.li 
              key={index} 
              className="flex items-start"
              variants={itemVariants}
            >
              <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-amber-100 text-amber-800 text-sm font-medium mr-3 mt-0.5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="text-sm text-gray-700" data-translate="true">{concern}</span>
            </motion.li>
          ))}
        </motion.ul>
      </CardContent>
    </Card>
  );
};

export default ConcernsCard;
