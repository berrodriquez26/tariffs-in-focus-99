import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

// Define only landing page related static translations
const translations = {
  // Landing page translations
  'landing.news': {
    es: 'Novedades',
    en: 'News',
  },
  'landing.recently.launched': {
    es: 'Lanzado recientemente',
    en: 'Recently launched',
  },
  'landing.transforming': {
    es: 'Transformando',
    en: 'Transforming',
  },
  'landing.public.opinion': {
    es: 'la opinión pública',
    en: 'public opinion',
  },
  'landing.data.analysis': {
    es: 'Análisis de datos y opinión pública con inteligencia artificial',
    en: 'Data analysis and public opinion with artificial intelligence',
  },
  'landing.explore.dashboard': {
    es: 'Explorar dashboard',
    en: 'Explore dashboard',
  },
  'landing.dashboard.analytics': {
    es: 'Dashboard de análisis',
    en: 'Analytics dashboard',
  },
  'landing.ai.technology': {
    es: 'La IA que transforma conversación en poder',
    en: 'AI that transforms conversation into power',
  },
  'landing.ai.algorithms': {
    es: 'Nuestros algoritmos de inteligencia artificial analizan y procesan datos complejos para ofrecer soluciones precisas y accesibles.',
    en: 'Our artificial intelligence algorithms analyze and process complex data to offer precise and accessible solutions.',
  },
  'landing.advanced.ai': {
    es: 'IA Avanzada',
    en: 'Advanced AI',
  },
  'landing.nlp.algorithms': {
    es: 'Algoritmos de procesamiento de lenguaje natural que comprenden el contexto y sentimiento',
    en: 'Natural language processing algorithms that understand context and sentiment',
  },
  'landing.realtime.bigdata': {
    es: 'Big Data en Tiempo Real',
    en: 'Real-time Big Data',
  },
  'landing.data.processing': {
    es: 'Procesamiento de millones de datos para análisis precisos y oportunos',
    en: 'Processing millions of data points for precise and timely analysis',
  },
  'landing.intelligent.viz': {
    es: 'Visualización Inteligente',
    en: 'Intelligent Visualization',
  },
  'landing.dynamic.graphics': {
    es: 'Gráficos dinámicos e interactivos que comunican hallazgos complejos',
    en: 'Dynamic and interactive graphics that communicate complex findings',
  },
  'landing.service.plans': {
    es: 'Nuestros planes de servicio',
    en: 'Our service plans',
  },
  'landing.select.plan': {
    es: 'Selecciona el plan que mejor se adapte a tus necesidades',
    en: 'Select the plan that best suits your needs',
  },
  'landing.basic': {
    es: 'Básico',
    en: 'Basic',
  },
  'landing.free': {
    es: 'Gratis',
    en: 'Free',
  },
  'landing.basic.desc': {
    es: 'Para individuos y pequeños equipos que comienzan con análisis de opinión',
    en: 'For individuals and small teams starting with opinion analysis',
  },
  'landing.public.dashboard': {
    es: 'Dashboard público',
    en: 'Public dashboard',
  },
  'landing.basic.sentiment': {
    es: 'Análisis básico de sentimiento',
    en: 'Basic sentiment analysis',
  },
  'landing.monthly.update': {
    es: 'Actualización mensual',
    en: 'Monthly update',
  },
  'landing.email.support': {
    es: 'Soporte por email',
    en: 'Email support',
  },
  'landing.start.free': {
    es: 'Comenzar gratis',
    en: 'Start for free',
  },
  'landing.professional': {
    es: 'Profesional',
    en: 'Professional',
  },
  'landing.price.professional': {
    es: '$199/mes',
    en: '$199/month',
  },
  'landing.professional.desc': {
    es: 'Para equipos profesionales que necesitan herramientas avanzadas',
    en: 'For professional teams that need advanced tools',
  },
  'landing.custom.dashboards': {
    es: 'Dashboards personalizados',
    en: 'Custom dashboards',
  },
  'landing.advanced.sentiment': {
    es: 'Análisis avanzado de sentimiento',
    en: 'Advanced sentiment analysis',
  },
  'landing.weekly.update': {
    es: 'Actualización semanal',
    en: 'Weekly update',
  },
  'landing.historical.data': {
    es: 'Datos históricos',
    en: 'Historical data',
  },
  'landing.export.reports': {
    es: 'Exportación de reportes',
    en: 'Export reports',
  },
  'landing.priority.support': {
    es: 'Soporte prioritario',
    en: 'Priority support',
  },
  'landing.try.free': {
    es: 'Probar gratis',
    en: 'Try for free',
  },
  'landing.enterprise': {
    es: 'Empresa',
    en: 'Enterprise',
  },
  'landing.custom.price': {
    es: 'Personalizado',
    en: 'Custom',
  },
  'landing.enterprise.desc': {
    es: 'Para grandes organizaciones con necesidades específicas',
    en: 'For large organizations with specific needs',
  },
  'landing.api.integration': {
    es: 'Integración API',
    en: 'API integration',
  },
  'landing.predictive.analysis': {
    es: 'Análisis predictivo',
    en: 'Predictive analysis',
  },
  'landing.realtime.update': {
    es: 'Actualización en tiempo real',
    en: 'Real-time update',
  },
  'landing.unlimited.history': {
    es: 'Historial ilimitado',
    en: 'Unlimited history',
  },
  'landing.custom.ai': {
    es: 'IA personalizada',
    en: 'Custom AI',
  },
  'landing.24.7.support': {
    es: 'Soporte 24/7',
    en: '24/7 support',
  },
  'landing.contact.sales': {
    es: 'Contactar ventas',
    en: 'Contact sales',
  },
  'landing.popular': {
    es: 'Popular',
    en: 'Popular',
  },
  'landing.need.custom.solution': {
    es: '¿Necesitas una solución personalizada?',
    en: 'Need a custom solution?',
  },
  'landing.contact.sales.team': {
    es: 'Contacta a nuestro equipo de ventas',
    en: 'Contact our sales team',
  },
  'landing.dashboards.world': {
    es: 'Dashboards que transforman el mundo',
    en: 'Dashboards that transform the world',
  },
  'landing.dashboards.desc': {
    es: 'Descubre nuestros análisis sobre temas cruciales que impactan a México y el mundo',
    en: 'Discover our analysis on crucial issues impacting Mexico and the world',
  },
  'landing.mexico.usa.tariffs': {
    es: 'Aranceles México-USA',
    en: 'Mexico-USA Tariffs',
  },
  'landing.tariffs.desc': {
    es: 'Análisis profundo sobre percepciones en los 32 estados mexicanos respecto a los aranceles propuestos',
    en: 'In-depth analysis of perceptions in all 32 Mexican states regarding the proposed tariffs',
  },
  'landing.environment': {
    es: 'Medio Ambiente',
    en: 'Environment',
  },
  'landing.environment.desc': {
    es: 'Opinión pública sobre políticas ambientales y cambio climático en México',
    en: 'Public opinion on environmental policies and climate change in Mexico',
  },
  'landing.president.analysis': {
    es: 'Análisis Presidencial',
    en: 'Presidential Analysis',
  },
  'landing.president.desc': {
    es: 'Percepción ciudadana sobre las políticas y acciones del gobierno actual',
    en: 'Citizen perception of the policies and actions of the current government',
  },
  'landing.about.us': {
    es: 'Sobre Nosotros',
    en: 'About Us',
  },
  'landing.transform.data': {
    es: 'Transformamos datos en conocimiento para ayudar a comprender la opinión pública y guiar la toma de decisiones.',
    en: 'We transform data into knowledge to help understand public opinion and guide decision-making.',
  },
  'landing.mission': {
    es: 'Nuestra Misión',
    en: 'Our Mission',
  },
  'landing.mission.desc1': {
    es: 'En QuienOpina, nuestra misión es democratizar el acceso a análisis sofisticados de la opinión pública utilizando inteligencia artificial de vanguardia.',
    en: 'At QuienOpina, our mission is to democratize access to sophisticated public opinion analysis using cutting-edge artificial intelligence.',
  },
  'landing.mission.desc2': {
    es: 'Creemos que comprender las percepciones ciudadanas es fundamental para una sociedad mejor informada y una democracia más sólida.',
    en: 'We believe that understanding citizen perceptions is fundamental to a better-informed society and a stronger democracy.',
  },
  'landing.completed.projects': {
    es: 'proyectos completados',
    en: 'completed projects',
  },
  'landing.processed.data': {
    es: 'datos procesados',
    en: 'processed data',
  },
  'landing.precision': {
    es: 'precisión analítica',
    en: 'analytical precision',
  },
  'landing.team.working': {
    es: 'Equipo trabajando',
    en: 'Team working',
  },
  'landing.vision': {
    es: 'Nuestra Visión',
    en: 'Our Vision',
  },
  'landing.vision.desc': {
    es: 'Ser el referente global en análisis de opinión pública con IA, empoderando a ciudadanos, organizaciones y gobiernos.',
    en: 'To be the global reference in public opinion analysis with AI, empowering citizens, organizations and governments.',
  },
  'landing.team': {
    es: 'Nuestro Equipo',
    en: 'Our Team',
  },
  'landing.team.desc': {
    es: 'Un grupo diverso de expertos en ciencia de datos, IA y análisis político unido por la pasión de entender la opinión pública',
    en: 'A diverse group of experts in data science, AI and political analysis united by the passion to understand public opinion',
  },
  'landing.ceo': {
    es: 'CEO y Fundador',
    en: 'CEO & Founder',
  },
  'landing.leonardo.desc': {
    es: 'Ex-científico de datos en Google, especialista en IA y análisis de opinión pública',
    en: 'Former data scientist at Google, specialist in AI and public opinion analysis',
  },
  'landing.cto': {
    es: 'CTO',
    en: 'CTO',
  },
  'landing.bernardo.desc': {
    es: 'Ingeniero de software con experiencia en startups de tecnología y big data',
    en: 'Software engineer with experience in technology startups and big data',
  },
  'landing.vp.technology': {
    es: 'VP de Tecnología',
    en: 'VP of Technology',
  },
  'landing.emiliano.desc': {
    es: 'Experto en machine learning y procesamiento de lenguaje natural',
    en: 'Expert in machine learning and natural language processing',
  },
  'landing.cmo': {
    es: 'CMO',
    en: 'CMO',
  },
  'landing.montserrat.desc': {
    es: 'Especialista en marketing digital y comunicación política',
    en: 'Specialist in digital marketing and political communication',
  },
  'landing.know.more.team': {
    es: 'Conoce más sobre nuestro equipo',
    en: 'Learn more about our team',
  },
  'landing.contact.us': {
    es: 'Contáctanos',
    en: 'Contact Us',
  },
  'landing.ready.answer': {
    es: 'Estamos listos para responder tus preguntas y ayudarte a encontrar la solución perfecta para tus necesidades',
    en: 'We are ready to answer your questions and help you find the perfect solution for your needs',
  },
  'landing.name': {
    es: 'Nombre',
    en: 'Name',
  },
  'landing.your.name': {
    es: 'Tu nombre',
    en: 'Your name',
  },
  'landing.email': {
    es: 'Email',
    en: 'Email',
  },
  'landing.your.email': {
    es: 'Tu email',
    en: 'Your email',
  },
  'landing.subject': {
    es: 'Asunto',
    en: 'Subject',
  },
  'landing.message.subject': {
    es: 'Asunto del mensaje',
    en: 'Message subject',
  },
  'landing.message': {
    es: 'Mensaje',
    en: 'Message',
  },
  'landing.how.help': {
    es: '¿Cómo podemos ayudarte?',
    en: 'How can we help you?',
  },
  'landing.send.message': {
    es: 'Enviar mensaje',
    en: 'Send message',
  },
  'landing.contact.info': {
    es: 'Información de contacto',
    en: 'Contact information',
  },
  'landing.address': {
    es: 'Dirección',
    en: 'Address',
  },
  'landing.mexico.city': {
    es: 'Ciudad de México, México',
    en: 'Mexico City, Mexico',
  },
  'landing.follow.us': {
    es: 'Síguenos',
    en: 'Follow us',
  },
  'landing.services': {
    es: 'Servicios',
    en: 'Services',
  },
  'landing.visualization': {
    es: 'Visualización de datos',
    en: 'Data visualization',
  },
  'landing.ai.consulting': {
    es: 'Consultoría en IA',
    en: 'AI consulting',
  },
  'landing.market.intelligence': {
    es: 'Inteligencia de mercado',
    en: 'Market intelligence',
  },
  'landing.resources': {
    es: 'Recursos',
    en: 'Resources',
  },
  'landing.blog': {
    es: 'Blog',
    en: 'Blog',
  },
  'landing.documentation': {
    es: 'Documentación',
    en: 'Documentation',
  },
  'landing.reports': {
    es: 'Reportes',
    en: 'Reports',
  },
  'landing.tutorials': {
    es: 'Tutoriales',
    en: 'Tutorials',
  },
  'landing.company': {
    es: 'Compañía',
    en: 'Company',
  },
  'landing.aboutUs': {
    es: 'Nosotros',
    en: 'About Us',
  },
  'landing.careers': {
    es: 'Carreras',
    en: 'Careers',
  },
  'landing.contact': {
    es: 'Contacto',
    en: 'Contact',
  },
  'landing.rights': {
    es: 'Todos los derechos reservados.',
    en: 'All rights reserved.',
  },
  'landing.terms': {
    es: 'Términos de uso',
    en: 'Terms of use',
  },
  'landing.privacy.policy': {
    es: 'Política de privacidad',
    en: 'Privacy policy',
  },
  'landing.cookies': {
    es: 'Cookies',
    en: 'Cookies',
  },
  'landing.login': {
    es: 'Iniciar sesión',
    en: 'Login',
  },
  'landing.register': {
    es: 'Registrarse',
    en: 'Register',
  },
  // Error page translations for 404 (keeping these as they're essential)
  'errors.pageNotFound': {
    es: 'Página no encontrada',
    en: 'Page not found',
  },
  'errors.routeDoesNotExist': {
    es: 'La ruta solicitada no existe:',
    en: 'The requested route does not exist:',
  },
  'errors.goToDashboard': {
    es: 'Ir al Dashboard',
    en: 'Go to Dashboard',
  },
  'errors.goBack': {
    es: 'Volver',
    en: 'Go back',
  },
  // StateDetail essential error messages (keeping only the error-related ones)
  'stateDetail.noStateId': {
    es: 'No se proporcionó un ID de estado',
    en: 'No state ID was provided',
  },
  'stateDetail.noDataFound': {
    es: 'No se encontraron datos para este estado',
    en: 'No data found for this state',
  },
  'stateDetail.loadError': {
    es: 'Error al cargar los datos del estado',
    en: 'Error loading state data',
  },
  'stateDetail.backButton': {
    es: 'Volver al dashboard',
    en: 'Back to dashboard',
  },
  // New AI sections
  'landing.ai.agent': {
    es: 'Agente de IA Especializado',
    en: 'Specialized AI Agent',
  },
  'landing.ai.agent.desc': {
    es: 'Procesamiento de lenguaje natural entrenado en política y conversación social. No solo entiende palabras: entiende el contexto, la intención y el impacto.',
    en: 'Natural language processing trained in politics and social conversation. It doesn\'t just understand words: it understands context, intention, and impact.',
  },
  'landing.realtime.analysis': {
    es: 'Análisis en Tiempo Real',
    en: 'Real-time Analysis',
  },
  'landing.realtime.analysis.desc': {
    es: 'Procesamos miles de menciones por minuto en redes, medios y canales públicos. Detectamos lo que importa antes de que explote.',
    en: 'We process thousands of mentions per minute on social networks, media, and public channels. We detect what matters before it explodes.',
  },
  'landing.visualization.action': {
    es: 'Visualización para la Acción',
    en: 'Visualization for Action',
  },
  'landing.visualization.action.desc': {
    es: 'Mapas, alertas, gráficas y comparativos diseñados para actuar, no solo mirar. Porque en política, reaccionar tarde es perder.',
    en: 'Maps, alerts, graphs, and comparisons designed to act, not just look. Because in politics, reacting late means losing.',
  },
};

type StaticTranslationContextType = {
  language: Language;
  t: (key: string) => string;
};

const defaultStaticTranslationContext: StaticTranslationContextType = {
  language: 'es',
  t: (key: string) => key,
};

export const StaticTranslationContext = createContext<StaticTranslationContextType>(defaultStaticTranslationContext);

type StaticTranslationProviderProps = {
  children: ReactNode;
  language: Language;
};

export const StaticTranslationProvider = ({ children, language }: StaticTranslationProviderProps) => {
  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <StaticTranslationContext.Provider value={{ language, t }}>
      {children}
    </StaticTranslationContext.Provider>
  );
};

export const useStaticTranslation = () => useContext(StaticTranslationContext);
