/**
 * Migration script: Converts existing markdown blog posts to database entries.
 *
 * Usage:
 *   npx tsx scripts/migrate-posts.ts
 *
 * Requirements:
 *   - DATABASE_URL environment variable must be set
 *   - Database tables must exist (run `npx drizzle-kit push` first)
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { blogPosts } from '../lib/db/schema';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = neon(DATABASE_URL);
const db = drizzle(sql);

const postsDirectory = path.join(process.cwd(), 'content/blog');

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
    return { h1: match[1], contentWithoutH1: content.replace(h1Regex, '').trim() };
  }
  return { h1: '', contentWithoutH1: content };
}

function extractFaqItems(jsonLd: Record<string, unknown>): { question: string; answer: string }[] {
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

function extractImage(jsonLd: Record<string, unknown>): string {
  if (jsonLd && typeof jsonLd === 'object' && '@graph' in jsonLd) {
    const graph = jsonLd['@graph'] as Record<string, unknown>[];
    const blogPosting = graph?.find((item) => item['@type'] === 'BlogPosting');
    if (blogPosting && typeof blogPosting.image === 'string') {
      // Convert absolute URL to relative path
      const image = blogPosting.image as string;
      try {
        const url = new URL(image);
        return url.pathname;
      } catch {
        return image;
      }
    }
  }
  return '/images/hero/hero-sonnenhof.jpg';
}

async function migrate() {
  console.log('Starting migration of markdown blog posts to database...\n');

  const fileNames = fs.readdirSync(postsDirectory).filter((name) => name.endsWith('.md'));
  console.log(`Found ${fileNames.length} markdown files\n`);

  let migrated = 0;
  let errors = 0;

  for (const fileName of fileNames) {
    const filePath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const { jsonLd, cleanContent } = extractJsonLd(content);
    const { h1, contentWithoutH1 } = extractH1(cleanContent);

    // Convert markdown to HTML
    const processedContent = await remark()
      .use(remarkGfm)
      .use(html, { sanitize: false })
      .process(contentWithoutH1);

    const slug = data.slug || fileName.replace(/\.md$/, '');
    const date = data.date ? new Date(data.date) : new Date();

    try {
      await db.insert(blogPosts).values({
        slug,
        title: data.title || slug,
        h1: h1 || data.title || slug,
        description: data.description || '',
        content: processedContent.toString(),
        category: data.category || 'Unterkunft & Tipps',
        keywords: data.keywords || [],
        heroImage: extractImage(jsonLd),
        faqItems: extractFaqItems(jsonLd),
        published: true,
        publishedAt: date,
        createdAt: date,
        updatedAt: date,
      });

      console.log(`  OK: ${slug}`);
      migrated++;
    } catch (err) {
      console.error(`  FEHLER: ${slug}:`, err);
      errors++;
    }
  }

  console.log(`\nMigration abgeschlossen: ${migrated} erfolgreich, ${errors} Fehler`);
}

migrate().catch(console.error);
