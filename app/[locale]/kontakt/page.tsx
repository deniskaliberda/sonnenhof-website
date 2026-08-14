import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import { InquiryForm } from "@/components/inquiry-form";
import { Phone, Mail, MapPin, Clock, CreditCard, Car, Wifi, Dog, Baby, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { getAccommodationBySlug } from "@/lib/mock-data";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ unit?: string }>;
};

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { locale } = await params;
  const sp = await searchParams;
  const t = await getTranslations({ locale, namespace: 'KontaktPage' });
  const unit = sp.unit;

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/contact'
    : 'https://www.sonnenhof-herrsching.de/kontakt';

  if (unit) {
    const accommodation = getAccommodationBySlug(unit);
    if (accommodation) {
      return {
        title: `${accommodation.title} ${locale === 'en' ? 'book' : 'buchen'}`,
        description: locale === 'en'
          ? `Book ${accommodation.title} on Lake Ammersee: ${accommodation.shortDescription} From ${accommodation.pricePerNight}€/night. Enquire now!`
          : `Buchen Sie ${accommodation.title} am Ammersee: ${accommodation.shortDescription} Ab ${accommodation.pricePerNight}€/Nacht. Jetzt anfragen!`,
        alternates: { canonical, languages: createHreflangLanguages('/kontakt') },
        openGraph: {
          title: `${accommodation.title} ${locale === 'en' ? 'book' : 'buchen'} | Sonnenhof`,
          description: `${accommodation.shortDescription} ${locale === 'en' ? 'From' : 'Ab'} ${accommodation.pricePerNight}€/${locale === 'en' ? 'night' : 'Nacht'}.`,
          url: canonical,
          type: 'website',
          locale: locale === 'en' ? 'en_US' : 'de_DE',
        },
      };
    }
  }

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: { canonical, languages: createHreflangLanguages('/kontakt') },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: canonical,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'de_DE',
    },
  };
}

