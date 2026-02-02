'use client';

import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Lang, getTranslations } from '@/lib/translations';

const STORAGE_KEY = 'rf-lang';

type LanguageContextType = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: ReturnType<typeof getTranslations>;
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('ja');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (stored === 'ja' || stored === 'en') setLangState(stored);
    setMounted(true);
  }, []);

  const setLang = useCallback((newLang: Lang) => {
    setLangState(newLang);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, newLang);
      document.documentElement.lang = newLang === 'ja' ? 'ja' : 'en';
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'ja' ? 'ja' : 'en';
    }
  }, [lang, mounted]);

  const t = getTranslations(lang);

  if (!mounted) {
    return (
      <LanguageContext.Provider value={{ lang: 'ja', setLang, t: getTranslations('ja') }}>
        {children}
      </LanguageContext.Provider>
    );
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
