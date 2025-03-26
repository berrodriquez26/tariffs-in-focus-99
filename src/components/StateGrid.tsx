
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, AlertCircle, MessageCircle } from 'lucide-react';
import { getAllStateNames } from '@/services/tariffData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import StateSelector from './StateSelector';
import { useLanguage } from '@/contexts/LanguageContext';
import { useIsMobile } from '@/hooks/use-mobile';

// Mapping states to their size categories and fixed comment counts (multiplied by 3-4)
// Major cities and important states have even higher counts
const stateCommentCounts: Record<string, number> = {
  'Aguascalientes': 1041,
  'Baja California': 1904, // Important border state
  'Baja California Sur': 963,
  'Campeche': 1014,
  'Chiapas': 1808,
  'Chihuahua': 1948, // Important border state
  'Ciudad de México': 8745, // Capital city - much higher count
  'Coahuila': 1672,
  'Colima': 927,
  'Durango': 1068,
  'Estado de México': 6513, // Most populous state - much higher count
  'Guanajuato': 1772,
  'Guerrero': 1716,
  'Hidalgo': 1122,
  'Jalisco': 5670, // Major state with Guadalajara - much higher count
  'Michoacán': 1660,
  'Morelos': 1152,
  'Nayarit': 984,
  'Nuevo León': 5210, // Major state with Monterrey - much higher count
  'Oaxaca': 1848,
  'Puebla': 3768, // Important city/state - higher count
  'Querétaro': 1752,
  'Quintana Roo': 1700, // Important tourist destination
  'San Luis Potosí': 1628,
  'Sinaloa': 1688,
  'Sonora': 1832,
  'Tabasco': 1086,
  'Tamaulipas': 1732,
  'Tlaxcala': 954,
  'Veracruz': 4272, // Important state - higher count
  'Yucatán': 1664,
  'Zacatecas': 1026
};

// Get comment count for a state, with fallback for any unlisted states
const getCommentCount = (stateName: string): number => {
  return stateCommentCounts[stateName] || 1600; // Default to 1600 if state not found (multiplied from previous 400)
};

const StateGrid = () => {
  const [stateNames, setStateNames] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  const isMobile = useIsMobile();

  useEffect(() => {
    const fetchStates = async () => {
      try {
        setLoading(true);
        setError(null);
        const names = await getAllStateNames();
        console.log('Loaded state names:', names);
        
        if (!names || names.length === 0) {
          console.error('No state names returned from API');
          setError('No se pudieron cargar los estados');
          return;
        }
        
        setStateNames(names);
      } catch (error) {
        console.error('Error al cargar estados:', error);
        setError('Error al cargar estados');
      } finally {
        setLoading(false);
      }
    };

    fetchStates();
  }, []);

  const handleStateClick = (state: string) => {
    console.log('Navigating to state:', state);
    navigate(`/estado/${encodeURIComponent(state)}`);
  };

  const handleStateChange = (state: string) => {
    setSelectedState(state);
    if (state) {
      console.log('Selected state from dropdown:', state);
      navigate(`/estado/${encodeURIComponent(state)}`);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-gray-800 animate-spin"></div>
          <p className="mt-4 text-gray-600">Cargando estados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-red-500" />
          <p className="mt-4 text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!stateNames || stateNames.length === 0) {
    return (
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col items-center justify-center py-12">
          <AlertCircle className="w-12 h-12 text-yellow-500" />
          <p className="mt-4 text-gray-600">No hay estados disponibles</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  // Determine the text for comments analyzed based on language
  const commentsAnalyzedText = language === 'en' ? "comments analyzed" : "comentarios analizados";
  const seeDetailedAnalysisText = language === 'en' ? "See detailed analysis" : "Ver análisis detallado";

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
      <div>
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <LineChart className="mr-2 text-gray-700" size={24} />
          <span data-translate="true">Análisis por Estado</span>
        </h2>

        <div className="mb-8 flex justify-center">
          <StateSelector 
            selectedState={selectedState} 
            onStateChange={handleStateChange} 
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {stateNames.map((state) => (
            <div
              key={state}
              onClick={() => handleStateClick(state)}
              className="cursor-pointer"
            >
              <Card className="hover:shadow-md transition-shadow duration-300 h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-md">{state}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <MessageCircle size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">
                        {getCommentCount(state)} {commentsAnalyzedText}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <AlertCircle size={16} className="text-gray-500" />
                      <span className="text-sm text-gray-600">{seeDetailedAnalysisText}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StateGrid;
