import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'es' | 'en';

type Translations = {
  [key: string]: {
    es: string;
    en: string;
  };
};

// Core translations for landing page UI elements only
const translations: Translations = {
  // Landing Page
  'landing.aboutUs': {
    es: 'Sobre Nosotros',
    en: 'About Us',
  },
  'landing.dashboards': {
    es: 'Dashboards',
    en: 'Dashboards',
  },
  'landing.contact': {
    es: 'Contacto',
    en: 'Contact',
  },
  'landing.login': {
    es: 'Iniciar Sesión',
    en: 'Login',
  },
  'landing.register': {
    es: 'Registrarse',
    en: 'Register',
  },
  'landing.hero.title': {
    es: 'Transformando Opinión Pública y las Noticias',
    en: 'Transforming Public Opinion and News',
  },
  'landing.hero.subtitle': {
    es: 'Análisis de datos para entender el sentimiento público',
    en: 'Data analysis to understand public sentiment',
  },
  'landing.hero.cta': {
    es: 'Explorar Dashboard',
    en: 'Explore Dashboard',
  },
  
  // Landing Page New Sections
  'landing.news': {
    es: 'Novedades',
    en: 'News',
  },
  'landing.recently.launched': {
    es: 'Recién lanzado v1.0 >',
    en: 'Recently launched v1.0 >',
  },
  'landing.transforming': {
    es: 'Transformando',
    en: 'Transforming',
  },
  'landing.public.opinion': {
    es: 'Opinión Pública y las Noticias',
    en: 'Public Opinion and News',
  },
  'landing.data.analysis': {
    es: 'Análisis de datos para entender el sentimiento público',
    en: 'Data analysis to understand public sentiment',
  },
  'landing.explore.dashboard': {
    es: 'Explorar Dashboard',
    en: 'Explore Dashboard',
  },
  'landing.dashboard.analytics': {
    es: 'Dashboard Analytics',
    en: 'Dashboard Analytics',
  },
  
  // Updated AI Technology section
  'landing.ai.technology': {
    es: 'La IA que transforma conversación en poder',
    en: 'AI that transforms conversation into power',
  },
  'landing.ai.algorithms': {
    es: 'Nuestros algoritmos de inteligencia artificial analizan y procesan datos complejos para ofrecer soluciones precisas y accesibles.',
    en: 'Our artificial intelligence algorithms analyze and process complex data to offer precise and accessible solutions.',
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
  
  // Features Section
  'landing.advanced.ai': {
    es: 'IA Avanzada',
    en: 'Advanced AI',
  },
  'landing.nlp.algorithms': {
    es: 'Algoritmos de procesamiento de lenguaje natural que extraen insights valiosos',
    en: 'Natural language processing algorithms that extract valuable insights',
  },
  'landing.realtime.bigdata': {
    es: 'Big Data en Tiempo Real',
    en: 'Real-time Big Data',
  },
  'landing.data.processing': {
    es: 'Procesamiento de millones de datos para análisis detallados instantáneos',
    en: 'Processing millions of data points for instant detailed analysis',
  },
  'landing.intelligent.viz': {
    es: 'Visualización Inteligente',
    en: 'Intelligent Visualization',
  },
  'landing.dynamic.graphics': {
    es: 'Representaciones gráficas dinámicas para facilitar la comprensión',
    en: 'Dynamic graphical representations to facilitate understanding',
  },
  
  // Pricing
  'landing.service.plans': {
    es: 'Planes de Servicio',
    en: 'Service Plans',
  },
  'landing.select.plan': {
    es: 'Selecciona el plan que mejor se adapte a tus necesidades de análisis de datos',
    en: 'Select the plan that best suits your data analysis needs',
  },
  
  // Basic Plan
  'landing.basic': {
    es: 'Básico',
    en: 'Basic',
  },
  'landing.free': {
    es: 'Gratis',
    en: 'Free',
  },
  'landing.basic.desc': {
    es: 'Perfecto para comenzar a explorar el análisis de datos',
    en: 'Perfect for starting to explore data analysis',
  },
  'landing.public.dashboard': {
    es: 'Acceso a dashboard público',
    en: 'Access to public dashboard',
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
    es: 'Comenzar Gratis',
    en: 'Start Free',
  },
  
  // Professional Plan
  'landing.popular': {
    es: 'POPULAR',
    en: 'POPULAR',
  },
  'landing.professional': {
    es: 'Profesional',
    en: 'Professional',
  },
  'landing.price.professional': {
    es: '$299/mes',
    en: '$299/month',
  },
  'landing.professional.desc': {
    es: 'Análisis detallado para profesionales y organizaciones',
    en: 'Detailed analysis for professionals and organizations',
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
    es: 'Datos históricos (6 meses)',
    en: 'Historical data (6 months)',
  },
  'landing.export.reports': {
    es: 'Exportación de informes',
    en: 'Export reports',
  },
  'landing.priority.support': {
    es: 'Soporte prioritario',
    en: 'Priority support',
  },
  'landing.try.free': {
    es: 'Probar 14 días gratis',
    en: 'Try 14 days free',
  },
  
  // Enterprise Plan
  'landing.enterprise': {
    es: 'Empresarial',
    en: 'Enterprise',
  },
  'landing.custom.price': {
    es: 'Personalizado',
    en: 'Custom',
  },
  'landing.enterprise.desc': {
    es: 'Soluciones a medida para grandes organizaciones',
    en: 'Tailored solutions for large organizations',
  },
  'landing.api.integration': {
    es: 'Integración API completa',
    en: 'Full API integration',
  },
  'landing.predictive.analysis': {
    es: 'Análisis predictivo avanzado',
    en: 'Advanced predictive analysis',
  },
  'landing.realtime.update': {
    es: 'Actualización en tiempo real',
    en: 'Real-time update',
  },
  'landing.unlimited.history': {
    es: 'Datos históricos ilimitados',
    en: 'Unlimited historical data',
  },
  'landing.custom.ai': {
    es: 'Modelo de IA personalizado',
    en: 'Custom AI model',
  },
  'landing.24.7.support': {
    es: 'Soporte 24/7 y gerente dedicado',
    en: '24/7 support and dedicated manager',
  },
  'landing.contact.sales': {
    es: 'Contactar Ventas',
    en: 'Contact Sales',
  },
  'landing.need.custom.solution': {
    es: '¿Necesitas una solución personalizada para tu empresa?',
    en: 'Need a custom solution for your company?',
  },
  'landing.contact.sales.team': {
    es: 'Contacta con nuestro equipo de ventas',
    en: 'Contact our sales team',
  },
  
  // Dashboards Section
  'landing.dashboards.world': {
    es: 'Dashboards para el Mundo',
    en: 'Dashboards for the World',
  },
  'landing.dashboards.desc': {
    es: 'Visualizaciones analíticas de impacto para temas relevantes a nivel global y nacional',
    en: 'Impactful analytical visualizations for globally and nationally relevant issues',
  },
  
  // Mexico-USA Tariffs
  'landing.mexico.usa.tariffs': {
    es: 'Aranceles México-EUA',
    en: 'Mexico-USA Tariffs',
  },
  'landing.tariffs.desc': {
    es: 'Análisis detallado del impacto económico de los aranceles entre México y Estados Unidos, visualizando efectos por sector y región.',
    en: 'Detailed analysis of the economic impact of tariffs between Mexico and the United States, visualizing effects by sector and region.',
  },
  
  // Environment Dashboard
  'landing.environment': {
    es: 'Medio Ambiente y Contaminación',
    en: 'Environment and Pollution',
  },
  'landing.environment.desc': {
    es: 'Visualización de datos sobre contaminación ambiental en México, incluyendo calidad del aire, emisiones y políticas públicas.',
    en: 'Data visualization on environmental pollution in Mexico, including air quality, emissions, and public policies.',
  },
  
  // President Analysis
  'landing.president.analysis': {
    es: 'Análisis Mañaneras de Claudia Sheinbaum',
    en: 'Analysis of Claudia Sheinbaum Morning Briefings',
  },
  'landing.president.desc': {
    es: 'Estudio de sentimiento y análisis temático de las conferencias matutinas de la presidenta, con evolución temporal y comparativas.',
    en: 'Sentiment study and thematic analysis of the president\'s morning conferences, with temporal evolution and comparatives.',
  },
  
  // About Us Section
  'landing.about.us': {
    es: 'Sobre Nosotros',
    en: 'About Us',
  },
  'landing.transform.data': {
    es: 'Transformamos datos en conocimiento accesible y accionable para todos',
    en: 'We transform data into accessible and actionable knowledge for everyone',
  },
  'landing.mission': {
    es: 'Nuestra Misión',
    en: 'Our Mission',
  },
  'landing.mission.desc1': {
    es: 'En QuienOpina, creemos en el poder de los datos para transformar la toma de decisiones. Nacimos con la misión de democratizar el acceso a análisis complejos, traduciéndolos en visualizaciones claras y comprensibles que permitan a cualquier persona entender el impacto de los acontecimientos sociales, políticos y económicos.',
    en: 'At QuienOpina, we believe in the power of data to transform decision-making. We were born with the mission of democratizing access to complex analyses, translating them into clear, understandable visualizations that allow anyone to understand the impact of social, political, and economic events.',
  },
  'landing.mission.desc2': {
    es: 'Fundada en 2023 por un equipo de científicos de datos, periodistas y diseñadores, nuestra plataforma combina lo último en inteligencia artificial con un diseño centrado en el usuario para ofrecer insights valiosos sobre temas de relevancia nacional e internacional.',
    en: 'Founded in 2023 by a team of data scientists, journalists, and designers, our platform combines the latest in artificial intelligence with user-centered design to deliver valuable insights on topics of national and international relevance.',
  },
  'landing.completed.projects': {
    es: 'Proyectos Completados',
    en: 'Completed Projects',
  },
  'landing.processed.data': {
    es: 'Datos Procesados',
    en: 'Processed Data',
  },
  'landing.precision': {
    es: 'Precisión',
    en: 'Precision',
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
    es: 'Un mundo donde los datos sean accesibles para todos, permitiendo decisiones informadas y basadas en evidencia.',
    en: 'A world where data is accessible to everyone, enabling informed and evidence-based decisions.',
  },
  
  // Team Section
  'landing.team': {
    es: 'Nuestro Equipo',
    en: 'Our Team',
  },
  'landing.team.desc': {
    es: 'Profesionales apasionados por la tecnología y el análisis de datos',
    en: 'Professionals passionate about technology and data analysis',
  },
  'landing.ceo': {
    es: 'CEO',
    en: 'CEO',
  },
  'landing.cto': {
    es: 'CTO',
    en: 'CTO',
  },
  'landing.vp.technology': {
    es: 'VP of Technology',
    en: 'VP of Technology',
  },
  'landing.cmo': {
    es: 'CMO',
    en: 'CMO',
  },
  'landing.leonardo.desc': {
    es: 'Liderando la visión estratégica y el crecimiento de QuienOpina.',
    en: 'Leading the strategic vision and growth of QuienOpina.',
  },
  'landing.bernardo.desc': {
    es: 'Dirigiendo la arquitectura de nuestras plataformas de análisis avanzado.',
    en: 'Directing the architecture of our advanced analysis platforms.',
  },
  'landing.emiliano.desc': {
    es: 'Liderando el desarrollo de nuestros algoritmos de IA y procesamiento de datos.',
    en: 'Leading the development of our AI algorithms and data processing.',
  },
  'landing.montserrat.desc': {
    es: 'Responsable de nuestra estrategia de marketing y comunicación.',
    en: 'Responsible for our marketing and communication strategy.',
  },
  'landing.know.more.team': {
    es: 'Conoce más sobre nuestro equipo',
    en: 'Learn more about our team',
  },
  
  // Contact Section
  'landing.contact.us': {
    es: 'Contáctanos',
    en: 'Contact Us',
  },
  'landing.contact.desc': {
    es: 'Estamos listos para responder tus preguntas y explorar cómo podemos colaborar',
    en: 'We are ready to answer your questions and explore how we can collaborate',
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
    es: 'Correo electrónico',
    en: 'Email',
  },
  'landing.your.email': {
    es: 'Tu correo',
    en: 'Your email',
  },
  'landing.subject': {
    es: 'Asunto',
    en: 'Subject',
  },
  'landing.message.subject': {
    es: 'Asunto de tu mensaje',
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
  'landing.ready.answer': {
    es: 'Estamos listos para responder tus preguntas',
    en: 'We are ready to answer your questions',
  },
  'landing.address': {
    es: 'Dirección',
    en: 'Address',
  },
  'landing.mexico.city': {
    es: 'Ciudad de México, MX',
    en: 'Mexico City, MX',
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
    es: 'Visualización',
    en: 'Visualization',
  },
  'landing.ai.consulting': {
    es: 'Consultoría IA',
    en: 'AI Consulting',
  },
  'landing.market.intelligence': {
    es: 'Inteligencia de Mercado',
    en: 'Market Intelligence',
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
    es: 'Informes',
    en: 'Reports',
  },
  'landing.tutorials': {
    es: 'Tutoriales',
    en: 'Tutorials',
  },
  'landing.company': {
    es: 'Empresa',
    en: 'Company',
  },
  'landing.careers': {
    es: 'Carreras',
    en: 'Careers',
  },
  'landing.rights': {
    es: 'Todos los derechos reservados',
    en: 'All rights reserved',
  },
  'landing.terms': {
    es: 'Términos de Servicio',
    en: 'Terms of Service',
  },
  'landing.privacy.policy': {
    es: 'Política de Privacidad',
    en: 'Privacy Policy',
  },
  'landing.cookies': {
    es: 'Cookies',
    en: 'Cookies',
  },
  
  // Dashboard translations
  'dashboard.mostVulnerableSectors': {
    es: 'Sectores más Vulnerables',
    en: 'Most Vulnerable Sectors',
  },
  
  // Common component translations
  'common.mainTopics': {
    es: 'Temas Principales',
    en: 'Main Topics',
  },
  'common.sentiment': {
    es: 'Sentimiento',
    en: 'Sentiment',
  },
  'common.arguments': {
    es: 'Argumentos',
    en: 'Arguments',
  },
  'common.forArguments': {
    es: 'Argumentos a Favor',
    en: 'Arguments in Favor',
  },
  'common.againstArguments': {
    es: 'Argumentos en Contra',
    en: 'Arguments Against',
  },
  'common.concerns': {
    es: 'Preocupaciones',
    en: 'Concerns',
  },
  'common.additionalInfo': {
    es: 'Información Adicional',
    en: 'Additional Information',
  },
  'common.trends': {
    es: 'Tendencias',
    en: 'Trends',
  },
  'common.sector': {
    es: 'Sector',
    en: 'Sector',
  },
  'common.companies': {
    es: 'Empresas',
    en: 'Companies',
  },
  'common.noCompaniesSpecified': {
    es: 'No se especificaron empresas',
    en: 'No companies specified',
  },
  'common.perception': {
    es: 'Percepción',
    en: 'Perception',
  },
  'common.affectedSectors': {
    es: 'Sectores Afectados',
    en: 'Affected Sectors',
  },
  'common.percentage': {
    es: 'Porcentaje',
    en: 'Percentage',
  },
  'common.noSectorsData': {
    es: 'No hay información de sectores disponible',
    en: 'No sectors data available',
  },
  
  // Error page translations (essential to keep)
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
  
  // Essential state detail error messages
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
  'stateDetail.detailedAnalysis': {
    es: 'Análisis detallado del impacto económico y social en este estado',
    en: 'Detailed analysis of economic and social impact in this state',
  },
  'stateDetail.topicsDescription': {
    es: 'Distribución porcentual de los temas más discutidos',
    en: 'Percentage distribution of most discussed topics',
  },
  'stateDetail.noTopicsData': {
    es: 'No hay datos de temas disponibles',
    en: 'No topics data available',
  },
  
  // Pricing - Custom Solution Section (new)
  'landing.custom.solution': {
    es: 'Una solución hecha a tu medida',
    en: 'A solution tailored to you',
  },
  'landing.custom.solution.subtitle': {
    es: 'Cada cliente tiene una realidad distinta. Por eso, en lugar de planes genéricos, diseñamos un modelo personalizado según tus objetivos, equipo y necesidades de análisis político y social.',
    en: 'Each client has a different reality. That\'s why, instead of generic plans, we design a personalized model according to your objectives, team and political and social analysis needs.',
  },
  'landing.work.decision.makers': {
    es: 'Ya trabajamos con quienes toman decisiones todos los días.',
    en: 'We already work with decision makers every day.',
  },
  'landing.trust.quienopina': {
    es: 'Gobiernos, campañas, alcaldías y organizaciones estratégicas ya confían en Quien Opina para entender lo que la ciudadanía siente, dice y espera en tiempo real.',
    en: 'Governments, campaigns, mayoralties and strategic organizations already trust Quien Opina to understand what citizens feel, say and expect in real time.',
  },
  'landing.we.support': {
    es: 'Acompañamos:',
    en: 'We support:',
  },
  'landing.state.governments': {
    es: 'Candidaturas a gobiernos estatales',
    en: 'Candidates for state governments',
  },
  'landing.municipal.mayors': {
    es: 'Candidaturas a presidencias municipales y alcaldías',
    en: 'Candidates for municipal presidencies and mayoralties',
  },
  'landing.active.mayoralties': {
    es: 'Alcaldías en funciones en la Ciudad de México',
    en: 'Active mayoralties in Mexico City',
  },
  'landing.municipal.governments': {
    es: 'Gobiernos municipales en distintos estados del país',
    en: 'Municipal governments in different states of the country',
  },
  'landing.universities.media': {
    es: 'Universidades, medios y empresas que utilizan inteligencia social para anticiparse a la conversación pública',
    en: 'Universities, media and companies that use social intelligence to anticipate public conversation',
  },
  'landing.tailored.solution': {
    es: 'Y ahora queremos crear una solución hecha a tu medida.',
    en: 'And now we want to create a solution tailored to you.',
  },
  'landing.contact.us.button': {
    es: 'Contáctanos',
    en: 'Contact us',
  },
};

type LanguageContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const defaultLanguageContext: LanguageContextType = {
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
};

export const LanguageContext = createContext<LanguageContextType>(defaultLanguageContext);

type LanguageProviderProps = {
  children: ReactNode;
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  // Get initial language from localStorage or default to 'es'
  const [language, setLanguage] = useState<Language>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage === 'en' || savedLanguage === 'es') ? savedLanguage : 'es';
  });

  // Save language to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
    
    // Dispatch event to notify other components about the language change
    const dataTranslationEvent = new CustomEvent('language-change', { 
      detail: { language } 
    });
    document.dispatchEvent(dataTranslationEvent);
  }, [language]);

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
