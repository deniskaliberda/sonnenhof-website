import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getDb } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

// GET: List all posts (for admin dashboard)
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  try {
    const db = getDb();
    const posts = await db.select().from(blogPosts).orderBy(desc(blogPosts.createdAt));
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ error: 'Fehler beim Laden der Beiträge' }, { status: 500 });
  }
}

// POST: Create a new post
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const db = getDb();

    const [post] = await db.insert(blogPosts).values({
      slug: body.slug,
      title: body.title,
      h1: body.h1 || body.title,
      description: body.description || '',
      content: body.content || '',
      category: body.category || 'Unterkunft & Tipps',
      keywords: body.keywords || [],
      heroImage: body.heroImage || '/images/hero/hero-sonnenhof.jpg',
      faqItems: body.faqItems || [],
      published: body.published || false,
      publishedAt: body.published ? new Date() : null,
    }).returning();

    revalidatePath('/blog');
    revalidatePath('/sitemap.xml');

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Fehler beim Erstellen des Beitrags' }, { status: 500 });
  }
}
