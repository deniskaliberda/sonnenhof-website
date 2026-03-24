import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
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
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center">
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
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/30 to-forest/60" />
          </div>

          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
              {t('heroTitle')}
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md">
              {t('heroSubtitle')}
            </p>
          </div>
        </section>

        {/* Overview */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                {t('ourAccommodations')}
              </h2>
              <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
                {t('introText')}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Apartments */}
              <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
                <div className="h-80 relative overflow-hidden">
                  <Image
                    src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                    alt={locale === 'en' ? 'Holiday apartment living area' : 'Ferienwohnung Wohnbereich'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    {t('fiveApartments')}
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    {t('apartmentDescription')}
                  </p>

                  <ul className="space-y-3 mb-6 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('livingSpace')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('equippedKitchen')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('balconyTerrace')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('fromPriceApartment')}</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-forest hover:bg-forest/90 text-lg py-6"
                  >
                    <Link href="/wohnen/ferienwohnungen">{t('discoverApartments')}</Link>
                  </Button>
                </div>
              </Card>

              {/* Guest Rooms */}
              <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
                <div className="h-80 relative overflow-hidden">
                  <Image
                    src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg"
                    alt={locale === 'en' ? 'Guest room with balcony' : 'Gästezimmer mit Balkon'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="p-8">
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    {t('sevenRooms')}
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    {t('roomDescription')}
                  </p>

                  <ul className="space-y-3 mb-6 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('ownBathroom')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('teaKitchen')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('someWithBalcony')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('fromPriceRoom')}</span>
                    </li>
                  </ul>

                  <Button
                    asChild
                    className="w-full bg-forest hover:bg-forest/90 text-lg py-6"
                  >
                    <Link href="/wohnen/zimmer">{t('viewRooms')}</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Which accommodation suits you? */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-12">
              {t('whichFits')}
            </h2>

            <div className="space-y-8 text-text-primary/80 leading-relaxed">
              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">{t('apartmentOrRoom')}</h3>
                <p>{t('apartmentOrRoomText')}</p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">{t('locationTitle')}</h3>
                <p>{t('locationText')}</p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">{t('familyTitle')}</h3>
                <p>{t('familyText')}</p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">{t('goodToKnowTitle')}</h3>
                <p>{t('goodToKnowText')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Info badges */}
        <section className="py-12 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl mb-2">🐕</p>
                <p className="font-semibold text-forest">{t('dogsWelcome')}</p>
                <p className="text-sm text-text-primary/70">{t('perNight')}</p>
              </div>
              <div>
                <p className="text-3xl mb-2">👶</p>
                <p className="font-semibold text-forest">{t('childrenWelcome')}</p>
                <p className="text-sm text-text-primary/70">{t('upTo3Free')}</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🚗</p>
                <p className="font-semibold text-forest">{t('parkingIncluded')}</p>
                <p className="text-sm text-text-primary/70">{t('freeOnSite')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              {t('stayTips')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: locale === 'en' ? "Holiday with your Dog at Lake Ammersee" : "Urlaub mit Hund am Ammersee" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: locale === 'en' ? "Holiday Apartment near Munich" : "Ferienwohnung in Münchens Umgebung" },
                { href: "/blog/familienurlaub-ammersee", title: locale === 'en' ? "Family Holiday at Lake Ammersee" : "Familienurlaub am Ammersee" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <Card className="p-6 bg-white border-none hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
                    <h3 className="font-serif text-lg text-forest group-hover:text-wood transition-colors mb-4">
                      {post.title}
                    </h3>
                    <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 text-sm transition-colors">
                      {t('readMore')} <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              {t('speakToOwner')}
            </h2>
            <p className="text-lg text-text-primary/80 mb-8">
              {t('speakToOwnerText')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">{t('inquirePersonally')}</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
