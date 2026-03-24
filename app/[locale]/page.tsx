import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { TrustBadge } from "@/components/sections/trust-badge";
import { Intro } from "@/components/sections/intro";
import { USP } from "@/components/sections/usp";
import { Accommodations } from "@/components/sections/accommodations";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { BlogHighlights } from "@/components/sections/blog-highlights";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { homepageLodgingAdditions, homepageFaqSchema, extractFaqItems } from "@/lib/schema";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from "next";
import { StickyCTA } from "@/components/sections/sticky-cta";
import { CookieConsent } from "@/components/cookie-consent";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return {
    title: { absolute: t('metaTitle') },
    description: t('metaDescription'),
    alternates: {
      canonical: 'https://www.sonnenhof-herrsching.de',
      languages: createHreflangLanguages('/'),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: 'https://www.sonnenhof-herrsching.de',
      type: "website",
      locale: locale === 'en' ? 'en_US' : 'de_DE',
      images: [
        {
          url: '/images/hero/hero-sonnenhof.jpg',
          width: 1200,
          height: 630,
          alt: 'Sonnenhof Herrsching am Ammersee',
        },
      ],
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const lodgingBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": homepageLodgingAdditions["@id"],
    "name": "Sonnenhof Herrsching",
    "alternateName": "Pension Sonnenhof Herrsching am Ammersee",
    "description": "Pension am Ammersee: Familiengeführte Ferienwohnungen und Gästezimmer in Herrsching am Ammersee",
    "image": [
      "https://www.sonnenhof-herrsching.de/images/hero/hero-sonnenhof.jpg",
      "https://www.sonnenhof-herrsching.de/images/hero/hero-ammersee.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Summerstraße 23",
      "addressLocality": "Herrsching am Ammersee",
      "postalCode": "82211",
      "addressRegion": "Bayern",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.9928147,
      "longitude": 11.1714392
    },
    "telephone": "+49 8152 96793-0",
    "email": "sonnenhof@sonnenhof-herrsching.de",
    "priceRange": "€€",
    "numberOfRooms": 12,
    "petsAllowed": true,
    "checkinTime": "15:00",
    "checkoutTime": "10:00",
    "paymentAccepted": "Bargeld, Überweisung",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "08:00",
        "closes": "20:00"
      }
    ],
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Kostenloses WLAN", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Kostenlose Parkplätze", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Haustiere erlaubt", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Familienbetrieb", "value": true }
    ],
    "url": "https://www.sonnenhof-herrsching.de",
    "sameAs": [
      "https://www.bayregio.de/gastgeber/Sonnenhof-Herrsching",
      "https://maps.app.goo.gl/rBfvHj5PxEFiowNL9"
    ],
    "aggregateRating": homepageLodgingAdditions["aggregateRating"]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sonnenhof Herrsching",
    "url": "https://www.sonnenhof-herrsching.de",
  };

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" }
  ]);

  return (
    <>
      <JsonLd data={lodgingBusinessSchema} />
      <JsonLd data={webSiteSchema} />
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={homepageFaqSchema} />
      <Navigation />
      <main>
        <Hero />
        <TrustBadge />
        <Accommodations />
        <Testimonials />
        <BlogHighlights />
        <CTA />
        <FAQ items={extractFaqItems(homepageFaqSchema)} />
        <Intro />
        <USP />
      </main>
      <Footer />
      <StickyCTA />
      <CookieConsent />
    </>
  );
}
