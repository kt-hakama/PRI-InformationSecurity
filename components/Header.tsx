'use client';

import { useLanguage } from '@/context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLanguage();

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold">
          {t.siteTitle}
        </h1>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
