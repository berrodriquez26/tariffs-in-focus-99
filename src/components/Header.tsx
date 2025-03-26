
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  
  // Transform values based on scroll position
  const opacity = useTransform(scrollY, [0, 200], [1, 0.5]);
  const scale = useTransform(scrollY, [0, 200], [1, 0.97]);
  
  return <header className="py-8 mb-6 bg-slate-200">
      <div className="container mx-auto px-4">
        <motion.div 
          initial={{
            opacity: 0,
            y: -20,
            width: "60%"
          }} 
          animate={{
            opacity: 1,
            y: 0,
            width: "auto"
          }} 
          transition={{
            duration: 0.8,
            ease: [0.34, 1.56, 0.64, 1], // Custom spring-like easing
            width: {
              duration: 1.2,
              ease: "easeInOut",
              times: [0, 0.5, 0.8, 1],
              repeat: 0,
              repeatType: "reverse" as const
            }
          }} 
          style={{ opacity, scale }}
          className="w-auto mx-[30px] text-center rounded-2xl py-[30px] px-[20px] my-[20px] bg-black">
          <div className="flex flex-col items-center justify-center">
            <img 
              alt="QuienOpina Logo" 
              className="h-16 mb-4 cursor-pointer" 
              src="/lovable-uploads/8b37a040-53eb-4604-8655-7fd1d3ca918e.png" 
              onClick={() => navigate('/')}
            />
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              <span data-translate="true" className="inline-block text-gray-200">Aranceles en el Radar:México</span>
            </h1>
            <div data-translate="true" className="mt-2 text-sm text-white px-3 py-1 rounded-full font-medium bg-slate-500 my-[30px]">Período de análisis: 1 al 24 de marzo, 2025</div>
          </div>
          
          <motion.p initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          delay: 0.3,
          duration: 0.6
        }} data-translate="true" className="mt-0 text-lg max-w-3xl mx-auto text-zinc-300 my-0">Convertimos el ruido mediático en inteligencia estratégica: aquí no solo ves tendencias, entiendes su impacto antes que nadie.</motion.p>
          
          <div className="mt-2 text-sm text-gray-500" data-translate="true">Gracias a nuestro monitoreo , hoy puedes ver lo que otros apenas intuyen.</div>
        </motion.div>
      </div>
      
      <motion.div initial={{
      scaleX: 0
    }} animate={{
      scaleX: 1
    }} transition={{
      delay: 0.5,
      duration: 0.8,
      ease: "easeInOut"
    }} className="w-64 h-1 bg-black mx-auto mt-8 origin-left" />
    </header>;
};
export default Header;
