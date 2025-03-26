
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import NavigationHeader from '@/components/NavigationHeader';
import StateGrid from '@/components/StateGrid';
import SentimentSummaryCard from '@/components/SentimentSummaryCard';
import KeyInsightsCard from '@/components/KeyInsightsCard';
import SectorsImpactChart from '@/components/SectorsImpactChart';
import RegionalVariationMap from '@/components/RegionalVariationMap';
import TopArgumentsChart from '@/components/TopArgumentsChart';
import NationalSummary from '@/components/NationalSummary';
import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { useScrollToTop } from '@/hooks/useScrollToTop';

// ScrollAnimation component to trigger animations when elements come into view
const ScrollAnimation = ({ children, className = "", delay = 0, distance = 50 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: distance }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: distance }}
      transition={{ duration: 0.8, delay: delay, ease: [0.17, 0.67, 0.83, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const Dashboard = () => {
  // Use the scroll to top hook
  useScrollToTop();
  
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    // Check if there's a hash in the URL
    if (location.hash === '#estados') {
      // Wait for the component to render before scrolling
      setTimeout(() => {
        const statesSection = document.getElementById('estados-section');
        if (statesSection) {
          statesSection.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }, 300);
    }
  }, [location]);
  return <div className="min-h-screen pb-20 bg-slate-200">
      <NavigationHeader />
      
      {/* Add padding top to account for the fixed header */}
      <div className="pt-20">
        <Header />
      </div>
      
      <div className="container mx-auto px-2 sm:px-4 py-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="w-full">
          <h1 data-translate="true" className="text-xl sm:text-2xl font-bold text-center mb-1 sm:mb-2 text-black md:text-5xl">Panorama de Aranceles en México</h1>
          <p data-translate="true" className="text-center text-xs mb-5 sm:mb-10 px-1 text-zinc-800 sm:text-base">Percepciones, narrativas y sentimiento social en cada estado ante los nuevos aranceles</p>
        </motion.div>

        {/* Panel de Resumen Nacional */}
        <ScrollAnimation className="mb-6 sm:mb-8" delay={0.2}>
          <SentimentSummaryCard />
        </ScrollAnimation>

        {/* Tabs para categorías de análisis */}
        <ScrollAnimation className="mb-8 sm:mb-12" delay={0.3} distance={40}>
          <Tabs defaultValue="insights" className="mb-8 sm:mb-12">
            <TabsList className="grid grid-cols-2 sm:grid-cols-4 mb-6 sm:mb-8 w-full max-w-full mx-auto">
              <TabsTrigger value="insights" className="text-xs sm:text-sm min-h-[45px] px-2 py-3 font-medium" data-translate="true">
                Hallazgos Clave
              </TabsTrigger>
              <TabsTrigger value="sectors" className="text-xs sm:text-sm min-h-[45px] px-2 py-3 font-medium" data-translate="true">
                Sectores Afectados
              </TabsTrigger>
              <TabsTrigger value="regional" className="text-xs sm:text-sm min-h-[45px] px-2 py-3 font-medium" data-translate="true">
                Variación Regional
              </TabsTrigger>
              <TabsTrigger value="arguments" className="text-xs sm:text-sm min-h-[45px] px-2 py-3 font-medium" data-translate="true">
                Argumentos Principales
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="insights" className="space-y-6 tab-content">
              <KeyInsightsCard />
            </TabsContent>
            
            <TabsContent value="sectors" className="space-y-6 tab-content">
              <SectorsImpactChart />
            </TabsContent>
            
            <TabsContent value="regional" className="space-y-6 tab-content">
              <RegionalVariationMap />
            </TabsContent>
            
            <TabsContent value="arguments" className="space-y-6 tab-content">
              <TopArgumentsChart />
            </TabsContent>
          </Tabs>
        </ScrollAnimation>

        {/* Resumen detallado nacional */}
        <ScrollAnimation className="mb-6 sm:mb-10" delay={0.4} distance={30}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="md:col-span-2">
              <NationalSummary />
            </div>
            <div>
              <SectorsImpactChart mini={true} />
            </div>
          </div>
        </ScrollAnimation>

        {/* Lista de Estados */}
        <ScrollAnimation delay={0.5} distance={40}>
          <div id="estados-section">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900" data-translate="true">Análisis por Estado</h2>
            <StateGrid />
          </div>
        </ScrollAnimation>
      </div>
    </div>;
};
export default Dashboard;