export default async function KontaktPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'KontaktPage' });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "Contact & Booking" : "Kontakt & Buchung", path: "/kontakt" }
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": locale === 'en' ? "Contact & Booking – Sonnenhof Herrsching" : "Kontakt & Buchung – Sonnenhof Herrsching",
    "description": locale === 'en' ? "Contact Sonnenhof Herrsching for booking enquiries. Guesthouse & holiday apartments on Lake Ammersee." : "Kontaktieren Sie den Sonnenhof Herrsching für Buchungsanfragen. Pension & Ferienwohnungen am Ammersee.",
    "url": "https://www.sonnenhof-herrsching.de/kontakt",
    "mainEntity": {
      "@type": "LodgingBusiness",
      "name": "Sonnenhof Herrsching",
      "telephone": "+49 8152 96793-0",
      "email": "sonnenhof@sonnenhof-herrsching.de",
      "address": { "@type": "PostalAddress", "streetAddress": "Summerstraße 23", "addressLocality": "Herrsching am Ammersee", "postalCode": "82211", "addressRegion": "Bayern", "addressCountry": "DE" },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+49 8152 96793-0",
        "email": "sonnenhof@sonnenhof-herrsching.de",
        "contactType": "reservations",
        "availableLanguage": ["German", "English"],
        "hoursAvailable": { "@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "opens": "08:00", "closes": "20:00" }
      }
    }
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactPageSchema} />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero */}
        <section className="relative h-[40vh] min-h-[320px] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image src="/images/hero/hero-sonnenhof.jpg" alt="Sonnenhof Herrsching" fill className="object-cover" priority sizes="100vw" />
            <div className="absolute inset-0 bg-[rgba(28,40,30,0.52)]" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] text-[#FBF6EC] mb-4 leading-[1.05]">{t('heroTitle')}</h1>
            <p className="text-lg md:text-xl text-[#EFE7D6]/90">{t('heroSubtitle')}</p>
          </div>
        </section>

        {/* Info Cards */}
        <section className="py-12 px-6 bg-sand">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              <Card className="bg-white border-none p-4 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex items-center gap-3">
                <Dog className="w-8 h-8 text-wood-dark flex-shrink-0" />
                <div><p className="font-semibold text-forest">{t('dogsWelcome')}</p><p className="text-sm text-[#9A8C72]">{t('perNight')}</p></div>
              </Card>
              <Card className="bg-white border-none p-4 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex items-center gap-3">
                <Baby className="w-8 h-8 text-wood-dark flex-shrink-0" />
                <div><p className="font-semibold text-forest">{t('childrenWelcome')}</p><p className="text-sm text-[#9A8C72]">{t('upTo3Free')}</p></div>
              </Card>
              <Card className="bg-white border-none p-4 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex items-center gap-3">
                <Car className="w-8 h-8 text-wood-dark flex-shrink-0" />
                <div><p className="font-semibold text-forest">{t('parking')}</p><p className="text-sm text-[#9A8C72]">{t('freeOnSite')}</p></div>
              </Card>
              <Card className="bg-white border-none p-4 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex items-center gap-3">
                <Wifi className="w-8 h-8 text-wood-dark flex-shrink-0" />
                <div><p className="font-semibold text-forest">{t('wifi')}</p><p className="text-sm text-[#9A8C72]">{t('free')}</p></div>
              </Card>
            </div>
          </div>
        </section>

        {/* Form */}
        <section className="py-16 px-6">
          <InquiryForm />
        </section>

        {/* Booking Information */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-forest text-center mb-12">{t('bookingInfo')}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-stone border-none p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="w-6 h-6 text-wood-dark flex-shrink-0 mt-1" />
                  <h3 className="font-serif font-semibold text-xl text-forest">{t('arrivalTitle')}</h3>
                </div>
                <p className="text-[#5A5142] mb-4"><strong className="text-forest">{locale === 'en' ? 'Arrival:' : 'Anreise:'}</strong> {t('arrivalText')}</p>
                <p className="text-[#5A5142] mb-4"><strong className="text-forest">{locale === 'en' ? 'Enquiries:' : 'Anfragen:'}</strong> {t('inquiriesText')}</p>
                <p className="text-[#5A5142]">
                  <strong className="text-forest">{locale === 'en' ? 'Rooms:' : 'Zimmer:'}</strong> {t('roomsMinStay')}<br />
                  <strong className="text-forest">{locale === 'en' ? 'Apartments:' : 'Ferienwohnungen:'}</strong> {t('apartmentsBooking')}
                </p>
              </Card>

              <Card className="bg-sand border border-wood/40 p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <CreditCard className="w-6 h-6 text-wood-dark flex-shrink-0 mt-1" />
                  <h3 className="font-serif font-semibold text-xl text-forest">{t('paymentTitle')}</h3>
                </div>
                <p className="text-[#5A5142] mb-4">{t('paymentText')}</p>
                <p className="text-forest font-semibold mb-4 bg-white/70 p-3 rounded-lg border border-wood/50">{t('noCards')}</p>
                <p className="text-[#5A5142]">{t('depositRequired')}</p>
              </Card>

              <Card className="bg-stone border-none p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="w-6 h-6 text-wood-dark flex-shrink-0 mt-1" />
                  <h3 className="font-serif font-semibold text-xl text-forest">{t('additionalCosts')}</h3>
                </div>
                <ul className="space-y-2 text-[#5A5142]">
                  <li>• <strong>{locale === 'en' ? "Visitor's tax:" : 'Kurtaxe:'}</strong> 2,00 € {locale === 'en' ? 'per night per adult' : 'pro Nacht und Erwachsenem'}</li>
                  <li>• <strong>{locale === 'en' ? 'Dogs:' : 'Hunde:'}</strong> 10,00 € {locale === 'en' ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{locale === 'en' ? 'Additional person:' : 'Zusätzliche Person:'}</strong> 23,00 € {locale === 'en' ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{locale === 'en' ? 'Child up to 10 years:' : 'Kind bis 10 Jahre:'}</strong> 15,00 € {locale === 'en' ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{locale === 'en' ? 'Child over 10 years:' : 'Kind ab 10 Jahre:'}</strong> 20,00 € {locale === 'en' ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{locale === 'en' ? 'Children up to 3 years:' : 'Kinder bis 3 Jahre:'}</strong> {locale === 'en' ? 'free' : 'frei'}</li>
                </ul>
              </Card>

              <Card className="bg-stone border-none p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="w-6 h-6 text-wood-dark flex-shrink-0 mt-1" />
                  <h3 className="font-serif font-semibold text-xl text-forest">{t('cancellation')}</h3>
                </div>
                <p className="text-[#5A5142] mb-4">{t('cancellationText1')}</p>
                <p className="text-[#5A5142] mb-4">{t('cancellationText2')}</p>
                <p className="font-medium text-forest">{t('cancellationText3')}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Contact & Directions */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-forest text-center mb-12">{t('contactDirections')}</h2>
            <div className="grid lg:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="bg-forest rounded-[14px] p-8 md:p-9">
                  <h3 className="font-serif font-semibold text-2xl text-[#FBF6EC] mb-6">{t('contactData')}</h3>
                  <address className="not-italic space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[#FBF6EC] mb-1">{t('address')}</p>
                        <p className="text-lg text-[#C9D5CB]">Sonnenhof Herrsching<br />Summerstraße 23<br />82211 Herrsching am Ammersee<br />{locale === 'en' ? 'Germany' : 'Deutschland'}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[#FBF6EC] mb-1">{t('phone')}</p>
                        <a href="tel:+4981529679300" className="text-lg text-gold hover:text-[#F3D9A0] transition-colors">+49 (0) 8152 / 96793-0</a>
                        <p className="text-sm text-[#A8C0AE] mt-1">{t('speakToOwner')}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-[#FBF6EC] mb-1">{t('emailLabel')}</p>
                        <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="text-lg text-gold hover:text-[#F3D9A0] transition-colors break-all">sonnenhof@sonnenhof-herrsching.de</a>
                      </div>
                    </div>
                  </address>
                </div>

                <Card className="bg-white border-none p-6 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                  <h3 className="font-serif font-semibold text-xl text-forest mb-4">{t('personallyForYou')}</h3>
                  <p className="text-[#5A5142] mb-4">{t('personallyText')}</p>
                  <p className="text-sm text-[#9A8C72]">{t('weReplyQuickly')}</p>
                </Card>
              </div>

              <div>
                <h3 className="font-serif font-semibold text-2xl text-forest mb-6">{t('directions')}</h3>
                <div className="aspect-[4/3] w-full bg-sand rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] overflow-hidden">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.4!2d11.1714392!3d47.9928147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c32ca3f983335%3A0xe66916fd70e9471e!2sSonnenhof%20Herrsching!5e0!3m2!1sde!2sde"
                    width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps - Sonnenhof Herrsching, Summerstraße 23"
                  />
                </div>
                <div className="mt-6 bg-sand rounded-xl p-6 space-y-4 text-[#5A5142]">
                  <div>
                    <p className="font-serif font-semibold text-lg text-forest mb-2">{t('byCar')}</p>
                    <p className="text-sm leading-relaxed">{t('byCarText')}</p>
                  </div>
                  <div>
                    <p className="font-serif font-semibold text-lg text-forest mb-2">{t('bySBahn')}</p>
                    <p className="text-sm leading-relaxed mb-2">{t('bySBahnText')}</p>
                    <p className="text-sm text-wood-dark font-medium">{t('airportNote')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
