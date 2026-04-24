import { MetadataRoute } from 'next';
import { execSync } from 'child_process';
import { accommodations } from '@/lib/mock-data';
import { getAllPostsAsync } from '@/lib/blog';
import { getAllEnPostsMeta } from '@/lib/blog-en';

const gitDateCache = new Map<string, Date>();

function getGitLastModified(filePath: string): Date {
  if (gitDateCache.has(filePath)) {
    return gitDateCache.get(filePath)!;
  }
  try {
    const result = execSync(`git -c safe.directory=* log -1 --format=%cI -- ${filePath}`, {
      encoding: 'utf-8',
      timeout: 5000,
    }).trim();
    const date = result ? new Date(result) : new Date();
    gitDateCache.set(filePath, date);
    return date;
  } catch {
    const fallback = new Date();
    gitDateCache.set(filePath, fallback);
    return fallback;
  }
}

const baseUrl = 'https://www.sonnenhof-herrsching.de';

// German/English path pairs for translated pages
const translatedPages = [
  { de: '', en: '/en', file: 'app/[locale]/page.tsx', changeFrequency: 'weekly' as const, priority: 1.0 },
  { de: '/wohnen', en: '/en/accommodation', file: 'app/[locale]/wohnen/page.tsx', changeFrequency: 'weekly' as const, priority: 0.9 },
  { de: '/wohnen/ferienwohnungen', en: '/en/accommodation/apartments', file: 'app/[locale]/wohnen/ferienwohnungen/page.tsx', changeFrequency: 'weekly' as const, priority: 0.9 },
  { de: '/wohnen/zimmer', en: '/en/accommodation/rooms', file: 'app/[locale]/wohnen/zimmer/page.tsx', changeFrequency: 'weekly' as const, priority: 0.9 },
  { de: '/erleben', en: '/en/experiences', file: 'app/[locale]/erleben/page.tsx', changeFrequency: 'monthly' as const, priority: 0.8 },
  { de: '/ueber-uns', en: '/en/about', file: 'app/[locale]/ueber-uns/page.tsx', changeFrequency: 'monthly' as const, priority: 0.7 },
  { de: '/kontakt', en: '/en/contact', file: 'app/[locale]/kontakt/page.tsx', changeFrequency: 'monthly' as const, priority: 0.8 },
  { de: '/preise', en: '/en/pricing', file: 'app/[locale]/preise/page.tsx', changeFrequency: 'weekly' as const, priority: 0.8 },
];

// German-only pages
const germanOnlyPages = [
  { path: '/blog', file: 'app/(german-only)/blog/page.tsx', changeFrequency: 'weekly' as const, priority: 0.8 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Translated pages: German URLs
  const deEntries = translatedPages.map((page) => ({
    url: `${baseUrl}${page.de}`,
    lastModified: getGitLastModified(page.file),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
    alternates: {
      languages: {
        de: `${baseUrl}${page.de}`,
        en: `${baseUrl}${page.en}`,
      },
    },
  }));

  // Translated pages: English URLs
  const enEntries = translatedPages.map((page) => ({
    url: `${baseUrl}${page.en}`,
    lastModified: getGitLastModified(page.file),
    changeFrequency: page.changeFrequency,
    priority: page.priority * 0.9, // Slightly lower priority for EN
    alternates: {
      languages: {
        de: `${baseUrl}${page.de}`,
        en: `${baseUrl}${page.en}`,
      },
    },
  }));

  // German-only pages
  const germanEntries = germanOnlyPages.map((page) => ({
    url: `${baseUrl}${page.path}`,
    lastModified: getGitLastModified(page.file),
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  // Blog-Posts: dynamisch (DB oder Markdown-Dateien)
  const posts = await getAllPostsAsync();
  const blogEntries = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // English blog: index + curated posts
  const enPosts = getAllEnPostsMeta();
  const enBlogEntries = [
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    },
    ...enPosts.map((post) => ({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
  ];

  // Unterkunft-Seiten: lastModified aus Git-Datum von mock-data.ts
  const accommodationEntries = accommodations.map((accommodation) => ({
    url: `${baseUrl}/unterkunft/${accommodation.slug}`,
    lastModified: getGitLastModified('lib/mock-data.ts'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: accommodation.images.map((img) => `${baseUrl}${img.src}`),
  }));

  return [...deEntries, ...enEntries, ...germanEntries, ...blogEntries, ...enBlogEntries, ...accommodationEntries];
}
