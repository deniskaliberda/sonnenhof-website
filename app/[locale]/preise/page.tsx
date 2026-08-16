import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { getFerienwohnungen, getZimmer, priceInfo, type Accommodation } from "@/lib/mock-data";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";

import { Link } from "@/i18n/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'PreisePage' });

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/pricing'
    : 'https://www.sonnenhof-herrsching.de/preise';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: createHreflangLanguages('/preise'),
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

const byPrice = (a: Accommodation, b: Accommodation) =>
  a.pricePerNight - b.pricePerNight || a.capacity.maxPersons - b.capacity.maxPersons;

export default async function PreisePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'PreisePage' });
  const ferienwohnungen = [...getFerienwohnungen()].sort(byPrice);
  const zimmer = [...getZimmer()].sort(byPrice);

  const fewoDisplayName = (title: string) => title.replace(/^Ferienwohnung /, '');
  const kurtaxeFormatted = locale === 'en'
    ? priceInfo.kurtaxe.toFixed(2)
    : priceInfo.kurtaxe.toFixed(2).replace('.', ',');

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "Prices & Services" : "Preise & Leistungen", path: "/preise" },
  ]);

  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://www.sonnenhof-herrsching.de/#lodgingbusiness",
    name: "Sonnenhof Herrsching",
    url: "https://www.sonnenhof-herrsching.de/preise",
    makesOffer: [
      ...ferienwohnungen.map((fewo) => ({
        "@type": "Offer",
        name: fewo.title,
        description: fewo.shortDescription,
        url: `https://www.sonnenhof-herrsching.de/unterkunft/${fewo.slug}`,
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: fewo.pricePerNight, priceCurrency: "EUR", unitText: "Nacht", name: "Hauptsaison" },
          { "@type": "UnitPriceSpecification", price: fewo.pricePerNightLowSeason, priceCurrency: "EUR", unitText: "Nacht", name: "Nebensaison" },
        ],
      })),
      ...zimmer.map((z) => ({
        "@type": "Offer",
        name: z.title,
        description: z.shortDescription,
        url: `https://www.sonnenhof-herrsching.de/unterkunft/${z.slug}`,
        priceSpecification: [
          { "@type": "UnitPriceSpecification", price: z.pricePerNight, priceCurrency: "EUR", unitText: "Nacht", name: "Hauptsaison" },
          { "@type": "UnitPriceSpecification", price: z.pricePerNightLowSeason, priceCurrency: "EUR", unitText: "Nacht", name: "Nebensaison" },
        ],
      })),
    ],
  };

  const gridCols = "grid grid-cols-[1.6fr_0.8fr_0.8fr_1fr_1fr]";

  const tableHeader = (firstColumn: string) => (
    <div className={`${gridCols} bg-forest px-4 py-4 text-[10px] uppercase tracking-[0.08em] text-[#EFE7D6] md:px-6 md:text-xs`}>
      <div>{firstColumn}</div>
      <div>{t('size')}</div>
      <div>{t('persons')}</div>
      <div>{t('highSeason')}</div>
      <div>{t('lowSeason')}</div>
    </div>
  );

  const tableRow = (item: Accommodation, name: React.ReactNode, isLast: boolean) => (
    <div
      key={item.id}
      className={`${gridCols} items-center px-4 py-[18px] text-[13px] text-[#3C362B] md:px-6 md:text-[15px] ${isLast ? '' : 'border-b border-[#EFE7D6]'}`}
    >
      <div className="pr-2 font-semibold text-forest">{name}</div>
      <div>{item.size} m²</div>
      <div>{item.capacity.maxPersons}</div>
      <div>{item.pricePerNight} €</div>
      <div className="text-wood-dark">{item.pricePerNightLowSeason} €</div>
    </div>
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offersSchema} />
      <Navigation />
      <main className="bg-stone">
        {/* Header — Preview 1:1 */}
        <section className="mx-auto max-w-[1340px] px-6 pb-14 pt-36 text-center md:px-16">
          <p className="mb-[18px] text-[11px] uppercase tracking-[0.32em] text-wood-dark">
            {locale === 'en' ? 'Prices & Services' : 'Preise & Leistungen'}
          </p>
          <h1 className="font-serif text-4xl font-medium leading-[1.05] text-forest md:text-[54px]">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mt-5 max-w-[600px] leading-[1.6] text-[#5A5142] md:text-[17px]">
            {t('heroSubtitle')}
          </p>
        </section>

        {/* Price tables — Preview 1:1 */}
        <section className="mx-auto max-w-[1100px] px-6 pb-[30px] md:px-16">
          {/* FeWo table */}
          <h2 className="mb-[18px] font-serif text-[26px] font-medium text-forest">
            {t('apartments')}
          </h2>
          <div className="mb-[46px] overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
            {tableHeader(locale === 'en' ? t('apartment') : 'Wohnung')}
            {ferienwohnungen.map((fewo, idx) =>
              tableRow(
                fewo,
                <a href={`/unterkunft/${fewo.slug}`} className="transition-colors hover:text-wood">
                  {fewoDisplayName(fewo.title)}
                </a>,
                idx === ferienwohnungen.length - 1
              )
            )}
          </div>

          {/* Zimmer table */}
          <h2 className="mb-[18px] font-serif text-[26px] font-medium text-forest">
            {t('guestRooms')}
          </h2>
          <div className="mb-4 overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
            {tableHeader(t('room'))}
            {zimmer.map((z, idx) =>
              tableRow(
                z,
                <a href={`/unterkunft/${z.slug}`} className="transition-colors hover:text-wood">
                  {z.title}
                  {z.id === 'dz-plus' && (
                    <span className="font-normal text-[#9A8C72] md:text-[13px]">
                      {" "}
                      {locale === 'en' ? '(with balcony & kitchenette)' : '(mit Balkon & Teeküche)'}
                    </span>
                  )}
                </a>,
                idx === zimmer.length - 1
              )
            )}
          </div>
          <p className="mb-2.5 text-[13px] leading-[1.6] text-[#9A8C72]">
            {locale === 'en'
              ? 'Low season: January–April, November, December and from 10 October (10 € less per night). Rooms from 2 nights, holiday apartments by the week. The Doppelzimmer plus can be booked like a room from 2 nights, including across weeks.'
              : 'Nebensaison: Januar–April, November, Dezember sowie ab 10. Oktober (10 € weniger pro Nacht). Zimmer ab 2 Nächten, Ferienwohnungen wochenweise. Das Doppelzimmer plus ist wie ein Zimmer ab 2 Nächten und auch wochenübergreifend buchbar.'}
          </p>
        </section>

        {/* Zusatzkosten + Inklusive — Preview 1:1 */}
        <section className="mx-auto grid max-w-[1100px] gap-[30px] px-6 pb-[30px] pt-10 md:grid-cols-2 md:px-16">
          <div className="rounded-[14px] bg-sand p-8 md:px-11 md:py-10">
            <h3 className="mb-5 font-serif text-[23px] text-forest">{t('additionalCosts')}</h3>
            <dl className="flex flex-col gap-[13px] text-[15px] text-[#3C362B]">
              <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-[11px]">
                <dt>{t('touristTax')}</dt>
                <dd className="text-right text-wood-dark">{kurtaxeFormatted} € {t('perNightPerAdult')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-[11px]">
                <dt>{t('dogs')}</dt>
                <dd className="text-right text-wood-dark">{priceInfo.hundePreis} € {t('perNight')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-[11px]">
                <dt>{t('additionalAdult')}</dt>
                <dd className="text-right text-wood-dark">{priceInfo.zusatzPersonErwachsen} € {t('perNight')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-[11px]">
                <dt>{t('children3to10')}</dt>
                <dd className="text-right text-wood-dark">{priceInfo.zusatzKindBis10} € {t('perNight')}</dd>
              </div>
              <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-[11px]">
                <dt>{t('childrenOver10')}</dt>
                <dd className="text-right text-wood-dark">{priceInfo.zusatzKindAb10} € {t('perNight')}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>{t('childrenUpTo', { age: priceInfo.kinderFrei })}</dt>
                <dd className="text-right font-semibold text-forest">{t('free')}</dd>
              </div>
            </dl>
          </div>
          <div className="rounded-[14px] bg-forest p-8 text-[#EFE7D6] md:px-11 md:py-10">
            <h3 className="mb-5 font-serif text-[23px] text-[#FBF6EC]">{t('alwaysIncluded')}</h3>
            <div className="flex flex-col gap-[14px] text-[15px] text-[#C9D5CB]">
              <div>✓ {t('linenTowels')}</div>
              <div>✓ {t('freeWifi')}</div>
              <div>✓ {t('freeParking')}</div>
              <div>✓ {t('noCleaning')}</div>
              <div>✓ {t('toasterHairdryer')}</div>
              <div>✓ {t('teaKitchenRooms')}</div>
            </div>
          </div>
        </section>

        {/* Bezahlung — Preview 1:1 */}
        <section className="mx-auto max-w-[1100px] px-6 pb-24 pt-[30px] md:px-16">
          <div className="flex flex-col gap-3 rounded-xl bg-white p-7 shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:flex-row md:items-center md:gap-[18px] md:px-9 md:py-[30px]">
            <h3 className="shrink-0 font-serif text-xl font-semibold text-forest">{t('payment')}</h3>
            <p className="text-[14.5px] leading-[1.6] text-[#5A5142]">
              {locale === 'en' ? (
                <>
                  We accept advance bank transfer and cash payment on arrival. Unfortunately we{" "}
                  <strong className="text-forest">cannot take debit or credit cards</strong>. A deposit is
                  required when booking a holiday apartment.
                </>
              ) : (
                <>
                  Wir akzeptieren Vorabüberweisung und Barzahlung bei Anreise. Leider können wir{" "}
                  <strong className="text-forest">keine EC- oder Kreditkarten</strong> nehmen. Bei Buchung
                  einer Ferienwohnung ist eine Anzahlung notwendig.
                </>
              )}
            </p>
          </div>
        </section>

        {/* CTA button — Preview 1:1 */}
        <section className="px-6 pb-[100px] text-center md:px-16">
          <Link
            href="/kontakt"
            className="inline-block rounded-md bg-forest px-9 py-4 text-[15px] font-semibold text-stone transition-colors hover:bg-forest-deep"
          >
            {locale === 'en' ? 'Enquire now' : 'Jetzt anfragen'}
          </Link>
        </section>

        {/* ===== Live-Inhalte ohne Preview-Entsprechung (Landhaus-Look) ===== */}

        {/* SEO Text */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-3xl space-y-4 leading-[1.7] text-[#5A5142]">
            {locale === 'en' ? (
              <>
                <p>
                  At Sonnenhof Herrsching you pay fair prices with no hidden costs. Our five holiday apartments
                  are particularly suited to families and longer stays – each has its own kitchen,
                  private bathroom, and a balcony or terrace. The seven guest rooms are ideal for shorter
                  visits from two nights and include access to a shared kitchenette on the first floor. All prices
                  are per night for two guests and include bed linen, towels, Wi-Fi and a
                  free parking space on site.
                </p>
                <p>
                  The visitor&apos;s tax is levied by the municipality of Herrsching and is payable on site.
                  Dogs are warmly welcome at the Sonnenhof – our Golden Retriever Balu loves four-legged
                  playmates. Children up to three years stay free of charge. Bookings are made directly with
                  owner Conny by phone or via our{" "}
                  <Link href="/kontakt" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                    contact form
                  </Link>
                  . For questions about prices, availability or special requests, we are happy to help personally.
                </p>
              </>
            ) : (
              <>
                <p>
                  Im Sonnenhof Herrsching zahlen Sie faire Preise ohne versteckte Kosten. Unsere fünf Ferienwohnungen
                  eignen sich besonders für Familien und längere Aufenthalte – jede verfügt über eine eigene Küche,
                  ein eigenes Bad und einen Balkon oder eine Terrasse. Die sieben Gästezimmer sind ideal für kürzere
                  Besuche ab zwei Nächten und bieten Zugang zu einer gemeinsamen Teeküche im ersten Stock. Alle Preise
                  verstehen sich pro Nacht für zwei Personen und beinhalten Bettwäsche, Handtücher, WLAN und einen
                  kostenlosen Parkplatz direkt auf dem Hof.
                </p>
                <p>
                  Die Kurtaxe wird von der Gemeinde Herrsching erhoben und ist vor Ort zu entrichten. Hunde sind im
                  Sonnenhof herzlich willkommen – unser Golden Retriever Balu freut sich über vierbeinige
                  Spielkameraden. Kinder bis drei Jahre übernachten bei uns kostenlos. Eine verbindliche Buchung
                  erfolgt direkt bei Gastgeberin Conny per Telefon oder über unser{" "}
                  <Link href="/kontakt" className="font-medium text-forest underline decoration-2 underline-offset-2 hover:text-wood">
                    Kontaktformular
                  </Link>
                  . Bei Fragen zu Preisen, Verfügbarkeit oder besonderen Wünschen stehen wir Ihnen gerne persönlich
                  zur Verfügung.
                </p>
              </>
            )}
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
