
import { supabase } from '@/integrations/supabase/client';

// Define the list of supported languages
const SUPPORTED_LANGUAGES = ['en', 'es'];
// Google Translate API Key
const API_KEY = 'AIzaSyApfBMNUSy6sVRD5Q9E6BsEeuo-sIYU-5o';

// Define terms that should never be translated
const DO_NOT_TRANSLATE = [
  // Political parties and organizations
  'Morena',
  'PAN',
  'PRI',
  'MC',
  'Movimiento Ciudadano',
  'CATEM',
  'T-MEC',
  
  // Mexican politicians and figures
  'Claudia Sheinbaum',
  'Ricardo Monreal',
  'Pedro Haces',
  'Andrea Chávez',
  'Ignacio Mier',
  'Emmanuel Reyes',
  'Gerardo Fernández Noroña',
  'Marcelo Ebrard',
  
  // U.S. politicians and figures
  'Donald Trump',
  'Mike Johnson',
  'Ted Cruz',
  'Jerry Moran',
  'Ron Johnson',
  'Chuck Schumer',
  'Martin Heinrich',
  'Hakeem Jeffries',
  'Verónica Escobar',
  'Gavin Newsom',
  'Greg Abbott',
  'Carolyn Goodman',
  'Peter Svarzbein',
  'Rubén Moreira',
  'Guillermo Ramírez',
  'Anabell Ávalos',
  'Alejandro Moreno',
  'Samuel García',
  'Miguel Ángel Flores',
  'Clemente Castañeda',
  
  // Political terms
  'EE.UU.',
  'Republicans',
  'Democrats',
  'GOP',
  'Opiones',
  'Local authorities',
  
  // Percentages and numbers 
  '23%', '11%', '41%', '9%', '15%', // Percentages from Mexico trends
  '31%', '21%', '24%',               // Percentages from USA trends
  
  // All Mexican state names (must not be translated)
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de México',
  'Coahuila',
  'Colima',
  'Durango',
  'Estado de México',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Michoacán',
  'Morelos',
  'Nayarit',
  'Nuevo León',
  'Oaxaca',
  'Puebla',
  'Querétaro',
  'Quintana Roo',
  'San Luis Potosí',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz',
  'Yucatán',
  'Zacatecas'
];

// Local memory cache for translations when Supabase is unavailable
const memoryCache: Record<string, Record<string, string>> = {
  en: {},
  es: {}
};

// Track last translation language to help preserve state
let lastTranslationLanguage: string | null = null;

// Processed sections tracker to avoid duplicate translations
const processedSections: Set<string> = new Set();

