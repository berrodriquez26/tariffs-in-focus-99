
import { MapPin, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useState } from 'react';

interface Region {
  name: string;
  states: string;
  sentiment: string;
  concerns: string[];
  color: string;
}

const RegionalVariationMap = () => {
  const [loading, setLoading] = useState(false);

  // Original data in Spanish
  const regions: Region[] = [
    {
      name: "Estados Fronterizos",
      states: "Baja California, Sonora, Chihuahua, Coahuila, Nuevo León, Tamaulipas",
      sentiment: "Negativo 60-70%",
      concerns: [
        "Alta dependencia de exportaciones a EUA",
        "Impacto en plantas maquiladoras y empleos",
        "Preocupación por migración y seguridad"
      ],
      color: "#dc2626"
    },
    {
      name: "Centro Industrial",
      states: "Querétaro, Guanajuato, Aguascalientes, SLP, Jalisco",
      sentiment: "Negativo 60-65%",
      concerns: [
        "Afectación a cadenas de suministro automotriz",
        "Incertidumbre en inversión extranjera",
        "Impacto en manufactura de exportación"
      ],
      color: "#2563eb"
    },
    {
      name: "Ciudad de México",
      states: "CDMX",
      sentiment: "Positivo 45% vs Negativo 25%",
      concerns: [
        "Menor dependencia directa de exportaciones",
        "Perspectiva de fortalecer economía interna",
        "Oportunidad para diversificar mercados"
      ],
      color: "#16a34a"
    },
    {
      name: "Región Agrícola",
      states: "Sinaloa, Michoacán, Guerrero, Oaxaca, Chiapas",
      sentiment: "Negativo 65-70%",
      concerns: [
        "Impacto en exportaciones agrícolas",
        "Efecto en precios de productos básicos",
        "Vulnerabilidad de pequeños productores"
      ],
      color: "#ca8a04"
    },
    {
      name: "Estados con Recursos Naturales",
      states: "Veracruz, Tabasco, Campeche, Yucatán",
      sentiment: "Negativo 55-70%",
      concerns: [
        "Impacto en exportaciones petroleras",
        "Efecto en turismo internacional",
        "Consecuencias para inversión en energéticos"
      ],
      color: "#9333ea"
    }
  ];

  // Factors data
  const factorsData = {
    title: "Factores de Variación Regional",
    factors: [
      {
        title: "Perfil Económico",
        description: "Sectores económicos predominantes y nivel de exportaciones a EUA"
      },
      {
        title: "Proximidad a Frontera",
        description: "Cercanía geográfica e integración con la economía estadounidense"
      },
      {
        title: "Alineación Política",
        description: "Posturas políticas predominantes y relación con gobierno federal"
      },
      {
        title: "Desarrollo Económico",
        description: "Niveles de diversificación económica y resiliencia regional"
      }
    ]
  };

  // Title
  const cardTitle = "Mapa de Variación Regional";

  // Display loading state while translations are in progress
  if (loading) {
    return (
      <Card className="shadow-md animate-pulse">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 pb-2">
          <div className="h-6 bg-slate-200 rounded w-3/4"></div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="space-y-4">
                <div className="h-6 bg-slate-200 rounded w-2/3"></div>
                <div className="space-y-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex">
                      <div className="h-5 w-5 rounded-full bg-slate-200 mr-2"></div>
                      <div className="w-full">
                        <div className="h-4 bg-slate-200 rounded w-1/3 mb-2"></div>
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 gap-4 md:gap-3">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="p-4 border rounded-lg">
                  <div className="flex mb-2">
                    <div className="w-3 h-3 rounded-full mr-2 bg-slate-300"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/3"></div>
                    <div className="ml-auto h-4 bg-slate-200 rounded w-20"></div>
                  </div>
                  <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="space-y-1">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="flex">
                        <div className="h-3 w-3 mr-1 bg-slate-200 rounded"></div>
                        <div className="h-3 bg-slate-200 rounded w-full"></div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Display the actual content with translations
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 pb-2">
          <CardTitle className="text-2xl flex items-center">
            <MapPin className="mr-2 h-6 w-6 text-emerald-500" />
            <span data-translate="true">{cardTitle}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="text-sm space-y-4">
                <h3 className="text-lg font-medium" data-translate="true">{factorsData.title}</h3>
                <ul className="space-y-3">
                  {factorsData.factors.map((factor, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-2 mt-0.5">{index + 1}</span>
                      <div>
                        <span className="font-medium" data-translate="true">{factor.title}</span>
                        <p className="mt-1 text-gray-600" data-translate="true">{factor.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:col-span-2 grid grid-cols-1 gap-4 md:gap-3">
              {regions.map((region, index) => (
                <motion.div
                  key={region.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <div className="p-4 flex flex-col h-full">
                      <div className="flex items-center mb-2">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: region.color }}
                        ></div>
                        <h3 className="font-medium text-sm" data-translate="true">{region.name}</h3>
                        <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-gray-100" data-translate="true">
                          {region.sentiment}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mb-2">{region.states}</p>
                      <ul className="text-xs text-gray-600 space-y-1 mt-auto">
                        {region.concerns.map((concern, i) => (
                          <li key={i} className="flex items-start">
                            <Navigation className="h-3 w-3 text-gray-400 mr-1 mt-0.5" />
                            <span data-translate="true">{concern}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default RegionalVariationMap;
