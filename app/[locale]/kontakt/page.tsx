import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry-form";
import { Clock, CreditCard, Car, Wifi, Dog, Baby, Info } from "lucide-react";
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
  const isEn = locale === 'en';

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: isEn ? "Contact & Booking" : "Kontakt & Buchung", path: "/kontakt" }
  ]);

  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": isEn ? "Contact & Booking – Sonnenhof Herrsching" : "Kontakt & Buchung – Sonnenhof Herrsching",
    "description": isEn ? "Contact Sonnenhof Herrsching for booking enquiries. Guesthouse & holiday apartments on Lake Ammersee." : "Kontaktieren Sie den Sonnenhof Herrsching für Buchungsanfragen. Pension & Ferienwohnungen am Ammersee.",
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
        {/* Header */}
        <section className="px-6 md:px-16 pt-16 md:pt-20 pb-12 md:pb-[60px] max-w-[1340px] mx-auto text-center">
          <div className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-[18px]">
            {isEn ? 'Booking enquiry & contact' : 'Buchungsanfrage & Kontakt'}
          </div>
          <h1 className="font-serif font-medium text-4xl md:text-[54px] text-forest m-0 leading-[1.05] max-w-2xl mx-auto">
            {t('heroTitle')}
          </h1>
          <p className="text-[17px] text-[#5A5142] mt-5 mx-auto max-w-[560px] leading-[1.6]">
            {t('heroSubtitle')}
          </p>
        </section>

        {/* Form + Contact details */}
        <section className="px-6 md:px-16 pb-12 md:pb-[60px] max-w-[1340px] mx-auto grid lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-12 items-start">
          <InquiryForm />

          <div className="flex flex-col gap-[22px]">
            <div className="bg-forest text-[#EFE7D6] rounded-[14px] p-8 md:p-9">
              <div className="text-[11px] tracking-[0.22em] uppercase text-[#A8C0AE] mb-[18px]">{t('contactData')}</div>
              <div className="text-[15.5px] leading-[1.9]">
                <div className="text-[#FBF6EC] font-semibold">Sonnenhof Herrsching</div>
                Summerstraße 23<br />82211 Herrsching am Ammersee<br /><br />
                <a href="tel:+4981529679300" className="text-gold hover:text-[#F3D9A0] transition-colors">+49 8152 96793-0</a><br />
                <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="text-gold hover:text-[#F3D9A0] transition-colors break-all">sonnenhof@sonnenhof-herrsching.de</a>
              </div>
            </div>

            <div className="bg-white rounded-[14px] p-7 md:px-8 shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
              <div className="text-[11px] tracking-[0.22em] uppercase text-wood-dark mb-4">
                {isEn ? 'Good to know' : 'Gut zu wissen'}
              </div>
              <div className="flex flex-col gap-3.5 text-sm text-[#3C362B] leading-[1.55]">
                <div>
                  <strong className="text-forest">{isEn ? 'Arrival:' : 'Anreise:'}</strong>{' '}
                  {isEn ? 'daily 3–6 pm or by arrangement.' : 'täglich 15:00–18:00 Uhr oder nach Vereinbarung.'}
                </div>
                <div>
                  <strong className="text-forest">{isEn ? 'Rooms:' : 'Zimmer:'}</strong>{' '}
                  {isEn ? 'from 2 nights.' : 'ab 2 Nächten.'}{' '}
                  <strong className="text-forest">{isEn ? 'Apartments:' : 'Wohnungen:'}</strong>{' '}
                  {isEn ? 'by the week, with deposit.' : 'wochenweise, mit Anzahlung.'}
                </div>
                <div>
                  <strong className="text-forest">{isEn ? 'Payment:' : 'Bezahlung:'}</strong>{' '}
                  {isEn ? 'bank transfer in advance or cash — no debit/credit cards.' : 'Vorabüberweisung oder bar — keine EC-/Kreditkarten.'}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Anfahrt & Stornierung */}
        <section className="px-6 md:px-16 pb-12 md:pb-16 max-w-[1340px] mx-auto">
          <div className="bg-sand rounded-[14px] p-8 md:py-[46px] md:px-[52px] grid md:grid-cols-3 gap-8 md:gap-10">
            <div>
              <div className="font-serif text-xl text-forest mb-2">{isEn ? 'By car' : 'Mit dem Auto'}</div>
              <p className="text-[14.5px] text-[#5A5142] leading-[1.65] m-0">
                {isEn
                  ? 'A96 Munich–Lindau, exit Inning am Ammersee, then approx. 8 km to Herrsching. Free parking on site.'
                  : 'A96 München–Lindau, Ausfahrt Inning am Ammersee, dann ca. 8 km nach Herrsching. Kostenloser Parkplatz auf dem Hof.'}
              </p>
            </div>
            <div>
              <div className="font-serif text-xl text-forest mb-2">{isEn ? 'By S-Bahn' : 'Mit der S-Bahn'}</div>
              <p className="text-[14.5px] text-[#5A5142] leading-[1.65] m-0">
                {isEn
                  ? 'S8 from Munich main station to Herrsching (terminus), approx. 45 min to Marienplatz. We are a 10-minute walk from the station.'
                  : 'S8 ab München Hbf bis Herrsching (Endstation), ca. 45 Min. zum Marienplatz. Wir sind 10 Gehminuten vom Bahnhof entfernt.'}
              </p>
            </div>
            <div>
              <div className="font-serif text-xl text-forest mb-2">{isEn ? 'Cancellation' : 'Stornierung'}</div>
              <p className="text-[14.5px] text-[#5A5142] leading-[1.65] m-0">
                {isEn
                  ? 'Free cancellation is not possible — we recommend private travel cancellation insurance. We do our best to find replacement bookings.'
                  : 'Eine kostenlose Stornierung ist nicht möglich — wir empfehlen eine private Reiserücktrittsversicherung. Wir bemühen uns um Ersatzbuchungen.'}
              </p>
            </div>
          </div>
        </section>

        {/* Google Maps */}
        <section className="px-6 md:px-16 pb-16 max-w-[1340px] mx-auto">
          <div className="aspect-[4/3] md:aspect-[21/9] w-full bg-sand rounded-[14px] shadow-[0_1px_2px_rgba(42,36,28,0.06)] overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.4!2d11.1714392!3d47.9928147!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479c32ca3f983335%3A0xe66916fd70e9471e!2sSonnenhof%20Herrsching!5e0!3m2!1sde!2sde"
              width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Google Maps - Sonnenhof Herrsching, Summerstraße 23"
            />
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
                <p className="text-[#5A5142] mb-4"><strong className="text-forest">{isEn ? 'Arrival:' : 'Anreise:'}</strong> {t('arrivalText')}</p>
                <p className="text-[#5A5142] mb-4"><strong className="text-forest">{isEn ? 'Enquiries:' : 'Anfragen:'}</strong> {t('inquiriesText')}</p>
                <p className="text-[#5A5142]">
                  <strong className="text-forest">{isEn ? 'Rooms:' : 'Zimmer:'}</strong> {t('roomsMinStay')}<br />
                  <strong className="text-forest">{isEn ? 'Apartments:' : 'Ferienwohnungen:'}</strong> {t('apartmentsBooking')}
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
                  <li>• <strong>{isEn ? "Visitor's tax:" : 'Kurtaxe:'}</strong> 2,00 € {isEn ? 'per night per adult' : 'pro Nacht und Erwachsenem'}</li>
                  <li>• <strong>{isEn ? 'Dogs:' : 'Hunde:'}</strong> 10,00 € {isEn ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{isEn ? 'Additional person:' : 'Zusätzliche Person:'}</strong> 23,00 € {isEn ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{isEn ? 'Child up to 10 years:' : 'Kind bis 10 Jahre:'}</strong> 15,00 € {isEn ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{isEn ? 'Child over 10 years:' : 'Kind ab 10 Jahre:'}</strong> 20,00 € {isEn ? 'per night' : 'pro Nacht'}</li>
                  <li>• <strong>{isEn ? 'Children up to 3 years:' : 'Kinder bis 3 Jahre:'}</strong> {isEn ? 'free' : 'frei'}</li>
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
      </main>
      <Footer />
    </>
  );
}