/**
 * Translate text using Google Translate API with direct API key
 * This function first checks a local cache, then Supabase, and finally calls the Google API
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    if (!text || text.trim() === '') {
      return text;
    }

    // Check if the text is in the DO_NOT_TRANSLATE list
    if (DO_NOT_TRANSLATE.includes(text.trim())) {
      console.log(`Skipping translation for protected term: "${text}"`);
      return text;
    }

    // Update tracking of last language used
    lastTranslationLanguage = targetLanguage;

    // Validate the target language
    if (!SUPPORTED_LANGUAGES.includes(targetLanguage)) {
      console.error(`Unsupported language: ${targetLanguage}`);
      return text;
    }

    // Source language is opposite of target language
    const sourceLanguage = targetLanguage === 'en' ? 'es' : 'en';
    
    // 0. Check in-memory cache first (fastest)
    if (memoryCache[targetLanguage][text]) {
      console.log('Translation found in memory cache');
      return memoryCache[targetLanguage][text];
    }

    // 1. Try to get from Supabase cache
    try {
      const { data: cachedTranslation, error: cacheError } = await supabase
        .from('translations')
        .select('translated_text')
        .eq('original_text', text)
        .eq('target_language', targetLanguage)
        .single();

      if (cachedTranslation && cachedTranslation.translated_text) {
        console.log('Translation found in Supabase cache:', cachedTranslation.translated_text);
        // Also store in memory cache
        memoryCache[targetLanguage][text] = cachedTranslation.translated_text;
        return cachedTranslation.translated_text;
      }
    } catch (supabaseError) {
      console.warn('Supabase cache check failed:', supabaseError);
      // Continue execution to use Google Translate directly
    }

    // 2. Use Google Translate API directly
    console.log('No cached translation found, using Google Translate API');
    
    const url = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLanguage,
        target: targetLanguage,
        format: 'text'
      })
    });

    const result = await response.json();
    
    if (result.error) {
      console.error('Google Translate API error:', result.error);
      return text;
    }
    
    const translatedText = result.data?.translations?.[0]?.translatedText;
    
    if (!translatedText) {
      console.error('No translation returned from API');
      return text;
    }

    // 3. Cache the translation for future use (both in memory and Supabase)
    if (translatedText && translatedText !== text) {
      // Memory cache
      memoryCache[targetLanguage][text] = translatedText;
      
      // Try to cache in Supabase (but don't block on it)
      try {
        const { error: insertError } = await supabase
          .from('translations')
          .insert({ 
            original_text: text, 
            translated_text: translatedText, 
            target_language: targetLanguage 
          });
          
        if (insertError) {
          console.error('Error caching translation in Supabase:', insertError);
        } else {
          console.log('Translation cached in Supabase');
        }
      } catch (err) {
        console.warn('Failed to save translation to Supabase, using memory cache only:', err);
      }
    }

    return translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Return original text on error
  }
}

// Function to translate an element
export async function translateElement(
  element: HTMLElement, 
  targetLanguage: string
): Promise<void> {
  if (!element || !element.textContent) return;
  
  // Skip elements with the data-static-translation attribute
  if (element.hasAttribute('data-static-translation')) {
    return;
  }
  
  const originalText = element.textContent.trim();
  if (!originalText) return;
  
  // Check if the text is in the DO_NOT_TRANSLATE list
  if (DO_NOT_TRANSLATE.includes(originalText)) {
    console.log(`Skipping translation for protected term in element: "${originalText}"`);
    return;
  }
  
  console.log(`Translating element: "${originalText}"`);
  const translatedText = await translateText(originalText, targetLanguage);
  
  if (translatedText && translatedText !== originalText) {
    console.log(`Element translated: "${originalText}" -> "${translatedText}"`);
    element.textContent = translatedText;
    element.setAttribute('data-translated', 'true');
    element.setAttribute('data-original-text', originalText);
  } else {
    console.log(`No translation applied for: "${originalText}"`);
  }
}

// Translate multiple texts at once
export async function translateMultipleTexts(
  texts: string[], 
  targetLanguage: string
): Promise<Record<string, string>> {
  const translations: Record<string, string> = {};
  
  for (const text of texts) {
    translations[text] = await translateText(text, targetLanguage);
  }
  
  return translations;
}

// Translate all elements with data-translate attribute
export async function translateAllElements(targetLanguage: string): Promise<void> {
  // Update last translation language
  lastTranslationLanguage = targetLanguage;
  
  console.log(`Finding elements with data-translate attribute to translate to ${targetLanguage}`);
  const elements = document.querySelectorAll('[data-translate]');
  console.log(`Found ${elements.length} elements with data-translate attribute`);
  
  let translatedCount = 0;
  
  // Reset processed sections tracker on each full translation run
  processedSections.clear();
  
  // Check for Political Party sections first with highest priority
  const politicalPartySections = [
    '#republicans',
    '#democrats', 
    '#local-authorities'
  ];
  
  // Process each section separately to ensure complete translation
  for (const sectionSelector of politicalPartySections) {
    const section = document.querySelector(sectionSelector);
    if (section) {
      const sectionName = sectionSelector.replace('#', '');
      console.log(`Processing high-priority section: ${sectionName}`);
      
      // Mark all text elements in this section for translation
      const textElements = section.querySelectorAll('p, span, h3, h4, li, div:not([id]):not([role="tabpanel"]), button, a');
      let newElementsMarked = 0;
      
      textElements.forEach(el => {
        if (
          el.textContent && 
          el.textContent.trim() !== '' && 
          el.children.length === 0 && 
          !el.hasAttribute('data-translate')
        ) {
          el.setAttribute('data-translate', 'true');
          newElementsMarked++;
        }
        
        // Reset translation status to force fresh translation
        if (el.hasAttribute('data-translate')) {
          el.removeAttribute('data-translated');
        }
      });
      
      if (newElementsMarked > 0) {
        console.log(`Marked ${newElementsMarked} additional elements in ${sectionName} section`);
      }
      
      // Process all elements in this section
      const sectionElements = section.querySelectorAll('[data-translate]');
      console.log(`Found ${sectionElements.length} elements to translate in ${sectionName}`);
      
      for (const element of Array.from(sectionElements)) {
        await translateElement(element as HTMLElement, targetLanguage);
        translatedCount++;
      }
      
      // Mark this section as processed
      processedSections.add(sectionName);
      console.log(`Completed translation of ${sectionName} section`);
    }
  }
  
  // Special handling for Trends page - ensure headlines and descriptions are properly translated
  if (window.location.pathname.includes('/trends')) {
    handleTrendsPageTranslation(targetLanguage);
  }
  
  // Check for tab content elements second (high priority)
  const tabContentElements = document.querySelectorAll('.tab-content [data-translate], [role="tabpanel"] [data-translate]');
  console.log(`Found ${tabContentElements.length} elements in tab contents`);
  
  // Process tab content elements with higher priority
  for (const element of Array.from(tabContentElements)) {
    // Skip if part of an already processed section
    let skipElement = false;
    processedSections.forEach(section => {
      if (element.closest(`#${section}`)) {
        skipElement = true;
      }
    });
    
    if (!skipElement) {
      await translateElement(element as HTMLElement, targetLanguage);
      translatedCount++;
    }
  }
  
  // Process other elements
  for (const element of Array.from(elements)) {
    // Skip if it's already in processed sections or tab contents
    let skipElement = false;
    processedSections.forEach(section => {
      if (element.closest(`#${section}`)) {
        skipElement = true;
      }
    });
    
    if (element.closest('.tab-content') || element.closest('[role="tabpanel"]')) {
      skipElement = true;
    }
    
    if (!skipElement) {
      await translateElement(element as HTMLElement, targetLanguage);
      translatedCount++;
    }
  }
  
  console.log(`Translation complete: ${translatedCount} elements translated to ${targetLanguage}`);
  
  // Special handling for Opinions page
  if (window.location.pathname.includes('/opinions')) {
    handleOpinionsPageTranslation(targetLanguage);
  }
}

// Enhanced special handling for Opinions page
function handleOpinionsPageTranslation(targetLanguage: string): void {
  if (targetLanguage !== 'en') return;
  
  setTimeout(() => {
    // Specifically focus on Republicans, Democrats, and Local authorities sections
    ['republicans', 'democrats', 'local-authorities'].forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        console.log(`Special handling for ${sectionId} section in Opinions page`);
        
        // Look for all text elements that might have appeared after clicking
        const allTextElements = section.querySelectorAll('p, span, h3, h4, li, div:not([id]):not([role="tabpanel"]), button, a');
        let newElementsMarked = 0;
        
        allTextElements.forEach(el => {
          if (
            el.textContent && 
            el.textContent.trim() !== '' && 
            el.children.length === 0 && 
            !el.hasAttribute('data-translate')
          ) {
            el.setAttribute('data-translate', 'true');
            newElementsMarked++;
          }
          
          // Reset translation status to force fresh translation
          if (el.hasAttribute('data-translate')) {
            el.removeAttribute('data-translated');
          }
        });
        
        if (newElementsMarked > 0) {
          console.log(`Marked ${newElementsMarked} new elements in ${sectionId} for translation`);
          
          // Force translation of all elements in this section
          const elementsToTranslate = section.querySelectorAll('[data-translate]');
          
          elementsToTranslate.forEach(el => {
            if (el instanceof HTMLElement) {
              translateElement(el, targetLanguage);
            }
          });
        }
      }
    });
    
    // Find active tabs and ensure their content is marked for translation
    const activeTabs = document.querySelectorAll('[role="tabpanel"][data-state="active"]');
    
    activeTabs.forEach(tab => {
      const contentElements = tab.querySelectorAll('p, span, h3, h4, li, div:not(.tab-content):not([role="tabpanel"])');
      let count = 0;
      
      contentElements.forEach(el => {
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
        console.log(`Marked ${count} additional elements in active tab for translation`);
        // Translate these new elements
        contentElements.forEach(el => {
          if (el.hasAttribute('data-translate')) {
            translateElement(el as HTMLElement, targetLanguage);
          }
        });
      }
    });
  }, 300);
}

// Add special handling for Trends page
function handleTrendsPageTranslation(targetLanguage: string): void {
  if (targetLanguage !== 'en') return;
  
  setTimeout(() => {
    console.log('Handling special translation for Trends page');
    
    // Target all trend categories
    const trendCategories = document.querySelectorAll('.mb-6.border.border-gray-100');
    
    trendCategories.forEach((category, index) => {
      // Category title
      const title = category.querySelector('h3.text-sm, h3.text-base, h3.text-lg');
      if (title && title.textContent) {
        if (!title.hasAttribute('data-translate')) {
          title.setAttribute('data-translate', 'true');
        }
        // Force retranslation by removing the translated flag
        title.removeAttribute('data-translated');
      }
      
      // Only process expanded categories more deeply
      const isExpanded = category.querySelector('.bg-gray-50') !== null;
      
      if (isExpanded) {
        console.log(`Processing expanded trend category ${index + 1}`);
        
        // Description
        const description = category.querySelector('p.text-sm.text-gray-700');
        if (description) {
          if (!description.hasAttribute('data-translate')) {
            description.setAttribute('data-translate', 'true');
          }
          description.removeAttribute('data-translated');
        }
        
        // News cards
        const newsCards = category.querySelectorAll('.card');
        newsCards.forEach((card, cardIdx) => {
          // Title
          const cardTitle = card.querySelector('.card-title');
          if (cardTitle) {
            if (!cardTitle.hasAttribute('data-translate')) {
              cardTitle.setAttribute('data-translate', 'true');
            }
            cardTitle.removeAttribute('data-translated');
          }
          
          // Description
          const cardDesc = card.querySelector('.card-description');
          if (cardDesc) {
            if (!cardDesc.hasAttribute('data-translate')) {
              cardDesc.setAttribute('data-translate', 'true');
            }
            cardDesc.removeAttribute('data-translated');
          }
        });
      }
    });
    
    // Update country buttons
    document.querySelectorAll('button span[data-translate]').forEach(el => {
      if (el.textContent === 'México' || el.textContent === 'EE.UU.') {
        el.removeAttribute('data-translated');
      }
    });
    
    // Now force translation of all marked elements
    const elementsToTranslate = document.querySelectorAll('[data-translate]:not([data-translated])');
    console.log(`Found ${elementsToTranslate.length} elements to translate in Trends page`);
    
    elementsToTranslate.forEach(el => {
      if (el instanceof HTMLElement) {
        translateElement(el, targetLanguage);
      }
    });
  }, 300);
}

// Check for tab changes and retranslate if needed
export const setupTabChangeTranslation = () => {
  const tabTriggers = document.querySelectorAll('[role="tab"]');
  
  tabTriggers.forEach(tab => {
    tab.addEventListener('click', () => {
      // If we have a last known translation language that's not the default
      if (lastTranslationLanguage && lastTranslationLanguage !== 'es') {
        setTimeout(() => {
          // Find the newly active tab content
          const activeTabContent = document.querySelector('[role="tabpanel"][data-state="active"], .tab-content[data-state="active"]');
          if (activeTabContent) {
            const elementsToTranslate = activeTabContent.querySelectorAll('[data-translate]');
            console.log(`Tab changed - found ${elementsToTranslate.length} elements to translate in active tab`);
            
            // Force retranslation of all elements in the active tab
            elementsToTranslate.forEach(el => {
              if (el instanceof HTMLElement) {
                // Reset translation status
                el.removeAttribute('data-translated');
                translateElement(el, lastTranslationLanguage!);
              }
            });
            
            // Also look for elements that might not have data-translate yet
            const potentialElements = activeTabContent.querySelectorAll('p, span, h3, h4, li, div:not(.tab-content):not([role="tabpanel"])');
            let count = 0;
            
            potentialElements.forEach(el => {
              if (
                el.textContent && 
                el.textContent.trim() !== '' && 
                el.children.length === 0 && 
                !el.hasAttribute('data-translate')
              ) {
                el.setAttribute('data-translate', 'true');
                count++;
              }
            });
            
            if (count > 0) {
              console.log(`Marked ${count} additional elements in active tab for translation`);
              translateAllElements(lastTranslationLanguage);
            }
          }
        }, 300); // Small delay to ensure the DOM has updated
      }
    });
  });
};

// Simplified utility functions for Google Translate integration
// These are kept as fallbacks but we'll primarily use our direct API integration

export const switchGoogleTranslate = (targetLanguage: string): void => {
  console.log(`Google Translate widget integration is deprecated, using direct API instead`);
};

export const initGoogleTranslate = (): Promise<void> => {
  return Promise.resolve();
};

export const isGoogleTranslateReady = (): boolean => {
  return true;
};

export const forceTranslationRefresh = (language: string): void => {
  translateAllElements(language);
};
