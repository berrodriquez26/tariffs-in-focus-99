
import { InfoIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AdditionalInfo = ({ text }: { text: string }) => {
  const { t } = useLanguage();
  
  return (
    <Card className="shadow-md overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 pb-2">
        <CardTitle className="text-xl font-medium flex items-center">
          <InfoIcon size={20} className="text-gray-500 mr-2" />
          <span>{t('common.additionalInfo')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <p className="text-sm text-gray-700" data-translate="true">{text}</p>
      </CardContent>
    </Card>
  );
};

export default AdditionalInfo;
