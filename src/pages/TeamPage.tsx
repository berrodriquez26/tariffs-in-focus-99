import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft, Linkedin, Twitter, Mail } from 'lucide-react';

const teamMembers = [
  {
    name: "Leonardo Estrada",
    role: "CEO",
    bio: "Liderando la visión estratégica y el crecimiento de QuienOpina desde su fundación.",
    image: "/lovable-uploads/ab13a69f-5e40-49e5-ba24-c90414c87bd6.png",
    featured: true
  },
  {
    name: "Bernardo Armida",
    role: "CTO",
    bio: "Dirigiendo la visión tecnológica y la arquitectura de nuestras plataformas de análisis avanzado.",
    image: "/lovable-uploads/c9676db4-f687-459c-adb0-05bb142888b6.png",
    featured: true
  },
  {
    name: "Emiliano Guillén",
    role: "VP of Technology",
    bio: "Liderando el desarrollo de nuestros algoritmos de IA y sistemas de procesamiento de datos.",
    image: "/lovable-uploads/48d92c27-65c0-48fb-a11f-73926fde1a97.png",
    featured: true
  },
  {
    name: "Montserrat Huitrón",
    role: "CMO",
    bio: "Responsable de nuestra estrategia de marketing y comunicación con clientes y stakeholders.",
    image: "/lovable-uploads/225bbcec-3bd8-4c62-a36e-a1bd40f241bb.png",
    featured: true
  },
  {
    name: "Carlos Flores",
    role: "Front Developer",
    bio: "Especialista en crear interfaces de usuario intuitivas y experiencias visuales impactantes.",
    image: "/lovable-uploads/b7fccc4c-d081-4b31-ad2b-705f861d558e.png",
    featured: false
  },
  {
    name: "Alejandro Villafaña",
    role: "Back End Developer",
    bio: "Experto en arquitectura de sistemas, bases de datos y seguridad de aplicaciones.",
    image: "/lovable-uploads/632203b3-ca0a-4de8-a532-fc76ac9f4e29.png",
    featured: false
  }
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <main className="container mx-auto px-4 pt-12 pb-16">
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Link>
        </div>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">Nuestro Equipo</h1>
          <p className="text-gray-400 max-w-3xl mx-auto">
            Conozca a los profesionales apasionados detrás de QuienOpina. Un equipo diverso de expertos
            en ciencia de datos, inteligencia artificial, diseño y comunicación, trabajando juntos para 
            transformar cómo entendemos la opinión pública.
          </p>
        </div>
        
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Liderazgo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers
              .filter(member => member.featured)
              .map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
          </div>
        </div>
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-800 pb-4">Equipo de Desarrollo</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers
              .filter(member => !member.featured)
              .map((member, index) => (
                <TeamMemberCard key={index} member={member} />
              ))}
          </div>
        </div>
      </main>
      
      <footer className="bg-black text-gray-400 py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} QuienOpina. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  featured: boolean;
}

const TeamMemberCard = ({ member }: { member: TeamMember }) => {
  return (
    <Card className="bg-white/5 hover:bg-white/10 transition-all border-none overflow-hidden">
      <div className="h-64 overflow-hidden">
        <img 
          src={member.image} 
          alt={member.name}
          className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
        />
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-blue-400 mb-3">{member.role}</p>
        <p className="text-gray-400">{member.bio}</p>
      </CardContent>
      <CardFooter className="px-6 pb-6 pt-0">
        <div className="flex gap-3">
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
      </CardFooter>
    </Card>
  );
};

export default TeamPage;
