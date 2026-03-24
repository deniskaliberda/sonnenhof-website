import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['de', 'en'],
  defaultLocale: 'de',
  localePrefix: 'as-needed',
  pathnames: {
    '/': '/',
    '/wohnen': {
      de: '/wohnen',
      en: '/accommodation',
    },
    '/wohnen/ferienwohnungen': {
      de: '/wohnen/ferienwohnungen',
      en: '/accommodation/apartments',
    },
    '/wohnen/zimmer': {
      de: '/wohnen/zimmer',
      en: '/accommodation/rooms',
    },
    '/preise': {
      de: '/preise',
      en: '/pricing',
    },
    '/kontakt': {
      de: '/kontakt',
      en: '/contact',
    },
    '/kontakt/bestaetigung': {
      de: '/kontakt/bestaetigung',
      en: '/contact/confirmation',
    },
    '/erleben': {
      de: '/erleben',
      en: '/experiences',
    },
    '/ueber-uns': {
      de: '/ueber-uns',
      en: '/about',
    },
  },
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];
