import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { PieChart as PieChartIcon, Lightbulb, TrendingDown, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getAllSentimentsAverage } from '@/services/tariffData';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { toast } from '@/components/ui/use-toast';
const SentimentSummaryCard = () => {
  const [nationalSentiment, setNationalSentiment] = useState<{
    positivo: number;
    neutro: number;
    negativo: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);

  // Fixed labels for the chart
  const chartLabels = {
    positive: 'Positivo',
    neutral: 'Neutro',
    negative: 'Negativo'
  };

  // Fixed findings text
  const findings = ['El 61.5% de percepción en México es negativa, con 22.3% neutra y 16.2% positiva', 'Ciudad de México es el único estado con sentimiento positivo superior al negativo (45% vs 25%)', 'Zacatecas y Michoacán muestran el rechazo más alto (85% y 80% negativo)'];
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getAllSentimentsAverage();
        setNationalSentiment(data);
      } catch (error) {
        console.error('Error al obtener datos nacionales:', error);
        toast({
          title: "Error",
          description: "No se pudieron cargar los datos de sentimiento nacional",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  const stats = [{
    title: "Estados Analizados",
    value: "32",
    icon: <BarChart3 className="h-4 w-4 text-gray-500" />,
    description: "Cobertura nacional completa"
  }, {
    title: "Sentimiento Negativo",
    value: nationalSentiment ? `${nationalSentiment.negativo}%` : "61.5%",
    icon: <TrendingDown className="h-4 w-4 text-red-500" />,
    description: "Preocupación predominante"
  }, {
    title: "Expectativa Positiva",
    value: "45%",
    icon: <Lightbulb className="h-4 w-4 text-amber-500" />,
    description: "Caso excepcional CDMX"
  }];
  const chartData = nationalSentiment ? [{
    name: chartLabels.positive,
    value: nationalSentiment.positivo,
    color: '#34D399'
  }, {
    name: chartLabels.neutral,
    value: nationalSentiment.neutro,
    color: '#94A3B8'
  }, {
    name: chartLabels.negative,
    value: nationalSentiment.negativo,
    color: '#F87171'
  }] : [];
  const chartConfig = {
    positive: {
      label: chartLabels.positive,
      theme: {
        light: '#34D399',
        dark: '#34D399'
      }
    },
    neutral: {
      label: chartLabels.neutral,
      theme: {
        light: '#94A3B8',
        dark: '#94A3B8'
      }
    },
    negative: {
      label: chartLabels.negative,
      theme: {
        light: '#F87171',
        dark: '#F87171'
      }
    }
  };
  if (loading) {
    return <div className="w-full bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100 animate-pulse">
        <div className="h-64 bg-gray-100 rounded-lg"></div>
      </div>;
  }
  return <motion.div initial={{
    opacity: 0,
    y: 20
  }} animate={{
    opacity: 1,
    y: 0
  }} transition={{
    duration: 0.6
  }} className="w-full mx-auto">
      <Card className="shadow-md rounded-3xl">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2 rounded-3xl bg-black">
          <CardTitle className="text-lg sm:text-xl flex items-center text-black py-[10px] md:text-2xl">
            <PieChartIcon className="mr-2 h-5 w-5 sm:h-6 sm:w-6 text-blue-500 flex-shrink-0" />
            <span className="truncate" data-translate="true">Análisis de Sentimiento Nacional</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 sm:pt-6 px-2 sm:px-4 md:px-6">
          <div className="grid md:grid-cols-7 gap-2 sm:gap-4">
            <div className="md:col-span-3 flex flex-col justify-center items-center">
              <div className="text-center mb-2">
                <h3 className="text-base sm:text-lg md:text-xl font-medium" data-translate="true">Percepción General</h3>
                <p className="text-xs sm:text-sm text-gray-500" data-translate="true">Distribución de sentimiento</p>
              </div>
              <div className="h-40 sm:h-48 md:h-56 w-full max-w-[280px] mx-auto flex items-center justify-center">
                {nationalSentiment && <ChartContainer config={chartConfig} className="h-full w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={chartData} cx="50%" cy="50%" labelLine={false} outerRadius={70} innerRadius={35} paddingAngle={2} dataKey="value" animationDuration={800} animationBegin={300}>
                          {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>}
              </div>
            </div>
            <div className="md:col-span-4">
              <div className="h-full flex flex-col justify-around">
                <div className="mb-2 sm:mb-4">
                  <p className="text-sm sm:text-base md:text-lg font-semibold mb-1 sm:mb-2" data-translate="true">Hallazgos Clave</p>
                  <ul className="space-y-1 sm:space-y-2">
                    {findings.map((finding, index) => <li key={index} className="flex items-start text-xs sm:text-sm">
                        <span className="inline-flex items-center justify-center h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-blue-100 text-blue-800 text-xs font-medium mr-1 sm:mr-2 flex-shrink-0">{index + 1}</span>
                        <span className="flex-1" data-translate="true">{finding}</span>
                      </li>)}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
                  {stats.map(stat => <Card key={stat.title} className="shadow-sm">
                      <CardContent className="p-2 sm:p-4">
                        <div className="flex items-center justify-between mb-1 sm:mb-2">
                          <span className="text-xs text-gray-500 truncate" data-translate="true">{stat.title}</span>
                          {stat.icon}
                        </div>
                        <div className="text-base sm:text-xl md:text-2xl font-bold">{stat.value}</div>
                        <div className="text-[10px] sm:text-xs text-gray-500 mt-0.5 sm:mt-1 truncate" data-translate="true">{stat.description}</div>
                      </CardContent>
                    </Card>)}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>;
};
export default SentimentSummaryCard;