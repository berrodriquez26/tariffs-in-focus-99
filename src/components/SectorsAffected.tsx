
import { Factory } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface SectorAffected {
  nombre: string;
  empresas: string[];
}

// Accept both formats: array of sector objects or record of sector names to counts
interface SectorsAffectedProps {
  sectors: SectorAffected[] | Record<string, number>;
}

const SectorsAffected = ({ sectors }: SectorsAffectedProps) => {
  const { t } = useLanguage();

  // Convert sectors to array format if it's a Record
  const sectorsArray: SectorAffected[] = Array.isArray(sectors)
    ? sectors
    : Object.entries(sectors).map(([nombre, _]) => ({
        nombre,
        empresas: []
      }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Card className="shadow-md overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 pb-2">
          <CardTitle className="text-xl font-medium flex items-center">
            <Factory size={20} className="text-blue-500 mr-2" />
            <span>{t('common.affectedSectors')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          {sectorsArray.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('common.sector')}</TableHead>
                  <TableHead>{t('common.companies')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sectorsArray.map((sector, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="font-medium" data-translate="true">{sector.nombre}</TableCell>
                    <TableCell>
                      {sector.empresas && sector.empresas.length > 0 ? (
                        <div className="flex flex-wrap gap-1">
                          {sector.empresas.map((empresa, idx) => (
                            <span 
                              key={idx} 
                              className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs"
                              data-translate="true"
                            >
                              {empresa}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm italic text-gray-500">
                          {t('common.noCompaniesSpecified')}
                        </span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 italic">{t('common.noSectorsData')}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SectorsAffected;
