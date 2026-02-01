'use client';

import { useLanguage } from '@/context/LanguageContext';
import type { Lang } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex gap-2">
      <button
        type="button"
        onClick={() => setLang('ja')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          lang === 'ja'
            ? 'bg-white/25 text-white ring-2 ring-white'
            : 'bg-white/10 text-white/90 hover:bg-white/20'
        }`}
        aria-pressed={lang === 'ja'}
      >
        日本語
      </button>
      <button
        type="button"
        onClick={() => setLang('en')}
        className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
          lang === 'en'
            ? 'bg-white/25 text-white ring-2 ring-white'
            : 'bg-white/10 text-white/90 hover:bg-white/20'
        }`}
        aria-pressed={lang === 'en'}
      >
        English
      </button>
    </div>
  );
}
