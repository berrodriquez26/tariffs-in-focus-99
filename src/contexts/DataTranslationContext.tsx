import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'es' | 'en';

type Translations = {
  [key: string]: {
    es: string;
    en: string;
  };
};

// Only keep landing page related translations
const dataTranslations: Translations = {
  // This file is now empty as most data translations are related to dashboard, not landing page
  // Landing page translations are handled in LanguageContext
};

type DataTranslationContextType = {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
};

const defaultDataTranslationContext: DataTranslationContextType = {
  language: 'es',
  setLanguage: () => {},
  t: (key: string) => key,
};

export const DataTranslationContext = createContext<DataTranslationContextType>(defaultDataTranslationContext);

type DataTranslationProviderProps = {
  children: ReactNode;
};

export const DataTranslationProvider = ({ children }: DataTranslationProviderProps) => {
  const [language, setLanguage] = useState<Language>('es');

  const t = (key: string): string => {
    const translation = dataTranslations[key];
    if (!translation) {
      console.warn(`Data translation missing for key: ${key}`);
      return key;
    }
    return translation[language];
  };

  return (
    <DataTranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </DataTranslationContext.Provider>
  );
};

export const useDataTranslation = () => useContext(DataTranslationContext);
