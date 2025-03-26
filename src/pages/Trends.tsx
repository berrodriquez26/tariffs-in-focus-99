import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Globe, TrendingUp, Percent, PieChart, Circle, DollarSign, ShoppingBag, Briefcase, Building, FileText, LineChart, BarChart4, TrendingDown, PercentCircle } from 'lucide-react';
import NavigationHeader from '@/components/NavigationHeader';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateAllElements } from '@/utils/translateUtils';

const trendsData = {
  "mexico": {
    "Impacto Económico y Recesión": {
      "description": "Titulares que analizan cómo los aranceles pueden contraer la economía mexicana, con proyecciones de recesión y efectos negativos en el consumo.",
      "ranking": 1,
      "porcentaje": "23%",
      "icon": "economy",
      "noticias": [
        {
          "titulo": "Economía de México recibiría 'trancazo' por aranceles de Trump: Se contraería 1.3% si se aplican",
          "descripcion": "Estudio indica que un arancel del 25% podría contraer la economía mexicana en un 1.3%.",
          "link": "https://www.elfinanciero.com.mx/economia/2025/03/18/caeria-economia-13-si-trump-impone-aranceles-a-mexico/"
        },
        {
          "titulo": "La OCDE prevé que México entre en recesión este año por los aranceles de Trump",
          "descripcion": "El organismo ajusta sus previsiones de crecimiento ante la incertidumbre generada por los aranceles.",
          "link": "https://elpais.com/mexico/2025-03-17/la-ocde-preve-que-mexico-entre-en-recesion-este-ano-por-los-aranceles-de-trump.html"
        }
      ]
    },
    "Impacto en Industrias y Sectores": {
      "description": "Titulares que abordan el efecto de los aranceles en sectores específicos, como el textil, automotriz, bebidas y agroindustria.",
      "ranking": 2,
      "porcentaje": "11%",
      "icon": "industry",
      "noticias": [
        {
          "titulo": "Amago de aranceles reduce 20% pedidos de ropa mexicana",
          "descripcion": "La incertidumbre arancelaria impacta negativamente la industria del vestido.",
          "link": "https://www.jornada.com.mx/noticia/2025/03/23/economia/amago-de-aranceles-reduce-20-pedidos-de-ropa-mexicana"
        },
        {
          "titulo": "Aranceles 'secarán' EU de cerveza mexicana y tequila",
          "descripcion": "Las tarifas podrían limitar la importación de cerveza y tequila pese a la alta cobertura de producción local.",
          "link": "https://www.milenio.com/negocios/aranceles-secaran-eu-cerveza-mexicana-tequila"
        }
      ]
    },
    "Negociaciones y Respuestas Gubernamentales": {
      "description": "Titulares que muestran reuniones, declaraciones y estrategias de respuesta del gobierno mexicano frente a la presión arancelaria.",
      "ranking": 3,
      "porcentaje": "41%",
      "icon": "government",
      "noticias": [
        {
          "titulo": "Sheinbaum se reúne con empresarios en Monterrey para analizar impacto de aranceles",
          "descripcion": "La presidenta se reúne con representantes del sector para definir estrategias ante la incertidumbre.",
          "link": "https://cnnespanol.cnn.com/2025/03/20/economia/video/economia-guerra-comercial-eeuu-aranceles-recesion-trump-perspectivas-mexico-tv"
        },
        {
          "titulo": "Trump frena los aranceles a México hasta el 2 de abril tras llamada con Sheinbaum",
          "descripcion": "Un acuerdo telefónico permite posponer la entrada en vigor de los aranceles y mitigar impactos inmediatos.",
          "link": "https://www.eleconomista.com.mx/empresas/trump-frena-aranceles-mexico-2-abril-llamada-sheinbaum-20250306-749334.html"
        }
      ]
    },
    "Inversión y Confianza Empresarial": {
      "description": "Titulares que abordan cómo la incertidumbre arancelaria afecta la inversión extranjera directa y la confianza del sector privado.",
      "ranking": 4,
      "porcentaje": "9%",
      "icon": "investment",
      "noticias": [
        {
          "titulo": "Preocupa a Comce incertidumbre por aranceles que puede frenar IED",
          "descripcion": "El sector empresarial advierte sobre el impacto negativo de la incertidumbre en la inversión.",
          "link": "https://www.milenio.com/negocios/comce-preve-que-aranceles-puedan-frenar-ied-en-mexico"
        },
        {
          "titulo": "Unas 20 empresas italianas analizan invertir en México pese a aranceles de Trump",
          "descripcion": "El interés de inversión internacional se mantiene pese a un entorno de incertidumbre arancelaria.",
          "link": "https://forbes.com.mx/unas-20-empresas-italianas-analizan-invertir-en-mexico-pese-a-aranceles-de-trump/"
        }
      ]
    },
    "Política Comercial y Acuerdos (T‑MEC y Contramedidas)": {
      "description": "Titulares que explican estrategias y negociaciones en el marco del T‑MEC, medidas selectivas y contramedidas frente a los aranceles.",
      "ranking": 5,
      "porcentaje": "15%",
      "icon": "policy",
      "noticias": [
        {
          "titulo": "México fue tratado con mucho respeto y llegamos a este acuerdo: Presidenta; no se pagarán aranceles en productos dentro del T‑MEC",
          "descripcion": "La negociación en el marco del T‑MEC permitió evitar la aplicación de ciertos aranceles.",
          "link": "https://www.gob.mx/presidencia/prensa/mexico-fue-tratado-con-mucho-respeto-y-llegamos-a-este-acuerdo-presidenta-no-se-pagaran-aranceles-en-productos-dentro-del-t-mec"
        },
        {
          "titulo": "México busca activar seguro antiarancel del T‑MEC en autopartes",
          "descripcion": "El Gobierno explora mecanismos dentro del T‑MEC para proteger sectores estratégicos, como el de autopartes.",
          "link": "https://www.eleconomista.com.mx/empresas/mexico-busca-activar-seguro-antiarancel-t-mec-autopartes-20250320-751262.html"
        }
      ]
    }
  },
  "usa": {
    "Políticas y Ajustes de Aranceles": {
      "description": "Comunicados y declaraciones oficiales que detallan la implementación y ajustes de los aranceles por parte del gobierno de EE. UU.",
      "ranking": 1,
      "porcentaje": "31%",
      "icon": "policy",
      "noticias": [
        {
          "titulo": "Fact Sheet: President Donald J. Trump Adjusts Tariffs on Canada and Mexico",
          "descripcion": "La Casa Blanca anuncia ajustes en los aranceles para minimizar la disrupción en la industria automotriz.",
          "link": "https://www.whitehouse.gov/fact-sheets/2025/03/fact-sheet-president-donald-j-trump-adjusts-tariffs-on-canada-and-mexico-to-minimize-disruption-to-the-automotive-industry/"
        },
        {
          "titulo": "President Donald J. Trump Proceeds with Tariffs on Imports from Canada and Mexico",
          "descripcion": "El presidente confirma la aplicación de aranceles del 25% a las importaciones de Canadá y México.",
          "link": "https://www.whitehouse.gov/fact-sheets/2025/03/fact-sheet-president-donald-j-trump-proceeds-with-tariffs-on-imports-from-canada-and-mexico/"
        }
      ]
    },
    "Impacto en la Industria y Economía de EE. UU.": {
      "description": "Análisis y reportajes sobre cómo la política arancelaria impacta sectores productivos y la economía interna estadounidense.",
      "ranking": 2,
      "porcentaje": "21%",
      "icon": "economy",
      "noticias": [
        {
          "titulo": "Tariffs could lead Mexico into recession, report says",
          "descripcion": "Un informe sugiere que la política arancelaria podría afectar el equilibrio comercial y la economía.",
          "link": "https://www.freightwaves.com/news/borderlands-mexico-tariffs-could-lead-mexico-into-recession-report-says"
        },
        {
          "titulo": "New US tariffs on Canada, Mexico could be eased, commerce chief says",
          "descripcion": "El jefe de comercio de EE. UU. indica que los aranceles podrían ajustarse según la evolución del entorno comercial.",
          "link": "https://www.voanews.com/a/new-us-tariffs-on-canada-mexico-could-be-eased-commerce-chief-says/7994422.html"
        }
      ]
    },
    "Suspensión y Ajustes Temporales": {
      "description": "Titulares que informan sobre medidas provisionales, pausas y exenciones temporales en la aplicación de aranceles para mitigar impactos negativos.",
      "ranking": 3,
      "porcentaje": "24%",
      "icon": "temporary",
      "noticias": [
        {
          "titulo": "President Trump pauses Mexico and Canada tariffs until April 2",
          "descripcion": "El presidente anuncia la suspensión temporal de los aranceles para reducir el impacto en sectores clave.",
          "link": "https://www.cbsnews.com/news/president-trump-pauses-mexico-tariffs-april-2/"
        },
        {
          "titulo": "Trump temporarily suspends tariffs on Mexico and Canada's carmakers",
          "descripcion": "Se concede un período de gracia de un mes para los fabricantes de automóviles tras intensas negociaciones.",
          "link": "https://www.euronews.com/business/2025/03/06/trump-temporarily-suspends-tariffs-on-mexico-and-canadas-carmakers"
        }
      ]
    },
    "Reacciones y Retaliación Internacional": {
      "description": "Reportajes y análisis que muestran las respuestas y posibles represalias de otros países ante la política arancelaria de EE. UU.",
      "ranking": 4,
      "porcentaje": "24%",
      "icon": "international",
      "noticias": [
        {
          "titulo": "Trump's tariffs against Canada, Mexico come into force",
          "descripcion": "La entrada en vigor de los aranceles altera la dinámica comercial y genera respuestas internacionales.",
          "link": "https://www.nytimes.com/2025/03/06/us/politics/trump-mexico-tariffs-suspended.html"
        },
        {
          "titulo": "Mexico says it will impose retaliatory tariffs on US with details coming Sunday",
          "descripcion": "La respuesta de México se materializa con la amenaza de aplicar aranceles retaliatorios.",
          "link": "https://apnews.com/article/trade-war-mexico-trump-9cefdded035a0b35e700a7ba0bfc34b4"
        }
      ]
    }
  }
};

