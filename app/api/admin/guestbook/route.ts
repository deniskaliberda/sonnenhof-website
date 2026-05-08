import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { desc } from 'drizzle-orm';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { guestbookEntries } from '@/lib/db/schema';
import { getSession } from '@/lib/auth';

// GET: list ALL entries (any status)
export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ entries: [] });
  }

  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(guestbookEntries)
      .orderBy(desc(guestbookEntries.createdAt));
    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error('admin guestbook GET error:', error);
    return NextResponse.json({ error: 'Fehler beim Laden' }, { status: 500 });
  }
}

// POST: create a manual entry (e.g. from a handwritten card)
export async function POST(request: Request) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 });
  }

  if (!isDatabaseConfigured()) {
    return NextResponse.json({ error: 'Datenbank nicht konfiguriert' }, { status: 503 });
  }

  try {
    const body = await request.json();
    const db = getDb();

    const [record] = await db
      .insert(guestbookEntries)
      .values({
        name: String(body.name || '').slice(0, 100),
        ort: body.ort ? String(body.ort).slice(0, 120) : null,
        stayPeriod: body.stayPeriod ? String(body.stayPeriod).slice(0, 80) : null,
        accommodation: body.accommodation ? String(body.accommodation).slice(0, 80) : null,
        rating: typeof body.rating === 'number' && body.rating >= 1 && body.rating <= 5 ? body.rating : null,
        message: String(body.message || ''),
        photoUrl: body.photoUrl ? String(body.photoUrl) : null,
        status: body.status === 'pending' ? 'pending' : 'approved',
        source: body.source === 'handwritten' ? 'handwritten' : 'admin',
        approvedAt: body.status === 'pending' ? null : new Date(),
        approvedBy: body.status === 'pending' ? null : session.userId,
      })
      .returning();

    revalidatePath('/gaestebuch');
    revalidatePath('/en/guestbook');
    return NextResponse.json({ entry: record });
  } catch (error) {
    console.error('admin guestbook POST error:', error);
    return NextResponse.json({ error: 'Fehler beim Speichern' }, { status: 500 });
  }
}
