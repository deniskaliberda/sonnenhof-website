import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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

  // Preview spec: fixed card order + fixed card image per apartment
  const fewoOrder = [
    'ferienwohnung-ammersee',
    'ferienwohnung-herrsching',
    'ferienwohnung-utting',
    'ferienwohnung-andechs',
    'ferienwohnung-diessen',
  ];
  const cardImageBySlug: Record<string, string> = {
    'ferienwohnung-ammersee': '/images/ferienwohnungen/ammersee/ammersee-05-balkon.jpg',
    'ferienwohnung-herrsching': '/images/ferienwohnungen/herrsching/herrsching-07-kamin.jpg',
    'ferienwohnung-utting': '/images/ferienwohnungen/utting/utting-01-wohnbereich.jpg',
    'ferienwohnung-andechs': '/images/ferienwohnungen/andechs/andechs-01-wohnbereich.jpg',
    'ferienwohnung-diessen': '/images/ferienwohnungen/diessen/diessen-01-wohnbereich.jpg',
  };
  const ferienwohnungen = [...getFerienwohnungen()].sort(
    (a, b) => fewoOrder.indexOf(a.slug) - fewoOrder.indexOf(b.slug)
  );
  const floorLabel = (floor: string) => (floor === 'Erdgeschoss' ? 'EG' : floor);

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
      <main className="pt-20 bg-stone">
        {/* Hero */}
        <section className="relative h-[400px]">
          <div className="absolute inset-0">
            <Image
              src="/images/ferienwohnungen/diessen/diessen-08-terrasse.jpg"
              alt="Sonnige Terrasse der Ferienwohnung Dießen im Sonnenhof Herrsching"
              fill
              className="object-cover object-[center_55%]"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[rgba(28,40,30,0.52)]" />
          </div>

          <div className="relative z-10 h-full max-w-[1340px] mx-auto px-6 md:px-16 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#EAD9B8] mb-[18px]">
              {t('heroEyebrow')}
            </p>
            <h1 className="font-serif font-medium text-4xl md:text-[54px] leading-[1.1] md:leading-[1.05] text-[#FBF6EC] max-w-[760px]">
              {t('heroTitle')}
            </h1>
            <p className="text-[17px] leading-[1.6] text-[#F0E9DA] mt-[18px] max-w-[600px]">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Intro */}
        <section className="pt-16 md:pt-20 pb-[30px] px-6">
          <div className="max-w-[1180px] mx-auto text-center">
            <p className="text-base leading-[1.7] text-[#5A5142]">
              {t('priceNote')}
            </p>
          </div>
        </section>

        {/* FeWo list */}
        <section className="pt-[30px] pb-[90px] px-6">
          <div className="max-w-[1180px] mx-auto flex flex-col gap-7">
            {ferienwohnungen.map((fewo, index) => {
              const imageRight = index % 2 === 1;
              const cardSrc = cardImageBySlug[fewo.slug] ?? fewo.images[0]?.src;
              const cardImage = fewo.images.find((img) => img.src === cardSrc) ?? fewo.images[0];
              const photoCount = locale === 'en' ? fewo.images.length - 1 : fewo.images.length;
              return (
                <article
                  key={fewo.id}
                  className={`grid ${imageRight ? 'md:grid-cols-[1.05fr_0.95fr]' : 'md:grid-cols-[0.95fr_1.05fr]'} bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)]`}
                >
                  <a
                    href={`/unterkunft/${fewo.slug}`}
                    className={`relative block min-h-[260px] md:min-h-[300px] group ${imageRight ? 'md:order-2' : ''}`}
                  >
                    {cardImage && (
                      <Image
                        src={cardImage.src}
                        alt={cardImage.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        quality={85}
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    )}
                    <span className="absolute left-[18px] bottom-[18px] flex items-center gap-[7px] bg-[rgba(28,40,30,0.80)] text-[#F3EADA] text-[12.5px] font-semibold px-[15px] py-[9px] rounded-full">
                      ▣ {t('morePhotos', { count: photoCount })}
                    </span>
                  </a>

                  <div className={`p-8 md:px-[42px] md:py-[38px] flex flex-col justify-center ${imageRight ? 'md:order-1' : ''}`}>
                    <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-serif font-semibold text-[24px] md:text-[27px] text-forest">
                        {fewo.title}
                      </h3>
                      <span className="text-xs uppercase tracking-[0.1em] text-wood-dark">
                        {fewo.size} m² · {floorLabel(fewo.floor)} · {t('maxPersons', { count: fewo.capacity.maxPersons })}
                      </span>
                    </div>

                    <p className="text-[14.5px] leading-[1.65] text-[#5A5142] mt-3 mb-4">
                      {fewo.shortDescription}
                    </p>

                    {fewo.highlights && fewo.highlights.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-5">
                        {fewo.highlights.map((highlight, i) => (
                          <span
                            key={i}
                            className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex flex-wrap justify-between items-center gap-4 border-t border-sand pt-[18px] mt-auto">
                      <div>
                        <span className="font-serif text-[26px] text-forest">
                          {fewo.pricePerNight} €
                        </span>
                        <span className="text-[13px] text-[#9A8C72]">
                          {' '}/ {t('perNight')} · {t('lowSeasonLabel')} {fewo.pricePerNightLowSeason} €
                        </span>
                      </div>
                      <Link
                        href="/kontakt"
                        className="bg-forest text-stone hover:bg-forest-deep transition-colors text-[13.5px] font-semibold px-5 py-[11px] rounded-md"
                      >
                        {t('inquireNow')}
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* Season & booking — dark panel (preview) */}
        <section className="pb-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <div className="bg-forest rounded-[14px] p-8 md:px-[52px] md:py-[46px] grid md:grid-cols-2 gap-10">
              <div>
                <h3 className="font-serif text-2xl text-[#FBF6EC] mb-3.5">{t('seasonBooking')}</h3>
                <p className="text-[14.5px] leading-[1.7] text-[#C9D5CB]">{t('bookingNote')}</p>
              </div>
              <div>
                <h3 className="font-serif text-2xl text-[#FBF6EC] mb-3.5">{t('alwaysIncluded')}</h3>
                <div className="grid sm:grid-cols-2 gap-2.5 text-sm text-[#C9D5CB]">
                  <div>✓ {t('inclLinenTowels')}</div>
                  <div>✓ {t('inclToasterHairdryer')}</div>
                  <div>✓ {t('inclWifi')}</div>
                  <div>✓ {t('inclParking')}</div>
                  <div>✓ {t('inclNoCleaning')}</div>
                  <div>✓ {t('inclDogs')}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gold CTA (preview) */}
        <section className="pb-[100px] px-6 text-center">
          <Link
            href="/kontakt"
            className="inline-block bg-wood text-[#241B0F] hover:bg-[#D3AC6E] transition-colors rounded-md text-[15px] font-semibold px-9 py-4"
          >
            {t('ctaApartment')}
          </Link>
        </section>

        {/* Additional costs */}
        <section className="pb-16 px-6">
          <div className="max-w-[1180px] mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[34px] text-forest text-center mb-8">
              {t('additionalPersonsChildren')}
            </h2>
            <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif font-semibold text-xl text-forest mb-4">{t('additionalPersons')}</h3>
                  <ul className="space-y-2.5 text-[14.5px] leading-[1.65] text-[#5A5142]">
                    <li>{t('perAdditionalPerson', { price: '23,00 €' })}</li>
                    <li>{t('childUnder10', { price: '15,00 €' })}</li>
                    <li>{t('childOver10', { price: '20,00 €' })}</li>
                    <li>{t('childrenFree')}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-xl text-forest mb-4">{t('miscellaneous')}</h3>
                  <ul className="space-y-2.5 text-[14.5px] leading-[1.65] text-[#5A5142]">
                    <li>{t('dogs', { price: '10,00 €' })}</li>
                    <li>{t('touristTax', { price: '2,00 €' })}</li>
                    <li className="font-semibold text-[#3C362B]">{t('towelsIncl')}</li>
                    <li className="font-semibold text-[#3C362B]">{t('noCleaningFee')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Amenities */}
        <section className="pb-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest text-center mb-6">
              {t('equipmentDetails')}
            </h2>
            <p className="text-center text-base leading-[1.7] text-[#5A5142] mb-14 max-w-2xl mx-auto">
              {locale === 'en' ? (
                <>Prefer a <Link href="/wohnen/zimmer" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">{t('guestRoomLink')}</Link>? We also have 7 cosy rooms available from 1 night.</>
              ) : (
                <>Sie suchen lieber ein <Link href="/wohnen/zimmer" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">{t('guestRoomLink')}</Link>? Wir haben auch 7 gemütliche Zimmer ab 1 Nacht.</>
              )}
            </p>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6 mb-14">
              {ausstattung.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sand flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-forest" />
                  </div>
                  <p className="text-[15px] text-[#3C362B] font-medium">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-10">
              <h3 className="font-serif font-semibold text-2xl text-forest mb-8">{t('whatToExpect')}</h3>
              <div className="grid sm:grid-cols-2 gap-8">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-3">{t('livingArea')}</p>
                  <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                    <li>{t('livingRoom')}</li>
                    <li>{t('balconyOrTerrace')}</li>
                    <li>{t('freeWifi')}</li>
                    <li>{t('naturalLight')}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-3">{t('kitchen')}</p>
                  <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                    <li>{t('stoveFridge')}</li>
                    <li>{t('coffeeMachineKettle')}</li>
                    <li>{t('toasterInEvery')}</li>
                    <li>{t('dishesUtensils')}</li>
                    <li>{t('dishwasherMicrowave')}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-3">{t('bedroom')}</p>
                  <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                    <li>{t('comfortableBeds')}</li>
                    <li>{t('wardrobe')}</li>
                    <li>{t('linenIncluded')}</li>
                    <li>{t('cribPossible')}</li>
                  </ul>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-3">{t('bathExtras')}</p>
                  <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                    <li>{t('showerOrBathtub')}</li>
                    <li>{t('hairdryerInEvery')}</li>
                    <li>{t('towelsIncluded2')}</li>
                    <li>{t('freeParkingOnSite')}</li>
                    <li>{t('dogsWelcome')}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Location */}
        <section className="pb-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest text-center mb-6">
              {t('perfectLocation')}
            </h2>
            <p className="text-center text-base leading-[1.7] text-[#5A5142] mb-14 max-w-2xl mx-auto">
              {t('locationSubtext')}
            </p>

            <div className="grid md:grid-cols-2 gap-7">
              <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-10">
                <h3 className="font-serif font-semibold text-2xl text-forest mb-6">
                  {t('onFoot')}
                </h3>
                <ul className="space-y-3 text-[14.5px] leading-[1.65] text-[#5A5142]">
                  <li className="flex items-start gap-3">
                    <span className="text-wood-dark font-semibold min-w-[64px]">{t('fiveMin')}</span>
                    <span>{t('toBaker')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-wood-dark font-semibold min-w-[64px]">{t('tenMin')}</span>
                    <span>{t('toSupermarket')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-wood-dark font-semibold min-w-[64px]">{t('tenMin')}</span>
                    <span>{t('toStation')}</span>
                  </li>
                </ul>
              </div>

              <div className="bg-forest rounded-xl p-8 md:p-10">
                <h3 className="font-serif font-semibold text-2xl text-[#FBF6EC] mb-6">
                  {t('bySBahn')}
                </h3>
                <ul className="space-y-3 text-[14.5px] leading-[1.65] text-[#C9D5CB]">
                  <li className="flex items-start gap-3">
                    <span className="text-gold font-semibold min-w-[64px]">{t('fortyFiveMin')}</span>
                    <span>{t('toMunich')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-gold font-semibold min-w-[64px]">{t('direct')}</span>
                    <span>{t('toAirport')}</span>
                  </li>
                  <li className="pt-2 text-sm text-gold">
                    {t('perfectForVisitors')}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Day trips */}
        <section className="pb-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest text-center mb-6">
              {t('excursions')}
            </h2>
            <p className="text-center text-base leading-[1.7] text-[#5A5142] mb-14 max-w-2xl mx-auto">
              {t('excursionsSubtext')}
            </p>

            <div className="grid md:grid-cols-3 gap-7 mb-10">
              <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8">
                <h3 className="font-serif font-semibold text-xl text-forest mb-4">{t('lakesSwimming')}</h3>
                <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                  <li><strong className="text-[#3C362B]">Ammersee</strong> – {locale === 'en' ? 'right on the doorstep' : 'direkt vor der Tür'}</li>
                  <li><strong className="text-[#3C362B]">Starnberger See</strong> – {locale === 'en' ? 'only 20 min' : 'nur 20 Min.'}</li>
                  <li>{locale === 'en' ? 'Steamboat cruises on both lakes' : 'Dampferfahrten auf beiden Seen'}</li>
                  <li>{locale === 'en' ? 'Bathing spots & beach life' : 'Badeplätze & Strandleben'}</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8">
                <h3 className="font-serif font-semibold text-xl text-forest mb-4">{t('cultureCity')}</h3>
                <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                  <li><strong className="text-[#3C362B]">München</strong> – 45 Min. {locale === 'en' ? 'by S8' : 'mit S8'}</li>
                  <li>Marienplatz & {locale === 'en' ? 'Old Town' : 'Altstadt'}</li>
                  <li>{locale === 'en' ? 'Museums & attractions' : 'Museen & Sehenswürdigkeiten'}</li>
                  <li>{locale === 'en' ? 'Shopping & beer gardens' : 'Shopping & Biergärten'}</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8">
                <h3 className="font-serif font-semibold text-xl text-forest mb-4">{t('mountainsCastles')}</h3>
                <ul className="space-y-2 text-[14.5px] leading-[1.65] text-[#5A5142]">
                  <li><strong className="text-[#3C362B]">{locale === 'en' ? "King Ludwig's Castles" : 'Schlösser König Ludwig'}</strong> – 1 {locale === 'en' ? 'hr' : 'Std.'}</li>
                  <li><strong className="text-[#3C362B]">Garmisch-Partenkirchen</strong> – 1 {locale === 'en' ? 'hr' : 'Std.'}</li>
                  <li><strong className="text-[#3C362B]">Zugspitze</strong> – 1 {locale === 'en' ? 'hr' : 'Std.'}</li>
                  <li>{locale === 'en' ? 'Hiking & mountain tours' : 'Wandern & Bergtouren'}</li>
                </ul>
              </div>
            </div>

            <div className="bg-sand rounded-xl p-6 md:p-8 text-center">
              <p className="text-[14.5px] leading-[1.65] text-[#3C362B]">
                <span className="text-wood-dark font-semibold">{locale === 'en' ? 'Tip:' : 'Tipp:'}</span> {t('tipAskUs')}
              </p>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="pb-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest text-center mb-14">
              {t('impressions')}
            </h2>

            <div className="grid md:grid-cols-3 gap-5">
              <div className="h-64 relative rounded-xl overflow-hidden">
                <Image
                  src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                  alt={locale === 'en' ? 'Living area apartment' : 'Wohnbereich Ferienwohnung'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="h-64 relative rounded-xl overflow-hidden">
                <Image
                  src="/images/ferienwohnungen/andechs/andechs-03-kueche.jpg"
                  alt={locale === 'en' ? 'Kitchen apartment' : 'Küche Ferienwohnung'}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <div className="h-64 relative rounded-xl overflow-hidden">
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
        <section className="py-16 px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[34px] text-forest text-center mb-8">
              {t('yourApartment')}
            </h2>
            <div className="text-[15px] text-[#5A5142] leading-[1.75] space-y-4">
              {locale === 'en' ? (
                <>
                  <p>
                    A holiday apartment in Herrsching on Lake Ammersee is the ideal choice for
                    anyone who wants to experience Upper Bavaria in a relaxed and independent way. The
                    Sonnenhof is situated in a quiet location, just a few minutes&apos; walk from the lake and the
                    S-Bahn station. Whether a{" "}
                    <a href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
                      family holiday at Lake Ammersee
                    </a>, a hiking break or a
                    relaxing weekend for two – our five holiday apartments offer
                    the perfect home away from home for every occasion.
                  </p>
                  <p>
                    Herrsching combines rural tranquillity with excellent connections:
                    By S-Bahn S8 you can reach Munich in just 45 minutes. At the same time
                    you enjoy the peace of Bavaria&apos;s second-largest lake, hike to{" "}
                    <a href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
                      Andechs Monastery
                    </a>{" "}
                    or explore the{" "}
                    <a href="/blog/ferienwohnung-fuenfseenland" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
                      Five Lakes region by bike
                    </a>.
                    By the way: All our apartments are{" "}
                    <a href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
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
                    <a href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
                      Familienurlaub am Ammersee
                    </a>, Wanderferien oder ein
                    entspanntes Wochenende zu zweit – unsere fünf Ferienwohnungen bieten
                    für jeden Anlass das passende Zuhause auf Zeit.
                  </p>
                  <p>
                    Herrsching verbindet ländliche Idylle mit hervorragender Anbindung:
                    Mit der S-Bahn S8 erreichen Sie München in nur 45 Minuten. Gleichzeitig
                    genießen Sie hier die Ruhe am zweitgrößten See Bayerns, wandern zum{" "}
                    <Link href="/erleben" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
                      Kloster Andechs
                    </Link>{" "}
                    oder erkunden das{" "}
                    <a href="/blog/ferienwohnung-fuenfseenland" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
                      Fünfseenland per Rad
                    </a>.
                    Übrigens: Alle unsere Wohnungen sind{" "}
                    <a href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2">
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
        <section className="py-16 px-6">
          <div className="max-w-[1180px] mx-auto text-center">
            <h2 className="font-serif font-medium text-3xl md:text-[34px] text-forest mb-10">
              {t('matchingTips')}
            </h2>
            <div className="grid md:grid-cols-3 gap-7">
              {[
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: locale === 'en' ? "Holiday with your Dog at Lake Ammersee" : "Urlaub mit Hund am Ammersee" },
                { href: "/blog/familienurlaub-ammersee", title: locale === 'en' ? "Family Holiday at Lake Ammersee" : "Familienurlaub am Ammersee" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: locale === 'en' ? "Alternative to Munich: Holiday Apartment at Lake Ammersee" : "Alternative zu München: Ferienwohnung am Ammersee" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] hover:shadow-[0_4px_14px_rgba(42,36,28,0.10)] transition-shadow p-7 h-full flex flex-col justify-between text-left">
                    <h3 className="font-serif font-semibold text-lg text-forest group-hover:text-wood-dark transition-colors mb-4">
                      {post.title}
                    </h3>
                    <span className="text-forest group-hover:text-wood-dark font-medium inline-flex items-center gap-2 text-sm transition-colors">
                      {locale === 'en' ? 'Read more' : 'Weiterlesen'} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest mb-6">
              {t('readyForVacation')}
            </h2>
            <p className="text-base leading-[1.7] text-[#5A5142] mb-3">
              {t('readyText')}
            </p>
            <p className="text-[13px] uppercase tracking-[0.1em] text-[#9A8C72] mb-10">
              {t('weeklyBooking')}
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-wood text-[#241B0F] hover:bg-[#D3AC6E] transition-colors rounded-md text-[15px] font-semibold px-9 py-4"
            >
              {t('inquirePersonally')}
            </Link>

            <div className="mt-14 pt-10 border-t border-[rgba(166,121,78,0.22)]">
              <p className="text-[#9A8C72] mb-3">{t('orCallDirectly')}</p>
              <a
                href="tel:+4981529679300"
                className="font-serif text-2xl text-forest hover:text-wood-dark transition-colors"
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
