import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getZimmer } from "@/lib/mock-data";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { zimmerSchemas, extractFaqItems } from "@/lib/schema";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { RoomPhotoGallery } from "@/components/room-image-gallery";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ZimmerPage' });

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/accommodation/rooms'
    : 'https://www.sonnenhof-herrsching.de/wohnen/zimmer';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: createHreflangLanguages('/wohnen/zimmer'),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: canonical,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'de_DE',
    },
  };
}

export default async function ZimmerPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'ZimmerPage' });
  const tFaq = await getTranslations({ locale, namespace: 'FAQ' });
  const zimmer = getZimmer();

  const dzPlus = zimmer.find((room) => room.id === 'dz-plus');
  const standardZimmer = zimmer
    .filter((room) => room.id !== 'dz-plus')
    .sort((a, b) => a.pricePerNight - b.pricePerNight);
  const minPrice = Math.min(...zimmer.map((room) => room.pricePerNight));

  const personsLabel = (n: number) =>
    locale === 'en' ? (n === 1 ? 'person' : 'persons') : (n === 1 ? 'Person' : 'Personen');
  const photosLabel = (n: number) => (locale === 'en' ? `${n} photos` : `${n} Fotos`);
  const nightSuffix = (low?: number) => {
    if (low === undefined) return locale === 'en' ? ' / night' : ' / Nacht';
    return locale === 'en' ? ` / night · low season ${low} €` : ` / Nacht · NS ${low} €`;
  };

  // Preview copy — DE verbatim from sonnenhof-landhaus-preview (PAGE: ZIMMER)
  const cardCopy: Record<string, { de: string; en: string }> = {
    'einzelzimmer': {
      de: 'Kompakt und gemütlich — ideal für Allein- und Geschäftsreisende. Unser günstigstes Angebot.',
      en: 'Compact and cosy — ideal for solo and business travellers. Our most affordable option.',
    },
    'dz-ohne-balkon': {
      de: 'Gemütliches Doppelzimmer mit eigenem Bad — ruhig und günstiger als das Zimmer mit Balkon.',
      en: 'Cosy double room with private bathroom — quiet and cheaper than the room with balcony.',
    },
    'dz-balkon': {
      de: 'Komfortabler Rückzugsort mit eigenem Balkon — den Tag in Ruhe ausklingen lassen.',
      en: 'A comfortable retreat with its own balcony — let the day wind down in peace.',
    },
  };

  const dzPlusText = locale === 'en'
    ? 'Double room with its own balcony, private bathroom with shower/WC and its own kitchenette right in the room: fridge, coffee machine, kettle and tableware for two. There is no cooking facility — but everything you need for breakfast and small meals is there. Unlike our holiday apartments, the room can be booked from just 2 nights and also across weeks.'
    : 'Doppelzimmer mit eigenem Balkon, eigenem Bad mit Dusche/WC und eigener Teeküche direkt im Zimmer: Kühlschrank, Kaffeemaschine, Wasserkocher und Geschirr für zwei Personen. Eine Kochgelegenheit gibt es nicht — für Frühstück und kleine Mahlzeiten ist alles da. Anders als unsere Ferienwohnungen ist das Zimmer schon ab 2 Nächten und auch wochenübergreifend buchbar.';

  const dzPlusChips = locale === 'en'
    ? ['Own balcony', 'Own kitchenette', 'Bathroom/shower/WC', 'Bookable from 2 nights', 'Dogs welcome']
    : ['Eigener Balkon', 'Eigene Teeküche', 'Bad/Dusche/WC', 'Ab 2 Nächten buchbar', 'Hunde willkommen'];

  const serviceStrip = locale === 'en'
    ? [
        { title: 'Cleaning', text: 'Room cleaning every 3rd day.' },
        { title: 'Included', text: 'Bed linen, towels & Wi-Fi.' },
        { title: 'Parking', text: 'Free on site.' },
        { title: 'Dogs', text: 'Welcome (10 €/night).' },
      ]
    : [
        { title: 'Reinigung', text: 'Zimmerreinigung jeden 3. Tag.' },
        { title: 'Inklusive', text: 'Bettwäsche, Handtücher & WLAN.' },
        { title: 'Parkplatz', text: 'Kostenlos am Hof.' },
        { title: 'Hunde', text: 'Willkommen (10 €/Nacht).' },
      ];

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "Accommodation" : "Unterkünfte", path: "/wohnen" },
    { name: locale === 'en' ? "Guest Rooms" : "Gästezimmer", path: "/wohnen/zimmer" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {zimmerSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Navigation />
      <main className="bg-stone pt-20">
        {/* Hero — Preview 1:1 */}
        <section className="relative h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer-2.jpg"
              alt={locale === 'en' ? 'Guest room Sonnenhof' : 'Gästezimmer Sonnenhof'}
              fill
              className="object-cover object-[center_60%]"
              priority
              quality={90}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[rgba(28,40,30,0.52)]" />
          </div>

          <div className="relative z-10 mx-auto flex h-full max-w-[1340px] flex-col justify-center px-6 md:px-16">
            <p className="mb-[18px] text-[11px] uppercase tracking-[0.32em] text-[#EAD9B8]">
              {locale === 'en'
                ? `7 guest rooms · from ${minPrice} €`
                : `7 Gästezimmer · ab ${minPrice} €`}
            </p>
            <h1 className="max-w-[720px] font-serif text-4xl font-medium leading-[1.05] text-[#FBF6EC] md:text-[54px]">
              {t('heroTitle')}
            </h1>
            <p className="mt-[18px] max-w-[600px] text-base leading-[1.6] text-[#F0E9DA] md:text-[17px]">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Intro — Preview 1:1 */}
        <section className="mx-auto max-w-[1180px] px-6 pb-10 pt-16 text-center md:px-16 md:pt-20">
          <p className="text-base leading-[1.7] text-[#5A5142]">{t('roomsNote')}</p>
        </section>

        {/* Room cards — Preview 1:1 */}
        <section className="mx-auto max-w-[1180px] px-6 pb-14 md:px-16 md:pb-20">
          <div className="grid gap-[26px] md:grid-cols-3">
            {standardZimmer.map((room) => (
              <article
                key={room.id}
                className="flex flex-col overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(42,36,28,0.06)]"
              >
                <RoomPhotoGallery
                  images={room.images}
                  badgeLabel={photosLabel(room.images.length)}
                  className="h-[240px]"
                />
                <div className="flex flex-1 flex-col px-[30px] pb-8 pt-7">
                  <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-wood-dark">
                    {room.size} m² · {room.capacity.maxPersons} {personsLabel(room.capacity.maxPersons)}
                  </p>
                  <h3 className="mb-2.5 font-serif text-2xl font-semibold text-forest">
                    <a href={`/unterkunft/${room.slug}`} className="transition-colors hover:text-wood">
                      {room.title}
                    </a>
                  </h3>
                  <p className="mb-[18px] flex-1 text-sm leading-[1.6] text-[#5A5142]">
                    {cardCopy[room.id]?.[locale === 'en' ? 'en' : 'de'] ?? room.shortDescription}
                  </p>
                  <div className="border-t border-sand pt-4">
                    <span className="font-serif text-[23px] text-forest">{room.pricePerNight} €</span>
                    <span className="text-[12.5px] text-[#9A8C72]">{nightSuffix(room.pricePerNightLowSeason)}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Doppelzimmer plus feature — Preview 1:1 */}
        {dzPlus && (
          <section className="mx-auto max-w-[1180px] px-6 pb-[70px] md:px-16">
            <div className="grid overflow-hidden rounded-[14px] bg-forest shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:grid-cols-[1.05fr_0.95fr]">
              <div className="flex flex-col justify-center p-8 md:px-[52px] md:py-[50px]">
                <p className="mb-[14px] text-[11px] uppercase tracking-[0.22em] text-gold">
                  {locale === 'en'
                    ? 'New · The in-between of room and apartment'
                    : 'Neu · Das Zwischending zwischen Zimmer und Ferienwohnung'}
                </p>
                <p className="mb-2 text-[11px] uppercase tracking-[0.1em] text-[#EAD9B8]">
                  {dzPlus.size} m² · {dzPlus.capacity.maxPersons} {personsLabel(dzPlus.capacity.maxPersons)}
                </p>
                <h3 className="mb-[14px] font-serif text-[28px] font-semibold text-[#FBF6EC]">
                  <a href={`/unterkunft/${dzPlus.slug}`} className="transition-colors hover:text-gold">
                    {dzPlus.title}
                  </a>
                </h3>
                <p className="mb-[22px] text-[15.5px] leading-[1.7] text-[#C9D5CB]">
                  {dzPlusText}
                </p>
                <div className="mb-[22px] flex flex-wrap gap-[9px]">
                  {dzPlusChips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full bg-[rgba(243,234,218,0.14)] px-[15px] py-[7px] text-[13px] text-[#EFE7D6]"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
                <div className="border-t border-[rgba(239,231,214,0.25)] pt-4">
                  <span className="font-serif text-[23px] text-gold">{dzPlus.pricePerNight} €</span>
                  <span className="text-[12.5px] text-[#C9D5CB]">{nightSuffix(dzPlus.pricePerNightLowSeason)}</span>
                </div>
              </div>
              <RoomPhotoGallery
                images={dzPlus.images}
                badgeLabel={photosLabel(dzPlus.images.length)}
                className="h-72 md:h-full md:min-h-[330px]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </section>
        )}

        {/* Tea kitchen feature — Preview 1:1 */}
        <section className="mx-auto max-w-[1180px] px-6 pb-[90px] pt-5 md:px-16">
          <div className="grid overflow-hidden rounded-[14px] bg-white shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:grid-cols-[1.05fr_0.95fr]">
            <div className="flex flex-col justify-center p-8 md:px-[52px] md:py-[50px]">
              <p className="mb-[14px] text-[11px] uppercase tracking-[0.22em] text-wood-dark">
                {t('coffeeTeaTitle')}
              </p>
              <h3 className="mb-[14px] font-serif text-[28px] font-semibold text-forest">
                {t('teaKitchenTitle')}
              </h3>
              <p className="mb-[22px] text-[15.5px] leading-[1.7] text-[#5A5142]">{t('teaKitchenText')}</p>
              <div className="flex flex-wrap gap-[9px]">
                {[t('coffeeMachine'), t('kettle'), t('fridge'), t('toaster'), t('microwave')].map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-sand px-[15px] py-[7px] text-[13px] text-[#3C362B]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative h-72 md:h-full md:min-h-[330px]">
              <Image
                src="/images/allgemein/teeküche-sonnenhof.jpg"
                alt={locale === 'en' ? 'Kitchenette Sonnenhof' : 'Teeküche Sonnenhof'}
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </section>

        {/* Service strip — Preview 1:1 */}
        <section className="mx-auto max-w-[1180px] px-6 pb-[90px] md:px-16">
          <div className="grid grid-cols-2 gap-8 border-t border-[rgba(166,121,78,0.22)] pt-[50px] md:grid-cols-4">
            {serviceStrip.map((item) => (
              <div key={item.title}>
                <div className="mb-1.5 font-serif text-lg text-forest">{item.title}</div>
                <p className="text-sm leading-[1.6] text-[#5A5142]">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA button — Preview 1:1 */}
        <section className="px-6 pb-[100px] text-center md:px-16">
          <Button
            asChild
            size="lg"
            className="rounded-md bg-wood px-9 py-6 text-[15px] font-semibold text-[#241B0F] hover:bg-[#D3AC6E]"
          >
            <Link href="/kontakt">{t('inquireRooms')}</Link>
          </Button>
        </section>

        {/* ===== Live-Inhalte ohne Preview-Entsprechung (Landhaus-Look) ===== */}

        {/* Season times */}
        <section className="px-6 pb-14">
          <div className="mx-auto max-w-6xl rounded-xl bg-sand p-6 md:p-8">
            <h3 className="mb-4 font-serif text-xl font-semibold text-forest">{t('seasonTimes')}</h3>
            <div className="grid gap-4 text-[#3C362B] md:grid-cols-2">
              <div>
                <p className="font-semibold text-forest">{t('highSeason')}:</p>
                <p className="text-[15px] leading-[1.6]">{t('highSeasonPeriod')}</p>
              </div>
              <div>
                <p className="font-semibold text-wood-dark">{t('lowSeason')}:</p>
                <p className="text-[15px] leading-[1.6]">{t('lowSeasonPeriod')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={extractFaqItems(zimmerSchemas[1])} heading={tFaq('defaultHeading')} />

        {/* SEO Text */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-center font-serif text-3xl font-medium text-forest md:text-4xl">
              {t('pensionTitle')}
            </h2>
            <div className="space-y-4 leading-[1.7] text-[#5A5142]">
              {locale === 'en' ? (
                <>
                  <p>
                    The Sonnenhof offers cosy guest rooms in Herrsching on Lake Ammersee –
                    ideal for short stays, weekend trips or as a{" "}
                    <a href="/blog/ferienwohnung-muenchen-umgebung" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      budget-friendly alternative to a Munich hotel
                    </a>.
                    By S-Bahn S8, you can reach Marienplatz in 45 minutes.
                  </p>
                  <p>
                    Our rooms are also perfect for{" "}
                    <a href="/blog/guenstige-pension-ammersee" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      a budget-friendly holiday at Lake Ammersee
                    </a>.
                    In the low season, you save 10€ per night.
                    Discover the{" "}
                    <a href="/blog/ausflugsziele-herrsching-ammersee" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      day trips around Herrsching
                    </a>{" "}
                    – from Andechs Monastery to Starnberger See. Planning a longer stay?{" "}
                    <Link href="/wohnen/ferienwohnungen" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      Our holiday apartments
                    </Link>{" "}
                    can be booked by the week.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Der Sonnenhof bietet Ihnen gemütliche Gästezimmer in Herrsching am Ammersee –
                    ideal für Kurzaufenthalte, Wochenendtrips oder als{" "}
                    <a href="/blog/ferienwohnung-muenchen-umgebung" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      günstige Alternative zum Münchner Hotel
                    </a>.
                    Mit der S-Bahn S8 sind Sie in 45 Minuten am Marienplatz.
                  </p>
                  <p>
                    Unsere Zimmer eignen sich auch hervorragend für{" "}
                    <a href="/blog/guenstige-pension-ammersee" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      einen günstigen Urlaub am Ammersee
                    </a>.
                    In der Nebensaison sparen Sie 10€ pro Nacht.
                    Entdecken Sie die{" "}
                    <a href="/blog/ausflugsziele-herrsching-ammersee" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      Ausflugsziele rund um Herrsching
                    </a>{" "}
                    – vom Kloster Andechs bis zum Starnberger See. Sie planen einen längeren Aufenthalt?{" "}
                    <Link href="/wohnen/ferienwohnungen" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                      Unsere Ferienwohnungen
                    </Link>{" "}
                    können Sie wochenweise buchen.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="px-6 pb-16">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-10 font-serif text-3xl font-medium text-forest md:text-4xl">
              {t('matchingTips')}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                { href: "/blog/guenstige-pension-ammersee", title: locale === 'en' ? "Budget-Friendly at Lake Ammersee" : "Günstig am Ammersee übernachten" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: locale === 'en' ? "Stay near Munich" : "Übernachten nahe München" },
                { href: "/blog/ausflugsziele-herrsching-ammersee", title: locale === 'en' ? "Day trips around Herrsching" : "Ausflugsziele rund um Herrsching" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <div className="flex h-full flex-col justify-between rounded-xl bg-white p-6 text-left shadow-[0_1px_2px_rgba(42,36,28,0.06)] transition-shadow hover:shadow-md">
                    <h3 className="mb-4 font-serif text-lg font-semibold text-forest transition-colors group-hover:text-wood">
                      {post.title}
                    </h3>
                    <span className="inline-flex items-center gap-2 text-sm font-medium text-forest transition-colors group-hover:text-wood">
                      {t('readMore')} <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="px-6 pb-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 font-serif text-3xl font-medium text-forest md:text-4xl">
              {t('inquireRooms')}
            </h2>
            <p className="mb-3 text-lg text-[#5A5142]">{t('inquireText')}</p>
            <p className="mb-9 text-[#9A8C72]">{t('minStayNote')}</p>
            <Button
              asChild
              size="lg"
              className="rounded-md bg-wood px-10 py-6 text-[15px] font-semibold text-[#241B0F] hover:bg-[#D3AC6E]"
            >
              <Link href="/kontakt">{t('inquirePersonally')}</Link>
            </Button>

            <div className="mt-12 border-t border-sand pt-10">
              <p className="mb-3 text-[#9A8C72]">{t('orCallDirectly')}</p>
              <a
                href="tel:+4981529679300"
                className="font-serif text-2xl font-semibold text-forest transition-colors hover:text-wood"
              >
                +49 (0) 8152 / 96793-0
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
