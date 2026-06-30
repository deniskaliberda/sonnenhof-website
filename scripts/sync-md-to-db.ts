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
// --full: for existing rows, also overwrite description + faqItems + h1 + title +
// keywords (not just content). Needed for the 2026-06 fact-check cleanup, where the
// fabrications also live in the meta description and the FAQ structured data, not
// only the body. Without --full the script keeps its original content-only behaviour.
const FULL = process.argv.includes('--full');
const sql = neon(DATABASE_URL);
const db = drizzle(sql);
const postsDirectory = path.join(process.cwd(), 'content/blog');

// Distinctive names of the attractions the fact-check confirmed as fabricated.
// Used purely as a dry-run safety net: if any of these still appears in the value
// that WOULD be written, the script flags it loudly instead of silently shipping it.
const FAB_TERMS = [
  'Monte Mare', 'Monte-Mare', 'Kletterhalle Andechs', 'Kleintierfarm', 'Tierpark Kleintier',
  'Tutter', 'Playhouse', 'LEGOLAND Discovery', 'Bavaria-Museum', 'Milchalm', 'Jägersee',
  'Dr. Klinger', 'Dr. Siemann', 'Tierklinik Seefeld', 'Dampfschiff-Museum', 'Hahn-Therme',
  'Klosterheilbad', 'Beuerberg', 'Glasbläserei Gräf', 'Waldspielplatz Kiental',
];

function scanFab(...parts: unknown[]): string[] {
  const hay = parts.map((p) => (typeof p === 'string' ? p : JSON.stringify(p ?? ''))).join('\n');
  return FAB_TERMS.filter((t) => hay.includes(t));
}

function extractJsonLd(rawContent: string): { jsonLd: Record<string, unknown>; cleanContent: string } {
  // Normalize CRLF to LF — Git on Windows often saves with CRLF, which breaks
  // our regex (matches \n not \r\n).
  const content = rawContent.replace(/\r\n/g, '\n');
  // Two embedding formats exist across the posts:
  //   (a) <script type="application/ld+json"> … </script>   (current)
  //   (b) ```json … ```                                      (legacy)
  // Both are preceded by a `---` divider + `<!-- Schema: … -->` marker. Try (a),
  // then (b), then a bare <script> anywhere as a last resort.
  const regexes = [
    /---\s*\n<!--\s*Schema:[\s\S]*?-->\s*\n<script type="application\/ld\+json">\s*\n?([\s\S]*?)\n?<\/script>\s*$/,
    /---\s*\n<!--\s*Schema:[\s\S]*?-->\s*\n```json\s*\n([\s\S]*?)```\s*$/,
    /<script type="application\/ld\+json">\s*\n?([\s\S]*?)\n?<\/script>/,
  ];
  for (const re of regexes) {
    const match = content.match(re);
    if (match) {
      try {
        const jsonLd = JSON.parse(match[1]);
        const cleanContent = content.replace(match[0], '').trim();
        return { jsonLd, cleanContent };
      } catch {
        // malformed JSON in this block — try the next format
      }
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
  const schemaParsed = !!(jsonLd && typeof jsonLd === 'object' && '@graph' in jsonLd);
  const newDescription = (data.description as string) || '';
  // Guard: never wipe an existing FAQ if the MD schema failed to parse.
  const newFaqItems = mdFaqItems.length > 0 ? mdFaqItems : existing?.faqItems ?? [];

  const fullExistingValues = {
    title: (data.title as string) || existing?.title || slug,
    h1: h1 || (data.title as string) || existing?.h1 || slug,
    description: newDescription || existing?.description || '',
    content: newContent,
    category: (data.category as string) || existing?.category || 'Unterkunft & Tipps',
    keywords: (data.keywords as string[]) || existing?.keywords || [],
    heroImage: mdImage ?? existing?.heroImage ?? '/images/hero/hero-sonnenhof.jpg',
    faqItems: newFaqItems,
    updatedAt: new Date(),
  };

  const newValues = existing
    ? FULL
      ? fullExistingValues
      : { content: newContent, updatedAt: new Date() }
    : {
        title: (data.title as string) || slug,
        h1: h1 || (data.title as string) || slug,
        description: newDescription,
        content: newContent,
        category: (data.category as string) || 'Unterkunft & Tipps',
        keywords: (data.keywords as string[]) || [],
        heroImage: mdImage ?? '/images/hero/hero-sonnenhof.jpg',
        faqItems: mdFaqItems,
        updatedAt: new Date(),
      };

  if (existing) {
    const diff: string[] = [];
    const contentChanged = existing.content !== newContent;
    if (contentChanged) {
      const d = newContent.length - existing.content.length;
      diff.push(`  content: ${existing.content.length} → ${newContent.length} chars (${d >= 0 ? '+' : ''}${d})`);
    }
    if (FULL) {
      diff.push(`  schema parsed from MD: ${schemaParsed ? 'yes' : 'NO ⚠'}  | faqItems: ${existing.faqItems.length} → ${newFaqItems.length}`);
      if (existing.description !== newDescription && newDescription) {
        diff.push(`  description: "${existing.description.slice(0, 70)}…" → "${newDescription.slice(0, 70)}…"`);
      }
      // Safety net: what fabrications were in the OLD row vs. what would be WRITTEN.
      const oldFab = scanFab(existing.content, existing.description, existing.faqItems);
      const newFab = scanFab(newContent, newDescription, newFaqItems);
      if (oldFab.length) diff.push(`  removes fabrications: ${oldFab.join(', ')}`);
      if (newFab.length) diff.push(`  ‼ STILL CONTAINS after sync: ${newFab.join(', ')}  — DO NOT APPLY`);
    }

    if (diff.length === 0) {
      console.log(`= ${slug}: unchanged`);
      return { slug, action: 'unchanged' };
    }

    console.log(`~ ${slug}: ${APPLY ? 'UPDATE' : '[dry-run] would UPDATE'}${FULL ? ' [full]' : ''}`);
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
  const mode = `${APPLY ? 'APPLY (write to DB)' : 'DRY-RUN (no writes)'}${FULL ? ' + FULL (content+description+faqItems)' : ' (content only)'}`;
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
