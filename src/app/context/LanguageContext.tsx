'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'ms' | 'en';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

export function LanguageProvider({ children }: LanguageProviderProps) {
  // Default language is Bahasa Melayu (ms)
  const [language, setLanguage] = useState<Language>('ms');
  const [translations, setTranslations] = useState<Record<string, Record<string, string>>>({});
  
  // Load translations
  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Import both language files
        const [msTranslations, enTranslations] = await Promise.all([
          import('../translations/ms.json').then(module => module.default),
          import('../translations/en.json').then(module => module.default)
        ]);
        
        setTranslations({
          ms: msTranslations,
          en: enTranslations
        });
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
    
    loadTranslations();
  }, []);
  
  // Save language preference to localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);
  
  // Load language preference from localStorage on initial load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'ms' || savedLanguage === 'en')) {
        setLanguage(savedLanguage);
      }
    }
  }, []);
  
  // Translation function
  const t = (key: string): string => {
    if (!translations[language]) {
      return key; // Fallback if translations not loaded yet
    }
    
    return translations[language][key] || translations['ms'][key] || key;
  };
  
  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}