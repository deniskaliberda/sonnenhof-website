import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight, Baby, Car, Dog } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'WohnenPage' });

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/accommodation'
    : 'https://www.sonnenhof-herrsching.de/wohnen';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: createHreflangLanguages('/wohnen'),
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

export default async function WohnenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'WohnenPage' });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "Accommodation" : "Unterkünfte", path: "/wohnen" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="pt-20 bg-stone">
        {/* Hero */}
        <section className="relative h-[440px] md:h-[480px]">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching am Ammersee"
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[rgba(28,40,30,0.52)]" />
          </div>

          <div className="relative z-10 h-full max-w-[1340px] mx-auto px-6 md:px-16 flex flex-col justify-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#EAD9B8] mb-[18px]">
              {t('heroEyebrow')}
            </p>
            <h1 className="font-serif font-medium text-4xl md:text-[54px] leading-[1.1] md:leading-[1.05] text-[#FBF6EC] max-w-[820px]">
              {t('heroTitle')}
            </h1>
            <p className="text-[17px] leading-relaxed text-[#F0E9DA] mt-4 max-w-[600px]">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-20 md:py-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <div className="text-center mb-14">
              <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest mb-6">
                {t('ourAccommodations')}
              </h2>
              <p className="text-base leading-[1.7] text-[#5A5142] max-w-2xl mx-auto">
                {t('introText')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-7">
              {/* Apartments */}
              <article className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex flex-col">
                <Link href="/wohnen/ferienwohnungen" className="relative block h-72 md:h-80 overflow-hidden group">
                  <Image
                    src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                    alt={locale === 'en' ? 'Holiday apartment living area' : 'Ferienwohnung Wohnbereich'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>

                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="font-serif font-semibold text-[24px] md:text-[27px] text-forest mb-3">
                    {t('fiveApartments')}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#5A5142] mb-5">
                    {t('apartmentDescription')}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5">{t('livingSpace')}</span>
                    <span className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5">{t('equippedKitchen')}</span>
                    <span className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5">{t('balconyTerrace')}</span>
                  </div>

                  <div className="border-t border-sand pt-5 mt-auto">
                    <p className="text-[13px] text-[#9A8C72] mb-4">{t('fromPriceApartment')}</p>
                    <Link
                      href="/wohnen/ferienwohnungen"
                      className="inline-block bg-forest text-stone hover:bg-forest-deep transition-colors text-[13.5px] font-semibold px-5 py-2.5 rounded-md"
                    >
                      {t('discoverApartments')}
                    </Link>
                  </div>
                </div>
              </article>

              {/* Guest Rooms */}
              <article className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex flex-col">
                <Link href="/wohnen/zimmer" className="relative block h-72 md:h-80 overflow-hidden group">
                  <Image
                    src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg"
                    alt={locale === 'en' ? 'Guest room with balcony' : 'Gästezimmer mit Balkon'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </Link>

                <div className="p-8 md:p-10 flex flex-col flex-1">
                  <h3 className="font-serif font-semibold text-[24px] md:text-[27px] text-forest mb-3">
                    {t('sevenRooms')}
                  </h3>
                  <p className="text-[14.5px] leading-[1.65] text-[#5A5142] mb-5">
                    {t('roomDescription')}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    <span className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5">{t('ownBathroom')}</span>
                    <span className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5">{t('teaKitchen')}</span>
                    <span className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5">{t('someWithBalcony')}</span>
                  </div>

                  <div className="border-t border-sand pt-5 mt-auto">
                    <p className="text-[13px] text-[#9A8C72] mb-4">{t('fromPriceRoom')}</p>
                    <Link
                      href="/wohnen/zimmer"
                      className="inline-block bg-forest text-stone hover:bg-forest-deep transition-colors text-[13.5px] font-semibold px-5 py-2.5 rounded-md"
                    >
                      {t('viewRooms')}
                    </Link>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Which accommodation suits you? — dark panel */}
        <section className="pb-24 px-6">
          <div className="max-w-[1180px] mx-auto">
            <div className="bg-forest rounded-xl p-10 md:p-14">
              <h2 className="font-serif font-medium text-3xl md:text-[38px] text-[#FBF6EC] text-center mb-12">
                {t('whichFits')}
              </h2>

              <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
                <div>
                  <h3 className="font-serif font-semibold text-xl text-gold mb-3">{t('apartmentOrRoom')}</h3>
                  <p className="text-[14.5px] leading-[1.7] text-[#C9D5CB]">{t('apartmentOrRoomText')}</p>
                </div>

                <div>
                  <h3 className="font-serif font-semibold text-xl text-gold mb-3">{t('locationTitle')}</h3>
                  <p className="text-[14.5px] leading-[1.7] text-[#C9D5CB]">{t('locationText')}</p>
                </div>

                <div>
                  <h3 className="font-serif font-semibold text-xl text-gold mb-3">{t('familyTitle')}</h3>
                  <p className="text-[14.5px] leading-[1.7] text-[#C9D5CB]">{t('familyText')}</p>
                </div>

                <div>
                  <h3 className="font-serif font-semibold text-xl text-gold mb-3">{t('goodToKnowTitle')}</h3>
                  <p className="text-[14.5px] leading-[1.7] text-[#C9D5CB]">{t('goodToKnowText')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info strip */}
        <section className="pb-20 px-6">
          <div className="max-w-[1180px] mx-auto border-t border-[rgba(166,121,78,0.22)] pt-12">
            <div className="grid sm:grid-cols-3 gap-8 text-center">
              <div>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-sand flex items-center justify-center">
                  <Dog className="w-5 h-5 text-forest" />
                </div>
                <p className="font-serif font-semibold text-lg text-forest mb-1">{t('dogsWelcome')}</p>
                <p className="text-[13px] uppercase tracking-[0.1em] text-wood-dark">{t('perNight')}</p>
              </div>
              <div>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-sand flex items-center justify-center">
                  <Baby className="w-5 h-5 text-forest" />
                </div>
                <p className="font-serif font-semibold text-lg text-forest mb-1">{t('childrenWelcome')}</p>
                <p className="text-[13px] uppercase tracking-[0.1em] text-wood-dark">{t('upTo3Free')}</p>
              </div>
              <div>
                <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-sand flex items-center justify-center">
                  <Car className="w-5 h-5 text-forest" />
                </div>
                <p className="font-serif font-semibold text-lg text-forest mb-1">{t('parkingIncluded')}</p>
                <p className="text-[13px] uppercase tracking-[0.1em] text-wood-dark">{t('freeOnSite')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="pb-20 px-6">
          <div className="max-w-[1180px] mx-auto text-center">
            <h2 className="font-serif font-medium text-3xl md:text-[34px] text-forest mb-10">
              {t('stayTips')}
            </h2>
            <div className="grid md:grid-cols-3 gap-7">
              {[
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: locale === 'en' ? "Holiday with your Dog at Lake Ammersee" : "Urlaub mit Hund am Ammersee" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: locale === 'en' ? "Holiday Apartment near Munich" : "Ferienwohnung in Münchens Umgebung" },
                { href: "/blog/familienurlaub-ammersee", title: locale === 'en' ? "Family Holiday at Lake Ammersee" : "Familienurlaub am Ammersee" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] hover:shadow-[0_4px_14px_rgba(42,36,28,0.10)] transition-shadow p-7 h-full flex flex-col justify-between text-left">
                    <h3 className="font-serif font-semibold text-lg text-forest group-hover:text-wood-dark transition-colors mb-4">
                      {post.title}
                    </h3>
                    <span className="text-forest group-hover:text-wood-dark font-medium inline-flex items-center gap-2 text-sm transition-colors">
                      {t('readMore')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="pb-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-medium text-3xl md:text-[38px] text-forest mb-4">
              {t('speakToOwner')}
            </h2>
            <p className="text-base leading-[1.7] text-[#5A5142] mb-8">
              {t('speakToOwnerText')}
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-wood text-[#241B0F] hover:bg-[#D3AC6E] transition-colors rounded-md text-[15px] font-semibold px-9 py-4"
            >
              {t('inquirePersonally')}
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
