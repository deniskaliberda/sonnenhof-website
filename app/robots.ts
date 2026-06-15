import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
      },
      // AI-Suchbots erlauben (erscheinen in AI Overviews, ChatGPT, Perplexity)
      {
        userAgent: 'GPTBot',
        allow: '/',
      },
      {
        userAgent: 'ChatGPT-User',
        allow: '/',
      },
      {
        userAgent: 'PerplexityBot',
        allow: '/',
      },
      // OAI-SearchBot = ChatGPT Search (Quellenanzeige) — wichtigster GEO-Bot, explizit erlauben
      {
        userAgent: 'OAI-SearchBot',
        allow: '/',
      },
      // Bingbot = Basis fuer Bing/Copilot/Perplexity-Oekosystem
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      // AI-Training-Bots blocken (nutzen Content nur zum Trainieren, nicht fuer Suche)
      {
        userAgent: 'CCBot',
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        disallow: '/',
      },
      {
        userAgent: 'Bytespider',
        disallow: '/',
      },
    ],
    sitemap: 'https://www.sonnenhof-herrsching.de/sitemap.xml',
    host: 'https://www.sonnenhof-herrsching.de',
  };
}
