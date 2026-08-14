import { setRequestLocale } from 'next-intl/server';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { GuestbookForm } from '@/components/guestbook-form';
import { JsonLd } from '@/components/json-ld';
import { createBreadcrumbSchema, createHreflangLanguages } from '@/lib/seo';
import { getDb, isDatabaseConfigured } from '@/lib/db';
import { guestbookEntries } from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { Quote, Star } from 'lucide-react';
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

function formatDate(d: Date | null): string {
  if (!d) return '';
  return new Date(d).toLocaleDateString('de-DE', { year: 'numeric', month: 'long' });
}

export default async function GaestebuchPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const entries = await loadEntries();
  const isEn = locale === 'en';

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

      <main className="bg-stone min-h-screen">
        {/* Hero */}
        <section className="bg-forest py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <Quote className="w-12 h-12 mx-auto mb-6 text-gold" />
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl mb-4 text-[#FBF6EC]">
              {isEn ? 'Guestbook' : 'Gästebuch'}
            </h1>
            <p className="text-lg md:text-xl text-[#C9D5CB] max-w-2xl mx-auto leading-relaxed">
              {isEn
                ? 'Stories, memories and impressions — written by guests of the Sonnenhof.'
                : 'Geschichten, Erinnerungen und Eindrücke — geschrieben von Gästen des Sonnenhofs.'}
            </p>
            <div className="mt-8">
              <a
                href="#schreiben"
                className="inline-block bg-wood hover:bg-[#D3AC6E] text-[#241B0F] font-semibold px-8 py-3 rounded-full transition-colors"
              >
                {isEn ? 'Write an entry' : 'Eintrag schreiben'}
              </a>
            </div>
          </div>
        </section>

        {/* Entries */}
        <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
          {entries.length === 0 ? (
            <div className="text-center py-12 text-[#5A5142]">
              <p className="text-lg">
                {isEn
                  ? 'Be the first to leave an entry below.'
                  : 'Schreiben Sie den ersten Eintrag unten — wir freuen uns!'}
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {entries.map((entry) => (
                <article
                  key={entry.id}
                  className="bg-[#FBF6EC] rounded-lg border border-[rgba(166,121,78,0.28)] shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-6 md:p-7 flex flex-col"
                >
                  {entry.rating && (
                    <div className="flex items-center gap-0.5 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < entry.rating! ? 'fill-[#F0C868] text-[#F0C868]' : 'text-[#D8CCB4]'}`}
                        />
                      ))}
                    </div>
                  )}
                  {entry.photoUrl && (
                    <div className="mb-4 -mx-6 md:-mx-7 -mt-6 md:-mt-7">
                      <img
                        src={entry.photoUrl}
                        alt={`Eintrag von ${entry.name}`}
                        className="w-full h-auto max-h-80 object-contain bg-[#FBF6EC] border-b border-[rgba(166,121,78,0.28)] rounded-t-lg"
                      />
                    </div>
                  )}
                  <p className="[font-family:var(--font-script)] text-[17px] leading-[1.9] text-[#2A241C] whitespace-pre-line flex-1">
                    {entry.message}
                  </p>
                  <footer className="mt-5 pt-4 border-t border-[rgba(166,121,78,0.28)]">
                    <p className="[font-family:var(--font-script)] text-forest text-[17px] text-right">{entry.name}</p>
                    <p className="font-sans text-[13px] text-[#9A8C72] mt-1.5 text-right">
                      {[entry.ort, entry.stayPeriod, entry.accommodation, formatDate(entry.approvedAt)]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  </footer>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Form */}
        <section className="bg-sand py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-4">
            <GuestbookForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
