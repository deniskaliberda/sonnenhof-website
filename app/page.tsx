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
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Sonnenhof Herrsching | Ferienwohnungen & Pension ab 85€ am Ammersee" },
  description: "Ferienwohnungen Herrsching am Ammersee: 5 Ferienwohnungen & 7 Gästezimmer im familiengeführten Sonnenhof. Seit 40 Jahren. Ab 85€/Nacht. Hunde willkommen.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de',
    languages: createHreflangLanguages('/'),
  },
  openGraph: {
    title: "Sonnenhof Herrsching | Ferienwohnungen & Pension ab 85€ am Ammersee",
    description: "Ferienwohnungen Herrsching am Ammersee: 5 Ferienwohnungen & 7 Gästezimmer im familiengeführten Sonnenhof. Seit 40 Jahren. Ab 85€/Nacht.",
    url: 'https://www.sonnenhof-herrsching.de',
    type: "website",
    locale: "de_DE",
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

export default function Home() {
  // Schema.org LodgingBusiness strukturierte Daten
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
      "latitude": 47.9994,
      "longitude": 11.1688
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

  // WebSite-Schema für Sitelinks
  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sonnenhof Herrsching",
    "url": "https://www.sonnenhof-herrsching.de",
  };

  // BreadcrumbList für Homepage
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
        {/* 1. Hero + Trust signals */}
        <Hero />
        <TrustBadge />
        
        {/* 2. Product first - user sees what they can buy */}
        <Accommodations />
        
        {/* 3. Social proof */}
        <Testimonials />

        {/* 4. Blog highlights */}
        <BlogHighlights />

        {/* 5. Primary CTA */}
        <CTA />

        {/* 5. FAQ */}
        <FAQ items={extractFaqItems(homepageFaqSchema)} />

        {/* 6. Philosophy/Mission moved to bottom (before footer) */}
        <Intro />
        <USP />
      </main>
      <Footer />
    </>
  );
}