type News = {
  titulo: string;
  descripcion: string;
  link: string;
};

type CategoryData = {
  description: string;
  ranking: number;
  porcentaje: string;
  icon: string;
  noticias: News[];
};

type CountryTrends = Record<string, CategoryData>;

const getPercentageColor = (percentageStr: string) => {
  const value = parseInt(percentageStr);
  if (value >= 30) return "bg-blue-500";
  if (value >= 20) return "bg-purple-500";
  if (value >= 10) return "bg-green-500";
  return "bg-amber-500";
};

const getPercentageTextColor = (percentageStr: string) => {
  const value = parseInt(percentageStr);
  if (value >= 30) return "text-blue-600";
  if (value >= 20) return "text-purple-600";
  if (value >= 10) return "text-green-600";
  return "text-amber-600";
};

const getPercentageBgColor = (percentageStr: string) => {
  const value = parseInt(percentageStr);
  if (value >= 30) return "bg-blue-100";
  if (value >= 20) return "bg-purple-100";
  if (value >= 10) return "bg-green-100";
  return "bg-amber-100";
};

const getCategoryIcon = (iconType: string) => {
  switch (iconType) {
    case 'economy':
      return <LineChart className="text-blue-600" />;
    case 'industry':
      return <ShoppingBag className="text-purple-600" />;
    case 'government':
      return <Briefcase className="text-green-600" />;
    case 'investment':
      return <DollarSign className="text-amber-600" />;
    case 'policy':
      return <FileText className="text-indigo-600" />;
    case 'temporary':
      return <BarChart4 className="text-cyan-600" />;
    case 'international':
      return <Globe className="text-teal-600" />;
    default:
      return <Circle className="text-gray-600" />;
  }
};

