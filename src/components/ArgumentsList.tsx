
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ArgumentsListProps {
  inFavor: string[];
  against: string[];
  className?: string;
}

const ArgumentsList = ({ inFavor, against, className }: ArgumentsListProps) => {
  const { t } = useLanguage();
  
  const favorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  const againstVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { 
        delay: i * 0.1,
        duration: 0.5
      }
    })
  };

  return (
    <Card className={cn("shadow-md overflow-hidden", className)}>
      <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-2">
        <CardTitle className="text-xl font-medium flex items-center">
          <MessageCircle size={20} className="text-purple-500 mr-2" />
          <span>{t('common.arguments')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <CheckCircle size={20} className="text-green-500 mr-2" />
              <span>{t('common.forArguments')}</span>
            </h3>
            <ul className="space-y-3">
              {inFavor.map((argument, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={favorVariants}
                  className="pl-4 border-l-2 border-green-400 text-sm"
                  data-translate="true"
                >
                  {argument}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <XCircle size={20} className="text-red-500 mr-2" />
              <span>{t('common.againstArguments')}</span>
            </h3>
            <ul className="space-y-3">
              {against.map((argument, index) => (
                <motion.li
                  key={index}
                  custom={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={againstVariants}
                  className="pl-4 border-l-2 border-red-400 text-sm"
                  data-translate="true"
                >
                  {argument}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ArgumentsList;
