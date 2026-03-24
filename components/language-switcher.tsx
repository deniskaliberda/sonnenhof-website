'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';
import type { Locale } from '@/i18n/routing';

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => switchLocale('de')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
          locale === 'de'
            ? 'bg-forest/10 text-forest'
            : 'text-forest/60 hover:text-forest'
        }`}
        aria-label="Deutsch"
      >
        {t('de')}
      </button>
      <span className="text-forest/30">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
          locale === 'en'
            ? 'bg-forest/10 text-forest'
            : 'text-forest/60 hover:text-forest'
        }`}
        aria-label="English"
      >
        {t('en')}
      </button>
    </div>
  );
}

export function LanguageSwitcherHero({ className = '' }: { className?: string }) {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      <button
        onClick={() => switchLocale('de')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
          locale === 'de'
            ? 'bg-white/20 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        aria-label="Deutsch"
      >
        {t('de')}
      </button>
      <span className="text-white/30">|</span>
      <button
        onClick={() => switchLocale('en')}
        className={`text-sm font-medium px-2 py-1 rounded transition-colors ${
          locale === 'en'
            ? 'bg-white/20 text-white'
            : 'text-white/60 hover:text-white'
        }`}
        aria-label="English"
      >
        {t('en')}
      </button>
    </div>
  );
}
