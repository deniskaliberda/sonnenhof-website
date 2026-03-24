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

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offersSchema} />
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 bg-forest text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              {t('heroTitle')}
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="py-12 px-6 bg-white">
          <div className="max-w-3xl mx-auto text-text-primary/80 leading-relaxed space-y-4">
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
                  <Link href="/kontakt" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
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
                  <Link href="/kontakt" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                    Kontaktformular
                  </Link>
                  . Bei Fragen zu Preisen, Verfügbarkeit oder besonderen Wünschen stehen wir Ihnen gerne persönlich
                  zur Verfügung.
                </p>
              </>
            )}
          </div>
        </section>

        {/* Apartments Price Table */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-8 text-center">
              {t('apartments')}
            </h2>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-forest text-white text-left">
                    <th className="px-6 py-4 font-medium">{t('apartment')}</th>
                    <th className="px-6 py-4 font-medium">{t('size')}</th>
                    <th className="px-6 py-4 font-medium">{t('persons')}</th>
                    <th className="px-6 py-4 font-medium">{t('highSeason')}</th>
                    <th className="px-6 py-4 font-medium">{t('lowSeason')}</th>
                    <th className="px-6 py-4 font-medium">{t('highlights')}</th>
                  </tr>
                </thead>
                <tbody>
                  {ferienwohnungen.map((fewo, i) => (
                    <tr key={fewo.id} className={i % 2 === 0 ? "bg-white" : "bg-stone/50"}>
                      <td className="px-6 py-4">
                        <a href={`/unterkunft/${fewo.slug}`} className="font-semibold text-forest hover:text-wood transition-colors">
                          {fewo.title}
                        </a>
                      </td>
                      <td className="px-6 py-4">{fewo.size} m²</td>
                      <td className="px-6 py-4">{t('max')} {fewo.capacity.maxPersons}</td>
                      <td className="px-6 py-4 font-semibold">{fewo.pricePerNight}€</td>
                      <td className="px-6 py-4 text-wood font-semibold">{fewo.pricePerNightLowSeason}€</td>
                      <td className="px-6 py-4 text-sm text-text-primary/70">{fewo.highlights.slice(0, 2).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {ferienwohnungen.map((fewo) => (
                <div key={fewo.id} className="bg-white rounded-2xl p-5 shadow-sm border border-forest/5">
                  <a href={`/unterkunft/${fewo.slug}`} className="font-serif text-xl text-forest hover:text-wood transition-colors block mb-3">
                    {fewo.title}
                  </a>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-text-primary/50">{t('size')}:</span> {fewo.size} m²</div>
                    <div><span className="text-text-primary/50">{t('persons')}:</span> {t('max')} {fewo.capacity.maxPersons}</div>
                    <div><span className="text-text-primary/50">{t('highSeason')}:</span> <span className="font-semibold">{fewo.pricePerNight}€</span></div>
                    <div><span className="text-text-primary/50">{t('lowSeason')}:</span> <span className="font-semibold text-wood">{fewo.pricePerNightLowSeason}€</span></div>
                  </div>
                  <p className="text-xs text-text-primary/60">{fewo.highlights.slice(0, 2).join(" · ")}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rooms Price Table */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-4 text-center">
              {t('guestRooms')}
            </h2>
            <p className="text-center text-text-primary/70 max-w-2xl mx-auto mb-8">
              {locale === 'en'
                ? 'Our guest rooms feature a private bathroom with shower and WC. On the first floor there is a kitchenette with coffee machine, kettle, toaster, microwave and fridge for self-catering. The minimum stay is two nights.'
                : 'Unsere Gästezimmer bieten Ihnen ein eigenes Bad mit Dusche und WC. Im ersten Stock steht eine Teeküche mit Kaffeemaschine, Wasserkocher, Toaster, Mikrowelle und Kühlschrank zur Selbstversorgung bereit. Der Mindestaufenthalt beträgt zwei Nächte.'}
            </p>

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-forest/10">
                <thead>
                  <tr className="bg-forest text-white text-left">
                    <th className="px-6 py-4 font-medium">{t('room')}</th>
                    <th className="px-6 py-4 font-medium">{t('size')}</th>
                    <th className="px-6 py-4 font-medium">{t('persons')}</th>
                    <th className="px-6 py-4 font-medium">{t('highSeason')}</th>
                    <th className="px-6 py-4 font-medium">{t('lowSeason')}</th>
                    <th className="px-6 py-4 font-medium">{t('highlights')}</th>
                  </tr>
                </thead>
                <tbody>
                  {zimmer.map((z, i) => (
                    <tr key={z.id} className={i % 2 === 0 ? "bg-white" : "bg-stone/50"}>
                      <td className="px-6 py-4">
                        <a href={`/unterkunft/${z.slug}`} className="font-semibold text-forest hover:text-wood transition-colors">
                          {z.title}
                        </a>
                      </td>
                      <td className="px-6 py-4">{z.size} m²</td>
                      <td className="px-6 py-4">{t('max')} {z.capacity.maxPersons}</td>
                      <td className="px-6 py-4 font-semibold">{z.pricePerNight}€</td>
                      <td className="px-6 py-4 text-wood font-semibold">{z.pricePerNightLowSeason}€</td>
                      <td className="px-6 py-4 text-sm text-text-primary/70">{z.highlights.slice(0, 2).join(", ")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="md:hidden space-y-4">
              {zimmer.map((z) => (
                <div key={z.id} className="bg-stone rounded-2xl p-5 shadow-sm border border-forest/5">
                  <a href={`/unterkunft/${z.slug}`} className="font-serif text-xl text-forest hover:text-wood transition-colors block mb-3">
                    {z.title}
                  </a>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div><span className="text-text-primary/50">{t('size')}:</span> {z.size} m²</div>
                    <div><span className="text-text-primary/50">{t('persons')}:</span> {t('max')} {z.capacity.maxPersons}</div>
                    <div><span className="text-text-primary/50">{t('highSeason')}:</span> <span className="font-semibold">{z.pricePerNight}€</span></div>
                    <div><span className="text-text-primary/50">{t('lowSeason')}:</span> <span className="font-semibold text-wood">{z.pricePerNightLowSeason}€</span></div>
                  </div>
                  <p className="text-xs text-text-primary/60">{z.highlights.slice(0, 2).join(" · ")}</p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-text-primary/50 mt-6">
              {locale === 'en'
                ? `Minimum stay: ${priceInfo.mindestaufenthaltZimmer} nights · Room cleaning every 3 days · Kitchenette on 1st floor`
                : `Mindestaufenthalt: ${priceInfo.mindestaufenthaltZimmer} Nächte · Zimmerreinigung jeden 3. Tag · Teeküche im 1. Stock`}
            </p>
          </div>
        </section>

        {/* Seasons & Additional Costs */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-4 text-center">
              {t('seasonAndCosts')}
            </h2>
            <p className="text-center text-text-primary/70 max-w-2xl mx-auto mb-10">
              {locale === 'en'
                ? "The visitor's tax is levied by the municipality of Herrsching and is payable on site. Dogs are warmly welcome at the Sonnenhof – our Golden Retriever Balu loves four-legged playmates. Children up to three years stay free of charge."
                : 'Die Kurtaxe wird von der Gemeinde Herrsching erhoben und ist vor Ort zu entrichten. Hunde sind im Sonnenhof herzlich willkommen – unser Golden Retriever Balu freut sich über vierbeinige Spielkameraden. Kinder bis drei Jahre übernachten bei uns kostenlos.'}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-forest mb-4">{t('seasonTimes')}</h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-forest mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">{t('highSeason')}</p>
                      <p className="text-text-primary/70">{bookingInfo.ferienwohnungen.hauptsaison}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-wood mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">
                        {t('lowSeason')} (–{priceInfo.nebensaisonRabatt}€{t('perNight')})
                      </p>
                      <p className="text-text-primary/70">
                        {locale === 'en' ? 'From' : 'Ab'} {priceInfo.nebensaisonAb},{" "}
                        {priceInfo.nebensaisonMonate.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-forest mb-4">{t('additionalCosts')}</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">{t('touristTax')}</dt>
                    <dd className="font-medium">{priceInfo.kurtaxe.toFixed(2)}€ {t('perNightPerAdult')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">{t('dogs')}</dt>
                    <dd className="font-medium">{priceInfo.hundePreis}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">{t('childrenUpTo', { age: priceInfo.kinderFrei })}</dt>
                    <dd className="font-medium text-forest">{t('free')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">{t('children3to10')}</dt>
                    <dd className="font-medium">{priceInfo.zusatzKindBis10}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">{t('childrenOver10')}</dt>
                    <dd className="font-medium">{priceInfo.zusatzKindAb10}€ {t('perNight')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">{t('additionalAdult')}</dt>
                    <dd className="font-medium">{priceInfo.zusatzPersonErwachsen}€ {t('perNight')}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Always Included */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-4 text-center">
              {t('alwaysIncluded')}
            </h2>
            <p className="text-center text-text-primary/70 max-w-2xl mx-auto mb-10">
              {t('alwaysIncludedText')}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: t('linenTowels'), detail: t('firstSetIncluded') },
                { label: t('freeWifi'), detail: t('inAllUnits') },
                { label: t('freeParking'), detail: t('parkingOnSite') },
                { label: t('noCleaning'), detail: t('noExtraFees') },
                { label: t('toasterHairdryer'), detail: t('inEveryApartment') },
                { label: t('teaKitchenRooms'), detail: t('teaKitchenDetails') },
              ].map((item) => (
                <div key={item.label} className="bg-stone rounded-xl p-5 text-center">
                  <p className="font-semibold text-forest mb-1">{item.label}</p>
                  <p className="text-sm text-text-primary/60">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="bg-forest/5 rounded-2xl p-6 max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-xl text-forest mb-3">{t('payment')}</h3>
              <p className="text-text-primary/70 text-sm">
                {t('paymentText')}{" "}
                {t('noCards')}
              </p>
              <p className="text-text-primary/50 text-xs mt-3">
                Check-in: {bookingInfo.allgemein.anreise}
              </p>
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
