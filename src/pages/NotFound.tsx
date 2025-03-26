
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLanguage();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-6">{t('errors.pageNotFound') || 'Página no encontrada'}</p>
        <p className="text-gray-500 mb-6">
          {t('errors.routeDoesNotExist') || 'La ruta solicitada no existe:'}
          <br />
          <code className="bg-gray-100 px-2 py-1 rounded text-sm mt-2 inline-block">
            {location.pathname}
          </code>
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button variant="outline" asChild>
            <Link to="/dashboard" className="flex items-center gap-2">
              <Home size={16} />
              {t('errors.goToDashboard') || 'Ir al Dashboard'}
            </Link>
          </Button>
          <Button variant="default" onClick={() => window.history.back()}>
            <ArrowLeft size={16} className="mr-2" />
            {t('errors.goBack') || 'Volver'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
