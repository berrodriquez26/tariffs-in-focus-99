
import { useState, useEffect } from 'react';

export interface SectorAffected {
  nombre: string;
  empresas: string[];
}

export interface MainTopic {
  tema: string;
  porcentaje: number;
  descripcion: string;
}

export interface StateTariffData {
  sentimiento: {
    positivo: number;
    neutro: number;
    negativo: number;
  };
  percepcion: {
    descripcion: string;
  };
  argumentos: {
    afavor: string[];
    encontra: string[];
  };
  preocupaciones: string[];
  tendencias: string[];
  sectores_afectados: SectorAffected[];
  temas_principales: MainTopic[];
  informacion_adicional: string;
  estado_nombre: string;
}

// URL del JSON externo
const JSON_URL = 'https://raw.githubusercontent.com/berrodriquez26/SharkAttacks/refs/heads/main/resultados_por_estado.json';

// Estado global para almacenar los datos
let tariffDataCache: Record<string, StateTariffData[]> | null = null;
let isLoading = false;
let error: Error | null = null;

// Función para cargar los datos del JSON
export const fetchTariffData = async (): Promise<Record<string, StateTariffData[]>> => {
  if (tariffDataCache) {
    return tariffDataCache;
  }

  if (isLoading) {
    // Si ya está cargando, esperar hasta que termine
    const waitForLoad = () => {
      return new Promise<Record<string, StateTariffData[]>>((resolve, reject) => {
        const checkInterval = setInterval(() => {
          if (tariffDataCache) {
            clearInterval(checkInterval);
            resolve(tariffDataCache);
          } else if (error) {
            clearInterval(checkInterval);
            reject(error);
          }
        }, 100);
      });
    };
    return waitForLoad();
  }

  isLoading = true;
  
  try {
    const response = await fetch(JSON_URL);
    if (!response.ok) {
      throw new Error(`Error al obtener datos: ${response.status}`);
    }
    
    const data = await response.json();
    tariffDataCache = data;
    return data;
  } catch (err) {
    error = err instanceof Error ? err : new Error('Error desconocido al cargar datos');
    throw error;
  } finally {
    isLoading = false;
  }
};

// Helper function to get all unique state names
export const getAllStateNames = async (): Promise<string[]> => {
  try {
    const data = await fetchTariffData();
    return Object.keys(data);
  } catch (err) {
    console.error("Error fetching state names:", err);
    return [];
  }
};

// Helper function to get data for a specific state
export const getStateData = async (stateName: string): Promise<StateTariffData | undefined> => {
  try {
    const data = await fetchTariffData();
    const stateData = data[stateName];
    return stateData ? stateData[0] : undefined;
  } catch (err) {
    console.error(`Error fetching data for state ${stateName}:`, err);
    return undefined;
  }
};

// Helper function to get all sentiments combined
export const getAllSentimentsAverage = async (): Promise<{ positivo: number; neutro: number; negativo: number }> => {
  try {
    const data = await fetchTariffData();
    
    let totalPositive = 0;
    let totalNeutral = 0;
    let totalNegative = 0;
    let count = 0;
    
    Object.values(data).forEach(stateArray => {
      stateArray.forEach(state => {
        totalPositive += state.sentimiento.positivo;
        totalNeutral += state.sentimiento.neutro;
        totalNegative += state.sentimiento.negativo;
        count++;
      });
    });
    
    return {
      positivo: Math.round(totalPositive / count),
      neutro: Math.round(totalNeutral / count),
      negativo: Math.round(totalNegative / count)
    };
  } catch (err) {
    console.error("Error calculating sentiment averages:", err);
    return { positivo: 0, neutro: 0, negativo: 0 };
  }
};

// Hook personalizado para obtener los datos de tarifa
export const useTariffData = () => {
  const [data, setData] = useState<Record<string, StateTariffData[]> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchError, setFetchError] = useState<Error | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const result = await fetchTariffData();
        setData(result);
      } catch (err) {
        setFetchError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error: fetchError };
};
