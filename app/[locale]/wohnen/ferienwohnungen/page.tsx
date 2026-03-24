import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { Home, Users, Wifi, Car, Dog, Utensils, ArrowRight } from "lucide-react";
import { getFerienwohnungen } from "@/lib/mock-data";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { ferienwohnungenSchemas, extractFaqItems } from "@/lib/schema";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'FerienwohnungenPage' });

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/accommodation/apartments'
    : 'https://www.sonnenhof-herrsching.de/wohnen/ferienwohnungen';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: createHreflangLanguages('/wohnen/ferienwohnungen'),
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

export default async function FerienwohnungenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'FerienwohnungenPage' });
  const tFaq = await getTranslations({ locale, namespace: 'FAQ' });
  const ferienwohnungen = getFerienwohnungen();

  const ausstattungLabels = [
    { icon: Home, key: 'livingSpace' as const },
    { icon: Users, key: 'maxPersons' as const },
    { icon: Utensils, key: 'equippedKitchen' as const },
    { icon: Wifi, key: 'freeWifi' as const },
    { icon: Car, key: 'freeParkingOnSite' as const },
    { icon: Dog, key: 'dogsWelcome' as const },
  ];

  const ausstattung = ausstattungLabels.map(item => ({
    icon: item.icon,
    label: item.key === 'maxPersons'
      ? (locale === 'en' ? '2-5 guests' : '2-5 Personen')
      : item.key === 'equippedKitchen'
        ? (locale === 'en' ? 'Equipped kitchen' : 'Ausgestattete Küche')
        : item.key === 'livingSpace'
          ? '27-55 m²'
          : t(item.key),
  }));

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "Accommodation" : "Unterkünfte", path: "/wohnen" },
    { name: locale === 'en' ? "Apartments" : "Ferienwohnungen", path: "/wohnen/ferienwohnungen" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {ferienwohnungenSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest/40" />
          </div>

          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              {t('heroSubtitle')}
            </p>
            <p className="text-lg text-white/90 mb-8">
              {t('highSeason')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/kontakt">{t('checkAvailability')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* All apartments */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              {t('apartmentsAndPrices')}
            </h2>
            <p className="text-center text-text-primary/70 mb-4 max-w-2xl mx-auto">
              {t('priceNote')}
            </p>
            <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
              {t('towelsIncluded')}
            </p>

            <div className="space-y-12">
              {ferienwohnungen.map((fewo) => (
                <Card key={fewo.id} className="bg-stone border-none p-6 rounded-xl overflow-hidden">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-serif text-3xl text-forest">{fewo.title}</h3>
                    <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full">
                      {fewo.floor}
                    </span>
                    <span className="text-sm bg-wood/10 text-wood px-3 py-1 rounded-full">
                      {fewo.size} m²
                    </span>
                  </div>

                  {fewo.images && fewo.images.length > 0 && (
                    <div className="mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {fewo.images.slice(0, 4).map((image, index) => (
                          <div key={index} className="relative h-40 rounded-lg overflow-hidden group">
                            <Image
                              src={image.src}
                              alt={image.alt}
                              fill
                              className="object-cover transition-transform duration-300 group-hover:scale-110"
                              sizes="(max-width: 768px) 50vw, 25vw"
                            />
                          </div>
                        ))}
                      </div>
                      {fewo.images.length > 4 && (
                        <p className="text-sm text-text-primary/60 mt-2 text-center">
                          {t('morePhotos', { count: fewo.images.length - 4 })}
                        </p>
                      )}
                    </div>
                  )}

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <p className="text-forest font-medium mb-3">{fewo.shortDescription}</p>
                      <p className="text-text-primary/70 mb-3">
                        {t('maxPersons', { count: fewo.capacity.maxPersons })}
                        {fewo.capacity.children > 0 && ` ${t('inclChildren')}`}
                      </p>

                      {fewo.highlights && fewo.highlights.length > 0 && (
                        <div className="mb-4">
                          {fewo.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-text-primary/70 mb-1">
                              <span className="text-wood mt-0.5">✓</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      <Button asChild variant="outline" className="mt-4">
                        <a href={`/unterkunft/${fewo.slug}`}>
                          {t('moreDetailsPhotos')}
                        </a>
                      </Button>
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-text-primary/60">{t('highSeasonLabel')}</p>
                          <p className="text-2xl font-semibold text-forest">{fewo.pricePerNight},00 €</p>
                          <p className="text-xs text-text-primary/60">{t('perNight')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-primary/60">{t('lowSeasonLabel')}</p>
                          <p className="text-2xl font-semibold text-wood">{fewo.pricePerNightLowSeason},00 €</p>
                          <p className="text-xs text-text-primary/60">{t('perNight')}</p>
                        </div>
                      </div>

                      <Button asChild className="w-full bg-forest hover:bg-forest/90">
                        <Link href="/kontakt">{t('inquireNow')}</Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Additional costs */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-forest text-center mb-8">
              {t('additionalPersonsChildren')}
            </h2>
            <Card className="bg-white border-none p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <h3 className="font-semibold text-forest mb-3">{t('additionalPersons')}</h3>
                  <ul className="space-y-2">
                    <li>• {t('perAdditionalPerson', { price: '23,00 €' })}</li>
                    <li>• {t('childUnder10', { price: '15,00 €' })}</li>
                    <li>• {t('childOver10', { price: '20,00 €' })}</li>
                    <li>• {t('childrenFree')}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-forest mb-3">{t('miscellaneous')}</h3>
                  <ul className="space-y-2">
                    <li>• {t('dogs', { price: '10,00 €' })}</li>
                    <li>• {t('touristTax', { price: '2,00 €' })}</li>
                    <li>• <strong>{t('towelsIncl')}</strong></li>
                    <li>• <strong>{t('noCleaningFee')}</strong></li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Season times */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl">
              <h3 className="font-serif text-xl text-forest mb-4">{t('seasonBooking')}</h3>
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <p className="font-semibold text-forest mb-2">{t('highSeasonLabel')}:</p>
                  <p>{t('highSeasonPeriod')}</p>
                </div>
                <div>
                  <p className="font-semibold text-forest mb-2">{t('lowSeasonLabel')}:</p>
                  <p>{t('lowSeasonPeriod')}<br />{t('lowSeasonDiscount')}</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-forest/10">
                <p className="text-text-primary/80">
                  <strong className="text-forest">{locale === 'en' ? 'Booking:' : 'Buchung:'}</strong> {t('bookingNote')}
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              {t('equipmentDetails')}
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              {locale === 'en' ? (
                <>Prefer a <Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">{t('guestRoomLink')}</Link>? We also have 7 cosy rooms available from 1 night.</>
              ) : (
                <>Sie suchen lieber ein <Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">{t('guestRoomLink')}</Link>? Wir haben auch 7 gemütliche Zimmer ab 1 Nacht.</>
              )}
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {ausstattung.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="text-lg text-text-primary font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-white border-none p-8 rounded-2xl">
              <h3 className="font-serif text-2xl text-forest mb-4">{t('whatToExpect')}</h3>
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <h4 className="font-semibold text-forest mb-3">{t('livingArea')}</h4>
                  <ul className="space-y-2">
                    <li>• {t('livingRoom')}</li>
                    <li>• {t('balconyOrTerrace')}</li>
                    <li>• {t('freeWifi')}</li>
                    <li>• {t('naturalLight')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">{t('kitchen')}</h4>
                  <ul className="space-y-2">
                    <li>• {t('stoveFridge')}</li>
                    <li>• {t('coffeeMachineKettle')}</li>
                    <li>• {t('toasterInEvery')}</li>
                    <li>• {t('dishesUtensils')}</li>
                    <li>• {t('dishwasherMicrowave')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">{t('bedroom')}</h4>
                  <ul className="space-y-2">
                    <li>• {t('comfortableBeds')}</li>
                    <li>• {t('wardrobe')}</li>
                    <li>• {t('linenIncluded')}</li>
                    <li>• {t('cribPossible')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">{t('bathExtras')}</h4>
                  <ul className="space-y-2">
                    <li>• {t('showerOrBathtub')}</li>
                    <li>• {t('hairdryerInEvery')}</li>
                    <li>• {t('towelsIncluded2')}</li>
                    <li>• {t('freeParkingOnSite')}</li>
                    <li>• {t('dogsWelcome')}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Location */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              {t('perfectLocation')}
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              {t('locationSubtext')}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <h3 className="font-serif text-2xl text-forest mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  {t('onFoot')}
                </h3>
                <ul className="space-y-3 text-text-primary/80">
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">{t('fiveMin')}</span>
                    <span>{t('toBaker')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">{t('tenMin')}</span>
                    <span>{t('toSupermarket')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">{t('tenMin')}</span>
                    <span>{t('toStation')}</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-forest/5 border-forest/20 p-8 rounded-2xl">
                <h3 className="font-serif text-2xl text-forest mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  {t('bySBahn')}
                </h3>
                <ul className="space-y-3 text-text-primary/80">
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">{t('fortyFiveMin')}</span>
                    <span>{t('toMunich')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">{t('direct')}</span>
                    <span>{t('toAirport')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 text-sm">💡</span>
                    <span className="text-sm">{t('perfectForVisitors')}</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Day trips */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              {t('excursions')}
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              {t('excursionsSubtext')}
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white border-none p-6 rounded-xl">
                <h3 className="font-serif text-xl text-forest mb-4">{t('lakesSwimming')}</h3>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>Ammersee</strong> – {locale === 'en' ? 'right on the doorstep' : 'direkt vor der Tür'}</li>
                  <li>• <strong>Starnberger See</strong> – {locale === 'en' ? 'only 20 min' : 'nur 20 Min.'}</li>
                  <li>• {locale === 'en' ? 'Steamboat cruises on both lakes' : 'Dampferfahrten auf beiden Seen'}</li>
                  <li>• {locale === 'en' ? 'Bathing spots & beach life' : 'Badeplätze & Strandleben'}</li>
                </ul>
              </Card>

              <Card className="bg-white border-none p-6 rounded-xl">
                <h3 className="font-serif text-xl text-forest mb-4">{t('cultureCity')}</h3>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>München</strong> – 45 Min. {locale === 'en' ? 'by S8' : 'mit S8'}</li>
                  <li>• Marienplatz & {locale === 'en' ? 'Old Town' : 'Altstadt'}</li>
                  <li>• {locale === 'en' ? 'Museums & attractions' : 'Museen & Sehenswürdigkeiten'}</li>
                  <li>• {locale === 'en' ? 'Shopping & beer gardens' : 'Shopping & Biergärten'}</li>
                </ul>
              </Card>

              <Card className="bg-white border-none p-6 rounded-xl">
                <h3 className="font-serif text-xl text-forest mb-4">{t('mountainsCastles')}</h3>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>{locale === 'en' ? "King Ludwig's Castles" : 'Schlösser König Ludwig'}</strong> – 1 {locale === 'en' ? 'hr' : 'Std.'}</li>
                  <li>• <strong>Garmisch-Partenkirchen</strong> – 1 {locale === 'en' ? 'hr' : 'Std.'}</li>
                  <li>• <strong>Zugspitze</strong> – 1 {locale === 'en' ? 'hr' : 'Std.'}</li>
                  <li>• {locale === 'en' ? 'Hiking & mountain tours' : 'Wandern & Bergtouren'}</li>
                </ul>
              </Card>
            </div>

            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl text-center">
              <p className="text-text-primary/80">
                <span className="text-forest font-semibold">{locale === 'en' ? 'Tip:' : 'Tipp:'}</span> {t('tipAskUs')}
              </p>
            </Card>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              {t('impressions')}
            </h2>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image
                  src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                  alt={locale === 'en' ? 'Living area apartment' : 'Wohnbereich Ferienwohnung'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image
                  src="/images/ferienwohnungen/andechs/andechs-03-kueche.jpg"
                  alt={locale === 'en' ? 'Kitchen apartment' : 'Küche Ferienwohnung'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image
                  src="/images/ferienwohnungen/ammersee/ammersee-05-balkon.jpg"
                  alt={locale === 'en' ? 'Balcony with view' : 'Balkon mit Aussicht'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={extractFaqItems(ferienwohnungenSchemas[1])} heading={tFaq('defaultHeading')} />

        {/* SEO Text */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-6">
              {t('yourApartment')}
            </h2>
            <div className="text-text-primary/80 leading-relaxed space-y-4">
              {locale === 'en' ? (
                <>
                  <p>
                    A holiday apartment in Herrsching on Lake Ammersee is the ideal choice for
                    anyone who wants to experience Upper Bavaria in a relaxed and independent way. The
                    Sonnenhof is situated in a quiet location, just a few minutes&apos; walk from the lake and the
                    S-Bahn station. Whether a{" "}
                    <a href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      family holiday at Lake Ammersee
                    </a>, a hiking break or a
                    relaxing weekend for two – our five holiday apartments offer
                    the perfect home away from home for every occasion.
                  </p>
                  <p>
                    Herrsching combines rural tranquillity with excellent connections:
                    By S-Bahn S8 you can reach Munich in just 45 minutes. At the same time
                    you enjoy the peace of Bavaria&apos;s second-largest lake, hike to{" "}
                    <a href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Andechs Monastery
                    </a>{" "}
                    or explore the{" "}
                    <a href="/blog/ferienwohnung-fuenfseenland" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Five Lakes region by bike
                    </a>.
                    By the way: All our apartments are{" "}
                    <a href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      dog-friendly
                    </a>{" "}
                    – your four-legged friend is warmly welcome.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Eine Ferienwohnung in Herrsching am Ammersee ist die ideale Wahl für
                    alle, die Oberbayern entspannt und unabhängig erleben möchten. Der
                    Sonnenhof liegt in ruhiger Lage, nur wenige Gehminuten vom See und vom
                    S-Bahnhof entfernt. Ob{" "}
                    <a href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Familienurlaub am Ammersee
                    </a>, Wanderferien oder ein
                    entspanntes Wochenende zu zweit – unsere fünf Ferienwohnungen bieten
                    für jeden Anlass das passende Zuhause auf Zeit.
                  </p>
                  <p>
                    Herrsching verbindet ländliche Idylle mit hervorragender Anbindung:
                    Mit der S-Bahn S8 erreichen Sie München in nur 45 Minuten. Gleichzeitig
                    genießen Sie hier die Ruhe am zweitgrößten See Bayerns, wandern zum{" "}
                    <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Kloster Andechs
                    </Link>{" "}
                    oder erkunden das{" "}
                    <a href="/blog/ferienwohnung-fuenfseenland" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Fünfseenland per Rad
                    </a>.
                    Übrigens: Alle unsere Wohnungen sind{" "}
                    <a href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      hundefreundlich
                    </a>{" "}
                    – Ihr Vierbeiner ist bei uns herzlich willkommen.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              {t('matchingTips')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: locale === 'en' ? "Holiday with your Dog at Lake Ammersee" : "Urlaub mit Hund am Ammersee" },
                { href: "/blog/familienurlaub-ammersee", title: locale === 'en' ? "Family Holiday at Lake Ammersee" : "Familienurlaub am Ammersee" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: locale === 'en' ? "Alternative to Munich: Holiday Apartment at Lake Ammersee" : "Alternative zu München: Ferienwohnung am Ammersee" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <Card className="p-6 bg-stone border-none hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
                    <h3 className="font-serif text-lg text-forest group-hover:text-wood transition-colors mb-4">
                      {post.title}
                    </h3>
                    <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 text-sm transition-colors">
                      {locale === 'en' ? 'Read more' : 'Weiterlesen'} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              {t('readyForVacation')}
            </h2>
            <p className="text-lg text-text-primary/80 mb-4">
              {t('readyText')}
            </p>
            <p className="text-text-primary/60 mb-10">
              {t('weeklyBooking')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">{t('inquirePersonally')}</Link>
            </Button>

            <div className="mt-12 pt-12 border-t border-white/20">
              <p className="text-text-primary/60 mb-4">{t('orCallDirectly')}</p>
              <a
                href="tel:+4981529679300"
                className="text-2xl font-semibold text-forest hover:text-wood transition-colors"
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
