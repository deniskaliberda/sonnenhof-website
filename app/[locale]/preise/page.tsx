import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { getFerienwohnungen, getZimmer, priceInfo, bookingInfo } from "@/lib/mock-data";
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

export default async function PreisePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'PreisePage' });
  const ferienwohnungen = getFerienwohnungen();
  const zimmer = getZimmer();

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

  const tableHead = (firstColumn: string) => (
    <thead>
      <tr className="bg-forest text-left text-xs uppercase tracking-[0.08em] text-[#EFE7D6]">
        <th className="px-4 py-4 font-medium md:px-6">{firstColumn}</th>
        <th className="px-4 py-4 font-medium md:px-6">{t('size')}</th>
        <th className="px-4 py-4 font-medium md:px-6">{t('persons')}</th>
        <th className="px-4 py-4 font-medium md:px-6">{t('highSeason')}</th>
        <th className="px-4 py-4 font-medium md:px-6">{t('lowSeason')}</th>
        <th className="px-4 py-4 font-medium md:px-6">{t('highlights')}</th>
      </tr>
    </thead>
  );

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offersSchema} />
      <Navigation />
      <main className="bg-stone">
        {/* Header */}
        <section className="px-6 pb-12 pt-36">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="font-serif text-4xl font-medium leading-[1.08] text-forest md:text-[54px]">
              {t('heroTitle')}
            </h1>
            <p className="mx-auto mt-5 max-w-2xl leading-[1.7] text-[#5A5142] md:text-lg">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="px-6 pb-14">
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
                  We distinguish between peak and low season. In the low season – from November to March,
                  excluding public holidays and school holidays – you benefit from reduced prices. The peak season
                  covers April to October as well as Christmas, New Year and Bavarian school holidays.
                  Bookings are made directly with owner Conny by phone or via our{" "}
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
                  Wir unterscheiden zwischen Haupt- und Nebensaison. In der Nebensaison – von November bis März,
                  ausgenommen Feiertage und Ferienzeiten – profitieren Sie von reduzierten Preisen. Die Hauptsaison
                  umfasst die Monate April bis Oktober sowie Weihnachten, Silvester und die bayerischen Schulferien.
                  Eine verbindliche Buchung erfolgt direkt bei Gastgeberin Conny per Telefon oder über unser{" "}
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

        {/* Apartments price table */}
        <section className="px-6 pb-12">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-5 font-serif text-[26px] font-medium text-forest">
              {t('apartments')}
            </h2>

            <div className="hidden overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {tableHead(t('apartment'))}
                  <tbody>
                    {ferienwohnungen.map((fewo) => (
                      <tr key={fewo.id} className="border-b border-[#EFE7D6] text-[15px] text-[#3C362B] last:border-b-0">
                        <td className="px-4 py-4 md:px-6">
                          <a href={`/unterkunft/${fewo.slug}`} className="font-semibold text-forest transition-colors hover:text-wood">
                            {fewo.title}
                          </a>
                        </td>
                        <td className="px-4 py-4 md:px-6">{fewo.size} m²</td>
                        <td className="px-4 py-4 md:px-6">{t('max')} {fewo.capacity.maxPersons}</td>
                        <td className="px-4 py-4 font-semibold md:px-6">{fewo.pricePerNight}€</td>
                        <td className="px-4 py-4 font-semibold text-wood-dark md:px-6">{fewo.pricePerNightLowSeason}€</td>
                        <td className="px-4 py-4 text-sm text-[#9A8C72] md:px-6">{fewo.highlights.slice(0, 2).join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 md:hidden">
              {ferienwohnungen.map((fewo) => (
                <div key={fewo.id} className="rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                  <a href={`/unterkunft/${fewo.slug}`} className="mb-3 block font-serif text-xl font-semibold text-forest transition-colors hover:text-wood">
                    {fewo.title}
                  </a>
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm text-[#3C362B]">
                    <div><span className="text-[#9A8C72]">{t('size')}:</span> {fewo.size} m²</div>
                    <div><span className="text-[#9A8C72]">{t('persons')}:</span> {t('max')} {fewo.capacity.maxPersons}</div>
                    <div><span className="text-[#9A8C72]">{t('highSeason')}:</span> <span className="font-semibold">{fewo.pricePerNight}€</span></div>
                    <div><span className="text-[#9A8C72]">{t('lowSeason')}:</span> <span className="font-semibold text-wood-dark">{fewo.pricePerNightLowSeason}€</span></div>
                  </div>
                  <p className="text-xs text-[#9A8C72]">{fewo.highlights.slice(0, 2).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms price table */}
        <section className="px-6 pb-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 font-serif text-[26px] font-medium text-forest">
              {t('guestRooms')}
            </h2>
            <p className="mb-6 max-w-2xl leading-[1.7] text-[#5A5142]">
              {locale === 'en'
                ? 'Our guest rooms feature a private bathroom with shower and WC. On the first floor there is a kitchenette with coffee machine, kettle, toaster, microwave and fridge for self-catering. The minimum stay is two nights.'
                : 'Unsere Gästezimmer bieten Ihnen ein eigenes Bad mit Dusche und WC. Im ersten Stock steht eine Teeküche mit Kaffeemaschine, Wasserkocher, Toaster, Mikrowelle und Kühlschrank zur Selbstversorgung bereit. Der Mindestaufenthalt beträgt zwei Nächte.'}
            </p>

            <div className="hidden overflow-hidden rounded-xl bg-white shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:block">
              <div className="overflow-x-auto">
                <table className="w-full">
                  {tableHead(t('room'))}
                  <tbody>
                    {zimmer.map((z) => (
                      <tr key={z.id} className="border-b border-[#EFE7D6] text-[15px] text-[#3C362B] last:border-b-0">
                        <td className="px-4 py-4 md:px-6">
                          <a href={`/unterkunft/${z.slug}`} className="font-semibold text-forest transition-colors hover:text-wood">
                            {z.title}
                          </a>
                        </td>
                        <td className="px-4 py-4 md:px-6">{z.size} m²</td>
                        <td className="px-4 py-4 md:px-6">{t('max')} {z.capacity.maxPersons}</td>
                        <td className="px-4 py-4 font-semibold md:px-6">{z.pricePerNight}€</td>
                        <td className="px-4 py-4 font-semibold text-wood-dark md:px-6">{z.pricePerNightLowSeason}€</td>
                        <td className="px-4 py-4 text-sm text-[#9A8C72] md:px-6">{z.highlights.slice(0, 2).join(", ")}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="space-y-4 md:hidden">
              {zimmer.map((z) => (
                <div key={z.id} className="rounded-xl bg-white p-5 shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                  <a href={`/unterkunft/${z.slug}`} className="mb-3 block font-serif text-xl font-semibold text-forest transition-colors hover:text-wood">
                    {z.title}
                  </a>
                  <div className="mb-3 grid grid-cols-2 gap-2 text-sm text-[#3C362B]">
                    <div><span className="text-[#9A8C72]">{t('size')}:</span> {z.size} m²</div>
                    <div><span className="text-[#9A8C72]">{t('persons')}:</span> {t('max')} {z.capacity.maxPersons}</div>
                    <div><span className="text-[#9A8C72]">{t('highSeason')}:</span> <span className="font-semibold">{z.pricePerNight}€</span></div>
                    <div><span className="text-[#9A8C72]">{t('lowSeason')}:</span> <span className="font-semibold text-wood-dark">{z.pricePerNightLowSeason}€</span></div>
                  </div>
                  <p className="text-xs text-[#9A8C72]">{z.highlights.slice(0, 2).join(" · ")}</p>
                </div>
              ))}
            </div>

            <p className="mt-5 text-[13px] leading-[1.6] text-[#9A8C72]">
              {locale === 'en'
                ? `Minimum stay: ${priceInfo.mindestaufenthaltZimmer} nights · Room cleaning every 3 days · Kitchenette on 1st floor. The Doppelzimmer plus can be booked like a room from ${priceInfo.mindestaufenthaltZimmer} nights, including across weeks.`
                : `Mindestaufenthalt: ${priceInfo.mindestaufenthaltZimmer} Nächte · Zimmerreinigung jeden 3. Tag · Teeküche im 1. Stock. Das Doppelzimmer plus ist wie ein Zimmer ab ${priceInfo.mindestaufenthaltZimmer} Nächten und auch wochenübergreifend buchbar.`}
            </p>
          </div>
        </section>

        {/* Seasons & additional costs */}
        <section className="px-6 pb-14">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-4 text-center font-serif text-3xl font-medium text-forest">
              {t('seasonAndCosts')}
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center leading-[1.7] text-[#5A5142]">
              {locale === 'en'
                ? "The visitor's tax is levied by the municipality of Herrsching and is payable on site. Dogs are warmly welcome at the Sonnenhof – our Golden Retriever Balu loves four-legged playmates. Children up to three years stay free of charge."
                : 'Die Kurtaxe wird von der Gemeinde Herrsching erhoben und ist vor Ort zu entrichten. Hunde sind im Sonnenhof herzlich willkommen – unser Golden Retriever Balu freut sich über vierbeinige Spielkameraden. Kinder bis drei Jahre übernachten bei uns kostenlos.'}
            </p>

            <div className="mb-8 rounded-xl bg-white p-6 shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:p-8">
              <h3 className="mb-4 font-serif text-[23px] font-semibold text-forest">{t('seasonTimes')}</h3>
              <div className="grid gap-4 text-[15px] md:grid-cols-2">
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full bg-forest" />
                  <div>
                    <p className="font-semibold text-[#3C362B]">{t('highSeason')}</p>
                    <p className="text-[#5A5142]">{bookingInfo.ferienwohnungen.hauptsaison}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1.5 inline-block h-3 w-3 shrink-0 rounded-full bg-wood" />
                  <div>
                    <p className="font-semibold text-[#3C362B]">
                      {t('lowSeason')} (–{priceInfo.nebensaisonRabatt}€{t('perNight')})
                    </p>
                    <p className="text-[#5A5142]">
                      {locale === 'en' ? 'From' : 'Ab'} {priceInfo.nebensaisonAb},{" "}
                      {priceInfo.nebensaisonMonate.join(", ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Additional costs */}
              <div className="rounded-xl bg-sand p-8 md:p-10">
                <h3 className="mb-5 font-serif text-[23px] font-semibold text-forest">{t('additionalCosts')}</h3>
                <dl className="flex flex-col gap-3 text-[15px] text-[#3C362B]">
                  <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-3">
                    <dt>{t('touristTax')}</dt>
                    <dd className="text-right text-wood-dark">{priceInfo.kurtaxe.toFixed(2)}€ {t('perNightPerAdult')}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-3">
                    <dt>{t('dogs')}</dt>
                    <dd className="text-right text-wood-dark">{priceInfo.hundePreis}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-3">
                    <dt>{t('additionalAdult')}</dt>
                    <dd className="text-right text-wood-dark">{priceInfo.zusatzPersonErwachsen}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-3">
                    <dt>{t('children3to10')}</dt>
                    <dd className="text-right text-wood-dark">{priceInfo.zusatzKindBis10}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between gap-4 border-b border-dashed border-[rgba(166,121,78,0.35)] pb-3">
                    <dt>{t('childrenOver10')}</dt>
                    <dd className="text-right text-wood-dark">{priceInfo.zusatzKindAb10}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt>{t('childrenUpTo', { age: priceInfo.kinderFrei })}</dt>
                    <dd className="text-right font-semibold text-forest">{t('free')}</dd>
                  </div>
                </dl>
              </div>

              {/* Always included */}
              <div className="rounded-xl bg-forest p-8 text-[#C9D5CB] md:p-10">
                <h3 className="mb-3 font-serif text-[23px] font-semibold text-[#FBF6EC]">{t('alwaysIncluded')}</h3>
                <p className="mb-5 text-sm leading-[1.7]">{t('alwaysIncludedText')}</p>
                <div className="flex flex-col gap-3 text-[15px]">
                  {[
                    { label: t('linenTowels'), detail: t('firstSetIncluded') },
                    { label: t('freeWifi'), detail: t('inAllUnits') },
                    { label: t('freeParking'), detail: t('parkingOnSite') },
                    { label: t('noCleaning'), detail: t('noExtraFees') },
                    { label: t('toasterHairdryer'), detail: t('inEveryApartment') },
                    { label: t('teaKitchenRooms'), detail: t('teaKitchenDetails') },
                  ].map((item) => (
                    <div key={item.label}>
                      <span className="font-semibold text-[#EFE7D6]">✓ {item.label}</span>
                      <span className="text-sm"> · {item.detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Payment */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-3 rounded-xl bg-white p-7 shadow-[0_1px_2px_rgba(42,36,28,0.06)] md:flex-row md:items-center md:gap-6 md:p-9">
              <h3 className="shrink-0 font-serif text-xl font-semibold text-forest">{t('payment')}</h3>
              <div>
                <p className="text-[14.5px] leading-[1.6] text-[#5A5142]">
                  {t('paymentText')}{" "}
                  <span className="font-semibold text-forest">{t('noCards')}</span>
                </p>
                <p className="mt-2 text-xs text-[#9A8C72]">
                  Check-in: {bookingInfo.allgemein.anreise}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
