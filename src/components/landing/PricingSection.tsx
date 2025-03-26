
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trophy, Users, Building, Landmark, GraduationCap, Mail, ChevronRight, Newspaper } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

const PricingSection = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const centralTextRef = useRef(null);
  const clientsRef = useRef(null);
  const formRef = useRef(null);
  
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.1 });
  const titleInView = useInView(titleRef, { once: true, amount: 0.3 });
  const subtitleInView = useInView(subtitleRef, { once: true, amount: 0.3 });
  const centralTextInView = useInView(centralTextRef, { once: true, amount: 0.3 });
  const clientsInView = useInView(clientsRef, { once: true, amount: 0.1 });
  const formInView = useInView(formRef, { once: true, amount: 0.5 });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      toast({
        title: language === 'es' ? 'Correo inválido' : 'Invalid email',
        description: language === 'es' 
          ? 'Por favor introduce un correo electrónico válido' 
          : 'Please enter a valid email address',
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const { error } = await supabase
        .from('demo_requests')
        .insert([
          { email, source: 'pricing_section' }
        ]);
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: language === 'es' 
          ? '¡Solicitud enviada!' 
          : 'Request sent!',
        description: language === 'es'
          ? 'Te contactaremos dentro de las siguientes 24 horas para agendar tu demo personalizada'
          : 'We will contact you within the next 24 hours to schedule your personalized demo',
      });
      
      // Reset form
      setEmail('');
    } catch (error) {
      console.error('Error submitting demo request:', error);
      toast({
        title: language === 'es' 
          ? 'Error al enviar la solicitud' 
          : 'Error submitting request',
        description: language === 'es'
          ? 'Hubo un problema al enviar tu solicitud. Por favor intenta de nuevo.'
          : 'There was a problem submitting your request. Please try again.',
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const clientTypes = [
    {
      icon: <Landmark className="h-8 w-8 text-gray-400" />,
      text: language === 'es' ? 'Candidaturas a gobiernos estatales' : 'Candidates for state governments'
    },
    {
      icon: <Building className="h-8 w-8 text-gray-400" />,
      text: language === 'es' ? 'Candidaturas a presidencias municipales y alcaldías' : 'Candidates for municipal presidencies and mayoralties'
    },
    {
      icon: <Building className="h-8 w-8 text-gray-300" />,
      text: language === 'es' ? 'Alcaldías en funciones en la Ciudad de México' : 'Active mayoralties in Mexico City'
    },
    {
      icon: <Landmark className="h-8 w-8 text-gray-300" />,
      text: language === 'es' ? 'Gobiernos municipales en distintos estados del país' : 'Municipal governments in different states of the country'
    },
    {
      icon: <GraduationCap className="h-8 w-8 text-gray-200" />,
      text: language === 'es' ? 'Universidades que utilizan inteligencia social para anticiparse a la conversación pública' : 'Universities that use social intelligence to anticipate public conversation'
    },
    {
      icon: <Newspaper className="h-8 w-8 text-gray-200" />,
      text: language === 'es' ? 'Medios de comunicación que analizan y anticipan temas de relevancia social' : 'Media outlets that analyze and anticipate socially relevant topics'
    }
  ];
  
  return (
    <section 
      className="py-16 px-6 bg-gradient-to-b from-black to-black/90 overflow-hidden"
    >
      <div 
        ref={sectionRef}
        className="container mx-auto py-16 md:py-24 rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 relative"
        style={{
          transform: sectionInView ? 'translateY(0)' : 'translateY(40px)',
          opacity: sectionInView ? 1 : 0,
          transition: 'all 1.2s cubic-bezier(0.17, 0.55, 0.55, 1) 0.1s'
        }}
      >
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gray-500/20 blur-3xl"></div>
          <div className="absolute top-1/3 -left-20 h-60 w-60 rounded-full bg-gray-500/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-10 h-60 w-60 rounded-full bg-gray-400/10 blur-3xl"></div>
        </div>
        
        <div 
          ref={titleRef}
          className="text-center max-w-3xl mx-auto mb-6 relative z-10"
          style={{
            transform: titleInView ? 'translateY(0)' : 'translateY(30px)',
            opacity: titleInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s'
          }}
        >
          <h2 className="font-bold mb-4 text-white text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400">
            {language === 'es' ? 'Una solución hecha a tu medida' : 'A solution tailored to you'}
          </h2>
        </div>
        
        <div 
          ref={subtitleRef}
          className="text-center max-w-4xl mx-auto mb-12 relative z-10"
          style={{
            transform: subtitleInView ? 'translateY(0)' : 'translateY(30px)',
            opacity: subtitleInView ? 1 : 0,
            transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s'
          }}
        >
          <p className="text-slate-200 text-xl md:text-2xl">
            {language === 'es' 
              ? 'Cada cliente tiene una realidad distinta. Por eso, en lugar de planes genéricos, diseñamos un modelo personalizado según tus objetivos, equipo y necesidades de análisis político y social.' 
              : 'Each client has a different reality. That\'s why, instead of generic plans, we design a personalized model according to your objectives, team and political and social analysis needs.'}
          </p>
        </div>
        
        {/* Rediseño de la sección de "trabajamos con quienes toman decisiones" */}
        <div className="max-w-6xl mx-auto mb-16 px-4 md:px-8 relative z-10">
          <div 
            ref={centralTextRef}
            className="bg-gradient-to-br from-gray-900/60 to-gray-800/60 p-8 mb-10 rounded-xl border border-gray-700/30 shadow-xl text-center"
            style={{
              transform: centralTextInView ? 'translateY(0)' : 'translateY(30px)',
              opacity: centralTextInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
            }}
          >
            <h3 className="text-white text-3xl font-bold mb-4 inline-flex items-center justify-center">
              <Trophy className="h-10 w-10 mr-3 text-yellow-400" />
              {language === 'es'
                ? 'Ya trabajamos con quienes toman decisiones todos los días'
                : 'We already work with decision makers every day'}
            </h3>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto">
              {language === 'es'
                ? 'Gobiernos, campañas, alcaldías y organizaciones estratégicas ya confían en Quien Opina para entender lo que la ciudadanía siente, dice y espera en tiempo real.'
                : 'Governments, campaigns, mayoralties and strategic organizations already trust Quien Opina to understand what citizens feel, say and expect in real time.'}
            </p>
          </div>
          
          <div ref={clientsRef} className="mb-10">
            <h4 className="text-center text-white text-2xl font-semibold mb-10 flex items-center justify-center">
              <Users className="h-8 w-8 mr-3 text-gray-400" />
              {language === 'es' ? 'Acompañamos:' : 'We support:'}
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {clientTypes.map((client, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 rounded-xl border border-gray-700/30 shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
                  style={{ 
                    transform: clientsInView ? 'translateY(0)' : 'translateY(30px)',
                    opacity: clientsInView ? 1 : 0,
                    transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.7 + index * 0.1}s` 
                  }}
                >
                  <div className="p-6">
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-gray-800 to-gray-700 flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                      {client.icon}
                    </div>
                    <p className="text-slate-200 text-lg text-center font-medium">{client.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-10 mb-16 max-w-xl mx-auto px-4">
          <p className="text-slate-300 text-xl mb-3"
            style={{ 
              transform: clientsInView ? 'translateY(0)' : 'translateY(20px)',
              opacity: clientsInView ? 1 : 0,
              transition: 'all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) 1.1s' 
            }}
          >
            {language === 'es'
              ? 'Y ahora queremos crear una solución hecha a tu medida.'
              : 'And now we want to create a solution tailored to you.'}
          </p>
        </div>
        
        <div 
          ref={formRef}
          className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900/30 to-gray-800/30 rounded-2xl p-8 md:p-10 border border-gray-700/30 shadow-lg relative z-10"
          style={{
            transform: formInView ? 'translateY(0)' : 'translateY(30px)',
            opacity: formInView ? 1 : 0,
            transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.8s'
          }}
        >
          <h3 className="text-white text-2xl font-semibold mb-6 text-center">
            {language === 'es' 
              ? '¿Quieres conocer cómo funcionaría Quien Opina para ti?' 
              : 'Want to know how Quien Opina would work for you?'}
          </h3>
          <p className="text-slate-300 text-lg mb-8 text-center">
            {language === 'es'
              ? 'Déjanos tu correo y agenda un demo personalizada con nuestro equipo.'
              : 'Leave us your email and schedule a personalized demo with our team.'}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="relative w-full md:w-2/3">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={language === 'es' ? 'Tu correo electrónico' : 'Your email'}
                required
                className="pl-10 bg-gray-900/70 border-gray-700 text-white h-12 w-full"
                disabled={isSubmitting}
              />
            </div>
            <Button 
              type="submit"
              className="w-full md:w-auto bg-gradient-to-r from-gray-600 to-gray-800 hover:from-gray-700 hover:to-gray-900 text-white font-medium py-6 px-8 rounded-md transition-all duration-300 h-12 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting
                ? (language === 'es' ? 'Enviando...' : 'Sending...')
                : (language === 'es' ? 'Solicitar Demo' : 'Request Demo')
              }
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
          
          <p className="text-slate-400 text-sm mt-4 text-center">
            {language === 'es' 
              ? 'Te contactaremos dentro de las siguientes 24 horas para agendar tu demo personalizada.' 
              : 'We will contact you within the next 24 hours to schedule your personalized demo.'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
