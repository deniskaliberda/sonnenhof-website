import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import type { FAQItem } from '@/components/sections/faq';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export interface BlogPost {
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

export interface BlogPostMeta {
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
  const jsonLdRegex = /---\s*\n<!-- Schema:.*?-->\s*\n```json\n([\s\S]*?)```\s*$/;
  const match = content.match(jsonLdRegex);

  if (match) {
    try {
      const jsonLd = JSON.parse(match[1]);
      const cleanContent = content.replace(jsonLdRegex, '').trim();
      return { jsonLd, cleanContent };
    } catch {
      return { jsonLd: {}, cleanContent: content };
    }
  }

  return { jsonLd: {}, cleanContent: content };
}

function extractH1(content: string): { h1: string; contentWithoutH1: string } {
  const h1Regex = /^# (.+)$/m;
  const match = content.match(h1Regex);

  if (match) {
    return {
      h1: match[1],
      contentWithoutH1: content.replace(h1Regex, '').trim(),
    };
  }

  return { h1: '', contentWithoutH1: content };
}

function extractExcerpt(content: string): string {
  const contentWithoutH1 = content.replace(/^# .+$/m, '').trim();
  const paragraphs = contentWithoutH1.split(/\n\n+/);
  for (const p of paragraphs) {
    const trimmed = p.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('```') && !trimmed.startsWith('---') && !trimmed.startsWith('<!--')) {
      return trimmed.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').substring(0, 300);
    }
  }
  return '';
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

export function getAllSlugs(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

export function getAllPosts(): BlogPostMeta[] {
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
        category: data.category || 'Unterkunft & Tipps',
        excerpt: extractExcerpt(content),
        h1: h1 || data.title || '',
        image: extractImageFromJsonLd(jsonLd),
      };
    });

  return posts.sort((a, b) => (a.date > b.date ? -1 : 1));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const fileNames = fs.readdirSync(postsDirectory);
  const fileName = fileNames.find((name) => {
    if (!name.endsWith('.md')) return false;
    const filePath = path.join(postsDirectory, name);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);
    return (data.slug || name.replace(/\.md$/, '')) === slug;
  });

  if (!fileName) return null;

  const filePath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const { jsonLd, cleanContent } = extractJsonLd(content);
  const { h1, contentWithoutH1 } = extractH1(cleanContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(contentWithoutH1);

  return {
    slug: data.slug || fileName.replace(/\.md$/, ''),
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    keywords: data.keywords || [],
    category: data.category || 'Unterkunft & Tipps',
    content: processedContent.toString(),
    excerpt: extractExcerpt(content),
    h1: h1 || data.title || '',
    jsonLd,
    image: extractImageFromJsonLd(jsonLd),
    faqItems: extractFaqItemsFromJsonLd(jsonLd),
  };
}
