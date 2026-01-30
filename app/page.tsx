import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { TrustBadge } from "@/components/sections/trust-badge";
import { Intro } from "@/components/sections/intro";
import { USP } from "@/components/sections/usp";
import { Accommodations } from "@/components/sections/accommodations";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferienwohnungen & Zimmer in Herrsching am Ammersee | Sonnenhof",
  description: "5 Ferienwohnungen & 7 Zimmer direkt am Ammersee. Ab 85€/Nacht. Familiengeführt seit 40 Jahren. Hunde willkommen. Nur 5 Min. zum See.",
  keywords: "Ferienwohnung Herrsching, Gästezimmer Ammersee, Urlaub Herrsching, Übernachtung Ammersee, Sonnenhof, Bayern",
  openGraph: {
    title: "Ferienwohnungen & Zimmer in Herrsching am Ammersee | Sonnenhof",
    description: "5 Ferienwohnungen & 7 Zimmer direkt am Ammersee. Familiengeführt seit 40 Jahren. Ab 85€/Nacht.",
    type: "website",
    locale: "de_DE",
  },
};

export default function Home() {
  // Schema.org LodgingBusiness strukturierte Daten
  const lodgingBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "name": "Sonnenhof Herrsching",
    "description": "Familiengeführte Ferienwohnungen und Gästezimmer in Herrsching am Ammersee",
    "image": [
      "https://www.sonnenhof-herrsching.de/images/hero/hero-sonnenhof.jpg",
      "https://www.sonnenhof-herrsching.de/images/hero/hero-ammersee.jpg"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Summerstraße 23",
      "addressLocality": "Herrsching am Ammersee",
      "postalCode": "82211",
      "addressCountry": "DE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 47.9994,
      "longitude": 11.1688
    },
    "telephone": "+49-8152-123456",
    "email": "sonnenhof@sonnenhof-herrsching.de",
    "priceRange": "€€",
    "starRating": {
      "@type": "Rating",
      "ratingValue": "4.8"
    },
    "amenityFeature": [
      {
        "@type": "LocationFeatureSpecification",
        "name": "Kostenloses WLAN"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Kostenlose Parkplätze"
      },
      {
        "@type": "LocationFeatureSpecification",
        "name": "Familienbetrieb"
      }
    ],
    "url": "https://www.sonnenhof-herrsching.de"
  };

  return (
    <>
      <JsonLd data={lodgingBusinessSchema} />
      <Navigation />
      <main>
        {/* 1. Hero + Trust signals */}
        <Hero />
        <TrustBadge />
        
        {/* 2. Product first - user sees what they can buy */}
        <Accommodations />
        
        {/* 3. Social proof */}
        <Testimonials />
        
        {/* 4. Primary CTA */}
        <CTA />
        
        {/* 5. Philosophy/Mission moved to bottom (before footer) */}
        <Intro />
        <USP />
      </main>
      <Footer />
    </>
  );
}
