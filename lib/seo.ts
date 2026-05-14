export const BASE_URL = 'https://www.sonnenhof-herrsching.de';

// German path to English path mapping
const pathMap: Record<string, string> = {
  '/': '/en',
  '/wohnen': '/en/accommodation',
  '/wohnen/ferienwohnungen': '/en/accommodation/apartments',
  '/wohnen/zimmer': '/en/accommodation/rooms',
  '/preise': '/en/pricing',
  '/kontakt': '/en/contact',
  '/kontakt/bestaetigung': '/en/contact/confirmation',
  '/erleben': '/en/experiences',
  '/ueber-uns': '/en/about',
  '/gaestebuch': '/en/guestbook',
};

interface BreadcrumbItem {
  name: string;
  path: string;
}

export function createHreflangLanguages(path: string) {
  const url = `${BASE_URL}${path}`;
  const enPath = pathMap[path];

  const languages: Record<string, string> = {
    'de-DE': url,
    'de-AT': url,
    'de-CH': url,
  };

  if (enPath) {
    languages['en'] = `${BASE_URL}${enPath}`;
    languages['x-default'] = url;
  }

  return languages;
}

export function createBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": `${BASE_URL}${item.path}`
    }))
  };
}
