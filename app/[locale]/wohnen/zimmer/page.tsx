import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Bed, Coffee, Wifi, Sparkles, Dog, Car, Check, X, ArrowRight } from "lucide-react";
import { getZimmer } from "@/lib/mock-data";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { zimmerSchemas, extractFaqItems } from "@/lib/schema";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { RoomImageGallery } from "@/components/sections/room-image-gallery";
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

  const ausstattung = [
    { icon: Bed, label: locale === 'en' ? 'Comfortable beds' : 'Komfortable Betten' },
    { icon: Coffee, label: t('teaKitchenTitle').includes('1st') ? 'Kitchenette for self-catering' : 'Teeküche zur Selbstversorgung' },
    { icon: Wifi, label: t('freeWifi') },
    { icon: Sparkles, label: t('cleaningEvery3Days') },
    { icon: Car, label: t('freeParking') },
    { icon: Dog, label: t('dogsWelcome') },
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
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer-2.jpg"
              alt={locale === 'en' ? 'Guest room Sonnenhof' : 'Gästezimmer Sonnenhof'}
              fill
              className="object-cover"
              priority
              quality={90}
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
              {t('minStay')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/kontakt">{t('inquireNow')}</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Room overview */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              {t('ourRooms')}
            </h2>
            <p className="text-center text-text-primary/70 mb-4 max-w-2xl mx-auto">
              {t('roomsNote')}
            </p>
            <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
              {t('longerStay')}{" "}
              <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                {t('ourApartments')}
              </Link>{" "}
              {t('weeklyBooking')}
            </p>

            <div className="space-y-12 mb-12">
              {zimmer.map((room) => {
                return (
                  <Card key={room.id} className="bg-stone border-none rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      <RoomImageGallery images={room.images} />

                      <div className="p-8">
                        <a href={`/unterkunft/${room.slug}`} className="hover:text-wood transition-colors">
                          <h3 className="font-serif text-3xl text-forest mb-3">{room.title}</h3>
                        </a>
                        <p className="text-text-primary/70 mb-4">{room.shortDescription}</p>

                        {/* Prices */}
                        <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-forest/10">
                          <div>
                            <p className="text-sm text-text-primary/60 mb-1">{t('highSeason')}</p>
                            <p className="text-3xl font-semibold text-forest">{room.pricePerNight}€</p>
                            <p className="text-xs text-text-primary/60">{t('perNight')}</p>
                          </div>
                          <div>
                            <p className="text-sm text-text-primary/60 mb-1">{t('lowSeason')}</p>
                            <p className="text-3xl font-semibold text-wood">{room.pricePerNightLowSeason}€</p>
                            <p className="text-xs text-text-primary/60">{t('perNight')}</p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Bed className="w-5 h-5 text-forest" />
                            <span className="text-sm text-text-primary/80">{room.size} m²</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {room.hasBalcony ? (
                              <>
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-text-primary/80">{t('withBalcony')}</span>
                              </>
                            ) : (
                              <>
                                <X className="w-5 h-5 text-text-primary/30" />
                                <span className="text-sm text-text-primary/50">{t('withoutBalcony')}</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-forest mb-3 text-sm">{t('equipment')}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {room.amenities.slice(0, 4).map((amenity, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-text-primary/70">
                                <Check className="w-4 h-4 text-wood flex-shrink-0" />
                                <span className="text-xs">{amenity.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-3">
                          <Button
                            asChild
                            className="w-full bg-forest hover:bg-forest/90"
                          >
                            <Link href="/kontakt">{t('inquire')}</Link>
                          </Button>
                          <Button
                            asChild
                            variant="outline"
                            className="w-full"
                          >
                            <a href={`/unterkunft/${room.slug}`}>
                              {t('moreDetails')}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl">
              <h3 className="font-serif text-xl text-forest mb-4">{t('seasonTimes')}</h3>
              <div className="grid md:grid-cols-2 gap-4 text-text-primary/80">
                <div>
                  <p className="font-semibold text-forest">{t('highSeason')}:</p>
                  <p>{t('highSeasonPeriod')}</p>
                </div>
                <div>
                  <p className="font-semibold text-forest">{t('lowSeason')}:</p>
                  <p>{t('lowSeasonPeriod')}</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Amenities */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              {t('equipmentService')}
            </h2>

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
                  <h4 className="font-semibold text-forest mb-3">{t('roomLabel')}</h4>
                  <ul className="space-y-2">
                    <li>• {t('doubleOrSingle')}</li>
                    <li>• {t('ownBathroom')}</li>
                    <li>• {t('freeWifi')}</li>
                    <li>• {t('someWithBalcony')}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">{t('service')}</h4>
                  <ul className="space-y-2">
                    <li>• {t('cleaningEvery3Days')}</li>
                    <li>• {t('linenTowels')}</li>
                    <li>• {t('freeParking')}</li>
                    <li>• {t('dogsWelcome')}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Tea Kitchen */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                {t('coffeeTeaTitle')}
              </h2>
              <p className="text-lg text-text-primary/80">
                {t('coffeeTeaSubtitle')}
              </p>
            </div>

            <Card className="bg-stone border-none p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-4">{t('teaKitchenTitle')}</h3>
                  <p className="text-text-primary/80 mb-6">
                    {t('teaKitchenText')}
                  </p>
                  <ul className="space-y-3 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('coffeeMachine')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('kettle')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('fridge')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('toaster')}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>{t('microwave')}</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 md:h-auto relative rounded-lg overflow-hidden">
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
            </Card>
          </div>
        </section>

        {/* Impressions */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              {t('impressions')}
            </h2>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg" alt={locale === 'en' ? 'Double room with balcony' : 'Doppelzimmer mit Balkon'} fill className="object-cover hover:scale-105 transition-transform duration-300" quality={80} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image src="/images/zimmer/doppelzimmer/dz-02-zimmer.jpg" alt={locale === 'en' ? 'Double room' : 'Doppelzimmer'} fill className="object-cover hover:scale-105 transition-transform duration-300" quality={80} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image src="/images/zimmer/doppelzimmer-balkon/dz-balkon-03-balkon.jpg" alt={locale === 'en' ? 'Balcony' : 'Balkon'} fill className="object-cover hover:scale-105 transition-transform duration-300" quality={80} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <Image src="/images/zimmer/einzelzimmer/ez-01-zimmer.jpg" alt={locale === 'en' ? 'Single room' : 'Einzelzimmer'} fill className="object-cover hover:scale-105 transition-transform duration-300" quality={80} sizes="(max-width: 768px) 50vw, 25vw" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ items={extractFaqItems(zimmerSchemas[1])} heading={tFaq('defaultHeading')} />

        {/* SEO Text */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-6">
              {t('pensionTitle')}
            </h2>
            <div className="text-text-primary/80 leading-relaxed space-y-4">
              {locale === 'en' ? (
                <>
                  <p>
                    The Sonnenhof offers cosy guest rooms in Herrsching on Lake Ammersee –
                    ideal for short stays, weekend trips or as a{" "}
                    <a href="/blog/ferienwohnung-muenchen-umgebung" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      budget-friendly alternative to a Munich hotel
                    </a>.
                    By S-Bahn S8, you can reach Marienplatz in 45 minutes.
                  </p>
                  <p>
                    Our rooms are also perfect for{" "}
                    <a href="/blog/guenstige-pension-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      a budget-friendly holiday at Lake Ammersee
                    </a>.
                    In the low season, you save 10€ per night.
                    Discover the{" "}
                    <a href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      day trips around Herrsching
                    </a>{" "}
                    – from Andechs Monastery to Starnberger See.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Der Sonnenhof bietet Ihnen gemütliche Gästezimmer in Herrsching am Ammersee –
                    ideal für Kurzaufenthalte, Wochenendtrips oder als{" "}
                    <a href="/blog/ferienwohnung-muenchen-umgebung" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      günstige Alternative zum Münchner Hotel
                    </a>.
                    Mit der S-Bahn S8 sind Sie in 45 Minuten am Marienplatz.
                  </p>
                  <p>
                    Unsere Zimmer eignen sich auch hervorragend für{" "}
                    <a href="/blog/guenstige-pension-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      einen günstigen Urlaub am Ammersee
                    </a>.
                    In der Nebensaison sparen Sie 10€ pro Nacht.
                    Entdecken Sie die{" "}
                    <a href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Ausflugsziele rund um Herrsching
                    </a>{" "}
                    – vom Kloster Andechs bis zum Starnberger See.
                  </p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              {t('matchingTips')}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/blog/guenstige-pension-ammersee", title: locale === 'en' ? "Budget-Friendly at Lake Ammersee" : "Günstig am Ammersee übernachten" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: locale === 'en' ? "Stay near Munich" : "Übernachten nahe München" },
                { href: "/blog/ausflugsziele-herrsching-ammersee", title: locale === 'en' ? "Day trips around Herrsching" : "Ausflugsziele rund um Herrsching" },
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

        {/* CTA */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              {t('inquireRooms')}
            </h2>
            <p className="text-lg text-text-primary/80 mb-4">
              {t('inquireText')}
            </p>
            <p className="text-text-primary/60 mb-10">
              {t('minStayNote')}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">{t('inquirePersonally')}</Link>
            </Button>

            <div className="mt-12 pt-12 border-t border-stone">
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
