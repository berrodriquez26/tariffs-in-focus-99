
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const AboutSection = () => {
  const { t, language } = useLanguage();
  
  const titleRef = useRef(null);
  const statsRef = useRef(null);
  const missionRef = useRef(null);
  const visionRef = useRef(null);
  
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const statsInView = useInView(statsRef, { once: true, amount: 0.3 });
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const visionInView = useInView(visionRef, { once: true, amount: 0.3 });

  const stats = [
    { number: "15+", label: language === 'es' ? 'gobiernos, campañas e instituciones atendidas' : 'governments, campaigns and institutions served' },
    { number: "10M+", label: language === 'es' ? 'voces procesadas' : 'processed voices' },
    { number: "94%", label: language === 'es' ? 'de precisión en análisis de sentimiento' : 'sentiment analysis accuracy' }
  ];

  return (
    <section id="about-us" className="py-16 px-6 bg-black">
      <div className="container mx-auto">
        <div 
          ref={titleRef}
          className="text-center max-w-3xl mx-auto mb-12 reveal"
          style={{
            transform: titleInView ? 'translateY(0)' : 'translateY(50px)',
            opacity: titleInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
          }}
        >
          <h2 className="text-3xl font-bold mb-4 text-white">{t('landing.about.us')}</h2>
          <p className="text-gray-400">
            {language === 'es'
              ? 'Transformamos el ruido social en claridad política para decisiones más inteligentes y conectadas con la ciudadanía.'
              : 'We transform social noise into political clarity for smarter decisions connected with citizens.'}
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div 
            ref={missionRef}
            className="reveal"
            style={{
              transform: missionInView ? 'translateX(0)' : 'translateX(-70px)',
              opacity: missionInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s'
            }}
          >
            <h3 className="text-2xl font-bold mb-4 text-white">{t('landing.mission')}</h3>
            <p className="text-gray-300 mb-6">
              {language === 'es'
                ? 'En Quien Opina, estamos construyendo el primer agente de inteligencia artificial que transforma el ruido social en claridad política.'
                : 'At Quien Opina, we are building the first artificial intelligence agent that transforms social noise into political clarity.'}
            </p>
            <p className="text-gray-300 mb-6">
              {language === 'es'
                ? 'Nuestra misión es simple: que ningún líder tome decisiones sin saber qué siente, dice y exige la ciudadanía.'
                : 'Our mission is simple: that no leader makes decisions without knowing what citizens feel, say and demand.'}
            </p>
            <div 
              ref={statsRef}
              className="flex gap-4 mb-6"
              style={{
                transform: statsInView ? 'translateY(0)' : 'translateY(30px)',
                opacity: statsInView ? 1 : 0,
                transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
              }}
            >
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-white/5 p-4 rounded-lg text-center"
                  style={{
                    transform: statsInView ? 'scale(1)' : 'scale(0.9)',
                    opacity: statsInView ? 1 : 0,
                    transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + index * 0.1}s`
                  }}
                >
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            ref={visionRef}
            className="relative p-1 border border-white/10 rounded-lg bg-gradient-to-br from-gray-900 to-black reveal"
            style={{
              transform: visionInView ? 'translateX(0) rotate(0)' : 'translateX(70px) rotate(2deg)',
              opacity: visionInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s'
            }}
          >
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img 
                src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80" 
                alt={t('landing.team.working')}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div 
                  className="text-center p-6 bg-black/60 backdrop-blur-sm rounded-lg"
                  style={{
                    transform: visionInView ? 'scale(1)' : 'scale(0.8)',
                    opacity: visionInView ? 1 : 0,
                    transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.7s'
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-2">{t('landing.vision')}</h3>
                  <p className="text-gray-300 mb-3">
                    {language === 'es'
                      ? 'Una democracia donde el poder escuche antes de que sea tarde.'
                      : 'A democracy where power listens before it\'s too late.'}
                  </p>
                  <p className="text-gray-300">
                    {language === 'es'
                      ? 'Donde los datos no solo se midan, se entiendan y se actúe sobre ellos.'
                      : 'Where data is not only measured, but understood and acted upon.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
