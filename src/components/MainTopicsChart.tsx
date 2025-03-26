
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from 'recharts';
import { ListFilter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MainTopicsChart = ({ topics }: { topics: Record<string, number> }) => {
  const { t } = useLanguage();

  // Transform the topics object into an array format that Recharts can use
  const data = Object.entries(topics)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // Sort by value in descending order

  // Generate colors based on the data position
  const getBarColor = (index: number) => {
    const colors = ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6', '#4C1D95', '#4338CA'];
    return colors[index % colors.length];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 pb-2">
          <CardTitle className="text-xl font-medium flex items-center">
            <ListFilter size={20} className="text-purple-500 mr-2" />
            <span>{t('common.mainTopics')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-2 text-sm text-gray-500">
            {data.length > 0 ? 
              t('stateDetail.topicsDescription') : 
              t('stateDetail.noTopicsData')}
          </div>
          
          <div className="h-72 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis 
                  type="number" 
                  domain={[0, 100]} 
                  tickFormatter={(value) => `${value}%`} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fontSize: 12 }} 
                  width={120}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, t('common.percentage')]}
                  contentStyle={{ 
                    borderRadius: '8px', 
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    border: '1px solid #f1f1f1' 
                  }}
                />
                <Bar 
                  dataKey="value" 
                  radius={[0, 4, 4, 0]}
                  animationDuration={1500}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MainTopicsChart;
