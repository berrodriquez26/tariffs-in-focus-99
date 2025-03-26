
import { motion } from 'framer-motion';
import { MapPin, AlertCircle, TrendingUp, LineChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const NationalSummary = ({ className }: { className?: string }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={container}
      className={className}
    >
      <Card className="shadow-md h-full">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-slate-50 pb-2">
          <CardTitle className="text-lg md:text-xl flex items-center">
            <MapPin className="mr-2 h-5 w-5 text-gray-700" />
            <span data-translate="true">Resumen Nacional</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="space-y-4 text-sm">
            <motion.p className="leading-relaxed" variants={item} data-translate="true">
              La percepción nacional sobre los aranceles anunciados por Donald Trump muestra un claro predominio del sentimiento negativo (61.5%), con preocupaciones centradas en el impacto económico, particularmente en sectores como manufactura, agricultura y automotriz.
            </motion.p>
            
            <motion.p className="leading-relaxed" variants={item} data-translate="true">
              Sin embargo, existe una notable variación regional, con Ciudad de México mostrando un sentimiento significativamente más positivo (45%) que el resto del país, mientras estados como Zacatecas y Michoacán presentan los niveles más altos de preocupación.
            </motion.p>
            
            <motion.h3 className="text-md font-medium mt-4 mb-2 flex items-center" variants={item}>
              <AlertCircle size={16} className="text-amber-500 mr-2" />
              <span data-translate="true">Factores que influyen en la percepción</span>
            </motion.h3>
            
            <motion.ul className="space-y-2 list-inside list-disc pl-2" variants={item}>
              <li data-translate="true">Dependencia económica con EUA a nivel estatal</li>
              <li data-translate="true">Sectores económicos predominantes en cada región</li>
              <li data-translate="true">Proximidad geográfica a la frontera norte</li>
              <li data-translate="true">Alineación política con el gobierno federal</li>
              <li data-translate="true">Nivel de desarrollo económico y diversificación</li>
            </motion.ul>
            
            <motion.h3 className="text-md font-medium mt-4 mb-2 flex items-center" variants={item}>
              <TrendingUp size={16} className="text-blue-500 mr-2" />
              <span data-translate="true">Narrativas predominantes</span>
            </motion.h3>
            
            <motion.ul className="space-y-2 list-inside list-disc pl-2" variants={item}>
              <li data-translate="true">Amenaza a la economía y empleos mexicanos</li>
              <li data-translate="true">Oportunidad para diversificar mercados y reducir dependencia</li>
              <li data-translate="true">Medida electoral sin implementación real</li>
              <li data-translate="true">Necesidad de respuesta firme del gobierno mexicano</li>
            </motion.ul>
            
            <motion.p className="mt-4 text-gray-700 italic" variants={item} data-translate="true">
              "Los aranceles representan un desafío significativo pero también una oportunidad para fortalecer la economía interna y diversificar nuestras relaciones comerciales"
            </motion.p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default NationalSummary;
