import { motion } from 'framer-motion';
import Header from '@/components/Header';
import NavigationHeader from '@/components/NavigationHeader';
import { MessageSquare, AlertCircle, User2, Building2, FilePieChart } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ArgumentsList from '@/components/ArgumentsList';
import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { translateAllElements, setupTabChangeTranslation } from '@/utils/translateUtils';
const Opinions = () => {
  const {
    language
  } = useLanguage();

  // Scroll to top when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Setup special handling for tabs and dynamic content
  useEffect(() => {
    // Setup tab change listeners
    setupTabChangeTranslation();

    // Initial translation of visible content
    if (language === 'en') {
      setTimeout(() => {
        translateAllElements(language);
      }, 500);
    }

    // Add listener for tab changes
    const handleTabClick = () => {
      if (language === 'en') {
        setTimeout(() => {
          // Find newly active tab content
          const activeTabContent = document.querySelector('[role="tabpanel"][data-state="active"]');
          if (activeTabContent) {
            // Mark all text elements for translation
            const textElements = activeTabContent.querySelectorAll('p, span, h3, h4, li, div:not(.tab-content):not([role="tabpanel"])');
            let count = 0;
            textElements.forEach(el => {
              if (el.textContent && el.textContent.trim() !== '' && el.children.length === 0 && !el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', 'true');
                count++;
              }
            });
            if (count > 0) {
              console.log(`Marked ${count} elements in new tab for translation`);
              translateAllElements(language);
            }
          }
        }, 300);
      }
    };

    // Add listeners to tab triggers
    const tabTriggers = document.querySelectorAll('[role="tab"]');
    tabTriggers.forEach(tab => {
      tab.addEventListener('click', handleTabClick);
    });
    return () => {
      // Remove listeners
      tabTriggers.forEach(tab => {
        tab.removeEventListener('click', handleTabClick);
      });
    };
  }, [language]);
  return <div className="min-h-screen pb-20 opinions-page bg-gray-200">
      <NavigationHeader />
      
      {/* Add padding top to account for the fixed header */}
      <div className="pt-20">
        <Header />
      </div>
      
      <div className="container mx-auto px-4 py-4">
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.6
      }} className="text-center mb-8">
          <h1 data-translate="true" className="font-bold mb-4 text-5xl">Análisis de Opiniones</h1>
          <p data-translate="true" className="max-w-2xl mx-auto mb-4 text-lg text-zinc-700">
            Análisis de la distribución de opiniones por bloques políticos sobre los aranceles propuestos.
          </p>
          
          <div className="bg-white shadow-md p-6 max-w-3xl mx-auto mb-10 rounded-3xl">
            <h2 data-translate="true" className="font-semibold mb-4 text-3xl">Sentimiento General</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-red-50 p-4 text-center rounded-full">
                <span className="text-2xl font-bold text-red-600">71%</span>
                <p className="text-sm text-gray-600" data-translate="true">En contra</p>
              </div>
              <div className="bg-green-50 p-4 text-center rounded-full">
                <span className="text-2xl font-bold text-green-600">11%</span>
                <p className="text-sm text-gray-600" data-translate="true">A favor</p>
              </div>
              <div className="bg-gray-50 p-4 text-center rounded-full">
                <span className="text-2xl font-bold text-gray-600">18%</span>
                <p className="text-sm text-gray-600" data-translate="true">Neutral</p>
              </div>
            </div>
            <p data-translate="true" className="text-sm text-gray-600 italic px-[100px]">
              Insight: Es notable que incluso legisladores republicanos (Ron Johnson, Jerry Moran) se pronuncian en contra, 
              sobre todo por el impacto negativo en la agricultura estadounidense.
            </p>
          </div>
        </motion.div>
        
        {/* Mexican Political Blocs */}
        <div className="mb-12">
          <h2 data-translate="true" className="font-bold mb-6 text-center text-3xl">Comentarios e Insights por Bloques Políticos (México)</h2>
          
          <Tabs defaultValue="morena" className="w-full opinions-tabs">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="morena">Morena</TabsTrigger>
              <TabsTrigger value="pan">PAN</TabsTrigger>
              <TabsTrigger value="pri">PRI</TabsTrigger>
              <TabsTrigger value="mc">MC</TabsTrigger>
            </TabsList>
            
            {/* MORENA */}
            <TabsContent value="morena">
              <div className="bg-gradient-to-r from-purple-50 to-red-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Morena</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Postura oficial: Defender la negociación y mostrar respaldo total a la presidenta Claudia Sheinbaum.</p>
                  </div>
                  <div className="w-32 h-32 bg-white overflow-hidden rounded-md flex items-center justify-center">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNVTbFSTPC4JWzmAmcSTqrZBDjPKqgRlrBcw&s" alt="Logo de Morena" className="w-full h-full object-contain" />
                  </div>
                </div>

                <h4 className="font-semibold mb-2" data-translate="true">Narrativa:</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                  <li data-translate="true">Se menciona que los aranceles son una decisión unilateral y contraria al espíritu del libre comercio.</li>
                  <li data-translate="true">Hay énfasis en la unidad nacional y en la necesidad de no renegociar el T-MEC de forma apresurada.</li>
                  <li data-translate="true">Ricardo Monreal subraya que el Congreso está en sesión permanente sobre el tema y que se tomarán medidas de reciprocidad si EE.UU. continúa.</li>
                  <li data-translate="true">Se propone mantener la cabeza fría y firmeza, según la propia Sheinbaum y sus aliados.</li>
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/1/18/Presidenta_Claudia_Sheinbaum_%28cropped%29.jpg" alt="Claudia Sheinbaum" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Claudia Sheinbaum</CardTitle>
                        <CardDescription data-translate="true">Presidenta de México</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Propone un plan de cinco puntos para fortalecer la economía nacional (enfatiza el mercado interno, la seguridad y la firmeza diplomática frente a Trump).</li>
                        <li data-translate="true">Muestra un enfoque de "sangre fría y firmeza" para evitar una guerra arancelaria; coordina con Marcelo Ebrard (Secretario de Economía) para mantener negociaciones.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiYwtnksEIKZc_cy_bkdjyp05m2LXg9l2K4A&s" alt="Ricardo Monreal" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Ricardo Monreal</CardTitle>
                        <CardDescription data-translate="true">Coordinador Morena en Diputados</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Apoya el acuerdo temporal para evitar aranceles, confiando en convertirlo en algo permanente.</li>
                        <li data-translate="true">No propone renegociar el T-MEC de inmediato; prefiere mantener la estrategia de contención y respaldar a Sheinbaum con la mayoría legislativa.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn0JUyvQkWDJh0CLZ87421i4HKQ_6uKYsDkg&s" alt="Pedro Haces" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Pedro Haces</CardTitle>
                        <CardDescription data-translate="true">Diputado Morena/CATEM</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Convoca a la unión entre gobierno, sector empresarial y obrero para diseñar una respuesta común.</li>
                        <li data-translate="true">Sugiere considerar aplicar aranceles a China por "competencia desleal", como estrategia paralela para proteger la industria nacional.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://morena.senado.gob.mx/wp-content/uploads/2024/10/Andrea-Chavez-1.jpg" alt="Andrea Chávez" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Andrea Chávez</CardTitle>
                        <CardDescription data-translate="true">Senadora Morena</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Subraya la importancia de la unidad nacional alrededor de la presidenta.</li>
                        <li data-translate="true">Propone mantener la coordinación con congresistas estadounidenses para lograr cambios a las políticas arancelarias de Trump.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.lapoliticaonline.com/files/image/205/205025/652aed2b6ba1e_940_529!.jpg?s=ac40fca2037a5d96097fa0080d756d00&d=1697321655" alt="Ignacio Mier y Emmanuel Reyes" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Ignacio Mier, Emmanuel Reyes</CardTitle>
                        <CardDescription data-translate="true">Legisladores de Morena</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-700" data-translate="true">
                        Mantener la posición de "defender los intereses nacionales vía diálogo y cumplimiento de acuerdos comerciales" sin abrir frentes innecesarios.
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv5XVCwlwESoZY-t1NQvFX3Dsaw-1j-pTh2A&s" alt="Gerardo Fernández Noroña" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Gerardo Fernández Noroña</CardTitle>
                        <CardDescription data-translate="true">Presidente de la Mesa Directiva del Senado</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Encabeza pronunciamientos formales en el Senado: "Unidad Nacional Frente al Injerencismo".</li>
                        <li data-translate="true">Califica la política de EE.UU. como irresponsable y llama a no responder con "una guerra comercial", sino con presión diplomática coordinada.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* PAN */}
            <TabsContent value="pan">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">PAN</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Coinciden en que están en contra de los aranceles, pero su narrativa critica al gobierno de Morena por "entregar" la seguridad al crimen y por no adoptar un plan claro.</p>
                  </div>
                  <div className="w-32 h-32 bg-white overflow-hidden rounded-md flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/PAN_logo_%28Mexico%29.svg/1200px-PAN_logo_%28Mexico%29.svg.png" alt="Logo del PAN" className="w-full h-full object-contain" />
                  </div>
                </div>

                <h4 className="font-semibold mb-2" data-translate="true">Líneas destacadas:</h4>
                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                  <li data-translate="true">Ricardo Anaya y Gerardo Aguado sugieren imponer "aranceles focalizados e inteligentes" para presionar a EE.UU. en estados clave políticamente.</li>
                  <li data-translate="true">Critican que el oficialismo celebre una "pausa de aranceles" cuando es solo temporal.</li>
                  <li data-translate="true">Proponen diplomacia más activa (reuniones interparlamentarias).</li>
                  <li data-translate="true">Acusan a la 4T de generar condiciones que desembocan en estos conflictos comerciales.</li>
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.pan.senado.gob.mx/wp-content/uploads/2024/08/PERFIL_RICARDO_ANAYA.jpg" alt="Ricardo Anaya" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Ricardo Anaya</CardTitle>
                        <CardDescription data-translate="true">Ex candidato presidencial / Senador</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Aplicar aranceles de represalia focalizados en distritos clave de EE.UU., para presionar políticamente a Trump.</li>
                        <li data-translate="true">Convocar reuniones interparlamentarias México-EE.UU. para cabildear con legisladores estadounidenses.</li>
                        <li data-translate="true">"Abandonar la política de abrazos" y endurecer la seguridad contra el crimen organizado, pues a su juicio influye en las decisiones de Trump.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ65Q5H8QJreXJhlp_sS757HwZPKpupsrXEuw&s" alt="Gerardo Aguado" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Gerardo Aguado</CardTitle>
                        <CardDescription data-translate="true">Diputado PAN</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Reitera la idea de aranceles focalizados a productos estadounidenses.</li>
                        <li data-translate="true">Propone una reforma fiscal temporal para ayudar a sectores mexicanos más afectados por los gravámenes.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://sitl.diputados.gob.mx/LXV_leg/fotos_lxvconfondo/402_foto_chica.jpg" alt="Héctor Saúl Téllez" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Elías Lixa, Héctor Saúl Téllez, Noemí Luna</CardTitle>
                        <CardDescription data-translate="true">Diputados PAN</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Rechazan la imposición unilateral de EE.UU.</li>
                        <li data-translate="true">Exigen que la presidenta y sus secretarios presenten una estrategia clara para enfrentar los aranceles.</li>
                        <li data-translate="true">Señalan que se debe dialogar y fortalecer la seguridad interna para no dar pretextos a Trump.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.liderempresarial.com/wp-content/uploads/2019/02/IMG_02371.jpg" alt="Bancada del PAN" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Bancada del PAN</CardTitle>
                        <CardDescription data-translate="true">Congreso local de NL, Chihuahua, etc.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Apuestan por la diplomacia y la interparlamentaria con EE.UU.</li>
                        <li data-translate="true">Proponen medidas para mitigar los aranceles en lo económico, al tiempo que exigen acciones contra el crimen.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmN80H9o4ytGSkV4DzHb26Zajb3lJNbx7rYQ&s" alt="Kenia López y otros legisladores" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Jorge Triana, Lilly Téllez, Kenia López Rabadán, Margarita Zavala</CardTitle>
                        <CardDescription data-translate="true">Legisladores</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">La línea común es criticar al Gobierno Federal por supuestos "pactos con el narco" y falta de mano dura en seguridad.</li>
                        <li data-translate="true">Llaman a una postura firme y "romper" toda sospecha de complicidad con cárteles para reducir la presión arancelaria.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* PRI */}
            <TabsContent value="pri">
              <div className="bg-gradient-to-r from-red-50 to-green-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">PRI</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Tono: "Preocupación por la economía y la industria"; proponen adelantar la renegociación del T-MEC para dar certeza a futuro.</p>
                  </div>
                  <div className="w-32 h-32 bg-white overflow-hidden rounded-md flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PRI_logo_%28Mexico%29.svg/1200px-PRI_logo_%28Mexico%29.svg.png" alt="Logo del PRI" className="w-full h-full object-contain" />
                  </div>
                </div>

                <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-700">
                  <li data-translate="true">Señalan que postergar no es celebrar, pues el riesgo persiste.</li>
                  <li data-translate="true">Dan cifras de exportaciones que podrían verse afectadas (hasta 250 mil millones de dólares) y la repercusión en empleos.</li>
                </ul>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7uwLfhW3vzaEyQv8lIkjbDXmfkcAwSN2s_Q&s" alt="Rubén Moreira" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Rubén Moreira</CardTitle>
                        <CardDescription data-translate="true">Coordinador PRI en Diputados</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Propone "adelantar la renegociación del TMEC" para dar certeza y tranquilidad a inversionistas.</li>
                        <li data-translate="true">Insiste en que la postergación de aranceles "no es victoria" e insta al gobierno a buscar "unidad nacional" y buenos resultados en seguridad.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB5VhpTWsPQ4xVu-qyXkmzQ3hSYTRGTvzuow&s" alt="Guillermo 'Memo' Ramírez" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Guillermo 'Memo' Ramírez</CardTitle>
                        <CardDescription data-translate="true">Diputado local en Chihuahua</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Llama a los diferentes niveles de gobierno a dialogar con el sector privado para trazar un plan conjunto.</li>
                        <li data-translate="true">Subraya la urgencia de preparar medidas de contingencia económica dada la alta exposición de Chihuahua.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Anabell_%C3%81valos_Zempoalteca.jpg" alt="Anabell Ávalos" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Anabell Ávalos</CardTitle>
                        <CardDescription data-translate="true">Diputada del PRI</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Rechaza una guerra de aranceles con EE.UU., advirtiendo riesgos para la industria automotriz y otros sectores.</li>
                        <li data-translate="true">Propone mayores incentivos para retener empleos y establecer una política pública integral de defensa comercial.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvCKZs83IWGRqIHd4nzvsJVjgN6r0C7b2Jgw&s" alt="Alejandro Moreno 'Alito'" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Alejandro Moreno "Alito"</CardTitle>
                        <CardDescription data-translate="true">Senador PRI</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Acusa al Gobierno de Morena de provocar la crisis, pero no presenta un plan de represalia arancelaria.</li>
                        <li data-translate="true">Propone un enfoque diplomático-firme y la reactivación de los mecanismos previstos en el T-MEC para resolver controversias.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* MC */}
            <TabsContent value="mc">
              <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Movimiento Ciudadano</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Proponen planes concretos de apoyo a PyMEs y buscan fortalecer alianzas con otros países para no depender excesivamente del mercado de EE.UU.</p>
                  </div>
                  <div className="w-32 h-32 bg-white overflow-hidden rounded-md flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Logo_Partido_Movimiento_Ciudadano_%28M%C3%A9xico%29.svg/1200px-Logo_Partido_Movimiento_Ciudadano_%28M%C3%A9xico%29.svg.png" alt="Logo de Movimiento Ciudadano" className="w-full h-full object-contain" />
                  </div>
                </div>

                <p className="text-gray-700 mb-4" data-translate="true">
                  Samuel García (gobernador) y Miguel Ángel Flores (diputado local) impulsan acciones estatales para mitigar el impacto, 
                  por ejemplo "Hecho en Nuevo León" y otros incentivos.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.radioformula.com.mx/u/fotografias/m/2024/8/28/f768x1-823762_823889_174.jpeg" alt="Miguel Ángel Flores" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Miguel Ángel Flores</CardTitle>
                        <CardDescription data-translate="true">Coordinador MC en Congreso local</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Descalifica los aranceles como "sin sentido" y propone "Hecho en Nuevo León" y otras campañas para el mercado interno.</li>
                        <li data-translate="true">Favorece fortalecer alianzas con Canadá y otros socios para no depender únicamente de EE.UU.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ0scFUMP2-982_RZyTMq28zq2DWCBHlPJIQ&s" alt="Samuel García" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Samuel García</CardTitle>
                        <CardDescription data-translate="true">Gobernador de Nuevo León</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Lanzó un programa de apoyo a micro, pequeñas y medianas empresas ante la amenaza arancelaria.</li>
                        <li data-translate="true">Relanzó "Hecho en Nuevo León" para fomentar el consumo local y mitigar impacto a exportadores.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://senadoresciudadanos.mx/sites/default/files/clemente_castaneda-02.png" alt="Clemente Castañeda" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Clemente Castañeda</CardTitle>
                        <CardDescription data-translate="true">Legislador de MC</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Propone un decálogo de medidas para enfrentar la crisis, enfocado en inteligencias de Estado (diplomacia, finanzas públicas sanas, diversificación comercial).</li>
                        <li data-translate="true">Respalda a la presidenta Sheinbaum "para construir una salida digna y firme" pero exige "visión de Estado".</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* US Political Blocs */}
        <div className="mb-12">
          <h2 data-translate="true" className="font-bold mb-6 text-center text-3xl">Comentarios e Insights por Bloques Políticos (Estados Unidos)</h2>
          
          <Tabs defaultValue="republicans" className="w-full opinions-tabs">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="republicans" data-translate="true">Republicanos</TabsTrigger>
              <TabsTrigger value="democrats" data-translate="true">Demócratas</TabsTrigger>
              <TabsTrigger value="local" data-translate="true">Autoridades Locales</TabsTrigger>
            </TabsList>
            
            {/* Republicans */}
            <TabsContent value="republicans">
              <div className="bg-gradient-to-r from-red-50 to-blue-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2" data-translate="true">Republicanos</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Tono: "Defensa de la política de Trump como única solución"; enfatizan temas de seguridad fronteriza y delincuencia.</p>
                  </div>
                  <div className="w-32 h-32 bg-white overflow-hidden rounded-md flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Republicanlogo.svg/1200px-Republicanlogo.svg.png" alt="Logo del Partido Republicano" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg" alt="Donald Trump" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Donald Trump</CardTitle>
                        <CardDescription data-translate="true">Presidente electo de EE.UU.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">"México y Canadá tendrán que pagar un precio si permiten que personas atraviesen su territorio para entrar ilegalmente a nuestro país."</li>
                        <li data-translate="true">"Usaremos todos los instrumentos disponibles, incluidos los aranceles, para proteger nuestra soberanía y defender nuestras fronteras."</li>
                        <li data-translate="true">Mantiene que los aranceles son la única forma de conseguir que México "coopere" en materia de seguridad fronteriza y narcotráfico.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.republicanleader.gov/wp-content/uploads/2023/01/mikejohnson-2048x2048.jpg" alt="Mike Johnson" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Mike Johnson</CardTitle>
                        <CardDescription data-translate="true">Presidente de la Cámara de Representantes</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Respalda la estrategia de Trump, argumentando que "todas las opciones deben estar sobre la mesa" para frenar migración y tráfico de drogas.</li>
                        <li data-translate="true">Sugiere que los aranceles son una herramienta de presión necesaria para que México "mejore su colaboración".</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.cruz.senate.gov/assets/img/cruz-portrait.jpg" alt="Ted Cruz" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Ted Cruz</CardTitle>
                        <CardDescription data-translate="true">Senador por Texas</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Apoya condicionar la política arancelaria a compromisos verificables de México en materia de migración y operativos contra el narcotráfico.</li>
                        <li data-translate="true">Propone establecer un "sistema de métricas" para evaluar los avances de México y ajustar los aranceles en consecuencia.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.moran.senate.gov/public/_cache/files/d/9/d9672c29-5cb5-4c28-9100-c4528f50e59f/29FAF44E9B9D6545F1E7FE3828F9E76C.moran-jerry-official-senate.jpg" alt="Jerry Moran" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Jerry Moran y Ron Johnson</CardTitle>
                        <CardDescription data-translate="true">Senadores republicanos</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Expresan preocupación por el impacto de los aranceles en agricultores estadounidenses, especialmente en estados como Kansas y Wisconsin.</li>
                        <li data-translate="true">Sugieren encontrar mecanismos alternativos para presionar a México sin afectar tanto a los productores de EE.UU.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Democrats */}
            <TabsContent value="democrats">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2" data-translate="true">Demócratas</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Tono: "Crítica a la política unilateral y proteccionista"; enfatizan los daños económicos para ambos países.</p>
                  </div>
                  <div className="w-32 h-32 bg-white overflow-hidden rounded-md flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/DemocraticLogo.svg/1200px-DemocraticLogo.svg.png" alt="Logo del Partido Demócrata" className="w-full h-full object-contain" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/d/d6/Chuck_Schumer_official_photo.jpg" alt="Chuck Schumer" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Chuck Schumer</CardTitle>
                        <CardDescription data-translate="true">Líder de la mayoría en el Senado</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Califica los aranceles como "un golpe económico autoinfligido" que perjudicará más a EE.UU. que a México.</li>
                        <li data-translate="true">Advierte que los estados fronterizos perderán miles de empleos y que los consumidores pagarán precios más altos.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.heinrich.senate.gov/images/bio/heinrich-martin-official-portrait-2021.jpg" alt="Martin Heinrich" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Martin Heinrich</CardTitle>
                        <CardDescription data-translate="true">Senador por Nuevo México</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Critica que los aranceles violan el T-MEC y socavan años de colaboración binacional.</li>
                        <li data-translate="true">Propone priorizar la diplomacia y el diálogo institucional a través de los mecanismos del tratado comercial.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Hakeem_Jeffries_official_portrait.jpg/1200px-Hakeem_Jeffries_official_portrait.jpg" alt="Hakeem Jeffries" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Hakeem Jeffries</CardTitle>
                        <CardDescription data-translate="true">Líder demócrata en la Cámara</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Advierte que los aranceles podrían provocar una recesión económica en ambos lados de la frontera.</li>
                        <li data-translate="true">Sugiere buscar soluciones bipartidistas y coordinadas con México para abordar los desafíos compartidos.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Veronica_Escobar%2C_official_portrait%2C_116th_Congress.jpg/1200px-Veronica_Escobar%2C_official_portrait%2C_116th_Congress.jpg" alt="Verónica Escobar" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Verónica Escobar</CardTitle>
                        <CardDescription data-translate="true">Representante por Texas</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Denuncia que los aranceles penalizan especialmente a las comunidades fronterizas y a sectores estratégicos.</li>
                        <li data-translate="true">Propone establecer un grupo de trabajo binacional para coordinar políticas migratorias y de seguridad.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Local Authorities */}
            <TabsContent value="local">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
                <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2" data-translate="true">Autoridades Estatales y Locales</h3>
                    <p className="text-gray-700 mb-4" data-translate="true">Las autoridades de estados fronterizos (California, Arizona, Nuevo México y Texas) muestran preocupación por el impacto económico directo.</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.nga.org/wp-content/uploads/2018/07/California-Governor-Gavin-Newsom-1500x1682.jpg" alt="Gavin Newsom" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Gavin Newsom</CardTitle>
                        <CardDescription data-translate="true">Gobernador de California</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Critica duramente los aranceles, calificándolos de "acto de sabotaje económico".</li>
                        <li data-translate="true">Anuncia medidas de compensación estatales para mitigar el impacto en las empresas californianas.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://governor.texas.gov/uploads/images/general/headshot_Governor_Abbott_2022.png" alt="Greg Abbott" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Greg Abbott</CardTitle>
                        <CardDescription data-translate="true">Gobernador de Texas</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Posición ambivalente: apoya la estrategia de presión a México en materia migratoria, pero expresa preocupación por el impacto en la economía de Texas.</li>
                        <li data-translate="true">Propone medidas estatales para mitigar los efectos y solicita excepciones para ciertos sectores clave de Texas.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.lasvegasnevada.gov/files/assets/public/images/business/mayor-goodman.png" alt="Carolyn Goodman" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Alcaldes fronterizos</CardTitle>
                        <CardDescription data-translate="true">San Diego, El Paso, Tucson, etc.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Muestran preocupación por el impacto en el comercio local y el turismo transfronterizo.</li>
                        <li data-translate="true">Solicitan participación en las decisiones que afectan directamente a sus comunidades.</li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                      <div className="w-16 h-16 bg-white rounded-full overflow-hidden flex items-center justify-center">
                        <img src="https://www.elpasotexas.gov/wp-content/uploads/2017/10/peter-svarzbein-2021-2023.jpg" alt="Peter Svarzbein" className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <CardTitle data-translate="true">Cámaras de Comercio</CardTitle>
                        <CardDescription data-translate="true">Frontera México-EE.UU.</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-6 space-y-2 text-sm text-gray-700">
                        <li data-translate="true">Advierten sobre la pérdida potencial de miles de empleos en ambos lados de la frontera.</li>
                        <li data-translate="true">Proponen mantener canales de diálogo locales y regionales, independientemente de las tensiones nacionales.</li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>;
};
export default Opinions;