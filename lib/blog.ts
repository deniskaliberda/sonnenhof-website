import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';
import { eq, desc } from 'drizzle-orm';
import type { FAQItem } from '@/components/sections/faq';
import { isDatabaseConfigured, getDb } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';

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

// --- Filesystem helpers ---

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

function extractExcerptFromHtml(htmlContent: string): string {
  const text = htmlContent.replace(/<[^>]+>/g, '').trim();
  const firstParagraph = text.split(/\n\n+/)[0] || text;
  return firstParagraph.substring(0, 300);
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

// --- Filesystem-based functions ---

function getAllPostsFromFilesystem(): BlogPostMeta[] {
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

function getAllSlugsFromFilesystem(): string[] {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((name) => name.endsWith('.md'))
    .map((name) => name.replace(/\.md$/, ''));
}

async function getPostBySlugFromFilesystem(slug: string): Promise<BlogPost | null> {
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

  const postSlug = data.slug || fileName.replace(/\.md$/, '');
  const postH1 = h1 || data.title || '';
  const faqItems = extractFaqItemsFromJsonLd(jsonLd);
  const image = extractImageFromJsonLd(jsonLd);

  // Fallback: BlogPosting-Schema auto-generieren wenn keins eingebettet ist
  const finalJsonLd = (jsonLd && Object.keys(jsonLd).length > 0)
    ? jsonLd
    : generateBlogPostingSchema({
        slug: postSlug,
        h1: postH1,
        description: data.description || '',
        heroImage: image,
        publishedAt: data.date ? new Date(data.date) : null,
        updatedAt: data.date ? new Date(data.date) : new Date(),
        faqItems,
      });

  return {
    slug: postSlug,
    title: data.title || '',
    description: data.description || '',
    date: data.date || '',
    keywords: data.keywords || [],
    category: data.category || 'Unterkunft & Tipps',
    content: processedContent.toString(),
    excerpt: extractExcerpt(content),
    h1: postH1,
    jsonLd: finalJsonLd,
    image,
    faqItems,
  };
}

// --- Database-based functions ---

function generateBlogPostingSchema(post: {
  slug: string;
  h1: string;
  description: string;
  heroImage: string;
  publishedAt: Date | null;
  updatedAt: Date;
  faqItems: { question: string; answer: string }[];
}): Record<string, unknown> {
  const baseUrl = 'https://www.sonnenhof-herrsching.de';
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      headline: post.h1,
      description: post.description,
      image: post.heroImage.startsWith('http') ? post.heroImage : `${baseUrl}${post.heroImage}`,
      url: `${baseUrl}/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString() || new Date().toISOString(),
      dateModified: post.updatedAt.toISOString(),
      author: { '@type': 'Organization', name: 'Sonnenhof Herrsching' },
      publisher: { '@type': 'Organization', name: 'Sonnenhof Herrsching', url: baseUrl },
    },
  ];

  if (post.faqItems.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: post.faqItems.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

async function getAllPostsFromDb(): Promise<BlogPostMeta[]> {
  const db = getDb();
  const posts = await db.select().from(blogPosts)
    .where(eq(blogPosts.published, true))
    .orderBy(desc(blogPosts.publishedAt));

  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0],
    keywords: post.keywords,
    category: post.category,
    excerpt: extractExcerptFromHtml(post.content),
    h1: post.h1,
    image: post.heroImage,
  }));
}

async function getAllSlugsFromDb(): Promise<string[]> {
  const db = getDb();
  const posts = await db.select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.published, true));
  return posts.map((p) => p.slug);
}

async function getPostBySlugFromDb(slug: string): Promise<BlogPost | null> {
  const db = getDb();
  const [post] = await db.select().from(blogPosts)
    .where(eq(blogPosts.slug, slug))
    .limit(1);

  if (!post || !post.published) return null;

  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    date: post.publishedAt?.toISOString().split('T')[0] || post.createdAt.toISOString().split('T')[0],
    keywords: post.keywords,
    category: post.category,
    content: post.content,
    excerpt: extractExcerptFromHtml(post.content),
    h1: post.h1,
    jsonLd: generateBlogPostingSchema(post),
    image: post.heroImage,
    faqItems: post.faqItems,
  };
}

// --- Public API (auto-selects DB or filesystem) ---

export function getAllSlugs(): string[] {
  return getAllSlugsFromFilesystem();
}

export async function getAllSlugsAsync(): Promise<string[]> {
  if (isDatabaseConfigured()) {
    try {
      return await getAllSlugsFromDb();
    } catch {
      return getAllSlugsFromFilesystem();
    }
  }
  return getAllSlugsFromFilesystem();
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllPostsFromFilesystem();
}

export async function getAllPostsAsync(): Promise<BlogPostMeta[]> {
  if (isDatabaseConfigured()) {
    try {
      return await getAllPostsFromDb();
    } catch {
      return getAllPostsFromFilesystem();
    }
  }
  return getAllPostsFromFilesystem();
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (isDatabaseConfigured()) {
    try {
      return await getPostBySlugFromDb(slug);
    } catch {
      return await getPostBySlugFromFilesystem(slug);
    }
  }
  return await getPostBySlugFromFilesystem(slug);
}
