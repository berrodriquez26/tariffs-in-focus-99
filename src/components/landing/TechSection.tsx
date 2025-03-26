
import { motion } from 'framer-motion';
import { BrainCircuit, Zap, LineChart } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

const TechSection = () => {
  const { t } = useLanguage();
  
  const benefits = [
    {
      icon: <BrainCircuit className="h-10 w-10 text-white" />,
      title: t('landing.ai.agent'),
      description: t('landing.ai.agent.desc')
    },
    {
      icon: <Zap className="h-10 w-10 text-white" />,
      title: t('landing.realtime.analysis'),
      description: t('landing.realtime.analysis.desc')
    },
    {
      icon: <LineChart className="h-10 w-10 text-white" />,
      title: t('landing.visualization.action'),
      description: t('landing.visualization.action.desc')
    }
  ];

  return (
    <section className="py-16 px-6 bg-black">
      <div className="container mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12 reveal">
          <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
            {t('landing.ai.technology')}
          </h2>
          <p className="text-gray-400">
            {t('landing.ai.algorithms')}
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <Card key={index} className="border-none bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all reveal shadow-xl" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6 text-center">
                <div className="mb-4 flex justify-center p-4 rounded-full bg-white/10 w-20 h-20 mx-auto">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechSection;
