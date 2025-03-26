
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';

interface SectorImpact {
  name: string;
  value: number;
  color: string;
}

// Modify the data structure to include a translatable name property
const data: SectorImpact[] = [
  { name: 'Automotriz', value: 18, color: '#5470c6' },
  { name: 'Agricultura', value: 16, color: '#52b788' },
  { name: 'Manufactura', value: 15, color: '#f59e0b' },
  { name: 'Acero/Aluminio', value: 14, color: '#6b7280' },
  { name: 'Comercio', value: 12, color: '#d53f8c' },
  { name: 'Turismo', value: 8, color: '#06b6d4' },
  { name: 'Bebidas', value: 7, color: '#a78bfa' },
];

const SectorsImpactChart = ({ mini = false }: { mini?: boolean }) => {
  const { t } = useLanguage();

  // We'll create a custom label renderer that wraps the sector names in spans with data-translate
  const renderCustomAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-3} y={0} dy={5} textAnchor="end" fill="#666" fontSize={12}>
          <tspan data-translate="true">{payload.value}</tspan>
        </text>
      </g>
    );
  };

  const chartVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const barVariants = {
    hidden: { scaleX: 0 },
    visible: (i: number) => ({
      scaleX: 1,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: "easeInOut"
      }
    })
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={chartVariants}
    >
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
          <CardTitle className="text-xl flex items-center">
            <span data-translate="true">{t('common.affectedSectors')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ResponsiveContainer width="100%" height={mini ? 200 : 300}>
              <BarChart 
                data={data} 
                layout="vertical"
                margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  tick={renderCustomAxisTick}
                />
                <Tooltip 
                  formatter={(value, name) => [value, name]} 
                  labelFormatter={(value) => <span data-translate="true">{value}</span>}
                />
                <Bar dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SectorsImpactChart;
