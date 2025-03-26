
import { PieChart, Pie, Cell, Legend, ResponsiveContainer, Tooltip } from 'recharts';
import { Smile } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface SentimentChartProps {
  positive: number;
  neutral: number;
  negative: number;
  className?: string;
}

const SentimentChart = ({ positive, neutral, negative, className }: SentimentChartProps) => {
  const { t } = useLanguage();
  
  // Create data for the pie chart
  const data = [
    { name: t('common.positive'), value: positive, color: '#22c55e' },
    { name: t('common.neutral'), value: neutral, color: '#94a3b8' },
    { name: t('common.negative'), value: negative, color: '#ef4444' }
  ];

  // Custom legend that handles the Spanish labels
  const CustomizedLegend = (props: any) => {
    const { payload } = props;
    
    return (
      <ul className="flex justify-center space-x-6 pt-4">
        {payload.map((entry: any, index: number) => (
          <li key={`item-${index}`} className="flex items-center">
            <div 
              style={{ backgroundColor: entry.color }}
              className="w-3 h-3 mr-2 rounded-full"
            />
            <span className="text-xs text-gray-600" data-translate="true">
              {entry.value}
            </span>
          </li>
        ))}
      </ul>
    );
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 border border-gray-200 rounded shadow-sm">
          <p className="text-sm font-medium" data-translate="true">{`${payload[0].name}: ${payload[0].value}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`shadow-md overflow-hidden ${className}`}>
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 pb-2">
        <CardTitle className="text-xl font-medium flex items-center">
          <Smile size={20} className="text-green-500 mr-2" />
          <span>{t('common.sentiment')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  value,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = 25 + innerRadius + (outerRadius - innerRadius);
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="#000"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-xs font-medium"
                    >
                      {`${value}%`}
                    </text>
                  );
                }}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend content={<CustomizedLegend />} />
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default SentimentChart;
