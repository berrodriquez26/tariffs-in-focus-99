
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TopArgumentsChart = () => {
  const proArguments = [
    { text: "Diversificación de mercados", states: 16, color: '#22c55e' },
    { text: "Fortalecimiento del mercado interno", states: 14, color: '#22c55e' },
    { text: "Mejora en políticas migratorias", states: 13, color: '#22c55e' },
    { text: "Impulso a producción nacional", states: 10, color: '#22c55e' },
    { text: "Presión para combatir narcotráfico", states: 9, color: '#22c55e' },
  ];

  const conArguments = [
    { text: "Aumento de precios para consumidores", states: 21, color: '#ef4444' },
    { text: "Pérdida de empleos en exportación", states: 20, color: '#ef4444' },
    { text: "Violación al T-MEC", states: 15, color: '#ef4444' },
    { text: "Daño a relaciones bilaterales", states: 14, color: '#ef4444' },
    { text: "Afectación a economía local", states: 13, color: '#ef4444' },
  ];

  // Create custom tick renderers for both charts
  const renderCustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    const text = payload.value;
    const displayText = text.length > 22 ? `${text.substring(0, 22)}...` : text;
    
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={-3} y={0} dy={5} textAnchor="end" fill="#666" fontSize={10}>
          <tspan data-translate="true">{displayText}</tspan>
        </text>
      </g>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-md">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 pb-2">
          <CardTitle className="text-2xl flex items-center">
            <MessageCircle className="mr-2 h-6 w-6 text-purple-500" />
            <span data-translate="true">Principales Argumentos a Favor y en Contra</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <CheckCircle size={18} className="text-green-500 mr-2" />
                <span data-translate="true">Argumentos a Favor</span>
              </h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={proArguments}
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="text" 
                      type="category" 
                      width={150}
                      tick={renderCustomYAxisTick}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} estados`, 'Menciones']}
                      labelFormatter={(label) => <span data-translate="true">{label}</span>}
                    />
                    <Bar 
                      dataKey="states" 
                      name="Estados que lo mencionan"
                      radius={[0, 4, 4, 0]}
                    >
                      {proArguments.map((entry) => (
                        <Cell key={entry.text} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p data-translate="true">A pesar del predominio del sentimiento negativo, 16 estados mencionan la oportunidad de reducir dependencia de EE.UU. y establecer relaciones con otros mercados como China, Rusia, UE y BRICS.</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <XCircle size={18} className="text-red-500 mr-2" />
                <span data-translate="true">Argumentos en Contra</span>
              </h3>
              <div className="h-60">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={conArguments}
                    layout="vertical"
                    margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" />
                    <YAxis 
                      dataKey="text" 
                      type="category" 
                      width={150}
                      tick={renderCustomYAxisTick}
                    />
                    <Tooltip
                      formatter={(value) => [`${value} estados`, 'Menciones']}
                      labelFormatter={(label) => <span data-translate="true">{label}</span>}
                    />
                    <Bar 
                      dataKey="states" 
                      name="Estados que lo mencionan"
                      radius={[0, 4, 4, 0]}
                    >
                      {conArguments.map((entry) => (
                        <Cell key={entry.text} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-sm text-gray-600">
                <p data-translate="true">Las preocupaciones más extendidas se relacionan con el aumento de precios para consumidores mexicanos (21 estados) y la pérdida de empleos en sectores exportadores (20 estados).</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TopArgumentsChart;
