
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const DashboardsSection = () => {
  const { t, language } = useLanguage();
  
  const titleRef = useRef(null);
  const cardsRef = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const cardsInView = useInView(cardsRef, { once: true, amount: 0.1 });
  
  const dashboards = [
    {
      title: language === 'es' ? 'Aranceles México–Estados Unidos' : 'Mexico-USA Tariffs',
      description: language === 'es' 
        ? 'Visualización geopolítica y económica del impacto arancelario. Análisis profundo del efecto que tienen los aranceles y medidas comerciales entre México y EE.UU. en la conversación pública, el sentimiento ciudadano y sectores económicos específicos.'
        : 'Geopolitical and economic visualization of tariff impact. In-depth analysis of the effect of tariffs and trade measures between Mexico and the U.S. on public conversation, citizen sentiment, and specific economic sectors.',
      image: "https://media.cnn.com/api/v1/images/stellar/prod/230428161428-donald-trump-new-hampshire-230427.jpg?c=16x9&q=h_720,w_1280,c_fill",
      link: "/dashboard",
      comingSoon: false
    },
    {
      title: language === 'es' ? 'Mañaneras de Claudia Sheinbaum' : 'Claudia Sheinbaum Morning Conferences',
      description: language === 'es'
        ? 'Análisis de percepción pública frente al nuevo liderazgo presidencial. Estudio de sentimiento, reacción ciudadana y evolución narrativa sobre las conferencias matutinas de la presidenta. Comparamos momentos clave y cómo se recibe cada mensaje entre distintos sectores.'
        : 'Analysis of public perception of the new presidential leadership. Study of sentiment, citizen reaction, and narrative evolution on the president\'s morning conferences. We compare key moments and how each message is received among different sectors.',
      image: "https://assets.ejecentral.com.mx/dims4/default/202917d/2147483647/strip/true/crop/999x666+0+0/resize/2880x1920!/quality/90/?url=https%3A%2F%2Fk3-prod-ejecentral.s3.us-west-2.amazonaws.com%2Fbrightspot%2Fc8%2F53%2F20dfbf114dfcaada2521cf5700a4%2F999860-mananera-del-pueblo-claudia-sheinbaum-3-web.jpg",
      link: "#",
      comingSoon: true
    }
  ];

  return (
    <section id="dashboards" className="py-16 px-6 bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto">
        <div 
          ref={titleRef}
          className="text-center max-w-4xl mx-auto mb-12 reveal"
          style={{
            transform: titleInView ? 'translateY(0)' : 'translateY(50px)',
            opacity: titleInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            {language === 'es' 
              ? 'Dashboards que hacen sentido para transformar el ruido en data inteligente' 
              : 'Dashboards that make sense to transform noise into intelligent data'}
          </h2>
          <p className="text-gray-400">
            {language === 'es'
              ? 'Visualizaciones analíticas que desmenuzan temas clave del debate nacional y revelan el pulso real de la ciudadanía frente al poder.'
              : 'Analytical visualizations that break down key themes of national debate and reveal the real pulse of citizens against power.'}
          </p>
        </div>
        
        <div 
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-10"
        >
          {dashboards.map((dashboard, index) => (
            <Card 
              key={index} 
              className="bg-white/5 hover:bg-white/10 backdrop-blur-sm border-none transition-all duration-300 reveal overflow-hidden" 
              style={{ 
                transform: cardsInView ? 'translateY(0)' : 'translateY(50px)',
                opacity: cardsInView ? 1 : 0,
                transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.3 + index * 0.15}s` 
              }}
            >
              <div className="relative">
                <AspectRatio ratio={16 / 9}>
                  <img 
                    src={dashboard.image} 
                    alt={dashboard.title} 
                    className="object-cover w-full h-full"
                    style={{
                      transform: cardsInView ? 'scale(1)' : 'scale(1.1)',
                      transition: `all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + index * 0.15}s`
                    }}
                  />
                </AspectRatio>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              </div>
              <CardContent 
                className="p-6 relative"
                style={{
                  transform: cardsInView ? 'translateY(0)' : 'translateY(20px)',
                  opacity: cardsInView ? 1 : 0,
                  transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.6 + index * 0.15}s`
                }}
              >
                <h3 className="text-xl font-bold mb-3 text-white">{dashboard.title}</h3>
                <p className="text-gray-400 mb-6">{dashboard.description}</p>
                
                {dashboard.comingSoon ? (
                  <div className="flex items-center">
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-white bg-transparent opacity-75 cursor-not-allowed"
                    >
                      {language === 'es' ? 'Explorar Dashboard' : 'Explore Dashboard'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                    <Badge 
                      className="ml-3 bg-black/50 text-white border border-white/20 px-3 py-1 flex items-center"
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {language === 'es' ? 'Próximamente' : 'Coming Soon'}
                    </Badge>
                  </div>
                ) : (
                  <Link to={dashboard.link}>
                    <Button 
                      variant="outline" 
                      className="border-white/20 text-slate-950 bg-slate-50"
                      style={{
                        transform: cardsInView ? 'translateX(0)' : 'translateX(-10px)',
                        opacity: cardsInView ? 1 : 0,
                        transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.7 + index * 0.15}s`
                      }}
                    >
                      {language === 'es' ? 'Explorar Dashboard' : 'Explore Dashboard'}
                      <ChevronRight className="ml-1 h-4 w-4" />
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DashboardsSection;
