import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import StateDetail from './pages/StateDetail';
import Trends from './pages/Trends';
import TeamPage from './pages/TeamPage';
import Opinions from './pages/Opinions';
import Landing from './pages/Landing';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { Toaster } from './components/ui/toaster';
import { DataTranslationProvider } from './contexts/DataTranslationContext';
import { StaticTranslationProvider } from './contexts/StaticTranslationContext';
import { useEffect, useState } from 'react';
import { translateAllElements } from './utils/translateUtils';
import { supabase } from './integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

// App with translations
const AppWithTranslations = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [supabaseConnected, setSupabaseConnected] = useState<boolean | null>(null);
  const [initialTranslationDone, setInitialTranslationDone] = useState(false);
  const [lastLocation, setLastLocation] = useState('');
  
  // Initialize app 
  useEffect(() => {
    // Test Supabase connection
    const testConnection = async () => {
      try {
        const { data, error } = await supabase
          .from('translations')
          .select('*')
          .limit(1);
        
        if (error) {
          console.error('Supabase connection error:', error);
          setSupabaseConnected(false);
          toast({
            title: "Modo sin conexión activado",
            description: "Usando caché local para traducciones. Algunas funciones pueden estar limitadas.",
            variant: "default",
          });
        } else {
          console.log('Supabase connection successful:', data);
          setSupabaseConnected(true);
        }
      } catch (error) {
        console.error('Supabase connection error:', error);
        setSupabaseConnected(false);
        toast({
          title: "Modo sin conexión activado",
          description: "Usando caché local para traducciones. Algunas funciones pueden estar limitadas.",
          variant: "default",
        });
      }
    };
    
    testConnection();
  }, [toast]);
  
  // Track page changes
  useEffect(() => {
    const currentPath = window.location.pathname;
    if (lastLocation !== currentPath) {
      setLastLocation(currentPath);
      console.log(`Route changed to: ${currentPath}`);
      
      // Reset initial translation flag when route changes
      setInitialTranslationDone(false);
    }
  }, [window.location.pathname, lastLocation]);
  
  // Update translation when language changes or dynamic content is loaded
  useEffect(() => {
    const translatePage = async () => {
      console.log(`Translating page to ${language}`);
      
      try {
        // Check for data-translate attribute on elements
        const elementsWithDataTranslate = document.querySelectorAll('[data-translate]');
        console.log(`Found ${elementsWithDataTranslate.length} elements with data-translate attribute`);
        
        if (elementsWithDataTranslate.length === 0 && !initialTranslationDone) {
          console.warn('No elements found with data-translate attribute. Adding attribute to text elements...');
          
          // Add data-translate attribute to common text elements
          const textElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span, div, li');
          let attributesAdded = 0;
          
          textElements.forEach(element => {
            if (
              element.textContent && 
              element.textContent.trim() !== '' && 
              element.children.length === 0 && 
              !element.hasAttribute('data-translate')
            ) {
              element.setAttribute('data-translate', 'true');
              attributesAdded++;
            }
          });
          
          console.log(`Added data-translate attribute to ${attributesAdded} elements`);
          setInitialTranslationDone(true);
        }
        
        // Translate all elements with data-translate attribute
        await translateAllElements(language);
      } catch (error) {
        console.error('Translation error:', error);
        toast({
          title: "Error de traducción",
          description: "Ocurrió un error al traducir la página. Se mostrará el contenido original.",
          variant: "destructive",
        });
      }
    };
    
    // Call translatePage whenever language changes or the URL changes
    translatePage();
    
    // Special handling for Tab changes and dynamic content
    const handleDynamicContent = () => {
      if (language === 'en') {
        setTimeout(() => {
          // Check if we're on the Opinions page
          const isOpinionsPage = window.location.pathname.includes('/opinions');
          
          if (isOpinionsPage) {
            console.log('On Opinions page - checking for newly loaded content after click');
            
            // Enhanced handling specifically for Republicans, Democrats and Local authorities sections
            ['republicans', 'democrats', 'local-authorities'].forEach(sectionId => {
              const section = document.getElementById(sectionId);
              if (section) {
                console.log(`Checking section ${sectionId} for new content to translate`);
                
                // Mark all text elements in each section
                const sectionElements = section.querySelectorAll('p, span, h3, h4, li, div:not([id]), button, a');
                let elementsMarked = 0;
                
                sectionElements.forEach(el => {
                  if (
                    el.textContent && 
                    el.textContent.trim() !== '' && 
                    el.children.length === 0 && 
                    !el.hasAttribute('data-translate')
                  ) {
                    el.setAttribute('data-translate', 'true');
                    elementsMarked++;
                  }
                  
                  // Always reset translated attribute to force fresh translation
                  if (el.hasAttribute('data-translate')) {
                    el.removeAttribute('data-translated');
                  }
                });
                
                if (elementsMarked > 0 || section.classList.contains('active-section')) {
                  console.log(`Marked ${elementsMarked} elements in ${sectionId} section for translation`);
                  
                  // Force translation of all elements in this section
                  const elementsToTranslate = section.querySelectorAll('[data-translate]');
                  
                  // Mark this section as active for future clicks
                  section.classList.add('active-section');
                  
                  if (elementsToTranslate.length > 0) {
                    console.log(`Translating ${elementsToTranslate.length} elements in ${sectionId} section`);
                    
                    // Double timeout for more reliability in dynamic content
                    setTimeout(() => {
                      translateAllElements(language);
                    }, 50);
                  }
                }
              }
            });
            
            // Find all content in active tabs that might need translation
            const tabsContents = document.querySelectorAll('.tab-content[data-state="active"], [role="tabpanel"][data-state="active"]');
            
            tabsContents.forEach(tabContent => {
              const newElements = tabContent.querySelectorAll('p, span, h3, h4, li, div, button, a');
              let newElementsMarked = 0;
              
              newElements.forEach(el => {
                if (
                  el.textContent && 
                  el.textContent.trim() !== '' && 
                  el.children.length === 0 && 
                  !el.hasAttribute('data-translate')
                ) {
                  el.setAttribute('data-translate', 'true');
                  newElementsMarked++;
                }
              });
              
              if (newElementsMarked > 0) {
                console.log(`Marked ${newElementsMarked} new elements for translation in tab content`);
                translateAllElements(language);
              }
            });
          }
          
          // Check for any other dynamic content across the site
          const opinionsPage = document.querySelector('.opinions-page');
          if (opinionsPage) {
            const newContent = opinionsPage.querySelectorAll('p, span, h3, h4, li, div, button, a');
            let newElementsMarked = 0;
            
            newContent.forEach(el => {
              if (
                el.textContent && 
                el.textContent.trim() !== '' && 
                el.children.length === 0 && 
                !el.hasAttribute('data-translate')
              ) {
                el.setAttribute('data-translate', 'true');
                newElementsMarked++;
              }
            });
            
            if (newElementsMarked > 0) {
              console.log(`Marked ${newElementsMarked} new elements for translation after dynamic content load`);
              translateAllElements(language);
            }
          }
        }, 300);
      }
    };
    
    // Listen for clicks that might load dynamic content
    document.addEventListener('click', handleDynamicContent);
    
    // Listen specifically for tab changes
    const tabTriggers = document.querySelectorAll('[role="tab"]');
    tabTriggers.forEach(tab => {
      tab.addEventListener('click', () => {
        console.log('Tab clicked - will check for new content to translate');
        setTimeout(() => {
          if (language === 'en') {
            // Find newly active tab content and mark for translation
            const activeTabContent = document.querySelector('[role="tabpanel"][data-state="active"]');
            if (activeTabContent) {
              const elementsToTranslate = activeTabContent.querySelectorAll('p, span, h3, h4, li, div, button, a');
              let count = 0;
              
              elementsToTranslate.forEach(el => {
                if (
                  el.textContent && 
                  el.textContent.trim() !== '' && 
                  el.children.length === 0 && 
                  !el.hasAttribute('data-translate')
                ) {
                  el.setAttribute('data-translate', 'true');
                  count++;
                }
                
                // Reset translation status
                if (el.hasAttribute('data-translate')) {
                  el.removeAttribute('data-translated');
                }
              });
              
              if (count > 0) {
                console.log(`Marked ${count} elements in new tab for translation`);
                translateAllElements(language);
              }
            }
          }
        }, 300);
      });
    });
    
    // Also listen for specific button clicks in the Opinions page 
    const opinionButtons = document.querySelectorAll('.opinions-page button, .opinions-page [role="tab"]');
    opinionButtons.forEach(button => {
      button.addEventListener('click', () => {
        if (language === 'en') {
          console.log('Opinion section button clicked - will check sections');
          
          // Add multiple translation attempts with increasing delays for better reliability
          const delays = [50, 200, 500];
          
          delays.forEach(delay => {
            setTimeout(() => {
              ['republicans', 'democrats', 'local-authorities'].forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                  // Force translation of all elements in this section
                  const elementsToTranslate = section.querySelectorAll('[data-translate]');
                  elementsToTranslate.forEach(el => {
                    // Reset translation status
                    el.removeAttribute('data-translated');
                  });
                }
              });
              
              translateAllElements(language);
            }, delay);
          });
        }
      });
    });
    
    // Add listener for route changes to ensure translations work across navigation
    const handleRouteChange = () => {
      setTimeout(() => translatePage(), 300);
    };
    
    window.addEventListener('popstate', handleRouteChange);
    
    return () => {
      window.removeEventListener('popstate', handleRouteChange);
      document.removeEventListener('click', handleDynamicContent);
      
      // Remove tab click listeners
      tabTriggers.forEach(tab => {
        tab.removeEventListener('click', () => {});
      });
      
      // Remove opinion button listeners
      opinionButtons.forEach(button => {
        button.removeEventListener('click', () => {});
      });
    };
  }, [language, toast, initialTranslationDone]);
  
  return (
    <DataTranslationProvider>
      <StaticTranslationProvider language={language}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/opinions" element={<Opinions />} />
          <Route path="/estado/:stateId" element={<StateDetail />} />
          <Route path="/state/:stateId" element={<StateDetail />} />
          <Route path="/index" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </StaticTranslationProvider>
    </DataTranslationProvider>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AppWithTranslations />
        <Toaster />
      </LanguageProvider>
    </Router>
  );
}

export default App;
