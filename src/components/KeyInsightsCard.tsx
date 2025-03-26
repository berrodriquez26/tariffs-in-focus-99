
import { AlertCircle, Lightbulb, Map, Building, Users, Globe, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const KeyInsightsCard = () => {
  const insights = [
    {
      icon: <Lightbulb className="h-6 w-6 text-amber-500" />,
      title: "Dualidad Amenaza/Oportunidad",
      description: "La percepción oscila entre ver los aranceles como amenaza económica (61.5%) y como oportunidad para diversificar mercados (16.2%)."
    },
    {
      icon: <Map className="h-6 w-6 text-blue-500" />,
      title: "Impacto Regional Diferenciado",
      description: "Estados fronterizos y manufactureros muestran mayor preocupación que regiones menos dependientes del comercio con EUA."
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Polarización Política",
      description: "Las opiniones están fuertemente influenciadas por la alineación política, con simpatizantes oficialistas mostrando menos preocupación."
    },
    {
      icon: <Building className="h-6 w-6 text-red-500" />,
      title: "Anomalía CDMX",
      description: "La capital es el único estado con sentimiento predominantemente positivo (45%), posiblemente por menor dependencia directa de exportaciones."
    },
    {
      icon: <Globe className="h-6 w-6 text-green-500" />,
      title: "Soberanía vs Pragmatismo",
      description: "Debate entre la defensa de la soberanía económica y la necesidad pragmática de mantener relaciones comerciales estables."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-gray-500" />,
      title: "Nacionalismo Económico",
      description: "Creciente narrativa sobre la necesidad de fortalecer el mercado interno y reducir la dependencia económica exterior."
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-amber-50 to-yellow-50 pb-2">
          <CardTitle className="text-2xl flex items-center">
            <AlertCircle className="mr-2 h-6 w-6 text-amber-500" />
            <span data-translate="true">Análisis de Hallazgos Clave</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={insight.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-center mb-3">
                      {insight.icon}
                      <h3 className="ml-2 font-semibold" data-translate="true">{insight.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed" data-translate="true">
                      {insight.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default KeyInsightsCard;
