
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const FooterSection = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-black py-12 border-t border-white/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <img 
              src="https://raw.githubusercontent.com/berrodriquez26/SharkAttacks/refs/heads/main/lordlogo.png" 
              alt="QuienOpina Logo" 
              className="h-8 w-auto"
            />
            <p className="text-gray-400 mt-4">{t('landing.transform.data')}</p>
            
            <div className="flex space-x-4 mt-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">{t('landing.services')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.data.analysis')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.visualization')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.ai.consulting')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.market.intelligence')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">{t('landing.resources')}</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.blog')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.documentation')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.reports')}
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.tutorials')}
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">{t('landing.company')}</h3>
            <ul className="space-y-3">
              <li>
                <Link to="#about-us" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.aboutUs')}
                </Link>
              </li>
              <li>
                <Link to="/equipo" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.team')}
                </Link>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.careers')}
                </a>
              </li>
              <li>
                <Link to="#contact" className="text-gray-400 hover:text-white transition-colors">
                  {t('landing.contact')}
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} QuienOpina. {t('landing.rights')}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              {t('landing.terms')}
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              {t('landing.privacy.policy')}
            </a>
            <a href="#" className="text-gray-500 text-sm hover:text-white transition-colors">
              {t('landing.cookies')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
