/**
 * Sync MD blog-Files to DB-Eintraege via UPSERT.
 *
 * Use case (2026-05-14): PR #6 (Internal-Linking-Pass) hat Internal Links in
 * die MD-Files eingefuegt, aber Live-Site rendert aus DB. DB-Eintraege werden
 * mit aktuellem MD-Content neu beschrieben.
 *
 * Strategie:
 * - Liest alle content/blog/*.md
 * - Fuer jeden Slug: wenn DB-Eintrag existiert → UPDATE (content, h1, title,
 *   description, keywords, category, heroImage, faqItems, updatedAt)
 * - Wenn nicht → INSERT (mit published=true)
 * - Felder `id`, `createdAt`, `published`, `publishedAt` werden NICHT
 *   ueberschrieben (DB-Quelle der Wahrheit fuer Lifecycle-Status)
 *
 * Sicherheit:
 * - Dry-run by default (DRY_RUN=true). Setzt DRY_RUN=false oder --apply
 *   um wirklich zu schreiben.
 * - Zeigt vor jedem UPDATE einen Diff der wichtigen Felder
 *
 * Usage:
 *   npx tsx scripts/sync-md-to-db.ts            # dry-run (default)
 *   npx tsx scripts/sync-md-to-db.ts --apply    # echte Aenderungen
 *
 * Requirements:
 *   - DATABASE_URL in env
 *   - Tabelle blog_posts existiert
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import { blogPosts } from '../lib/db/schema';

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const APPLY = process.argv.includes('--apply') || process.env.DRY_RUN === 'false';
const sql = neon(DATABASE_URL);
const db = drizzle(sql);
const postsDirectory = path.join(process.cwd(), 'content/blog');

function extractJsonLd(rawContent: string): { jsonLd: Record<string, unknown>; cleanContent: string } {
  // Normalize CRLF to LF — Git on Windows often saves with CRLF, which breaks
  // our regex (matches \n not \r\n).
  const content = rawContent.replace(/\r\n/g, '\n');
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

function extractImage(jsonLd: Record<string, unknown>, frontmatterImage?: string): string | null {
  if (frontmatterImage) return frontmatterImage;
  if (jsonLd && typeof jsonLd === 'object' && '@graph' in jsonLd) {
    const graph = jsonLd['@graph'] as Record<string, unknown>[];
    const blogPosting = graph?.find((item) => item['@type'] === 'BlogPosting');
    if (blogPosting && typeof blogPosting.image === 'string') {
      const image = blogPosting.image as string;
      try {
        const url = new URL(image);
        return url.pathname;
      } catch {
        return image;
      }
    }
  }
  // No image found in MD — return null so caller can preserve DB value.
  return null;
}

async function processFile(fileName: string) {
  const filePath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const { jsonLd, cleanContent } = extractJsonLd(content);
  const { h1, contentWithoutH1 } = extractH1(cleanContent);

  const processedContent = await remark()
    .use(remarkGfm)
    .use(html, { sanitize: false })
    .process(contentWithoutH1);

  const slug: string = data.slug || fileName.replace(/\.md$/, '');
  const date = data.date ? new Date(data.date) : new Date();

  const mdImage = extractImage(jsonLd, data.image as string | undefined);
  const mdFaqItems = extractFaqItems(jsonLd);

  // Find existing entry first.
  const [existing] = await db.select().from(blogPosts).where(eq(blogPosts.slug, slug)).limit(1);

  // STRATEGY: For existing entries, only sync `content` (the primary sync target
  // — Internal Links etc.). Other fields (title, heroImage, faqItems, keywords)
  // may have been edited via Admin-Panel and we don't want to overwrite them.
  // For NEW entries (no existing row), use full MD-derived values.
  const newContent = processedContent.toString();
  const newValues = existing
    ? {
        content: newContent,
        updatedAt: new Date(),
      }
    : {
        title: (data.title as string) || slug,
        h1: h1 || (data.title as string) || slug,
        description: (data.description as string) || '',
        content: newContent,
        category: (data.category as string) || 'Unterkunft & Tipps',
        keywords: (data.keywords as string[]) || [],
        heroImage: mdImage ?? '/images/hero/hero-sonnenhof.jpg',
        faqItems: mdFaqItems,
        updatedAt: new Date(),
      };

  if (existing) {
    // Existing entry: only content is updated. Check if content actually differs.
    const diff: string[] = [];
    if (existing.content !== newContent) {
      const oldLen = existing.content.length;
      const newLen = newContent.length;
      diff.push(`  content: ${oldLen} → ${newLen} chars (${newLen - oldLen >= 0 ? '+' : ''}${newLen - oldLen})`);
      // Check whether this update introduces the new internal links (PR #6 target).
      const oldHasWissen = existing.content.includes('/blog/wissen-ammersee');
      const newHasWissen = newContent.includes('/blog/wissen-ammersee');
      const oldHasWellness = existing.content.includes('/blog/wellness-ammersee-region');
      const newHasWellness = newContent.includes('/blog/wellness-ammersee-region');
      if (!oldHasWissen && newHasWissen) diff.push(`  + new internal link → /blog/wissen-ammersee`);
      if (!oldHasWellness && newHasWellness) diff.push(`  + new internal link → /blog/wellness-ammersee-region`);
    }

    if (diff.length === 0) {
      console.log(`= ${slug}: unchanged`);
      return { slug, action: 'unchanged' };
    }

    console.log(`~ ${slug}: ${APPLY ? 'UPDATE' : '[dry-run] would UPDATE'}`);
    for (const line of diff) console.log(line);

    if (APPLY) {
      await db.update(blogPosts).set(newValues).where(eq(blogPosts.slug, slug));
    }
    return { slug, action: 'update' };
  } else {
    console.log(`+ ${slug}: ${APPLY ? 'INSERT' : '[dry-run] would INSERT'} (new)`);
    if (APPLY) {
      await db.insert(blogPosts).values({
        slug,
        ...newValues,
        published: true,
        publishedAt: date,
        createdAt: date,
      });
    }
    return { slug, action: 'insert' };
  }
}

async function main() {
  const mode = APPLY ? 'APPLY (write to DB)' : 'DRY-RUN (no writes)';
  console.log(`Mode: ${mode}\n`);
  console.log(`Reading MD files from ${postsDirectory}\n`);

  const fileNames = fs.readdirSync(postsDirectory).filter((n) => n.endsWith('.md'));
  console.log(`Found ${fileNames.length} markdown files\n`);

  const results = { update: 0, insert: 0, unchanged: 0 };
  for (const fileName of fileNames) {
    try {
      const res = await processFile(fileName);
      results[res.action as keyof typeof results]++;
    } catch (err) {
      console.error(`! ${fileName}: error`, err);
    }
  }

  console.log(`\nSummary (${mode}):`);
  console.log(`  unchanged: ${results.unchanged}`);
  console.log(`  updates:   ${results.update}`);
  console.log(`  inserts:   ${results.insert}`);

  if (!APPLY) {
    console.log(`\nDry-run finished. Re-run with --apply to write changes.`);
  } else {
    console.log(`\nApplied. Verify live: https://www.sonnenhof-herrsching.de/blog/<slug>`);
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  process.exit(1);
});
