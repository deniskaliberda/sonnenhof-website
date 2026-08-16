import { setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { GuestbookForm } from '@/components/guestbook-form';
import { GuestbookBook, type BookEntry, type BookStrings } from '@/components/guestbook-book';
import { JsonLd } from '@/components/json-ld';
import { createBreadcrumbSchema, createHreflangLanguages } from '@/lib/seo';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { guestbookEntries } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import type { Metadata } from 'next';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';
  const canonical = isEn
    ? 'https://www.sonnenhof-herrsching.de/en/guestbook'
    : 'https://www.sonnenhof-herrsching.de/gaestebuch';
  const title = isEn
    ? 'Guestbook · Sonnenhof Herrsching'
    : 'Gästebuch · Sonnenhof Herrsching';
  const description = isEn
    ? 'Read what guests at Sonnenhof Herrsching by Lake Ammersee experienced — and leave your own entry.'
    : 'Lesen Sie, was Gäste am Sonnenhof Herrsching am Ammersee erlebt haben — und hinterlassen Sie selbst einen Eintrag.';

  return {
    title,
    description,
    alternates: { canonical, languages: createHreflangLanguages('/gaestebuch') },
    openGraph: {
      title,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

interface GuestbookEntry {
  id: number;
  name: string;
  ort: string | null;
  stayPeriod: string | null;
  accommodation: string | null;
  rating: number | null;
  message: string;
  photoUrl: string | null;
  approvedAt: Date | null;
  createdAt: Date;
}

async function loadEntries(): Promise<GuestbookEntry[]> {
  if (!isDatabaseConfigured()) return [];
  try {
    const db = getDb();
    const rows = await db
      .select()
      .from(guestbookEntries)
      .where(eq(guestbookEntries.status, 'approved'))
      .orderBy(desc(guestbookEntries.approvedAt))
      .limit(100);
    return rows;
  } catch (err) {
    console.error('guestbook page load failed:', err);
    return [];
  }
}

function formatDate(d: Date | null, locale: string): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString(locale === 'en' ? 'en-US' : 'de-DE', {
    year: 'numeric',
    month: 'long',
  });
}

/* Meta-Zeile "Ort · Aufenthalt · Unterkunft" — doppeltes Datum vermeiden
   (DESIGN.md §4: Datum steht einmal, Unterkunft einmal). */
function buildMeta(e: GuestbookEntry, locale: string): string {
  return [e.ort, e.stayPeriod || formatDate(e.approvedAt, locale), e.accommodation]
    .filter(Boolean)
    .join(' · ');
}

function bookStrings(isEn: boolean): BookStrings {
  if (isEn) {
    return {
      coverKicker: 'Sonnenhof',
      coverTitle: 'Guestbook',
      coverSubtitle: 'Memories of our guests',
      coverFooter: 'Herrsching am Ammersee',
      forewordKicker: 'Foreword',
      forewordTitle: 'Dear guests,',
      // TODO: Vorwort durch Connys bestätigten Text ersetzen (Gate)
      forewordP1:
        'for over 40 years the women of our family have run the Sonnenhof — and the nicest part of this work are the people who stay with us.',
      forewordP2:
        'On these pages some of them have left a few lines. Take your time browsing — and perhaps, at the end, you will write in it yourself.',
      forewordSignature: 'Ihre Conny',
      forewordRole: 'Host in the 3rd generation',
      closingTitle: 'This page is yours',
      closingText: 'Have you stayed with us? We look forward to your lines — short or long.',
      closingCta: 'Write an entry',
      jumpLabel: 'Jump to',
      jumpDog: 'With dog',
      jumpNoCar: 'Arrived without a car',
      jumpAccessible: 'Accessible',
      prevAria: 'Previous page',
      nextAria: 'Next page',
      labelClosed: 'Click the book to open it',
      pageLabel: 'Page {from}–{to} of {total}',
      entryAriaPrefix: 'Guestbook entry by',
    };
  }
  return {
    coverKicker: 'Sonnenhof',
    coverTitle: 'Gästebuch',
    coverSubtitle: 'Erinnerungen unserer Gäste',
    coverFooter: 'Herrsching am Ammersee',
    forewordKicker: 'Vorwort',
    forewordTitle: 'Liebe Gäste,',
    // TODO: Vorwort durch Connys bestätigten Text ersetzen (Gate)
    forewordP1:
      'seit über 40 Jahren führen die Frauen unserer Familie den Sonnenhof — und das Schönste an dieser Arbeit sind die Menschen, die bei uns zu Gast sind.',
    forewordP2:
      'Auf diesen Seiten haben einige von ihnen ein paar Zeilen hinterlassen. Blättern Sie in Ruhe — und vielleicht schreiben Sie am Ende selbst hinein.',
    forewordSignature: 'Ihre Conny',
    forewordRole: 'Gastgeberin in 3. Generation',
    closingTitle: 'Diese Seite gehört Ihnen',
    closingText: 'Waren Sie schon bei uns zu Gast? Wir freuen uns über Ihre Zeilen — von kurz bis ausführlich.',
    closingCta: 'Eintrag schreiben',
    jumpLabel: 'Blättern zu',
    jumpDog: 'Mit Hund',
    jumpNoCar: 'Ohne Auto angereist',
    jumpAccessible: 'Barrierearm',
    prevAria: 'Zurückblättern',
    nextAria: 'Weiterblättern',
    labelClosed: 'Klicken Sie auf das Buch, um es aufzuschlagen',
    pageLabel: 'Seite {from}–{to} von {total}',
    entryAriaPrefix: 'Gästebucheintrag von',
  };
}

export default async function GaestebuchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const entries = await loadEntries();
  const isEn = locale === 'en';

  // Serialisierbare Einträge für die Client-Komponente (Buch).
  const bookEntries: BookEntry[] = entries.map((e) => ({
    id: e.id,
    name: e.name,
    meta: buildMeta(e, locale),
    rating: e.rating,
    message: e.message,
    photoUrl: e.photoUrl,
  }));

  const breadcrumb = createBreadcrumbSchema([
    { name: isEn ? 'Home' : 'Startseite', path: isEn ? '/en' : '/' },
    { name: isEn ? 'Guestbook' : 'Gästebuch', path: isEn ? '/en/guestbook' : '/gaestebuch' },
  ]);

  // Aggregate JSON-LD: LodgingBusiness mit Reviews
  const reviewsLd = entries.length > 0
    ? {
        '@context': 'https://schema.org',
        '@type': 'LodgingBusiness',
        name: 'Sonnenhof Herrsching',
        url: 'https://www.sonnenhof-herrsching.de',
        review: entries
          .filter((e) => e.rating)
          .slice(0, 30)
          .map((e) => ({
            '@type': 'Review',
            author: { '@type': 'Person', name: e.name },
            datePublished: e.approvedAt?.toISOString().split('T')[0],
            reviewBody: e.message,
            reviewRating: {
              '@type': 'Rating',
              ratingValue: e.rating,
              bestRating: 5,
              worstRating: 1,
            },
          })),
      }
    : null;

  return (
    <>
      <JsonLd data={breadcrumb} />
      {reviewsLd && <JsonLd data={reviewsLd} />}
      <Navigation />

      <main className="bg-stone min-h-screen pt-20">
        {/* Kopf + Buch — Layout wie Landhaus-Preview "PAGE: GAESTEBUCH" */}
        <section className="px-4 md:px-6 xl:px-16 pt-[76px] pb-10 overflow-hidden">
          <div className="text-center mb-[54px]">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#A6794E] mb-4">
              Sonnenhof Herrsching
            </div>
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] text-forest leading-[1.05] m-0">
              {isEn ? 'Our Guestbook' : 'Unser Gästebuch'}
            </h1>
          </div>

          {entries.length === 0 ? (
            <div className="text-center py-12 text-[#5A5142]">
              <p className="text-lg">
                {isEn
                  ? 'Be the first to leave an entry below.'
                  : 'Schreiben Sie den ersten Eintrag unten — wir freuen uns!'}
              </p>
            </div>
          ) : (
            <GuestbookBook
              entries={bookEntries}
              strings={bookStrings(isEn)}
              jumpTargets={{
                dog: 'E S',
                noCar: 'Bertram Schwarz',
                accessible: 'Ingrid und Günther Hartmann',
              }}
            />
          )}

          {/* Bewertungszeile + Einladung — wie Preview */}
          <div className="text-center max-w-[560px] mx-auto mt-[60px]">
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[15px] text-[#5A5142] mb-[18px]">
              <span className="text-wood text-[17px] tracking-[1px]" aria-hidden="true">★★★★★</span>
              <span>
                <strong className="text-forest">4,5/5</strong>{' '}
                {isEn ? 'on Google (39 reviews)' : 'bei Google (39 Bewertungen)'} ·{' '}
                <strong className="text-forest">4,9/5</strong>{' '}
                {isEn ? 'on BayRegio (25)' : 'bei BayRegio (25)'}
              </span>
            </div>
            <p className="text-[17px] leading-[1.7] text-[#5A5142] mb-[26px]">
              {isEn
                ? 'Stories, memories and impressions — written by guests of the Sonnenhof. Browse through, and if you have stayed with us: add your own lines.'
                : 'Geschichten, Erinnerungen und Eindrücke — geschrieben von Gästen des Sonnenhofs. Blättern Sie hinein, und wenn Sie schon bei uns waren: Schreiben Sie sich dazu.'}
            </p>
            <a
              href="#gb-form"
              className="inline-block bg-forest hover:bg-forest-deep text-[#F3EADA] text-[14.5px] font-semibold px-[30px] py-3.5 rounded-full transition-colors"
            >
              {isEn ? 'Write an entry' : 'Eintrag schreiben'}
            </a>
          </div>
        </section>

        {/* Form */}
        <section id="gb-form" className="bg-sand py-16 md:py-20 mt-[60px] scroll-mt-24">
          <div id="schreiben" className="max-w-3xl mx-auto px-4">
            <GuestbookForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