const NewsCard = ({ news }: { news: News }) => (
  <a href={news.link} target="_blank" rel="noopener noreferrer" className="block">
    <Card className="h-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-base line-clamp-2 break-words" data-translate="true">{news.titulo}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="line-clamp-3 break-words" data-translate="true">{news.descripcion}</CardDescription>
      </CardContent>
    </Card>
  </a>
);

const TrendCategory = ({ 
  title, 
  data, 
  isExpanded, 
  onToggle,
  displayRank
}: { 
  title: string; 
  data: CategoryData; 
  isExpanded: boolean; 
  onToggle: () => void;
  displayRank: number;
}) => {
  const percentageValue = parseInt(data.porcentaje);
  const percentageColor = getPercentageTextColor(data.porcentaje);
  const percentageBgColor = getPercentageBgColor(data.porcentaje);
  const { language } = useLanguage();
  
  // Handle translation when a trend category is expanded
  useEffect(() => {
    if (isExpanded && language === 'en') {
      setTimeout(() => {
        const newsElements = document.querySelectorAll('.card-title[data-translate], .card-description[data-translate]');
        const description = document.querySelector(`[data-category="${title}"] p.text-sm.text-gray-700[data-translate]`);
        
        // Reset translation status to force retranslation when expanded
        if (newsElements.length > 0) {
          newsElements.forEach(el => {
            el.removeAttribute('data-translated');
          });
        }
        
        if (description) {
          description.removeAttribute('data-translated');
        }
        
        // Translate all elements with data-translate
        translateAllElements(language);
      }, 300);
    }
  }, [isExpanded, language, title]);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: displayRank * 0.1 }}
      className="mb-6 border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
      data-category={title}
    >
      <div 
        className="flex items-center justify-between cursor-pointer p-4 bg-white"
        onClick={() => {
          onToggle();
        }}
      >
        <div className="flex items-center gap-2 w-full">
          <div className="flex-shrink-0 bg-blue-100 text-blue-700 rounded-full w-7 h-7 flex items-center justify-center font-medium">
            {displayRank + 1}
          </div>
          
          <div className="flex items-center flex-grow gap-2 overflow-hidden">
            <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-md bg-gray-50">
              {getCategoryIcon(data.icon)}
            </div>
            <h3 className="text-sm sm:text-base md:text-lg font-medium truncate" data-translate="true">{title}</h3>
          </div>
          
          <div className="flex items-center gap-2 ml-1">
            <div className={cn(
              "flex-shrink-0 rounded-full w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center",
              percentageBgColor
            )}>
              <span className={cn("text-xs sm:text-sm font-semibold", percentageColor)}>
                {data.porcentaje}
              </span>
            </div>
            <div className="flex-shrink-0">
              <ChevronDown className={cn(
                "w-5 h-5 text-gray-500 transition-transform",
                isExpanded && "transform rotate-180"
              )} />
            </div>
          </div>
        </div>
      </div>
      
      {isExpanded && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50 px-3 sm:px-4 py-4"
        >
          <div className="flex items-start gap-2 mb-3 pl-2 sm:pl-10">
            <PieChart size={16} className={cn("mt-1 flex-shrink-0", percentageColor)} />
            <p className="text-sm text-gray-700 break-words" data-translate="true">{data.description}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-2 sm:pl-10">
            {data.noticias.map((news, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <NewsCard news={news} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const PercentageSummary = ({ 
  countryData 
}: { 
  countryData: CountryTrends
}) => {
  const sortedByPercentage = Object.entries(countryData)
    .sort(([, a], [, b]) => {
      const percentA = parseInt(a.porcentaje);
      const percentB = parseInt(b.porcentaje);
      return percentB - percentA;
    })
    .slice(0, 3);
  
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg mb-6">
      <h3 className="text-sm font-medium text-gray-600 mb-3 flex items-center gap-1">
        <PieChart size={16} />
        <span data-translate="true">Distribución de temas principales</span>
      </h3>
      
      <div className="space-y-3">
        {sortedByPercentage.map(([name, data], index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center gap-2"
          >
            <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
              {getCategoryIcon(data.icon)}
            </div>
            <div className={cn(
              "flex-shrink-0 rounded-full w-8 h-8 flex items-center justify-center",
              getPercentageBgColor(data.porcentaje)
            )}>
              <span className={cn("text-sm font-semibold", getPercentageTextColor(data.porcentaje))}>
                {data.porcentaje}
              </span>
            </div>
            <div className="text-sm text-gray-700 truncate flex-grow max-w-[60%] sm:max-w-[70%]" data-translate="true">{name}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Trends = () => {
  const [country, setCountry] = useState<'mexico' | 'usa'>('mexico');
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const { language } = useLanguage();
  
  const countryData = trendsData[country] as CountryTrends;
  
  const sortedCategories = Object.entries(countryData).sort(
    ([, a], [, b]) => {
      const percentA = parseInt(a.porcentaje);
      const percentB = parseInt(b.porcentaje);
      return percentB - percentA;
    }
  );
  
  const toggleCategory = (categoryName: string) => {
    const newExpandedState = {
      ...expandedCategories,
      [categoryName]: !expandedCategories[categoryName]
    };
    
    setExpandedCategories(newExpandedState);
    
    // Trigger translation for newly expanded category after a delay
    if (!expandedCategories[categoryName] && language === 'en') {
      setTimeout(() => {
        const categoryElement = document.querySelector(`[data-category="${categoryName}"]`);
        if (categoryElement) {
          const elementsToTranslate = categoryElement.querySelectorAll('[data-translate]');
          
          elementsToTranslate.forEach(el => {
            // Reset translation status to force fresh translation
            el.removeAttribute('data-translated');
          });
          
          translateAllElements(language);
        }
      }, 300);
    }
  };
  
  useEffect(() => {
    const markElementsForTranslation = () => {
      const selectors = [
        '.card-title',
        'h1, h2, h3, h4, h5, h6',
        'p:not(.no-translate)',
        '.text-gray-700:not(.no-translate)',
        '.truncate:not(.no-translate)',
        'span.break-words',
        'div.text-sm.text-gray-700'
      ];
      
      selectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
          if (
            el.textContent && 
            el.textContent.trim() !== '' && 
            el.children.length === 0 && 
            !el.hasAttribute('data-translate')
          ) {
            el.setAttribute('data-translate', 'true');
          }
        });
      });
      
      document.querySelectorAll('.mb-6.border.border-gray-100').forEach(trendCategory => {
        const title = trendCategory.querySelector('h3.text-sm, h3.text-base, h3.text-lg');
        if (title && !title.hasAttribute('data-translate')) {
          title.setAttribute('data-translate', 'true');
        }
        
        const description = trendCategory.querySelector('p.text-sm.text-gray-700');
        if (description && !description.hasAttribute('data-translate')) {
          description.setAttribute('data-translate', 'true');
        }
        
        trendCategory.querySelectorAll('.card-title, .card-description').forEach(el => {
          if (!el.hasAttribute('data-translate')) {
            el.setAttribute('data-translate', 'true');
          }
        });
      });
    };
    
    markElementsForTranslation();
    
    const handleUserInteraction = () => {
      setTimeout(markElementsForTranslation, 300);
    };
    
    document.addEventListener('click', handleUserInteraction);
    
    return () => {
      document.removeEventListener('click', handleUserInteraction);
    };
  }, [country]);
  
  // Add specific translation effect for trends page
  useEffect(() => {
    if (language === 'en') {
      // Translate the trends page content
      setTimeout(() => {
        // Translate expanded categories first
        Object.entries(expandedCategories).forEach(([categoryName, isExpanded]) => {
          if (isExpanded) {
            const categoryElement = document.querySelector(`[data-category="${categoryName}"]`);
            if (categoryElement) {
              const elementsToTranslate = categoryElement.querySelectorAll('[data-translate]');
              
              elementsToTranslate.forEach(el => {
                // Reset translation status to force fresh translation
                el.removeAttribute('data-translated');
              });
            }
          }
        });
        
        translateAllElements(language);
      }, 300);
    }
  }, [language, expandedCategories]);
  
  return (
    <div className="min-h-screen bg-white">
      <NavigationHeader />
      
      <div className="container mx-auto py-16 sm:py-20 px-3 sm:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-4 md:p-8 overflow-hidden"
        >
          <div className="flex items-center mb-6">
            <TrendingUp size={24} className="text-blue-600 mr-3 flex-shrink-0" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold break-words" data-translate="true">Tendencias en Aranceles</h1>
          </div>
          
          <div className="w-full">
            <p className="text-gray-600 mb-8 text-sm sm:text-base break-words" data-translate="true">
              Análisis de las principales tendencias mediáticas sobre aranceles, basado en la cobertura de noticias del 1 al 24 de marzo de 2025.
            </p>
          
            <div className="flex flex-wrap gap-3 mb-8">
              <Button
                variant={country === 'mexico' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setCountry('mexico')}
                size="sm"
              >
                <Globe size={16} />
                <span data-translate="true">México</span>
              </Button>
              <Button
                variant={country === 'usa' ? 'default' : 'outline'}
                className="flex items-center gap-2"
                onClick={() => setCountry('usa')}
                size="sm"
              >
                <Globe size={16} />
                <span data-translate="true">EE.UU.</span>
              </Button>
            </div>
          
            <PercentageSummary countryData={countryData} />
          
            <Separator className="mb-6" />
          
            <div>
              {sortedCategories.map(([categoryName, categoryData], index) => (
                <TrendCategory
                  key={categoryName}
                  title={categoryName}
                  data={categoryData}
                  isExpanded={!!expandedCategories[categoryName]}
                  onToggle={() => toggleCategory(categoryName)}
                  displayRank={index}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Trends;
