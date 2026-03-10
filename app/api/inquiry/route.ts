import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { z } from 'zod';
import { eq } from 'drizzle-orm';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { inquiries } from '@/lib/db/schema';
import { renderCustomerEmail } from '@/lib/emails/customer-confirmation';
import { renderOwnerNotification } from '@/lib/emails/owner-notification';

const OWNER_EMAIL = 'sonnenhof@sonnenhof-herrsching.de';

function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(apiKey);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || `Sonnenhof Herrsching <${OWNER_EMAIL}>`;
}

// Rate limiting: max 5 Anfragen pro Stunde pro IP
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 Stunde
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count++;
  return true;
}

// Server-seitige Validierung (spiegelt Client-Schema)
const inquirySchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  checkIn: z.string().min(1),
  checkOut: z.string().min(1),
  adults: z.number().min(1),
  children: z.number().min(0),
  accommodation: z.string().min(1),
  message: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    // Rate Limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Zu viele Anfragen. Bitte versuchen Sie es später erneut.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const data = inquirySchema.parse(body);

    // 1. In Datenbank speichern (nicht-blockierend)
    let dbRecord: { id: number } | null = null;
    if (isDatabaseConfigured()) {
      try {
        const db = getDb();
        const [record] = await db.insert(inquiries).values({
          name: data.name,
          email: data.email,
          checkIn: data.checkIn,
          checkOut: data.checkOut,
          adults: data.adults,
          children: data.children,
          accommodation: data.accommodation,
          message: data.message || null,
        }).returning({ id: inquiries.id });
        dbRecord = record;
      } catch (dbError) {
        console.error('Database insert failed:', dbError);
      }
    }

    // 2. Bestätigungs-E-Mail an den Gast
    const resend = getResend();
    const fromEmail = getFromEmail();
    let customerEmailSent = false;
    try {
      await resend.emails.send({
        from: fromEmail,
        to: data.email,
        subject: 'Ihre Anfrage beim Sonnenhof Herrsching',
        html: renderCustomerEmail(data),
      });
      customerEmailSent = true;
    } catch (emailError) {
      console.error('Customer email failed:', emailError);
    }

    // 3. Benachrichtigung an Conny
    let ownerEmailSent = false;
    try {
      await resend.emails.send({
        from: fromEmail,
        to: OWNER_EMAIL,
        replyTo: data.email,
        subject: `Neue Anfrage von ${data.name}`,
        html: renderOwnerNotification(data),
      });
      ownerEmailSent = true;
    } catch (emailError) {
      console.error('Owner email failed:', emailError);
    }

    // 4. DB-Record mit E-Mail-Status aktualisieren
    if (dbRecord && isDatabaseConfigured()) {
      try {
        const db = getDb();
        await db.update(inquiries)
          .set({
            emailSentToCustomer: customerEmailSent,
            emailSentToOwner: ownerEmailSent,
          })
          .where(eq(inquiries.id, dbRecord.id));
      } catch (updateError) {
        console.error('DB update failed:', updateError);
      }
    }

    // 5. Response
    if (!customerEmailSent && !ownerEmailSent) {
      return NextResponse.json(
        { success: false, error: 'E-Mails konnten nicht gesendet werden' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      customerEmailSent,
      ownerEmailSent,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Daten', details: error.issues },
        { status: 400 }
      );
    }
    console.error('Inquiry API error:', error);
    return NextResponse.json(
      { success: false, error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    );
  }
}
