
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getStateData } from '@/services/tariffData';
import Header from '@/components/Header';
import NavigationHeader from '@/components/NavigationHeader';
import SentimentChart from '@/components/SentimentChart';
import MainTopicsChart from '@/components/MainTopicsChart';
import SectorsAffected from '@/components/SectorsAffected';
import ArgumentsList from '@/components/ArgumentsList';
import ConcernsCard from '@/components/ConcernsCard';
import PerceptionCard from '@/components/PerceptionCard';
import TrendsList from '@/components/TrendsList';
import AdditionalInfo from '@/components/AdditionalInfo';
import { toast } from '@/components/ui/use-toast';
import BackButton from '@/components/BackButton';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import { useLanguage } from '@/contexts/LanguageContext';

const StateDetail = () => {
  const { stateId } = useParams<{ stateId: string }>();
  const [stateData, setStateData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  useScrollToTop();

  useEffect(() => {
    const fetchData = async () => {
      if (!stateId) {
        console.error('No stateId provided');
        toast({
          title: "Error",
          description: t('stateDetail.noStateId'),
          variant: "destructive"
        });
        navigate('/dashboard');
        return;
      }
      
      try {
        setLoading(true);
        const decodedStateName = decodeURIComponent(stateId);
        console.log('Fetching data for state:', decodedStateName);
        
        const data = await getStateData(decodedStateName);
        
        if (data) {
          setStateData(data);
          console.log('State data loaded successfully:', data.estado_nombre);
        } else {
          console.error('No data found for state:', decodedStateName);
          toast({
            title: "Error de datos",
            description: t('stateDetail.noDataFound'),
            variant: "destructive"
          });
          // Navigate back to dashboard after error
          setTimeout(() => navigate('/dashboard'), 2000);
        }
      } catch (error) {
        console.error('Error al cargar datos del estado:', error);
        toast({
          title: "Error",
          description: t('stateDetail.loadError'),
          variant: "destructive"
        });
        // Navigate back to dashboard after error
        setTimeout(() => navigate('/dashboard'), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [stateId, t, navigate]);

  // Since we've removed the translation service, we'll use the state data directly
  // without translating it dynamically
  const displayData = stateData;

  if (loading || !displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <NavigationHeader />
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // Get main topics from the API response
  // Convert temas_principales to the format expected by the MainTopicsChart component
  const topicsData: Record<string, number> = {};
  if (Array.isArray(displayData.temas_principales)) {
    displayData.temas_principales.forEach((topic: any) => {
      if (typeof topic === 'object' && topic.tema && topic.porcentaje !== undefined) {
        topicsData[topic.tema] = topic.porcentaje;
      }
    });
  } else if (typeof displayData.temas_principales === 'object') {
    Object.assign(topicsData, displayData.temas_principales);
  }

  // Keep sectores_afectados as an array if it's already in that format
  const sectorsData = Array.isArray(displayData.sectores_afectados) 
    ? displayData.sectores_afectados 
    : Object.entries(displayData.sectores_afectados).map(([nombre, value]) => ({
        nombre,
        empresas: []
      }));

  return (
    <div className="min-h-screen bg-white pb-20">
      <NavigationHeader />
      
      <div className="pt-20">
        <Header />
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <BackButton 
          label={t('stateDetail.backButton')}
          className="mb-6"
        />

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2 text-gray-900" data-static-translation={true}>{displayData.estado_nombre}</h1>
          <p className="text-gray-600 mb-10" data-translate="true">
            {t('stateDetail.detailedAnalysis')}
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
        >
          <div className="space-y-6">
            <PerceptionCard description={displayData.percepcion.descripcion} />
            <SentimentChart 
              positive={displayData.sentimiento.positivo} 
              neutral={displayData.sentimiento.neutro} 
              negative={displayData.sentimiento.negativo}
            />
            <ConcernsCard concerns={displayData.preocupaciones} />
          </div>
          
          <div className="space-y-6">
            <MainTopicsChart topics={topicsData} />
            <ArgumentsList 
              inFavor={displayData.argumentos.afavor} 
              against={displayData.argumentos.encontra}
            />
          </div>
          
          <div className="space-y-6">
            <SectorsAffected sectors={sectorsData} />
            <TrendsList trends={displayData.tendencias} />
            <AdditionalInfo text={displayData.informacion_adicional} />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StateDetail;
