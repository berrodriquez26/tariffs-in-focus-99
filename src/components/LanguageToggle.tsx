import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { useState, useEffect } from 'react';
import { translateAllElements } from '@/utils/translateUtils';

// Define the allowed button sizes
type ButtonSize = "xs" | "sm" | "default" | "icon" | "lg";

const LanguageToggle = ({ size = "sm" }: { size?: ButtonSize }) => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const [isTranslating, setIsTranslating ] = useState(false);
  
  // Help ensure the elements on the page actually have the data-translate attribute
  useEffect(() => {
    const checkForDataTranslateAttributes = () => {
      const elementsWithDataTranslate = document.querySelectorAll('[data-translate]');
      console.log(`Found ${elementsWithDataTranslate.length} elements with data-translate attribute`);
      
      if (elementsWithDataTranslate.length === 0) {
        console.warn('No elements found with data-translate attribute. Translations may not work properly.');
        
        // As a quick debug tool, check some common elements that should be translated
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6, p, button, a, span, div');
        console.log(`Found ${headings.length} potential text elements that could have data-translate`);
      }
    };
    
    // Run the check on initial load and when language changes
    checkForDataTranslateAttributes();
    
    // Run translation on initial load based on stored language preference
    if (language === 'en') {
      // Small delay to allow DOM to be ready
      setTimeout(() => {
        translateAllElements(language);
      }, 300);
    }
  }, [language]);

  // Add event listener for tab changes to ensure translations persist
  useEffect(() => {
    // Function to handle tab changes and ensure translations are maintained
    const handleTabChange = () => {
      // Only run if we're in English mode
      if (language === 'en') {
        setTimeout(() => {
          ensureDashboardTranslations('en');
        }, 100); // Small delay to allow DOM to update
      }
    };

    // Listen for tab clicks in the dashboard
    const tabTriggers = document.querySelectorAll('[role="tab"]');
    tabTriggers.forEach(tab => {
      tab.addEventListener('click', handleTabChange);
    });

    // Cleanup
    return () => {
      tabTriggers.forEach(tab => {
        tab.removeEventListener('click', handleTabChange);
      });
    };
  }, [language]);
  
  // Add this function to handle dashboard-specific translations
  const ensureDashboardTranslations = async (targetLanguage: string) => {
    if (!window.location.pathname.includes('/dashboard')) return;
    
    console.log(`Ensuring dashboard translations for ${targetLanguage}`);
    
    // First make sure all dashboard elements have data-translate attribute
    const dashboardSections = [
      // Tab contents (the most important part for tab switching)
      '.tab-content h3', '.tab-content p', '.tab-content li', '.tab-content span',
      
      // Tab triggers/labels
      '[role="tab"]',
      
      // Card titles and headers
      'h1', 'h2', 'h3', '.card-title', '.card-header', 
      
      // Insights grid
      'div.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 h3',
      'div.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 p',
      
      // Specific section content
      'ul.space-y-1 li', 'ul.space-y-2 li', 'ul.space-y-3 li',
      '.card-content p', '.card-content h3', '.card-content span',
    ];
    
    // Add data-translate attribute to relevant elements
    let attributesAdded = 0;
    dashboardSections.forEach(selector => {
      try {
        document.querySelectorAll(selector).forEach(el => {
          if (
            el.textContent && 
            el.textContent.trim() !== '' && 
            !el.hasAttribute('data-translate') &&
            el.children.length === 0 // Only target leaf nodes with text
          ) {
            el.setAttribute('data-translate', 'true');
            attributesAdded++;
          }
        });
      } catch (err) {
        console.warn('Selector error:', selector, err);
      }
    });
    
    console.log(`Added data-translate attribute to ${attributesAdded} additional elements`);
    
    // Force translation of visible elements
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(async (content) => {
      if (content && window.getComputedStyle(content).display !== 'none') {
        const elementsToTranslate = content.querySelectorAll('[data-translate]');
        console.log(`Found ${elementsToTranslate.length} elements to translate in active tab`);
        
        elementsToTranslate.forEach(el => {
          // Reset translated attribute to force retranslation
          el.removeAttribute('data-translated');
        });
      }
    });
    
    // Now trigger translation
    await translateAllElements(targetLanguage);
  };
  
  const toggleLanguage = async () => {
    if (isTranslating) return; // Prevent multiple clicks while translating
    
    try {
      setIsTranslating(true);
      
      // Switch language context
      const newLanguage = language === 'es' ? 'en' : 'es';
      setLanguage(newLanguage);
      
      // Show toast notification
      toast({
        title: language === 'es' ? "Translating to English" : "Traduciendo al Español",
        description: language === 'es' ? "The page is being translated..." : "La página está siendo traducida...",
        variant: "default",
      });
      
      // Add a slight delay to allow the toast to be shown and context to update
      setTimeout(async () => {
        try {
          // Explicitly ensure specific dashboard sections have data-translate attribute
          if (window.location.pathname.includes('/dashboard')) {
            // Target key dashboard sections that need translation
            const sectionsToTranslate = [
              // Card titles and subtitles
              'Análisis de Sentimiento Nacional', 'Percepción General', 'Distribución de sentimiento',
              'Hallazgos Clave', 'Sectores más Vulnerables', 'Mapa de Variación Regional',
              'Principales Argumentos a Favor y en Contra', 'Argumentos a Favor', 'Argumentos en Contra',
              
              // Make sure all list items in key insights section are marked
              'div.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 p',
              'div.grid.grid-cols-1.md\\:grid-cols-2.lg\\:grid-cols-3 h3',
              
              // Ensure stats and findings are marked
              'ul.space-y-1 li span:last-child',
              'div.grid.grid-cols-1.sm\\:grid-cols-3 span[data-translate]',
              
              // Regional variation elements
              'div.md\\:col-span-2.grid li',
              'div.md\\:col-span-2.grid h3',
              'div.md\\:col-span-2.grid p',
              
              // Arguments section
              'div.grid.md\\:grid-cols-2 p',
              'div.space-y-4 p',
              'ul.space-y-3 li'
            ];
            
            // Add data-translate attribute to elements that might be missing it
            sectionsToTranslate.forEach(selector => {
              try {
                document.querySelectorAll(selector).forEach(el => {
                  if (el.textContent && el.textContent.trim() !== '' && !el.hasAttribute('data-translate')) {
                    console.log(`Adding data-translate to:`, el.textContent.substring(0, 30));
                    el.setAttribute('data-translate', 'true');
                  }
                });
              } catch (err) {
                console.warn('Selector error:', selector, err);
              }
            });
            
            // Also specifically target tabs content
            document.querySelectorAll('.tab-content h3, .tab-content p, .tab-content li, .tabs-list button').forEach(el => {
              if (el.textContent && el.textContent.trim() !== '' && !el.hasAttribute('data-translate')) {
                el.setAttribute('data-translate', 'true');
              }
            });
          }
          
          // Get current count of elements with data-translate
          const elementsToTranslate = document.querySelectorAll('[data-translate]');
          console.log(`Starting translation of ${elementsToTranslate.length} elements to ${newLanguage}`);
          
          if (elementsToTranslate.length === 0) {
            // If no elements found, show an error
            toast({
              title: "Translation warning",
              description: "No translatable elements found on this page. Make sure elements have the data-translate attribute.",
              variant: "destructive",
            });
          }
          
          // Force a translation refresh for all elements with data-translate attribute
          await translateAllElements(newLanguage);
          
          // Verify translations happened
          let translatedCount = 0;
          elementsToTranslate.forEach(el => {
            if (el.getAttribute('data-translated') === 'true') {
              translatedCount++;
            }
          });

          // Additional call to ensure dashboard tab contents are translated
          if (window.location.pathname.includes('/dashboard')) {
            await ensureDashboardTranslations(newLanguage);
          }
          
          // Set translating to false after translation is complete
          setIsTranslating(false);
          
          // Show appropriate success toast
          if (newLanguage === 'en') {
            toast({
              title: "Translation complete",
              description: "The page has been translated to English",
              variant: "default",
            });
          } else {
            toast({
              title: "Traducción completa",
              description: "La página ha sido traducida al español",
              variant: "default",
            });
          }
        } catch (error) {
          console.error('Translation error:', error);
          toast({
            title: "Error de traducción",
            description: "Ocurrió un error al traducir la página. Algunas partes pueden permanecer en el idioma original.",
            variant: "destructive",
          });
          setIsTranslating(false);
        }
      }, 500);
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Error de traducción",
        description: "Ocurrió un error al traducir la página. Algunas partes pueden permanecer en el idioma original.",
        variant: "destructive",
      });
      setIsTranslating(false);
    }
  };
  
  // Map the custom "xs" size to a valid button size
  const buttonSize = size === "xs" ? "sm" : size;
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Button
        variant="outline"
        size={buttonSize}
        onClick={toggleLanguage}
        className={`flex items-center gap-1 bg-white text-gray-700 border-gray-200 hover:bg-gray-50 ${
          size === "xs" ? "h-7 px-2 py-1 text-xs" : ""
        }`}
        disabled={isTranslating}
      >
        <Globe className={size === "xs" ? "h-3 w-3" : size === "sm" ? "h-3 w-3" : "h-4 w-4"} />
        <span className="font-medium">
          {isTranslating ? (
            <span className="inline-flex items-center">
              <span className="animate-pulse">...</span>
            </span>
          ) : (
            language === 'es' ? 'EN' : 'ES'
          )}
        </span>
      </Button>
    </motion.div>
  );
};

export default LanguageToggle;
