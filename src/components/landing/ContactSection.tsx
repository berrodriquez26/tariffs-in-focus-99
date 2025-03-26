
import { useRef, useState } from 'react';
import { MapPin, Mail, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from "@/integrations/supabase/client";

const ContactSection = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const formRef = useRef(null);
  const infoRef = useRef(null);
  const socialRef = useRef(null);
  
  const formInView = useInView(formRef, { once: true, amount: 0.3 });
  const infoInView = useInView(infoRef, { once: true, amount: 0.3 });
  const socialInView = useInView(socialRef, { once: true, amount: 0.3 });

  const handleSubmit = async (e: React.FormEvent) => {
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
          { email, source: 'contact_section' }
        ]);
      
      if (error) throw error;
      
      // Show success message
      toast({
        title: language === 'es' 
          ? '¡Solicitud enviada!' 
          : 'Request sent!',
        description: language === 'es'
          ? 'Te contactaremos pronto para agendar tu demo personalizada'
          : 'We will contact you soon to schedule your personalized demo',
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

  return (
    <section id="contact" className="py-20 px-6 bg-gradient-to-b from-black to-black/90">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Demo Request Form */}
          <div 
            ref={formRef}
            className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/5"
            style={{
              transform: formInView ? 'translateX(0)' : 'translateX(-30px)',
              opacity: formInView ? 1 : 0,
              transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s'
            }}
          >
            <h3 className="text-2xl font-bold text-white mb-3 pb-2 border-b border-white/10">
              {language === 'es' 
                ? '¿Te interesa ver cómo funcionaría Quien Opina para tu campaña, gobierno o institución?' 
                : 'Interested in seeing how Quien Opina would work for your campaign, government, or institution?'}
            </h3>
            
            <p className="text-gray-300 mb-6">
              {language === 'es'
                ? 'Déjanos tu correo y uno de nosotros te mostrará una demo personalizada o te cotizará una solución a la medida.'
                : 'Leave us your email and one of us will show you a personalized demo or quote you a tailored solution.'}
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm mb-1">
                  {language === 'es' ? 'Tu correo electrónico' : 'Your email'}
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white/10 border-white/20 text-white"
                  placeholder={language === 'es' ? 'tu@email.com' : 'your@email.com'}
                  disabled={isSubmitting}
                />
              </div>
              
              <button
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 transition-colors rounded-md text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? (language === 'es' ? 'Enviando...' : 'Sending...')
                  : (language === 'es' ? 'Solicitar demo personalizada' : 'Request personalized demo')
                }
              </button>
            </form>
          </div>
          
          <div className="space-y-4">
            {/* Contact Information */}
            <div 
              ref={infoRef}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/5"
              style={{
                transform: infoInView ? 'translateX(0)' : 'translateX(30px)',
                opacity: infoInView ? 1 : 0,
                transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.4s'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                {language === 'es' ? 'Información de contacto' : 'Contact Information'}
              </h3>
              
              <div className="space-y-8">
                <div 
                  className="flex items-start gap-4"
                  style={{
                    transform: infoInView ? 'translateX(0)' : 'translateX(20px)',
                    opacity: infoInView ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
                  }}
                >
                  <div className="p-3 bg-white/10 rounded-full">
                    <Mail className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider mb-1">
                      {language === 'es' ? 'Correo electrónico' : 'Email'}
                    </h4>
                    <a href="mailto:info@quienopina.com" className="text-white text-lg hover:text-blue-400 transition-colors">
                      info@quienopina.com
                    </a>
                  </div>
                </div>
                
                <div 
                  className="flex items-start gap-4"
                  style={{
                    transform: infoInView ? 'translateX(0)' : 'translateX(20px)',
                    opacity: infoInView ? 1 : 0,
                    transition: 'all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s'
                  }}
                >
                  <div className="p-3 bg-white/10 rounded-full">
                    <MapPin className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-gray-300 font-medium text-sm uppercase tracking-wider mb-1">
                      {language === 'es' ? 'Dirección' : 'Address'}
                    </h4>
                    <p className="text-white text-lg">
                      {language === 'es' ? 'Ciudad de México, MX' : 'Mexico City, MX'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div 
              ref={socialRef}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-xl shadow-lg border border-white/5"
              style={{
                transform: socialInView ? 'translateX(0)' : 'translateX(30px)',
                opacity: socialInView ? 1 : 0,
                transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
              }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 pb-2 border-b border-white/10">
                {language === 'es' ? 'Síguenos' : 'Follow us'}
              </h3>
              
              <div className="flex gap-4 flex-wrap">
                {[
                  { Icon: Facebook, label: "Facebook" },
                  { Icon: Twitter, label: "Twitter" },
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Linkedin, label: "LinkedIn" }
                ].map(({ Icon, label }, index) => (
                  <a 
                    key={index}
                    href="#" 
                    aria-label={label}
                    className="bg-white/10 p-4 rounded-lg hover:bg-white/20 transition-all duration-300 hover:scale-105"
                    style={{
                      transform: socialInView ? 'translateY(0)' : 'translateY(15px)',
                      opacity: socialInView ? 1 : 0,
                      transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.6 + index * 0.1}s`
                    }}
                  >
                    <Icon className="h-6 w-6 text-white" />
                  </a>
                ))}
              </div>
              
              <p className="mt-6 text-gray-400 text-sm">
                {language === 'es' ? 'Síguenos. Estamos listos para responder tus preguntas.' : 'Follow us. We are ready to answer your questions.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
