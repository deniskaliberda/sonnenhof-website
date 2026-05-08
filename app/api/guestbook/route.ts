import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { eq, desc } from 'drizzle-orm';
import crypto from 'crypto';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { guestbookEntries } from '@/lib/db/schema';

const OWNER_EMAIL = 'sonnenhof@sonnenhof-herrsching.de';

function getResend(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || `Sonnenhof Herrsching <${OWNER_EMAIL}>`;
}

function hashIp(ip: string): string {
  const salt = process.env.AUTH_SECRET || 'sonnenhof-salt';
  return crypto.createHash('sha256').update(`${salt}:${ip}`).digest('hex').slice(0, 32);
}

const submitSchema = z.object({
  name: z.string().min(2).max(100),
  ort: z.string().max(120).optional().or(z.literal('')),
  stayPeriod: z.string().max(80).optional().or(z.literal('')),
  accommodation: z.string().max(80).optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(10).max(2000),
  email: z.string().email().optional().or(z.literal('')),
  // Honeypot
  website: z.string().max(0).optional().or(z.literal('')),
});

// In-Memory Rate-Limit: max 1 Eintrag pro IP / 24h
const rateLimit = new Map<string, number>();
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const last = rateLimit.get(ip);
  if (last && now - last < RATE_LIMIT_WINDOW) return false;
  rateLimit.set(ip, now);
  return true;
}

export async function POST(request: Request) {
  try {
    if (!isDatabaseConfigured()) {
      return NextResponse.json(
        { success: false, error: 'Gästebuch ist gerade nicht verfügbar.' },
        { status: 503 }
      );
    }

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';

    const body = await request.json();
    const data = submitSchema.parse(body);

    // Honeypot: stilles 200 zurückgeben
    if (data.website && data.website.length > 0) {
      return NextResponse.json({ success: true });
    }

    if (!checkRate(ip)) {
      return NextResponse.json(
        { success: false, error: 'Bitte warten Sie 24 Stunden bis zum nächsten Eintrag.' },
        { status: 429 }
      );
    }

    const db = getDb();
    const [record] = await db
      .insert(guestbookEntries)
      .values({
        name: data.name,
        ort: data.ort || null,
        stayPeriod: data.stayPeriod || null,
        accommodation: data.accommodation || null,
        rating: data.rating ?? null,
        message: data.message,
        submitterEmail: data.email || null,
        status: 'pending',
        source: 'web',
        ipHash: hashIp(ip),
      })
      .returning({ id: guestbookEntries.id });

    // Notification an Conny (best effort)
    const resend = getResend();
    if (resend) {
      try {
        const adminUrl = process.env.NEXT_PUBLIC_SITE_URL
          ? `${process.env.NEXT_PUBLIC_SITE_URL}/admin/gaestebuch`
          : 'https://www.sonnenhof-herrsching.de/admin/gaestebuch';
        await resend.emails.send({
          from: getFromEmail(),
          to: OWNER_EMAIL,
          subject: `Neuer Gästebuch-Eintrag von ${data.name}`,
          html: `
<p>Hallo Conny,</p>
<p>ein neuer Gästebuch-Eintrag wartet auf deine Freigabe:</p>
<table cellpadding="6" style="border-collapse:collapse;border:1px solid #ddd;">
  <tr><td><strong>Name:</strong></td><td>${escapeHtml(data.name)}</td></tr>
  ${data.ort ? `<tr><td><strong>Ort:</strong></td><td>${escapeHtml(data.ort)}</td></tr>` : ''}
  ${data.stayPeriod ? `<tr><td><strong>Aufenthalt:</strong></td><td>${escapeHtml(data.stayPeriod)}</td></tr>` : ''}
  ${data.accommodation ? `<tr><td><strong>Unterkunft:</strong></td><td>${escapeHtml(data.accommodation)}</td></tr>` : ''}
  ${data.rating ? `<tr><td><strong>Bewertung:</strong></td><td>${'★'.repeat(data.rating)}${'☆'.repeat(5 - data.rating)}</td></tr>` : ''}
  <tr><td valign="top"><strong>Text:</strong></td><td>${escapeHtml(data.message).replace(/\n/g, '<br>')}</td></tr>
</table>
<p style="margin-top:18px;">
  <a href="${adminUrl}" style="background:#2C4F40;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Im Admin freischalten</a>
</p>
<p style="color:#888;font-size:12px;margin-top:24px;">Eintrag-ID: ${record.id}</p>
          `,
        });
      } catch (mailErr) {
        console.error('Guestbook mail to owner failed:', mailErr);
      }
    }

    return NextResponse.json({ success: true, id: record.id });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Daten', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Guestbook POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  if (!isDatabaseConfigured()) {
    return NextResponse.json({ entries: [] });
  }

  const url = new URL(request.url);
  const limit = Math.min(parseInt(url.searchParams.get('limit') || '50', 10), 200);

  try {
    const db = getDb();
    const rows = await db
      .select({
        id: guestbookEntries.id,
        name: guestbookEntries.name,
        ort: guestbookEntries.ort,
        stayPeriod: guestbookEntries.stayPeriod,
        accommodation: guestbookEntries.accommodation,
        rating: guestbookEntries.rating,
        message: guestbookEntries.message,
        photoUrl: guestbookEntries.photoUrl,
        approvedAt: guestbookEntries.approvedAt,
        createdAt: guestbookEntries.createdAt,
      })
      .from(guestbookEntries)
      .where(eq(guestbookEntries.status, 'approved'))
      .orderBy(desc(guestbookEntries.approvedAt))
      .limit(limit);

    return NextResponse.json({ entries: rows });
  } catch (error) {
    console.error('Guestbook GET error:', error);
    return NextResponse.json({ entries: [] });
  }
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

