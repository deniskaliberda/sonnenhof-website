import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { eq } from 'drizzle-orm';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { guestbookEntries } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';

async function authed() {
  const session = await getSession();
  if (!session) {
    return { ok: false as const, response: NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 }) };
  }
  if (!isDatabaseConfigured()) {
    return { ok: false as const, response: NextResponse.json({ error: 'DB nicht konfiguriert' }, { status: 503 }) };
  }
  return { ok: true as const, session };
}

function bust() {
  revalidatePath('/gaestebuch');
  revalidatePath('/en/guestbook');
}

// PATCH: update status or fields
export async function PATCH(request: Request, ctx: { params: Promise<{ id: string }> }) {
  const a = await authed();
  if (!a.ok) return a.response;

  const { id } = await ctx.params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 });

  const body = await request.json();
  const updates: Record<string, unknown> = { updatedAt: new Date() };

  if (body.status === 'approved' || body.status === 'pending' || body.status === 'rejected') {
    updates.status = body.status;
    if (body.status === 'approved') {
      updates.approvedAt = new Date();
      updates.approvedBy = a.session.userId;
    }
    if (body.status === 'pending') {
      updates.approvedAt = null;
      updates.approvedBy = null;
    }
  }

  for (const field of ['name', 'ort', 'stayPeriod', 'accommodation', 'message', 'photoUrl'] as const) {
    if (typeof body[field] === 'string') {
      updates[field] = body[field] as string;
    } else if (body[field] === null) {
      updates[field] = null;
    }
  }
  if (typeof body.rating === 'number' || body.rating === null) {
    updates.rating = body.rating;
  }

  try {
    const db = getDb();
    const [record] = await db
      .update(guestbookEntries)
      .set(updates)
      .where(eq(guestbookEntries.id, numId))
      .returning();
    bust();
    return NextResponse.json({ entry: record });
  } catch (error) {
    console.error('admin guestbook PATCH error:', error);
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
}

// DELETE
export async function DELETE(_request: Request, ctx: { params: Promise<{ id: string }> }) {
  const a = await authed();
  if (!a.ok) return a.response;

  const { id } = await ctx.params;
  const numId = parseInt(id, 10);
  if (Number.isNaN(numId)) return NextResponse.json({ error: 'Ungültige ID' }, { status: 400 });

  try {
    const db = getDb();
    await db.delete(guestbookEntries).where(eq(guestbookEntries.id, numId));
    bust();
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('admin guestbook DELETE error:', error);
    return NextResponse.json({ error: 'Fehler beim Löschen' }, { status: 500 });
  }
}
