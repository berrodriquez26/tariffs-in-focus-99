
import { motion } from 'framer-motion';
import { LineChart, BarChart3, TrendingUp, AlertCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AnalysisSummary = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto mb-10 space-y-10"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Análisis General de Aranceles</h2>
        <p className="text-gray-600 max-w-4xl mx-auto text-lg">
          El análisis de la percepción de los aranceles propuestos muestra patrones importantes en los 23 estados mexicanos estudiados.
        </p>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <MapPin className="mr-2 text-gray-700" size={22} />
          Resumen Ejecutivo
        </h3>
        <p className="text-gray-700 leading-relaxed">
          El análisis de la percepción de los aranceles propuestos por Donald Trump en los 23 estados mexicanos revela un sentimiento predominantemente negativo (60% en promedio), aunque con variaciones regionales significativas. La Ciudad de México destaca como la única entidad con percepción mayoritariamente positiva (45%) mientras que Oaxaca y Sonora muestran el mayor rechazo (70%). La preocupación por el impacto económico inmediato —especialmente en empleo, precios y sectores exportadores— coexiste paradójicamente con la identificación de oportunidades potenciales para diversificar mercados y fortalecer la industria nacional. La percepción está fuertemente influenciada por factores como la estructura económica regional, la proximidad a la frontera y la polarización política, generando narrativas divergentes sobre la misma amenaza arancelaria.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <BarChart3 className="mr-2 text-blue-500" size={22} />
            Análisis de Sentimiento
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              El análisis muestra un patrón predominantemente negativo en 22 de los 23 estados analizados, con un promedio de 60% de percepción negativa, 23% neutra y 17% positiva. Sin embargo, esta distribución presenta variaciones significativas:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
              <li>La Ciudad de México constituye la excepción más notable, siendo el único estado con sentimiento positivo superior al negativo (45% vs 25%).</li>
              <li>Los estados con percepción más negativa son Sonora y Oaxaca (70%), seguidos por un grupo de 10 estados con 65% de sentimiento negativo.</li>
              <li>Nuevo León muestra un equilibrio relativo (35% positivo, 25% neutro, 40% negativo), siendo el segundo estado con percepción más favorable.</li>
              <li>Nayarit presenta el porcentaje más alto de opiniones neutras (50%), sugiriendo mayor desconocimiento o indecisión.</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-purple-500" size={22} />
            Impacto Económico
          </h3>
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              El análisis de la percepción sobre el impacto económico de los aranceles revela preocupaciones diferenciadas por sector y región:
            </p>
            <div>
              <h4 className="font-medium text-lg mb-2">Sectores más vulnerables según la percepción pública:</h4>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                <li>Industria automotriz (mencionada en 18 estados)</li>
                <li>Agricultura y exportaciones alimentarias (16 estados)</li>
                <li>Manufactura y maquiladoras (15 estados)</li>
                <li>Acero y aluminio (14 estados)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <AlertCircle className="mr-2 text-amber-500" size={22} />
          Insights Clave
        </h3>
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-lg mb-2">Dualidad amenaza-oportunidad en la percepción nacional</h4>
            <p className="text-gray-700 leading-relaxed">
              A pesar del predominio del sentimiento negativo (60% en promedio), existe un reconocimiento generalizado de que los aranceles podrían catalizar transformaciones económicas positivas. En 16 estados se menciona la diversificación de mercados como potencial beneficio, y en 14 el fortalecimiento del consumo interno.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-2">Regionalización del impacto percibido</h4>
            <p className="text-gray-700 leading-relaxed">
              El análisis muestra patrones claros según la estructura económica regional. Estados con fuerte presencia automotriz, fronterizos, agrícolas y mineros expresan distintas preocupaciones específicas.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-lg mb-2">Ciudad de México como anomalía estadística</h4>
            <p className="text-gray-700 leading-relaxed">
              La capital muestra un patrón de sentimiento radicalmente distinto (45% positivo, 30% neutro, 25% negativo), contrastando con el resto del país. Este fenómeno podría explicarse por la concentración de sector terciario menos dependiente de exportaciones directas.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-100">
        <h3 className="text-xl font-semibold mb-4 flex items-center">
          <LineChart className="mr-2 text-gray-700" size={22} />
          Conclusión
        </h3>
        <p className="text-gray-700 leading-relaxed">
          El análisis evidencia la tensión entre soberanía nacional y pragmatismo económico que subyace en el debate público. Los aranceles han activado una narrativa de nacionalismo económico que trasciende líneas políticas tradicionales, manifestándose en llamados al consumo local y a la diversificación hacia socios alternativos como China y los BRICS. La influencia determinante de la polarización política en la interpretación de una misma realidad económica constituye quizás el hallazgo más significativo. En última instancia, este estudio sugiere que la verdadera vulnerabilidad mexicana frente a los aranceles no radica tanto en el impacto económico inmediato —que sería indudablemente negativo pero potencialmente manejable— sino en la falta de una visión compartida sobre el modelo de desarrollo económico que el país debería perseguir.
        </p>
      </div>
    </motion.div>
  );
};

export default AnalysisSummary;
