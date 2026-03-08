import { MetadataRoute } from 'next';
import { execSync } from 'child_process';
import { accommodations } from '@/lib/mock-data';
import { getAllPostsAsync } from '@/lib/blog';

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

const staticPages = [
  { path: '', file: 'app/page.tsx', changeFrequency: 'weekly' as const, priority: 1.0 },
  { path: '/wohnen', file: 'app/wohnen/page.tsx', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/wohnen/ferienwohnungen', file: 'app/wohnen/ferienwohnungen/page.tsx', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/wohnen/zimmer', file: 'app/wohnen/zimmer/page.tsx', changeFrequency: 'weekly' as const, priority: 0.9 },
  { path: '/erleben', file: 'app/erleben/page.tsx', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/ueber-uns', file: 'app/ueber-uns/page.tsx', changeFrequency: 'monthly' as const, priority: 0.7 },
  { path: '/kontakt', file: 'app/kontakt/page.tsx', changeFrequency: 'monthly' as const, priority: 0.8 },
  { path: '/blog', file: 'app/blog/page.tsx', changeFrequency: 'weekly' as const, priority: 0.8 },
  { path: '/impressum', file: 'app/impressum/page.tsx', changeFrequency: 'yearly' as const, priority: 0.3 },
  { path: '/datenschutz', file: 'app/datenschutz/page.tsx', changeFrequency: 'yearly' as const, priority: 0.3 },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Statische Seiten: lastModified aus Git-Commit-Datum der jeweiligen page.tsx
  const staticEntries = staticPages.map((page) => ({
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

  // Unterkunft-Seiten: lastModified aus Git-Datum von mock-data.ts
  const accommodationEntries = accommodations.map((accommodation) => ({
    url: `${baseUrl}/unterkunft/${accommodation.slug}`,
    lastModified: getGitLastModified('lib/mock-data.ts'),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
    images: accommodation.images.map((img) => `${baseUrl}${img.src}`),
  }));

  return [...staticEntries, ...blogEntries, ...accommodationEntries];
}
