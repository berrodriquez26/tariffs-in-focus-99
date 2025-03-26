import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Linkedin, Twitter, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
const TeamSection = () => {
  const {
    t,
    language
  } = useLanguage();
  const [email, setEmail] = useState('');
  const titleRef = useRef(null);
  const membersRef = useRef(null);
  const ctaRef = useRef(null);
  const buttonRef = useRef(null);
  const titleInView = useInView(titleRef, {
    once: true,
    amount: 0.3
  });
  const membersInView = useInView(membersRef, {
    once: true,
    amount: 0.1
  });
  const ctaInView = useInView(ctaRef, {
    once: true,
    amount: 0.5
  });
  const buttonInView = useInView(buttonRef, {
    once: true,
    amount: 0.5
  });
  const teamMembers = [{
    name: "Leonardo Estrada",
    role: t('landing.ceo'),
    bio: language === 'es' ? "Diseñando la visión que convierte tecnología en poder político real. Lidera la estrategia de expansión y alianzas de alto impacto." : "Designing the vision that converts technology into real political power. Leads expansion strategy and high-impact alliances.",
    image: "/lovable-uploads/ab13a69f-5e40-49e5-ba24-c90414c87bd6.png"
  }, {
    name: "Bernardo Armida",
    role: t('landing.cto'),
    bio: language === 'es' ? "Arquitecto de las plataformas que procesan millones de voces. Responsable de la infraestructura y escalabilidad de la IA." : "Architect of platforms processing millions of voices. Responsible for AI infrastructure and scalability.",
    image: "/lovable-uploads/c9676db4-f687-459c-adb0-05bb142888b6.png"
  }, {
    name: "Emiliano Guillén",
    role: t('landing.vp.technology'),
    bio: language === 'es' ? "Creador de los algoritmos que entienden emociones, quejas y narrativas sociales. Dirige el núcleo de IA de Quien Opina." : "Creator of algorithms that understand emotions, complaints and social narratives. Directs Quien Opina's AI core.",
    image: "/lovable-uploads/48d92c27-65c0-48fb-a11f-73926fde1a97.png"
  }, {
    name: "Montserrat Huitrón",
    role: t('landing.cmo'),
    bio: language === 'es' ? "Estratega de marca y posicionamiento de alto nivel. Comunica con claridad lo que otros solo ven como ruido." : "High-level brand and positioning strategist. Clearly communicates what others only see as noise.",
    image: "/lovable-uploads/225bbcec-3bd8-4c62-a36e-a1bd40f241bb.png"
  }];
  const handleSubmit = e => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error(language === 'es' ? 'Por favor, ingresa un correo válido' : 'Please enter a valid email');
      return;
    }
    toast.success(language === 'es' ? 'Gracias por tu interés. Te contactaremos pronto.' : 'Thank you for your interest. We will contact you soon.');
    setEmail('');
  };
  return <section className="py-16 px-6 bg-black">
      <div className="container mx-auto">
        <div ref={titleRef} className="text-center max-w-3xl mx-auto mb-12 reveal" style={{
        transform: titleInView ? 'translateY(0)' : 'translateY(50px)',
        opacity: titleInView ? 1 : 0,
        transition: 'all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s'
      }}>
          <h2 className="text-3xl font-bold mb-4 text-white">{t('landing.team')}</h2>
          <p className="text-gray-400">
            {t('landing.team.desc')}
          </p>
        </div>
        
        <div ref={membersRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => <div key={index} className="reveal" style={{
          transform: membersInView ? 'translateY(0)' : 'translateY(60px)',
          opacity: membersInView ? 1 : 0,
          transition: `all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.3 + index * 0.1}s`
        }}>
              <div className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all">
                <div className="h-64 overflow-hidden">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500" style={{
                transform: membersInView ? 'scale(1)' : 'scale(1.1)',
                transition: `all 1s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.4 + index * 0.1}s`
              }} />
                </div>
                <div className="p-6" style={{
              transform: membersInView ? 'translateY(0)' : 'translateY(20px)',
              opacity: membersInView ? 1 : 0,
              transition: `all 0.6s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + index * 0.1}s`
            }}>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-blue-400 mb-3">{member.role}</p>
                  <p className="text-gray-400">{member.bio}</p>
                  <div className="flex gap-3 mt-4" style={{
                transform: membersInView ? 'translateY(0)' : 'translateY(10px)',
                opacity: membersInView ? 1 : 0,
                transition: `all 0.5s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.6 + index * 0.1}s`
              }}>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Linkedin className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Twitter className="h-5 w-5" />
                    </a>
                    <a href="#" className="text-gray-400 hover:text-white transition-colors">
                      <Mail className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>)}
        </div>
        
        <div ref={buttonRef} className="flex justify-center mt-12" style={{
        transform: buttonInView ? 'translateY(0)' : 'translateY(30px)',
        opacity: buttonInView ? 1 : 0,
        transition: 'all 0.7s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s'
      }}>
          <Link to="/team">
            <Button variant="outline" className="bg-transparent border border-white/20 text-white hover:bg-white/10 transition-all group">
              {language === 'es' ? 'Ver equipo completo' : 'See full team'} 
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
        
        
      </div>
    </section>;
};
export default TeamSection;