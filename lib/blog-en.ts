import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { FAQItem } from '@/components/sections/faq';

/**
 * English blog posts. Filesystem-only, no DB integration — the admin UI
 * writes German posts only. English is a curated, translated selection
 * maintained by the team.
 */

const postsDirectory = path.join(process.cwd(), 'content/blog-en');

export interface EnBlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  category: string;
  content: string;
  excerpt: string;
  h1: string;
  jsonLd: Record<string, unknown>;
  image: string;
  faqItems: FAQItem[];
}

export interface EnBlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string;
  keywords: string[];
  category: string;
  excerpt: string;
  h1: string;
  image: string;
}

function extractJsonLd(content: string): { jsonLd: Record<string, unknown>; cleanContent: string } {
  const scriptRegex = /<!--\s*Schema:.*?-->\s*\n<script type="application\/ld\+json">\n([\s\S]*?)<\/script>/;
  const match = content.match(scriptRegex);
  if (match) {
    try {
      const jsonLd = JSON.parse(match[1]);
      const cleanContent = content.replace(scriptRegex, '').trim();
      return { jsonLd, cleanContent };
    } catch {
      return { jsonLd: {}, cleanContent: content };
    }
  }
  return { jsonLd: {}, cleanContent: content };
}

function extractH1(content: string): { h1: string; bodyWithoutH1: string } {
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) {
    return {
      h1: h1Match[1].trim(),
      bodyWithoutH1: content.replace(/^#\s+.+$/m, '').trim(),
    };
  }
  return { h1: '', bodyWithoutH1: content };
}

function extractExcerpt(content: string, maxLen = 160): string {
  const plain = content
    .replace(/^---[\s\S]*?---/, '')
    .replace(/^#+\s.*$/gm, '')
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/<[^>]+>/g, '')
    .replace(/<div[^>]*>[\s\S]*?<\/div>/g, '')
    .trim();
  const firstPara = plain.split(/\n\s*\n/).find((p) => p.length > 40) || plain;
  const clean = firstPara.replace(/\s+/g, ' ').trim();
  if (clean.length <= maxLen) return clean;
  const cut = clean.slice(0, maxLen);
  const lastSpace = cut.lastIndexOf(' ');
  return cut.slice(0, lastSpace > 100 ? lastSpace : maxLen) + '…';
}

function extractImageFromJsonLd(jsonLd: Record<string, unknown>): string {
  if (jsonLd && typeof jsonLd === 'object' && '@graph' in jsonLd) {
    const graph = jsonLd['@graph'] as Record<string, unknown>[];
    const blogPosting = graph?.find((item) => item['@type'] === 'BlogPosting');
    if (blogPosting && typeof blogPosting.image === 'string') {
      return blogPosting.image;
    }
  }
  return '/images/hero/hero-sonnenhof.jpg';
}

function extractFaqItemsFromJsonLd(jsonLd: Record<string, unknown>): FAQItem[] {
  if (jsonLd && typeof jsonLd === 'object' && '@graph' in jsonLd) {
    const graph = jsonLd['@graph'] as Record<string, unknown>[];
    const faqPage = graph?.find((item) => item['@type'] === 'FAQPage');
    if (faqPage && Array.isArray(faqPage.mainEntity)) {
      return (faqPage.mainEntity as Record<string, unknown>[])
        .filter((q) => q['@type'] === 'Question')
        .map((q) => ({
          question: String(q.name || ''),
          answer: String((q.acceptedAnswer as Record<string, unknown>)?.text || ''),
        }));
    }
  }
  return [];
}

export function getAllEnPostsMeta(): EnBlogPostMeta[] {
  if (!fs.existsSync(postsDirectory)) return [];
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((name) => name.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContents);
      const { jsonLd } = extractJsonLd(content);
      const { h1 } = extractH1(content);
      return {
        slug: data.slug || fileName.replace(/\.md$/, ''),
        title: data.title || '',
        description: data.description || '',
        date: data.date || '',
        keywords: data.keywords || [],
        category: data.category || 'Visitor Guide',
        excerpt: extractExcerpt(content),
        h1: h1 || data.title || '',
        image: extractImageFromJsonLd(jsonLd),
      };
    });
  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAllEnSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return [];
  return fs
    .readdirSync(postsDirectory)
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export async function getEnPostBySlug(slug: string): Promise<EnBlogPost | null> {
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const { jsonLd, cleanContent } = extractJsonLd(content);
  const { h1, bodyWithoutH1 } = extractH1(cleanContent);

  const processed = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(bodyWithoutH1);
  const htmlContent = processed.toString();

  return {
    slug: data.slug || slug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    keywords: data.keywords || [],
    category: data.category || 'Visitor Guide',
    content: htmlContent,
    excerpt: extractExcerpt(content),
    h1: h1 || data.title || '',
    jsonLd,
    image: extractImageFromJsonLd(jsonLd),
    faqItems: extractFaqItemsFromJsonLd(jsonLd),
  };
}
