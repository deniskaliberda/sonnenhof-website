import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { blogPosts } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { getSession } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET: Single post by ID
export async function GET(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getDb();
    const [post] = await db.select().from(blogPosts).where(eq(blogPosts.id, parseInt(id))).limit(1);

    if (!post) {
      return NextResponse.json({ error: 'Beitrag nicht gefunden' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json({ error: 'Fehler beim Laden des Beitrags' }, { status: 500 });
  }
}

// PUT: Update a post
export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    const updateData: Record<string, unknown> = {
      updatedAt: new Date(),
    };

    // Only update provided fields
    if (body.slug !== undefined) updateData.slug = body.slug;
    if (body.title !== undefined) updateData.title = body.title;
    if (body.h1 !== undefined) updateData.h1 = body.h1;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.content !== undefined) updateData.content = body.content;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.keywords !== undefined) updateData.keywords = body.keywords;
    if (body.heroImage !== undefined) updateData.heroImage = body.heroImage;
    if (body.faqItems !== undefined) updateData.faqItems = body.faqItems;
    if (body.published !== undefined) {
      updateData.published = body.published;
      if (body.published) {
        // Set publishedAt only when publishing for the first time
        const [existing] = await db.select({ publishedAt: blogPosts.publishedAt })
          .from(blogPosts).where(eq(blogPosts.id, parseInt(id))).limit(1);
        if (!existing?.publishedAt) {
          updateData.publishedAt = new Date();
        }
      }
    }

    const [post] = await db.update(blogPosts)
      .set(updateData)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning();

    if (!post) {
      return NextResponse.json({ error: 'Beitrag nicht gefunden' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Fehler beim Aktualisieren des Beitrags' }, { status: 500 });
  }
}

// DELETE: Delete a post
export async function DELETE(_request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const db = getDb();

    const [deleted] = await db.delete(blogPosts)
      .where(eq(blogPosts.id, parseInt(id)))
      .returning({ id: blogPosts.id });

    if (!deleted) {
      return NextResponse.json({ error: 'Beitrag nicht gefunden' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Fehler beim Löschen des Beitrags' }, { status: 500 });
  }
}
