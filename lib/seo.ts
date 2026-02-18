export const BASE_URL = 'https://www.sonnenhof-herrsching.de';

interface BreadcrumbItem {
  name: string;
  path: string;
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
