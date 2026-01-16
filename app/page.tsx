import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Hero } from "@/components/sections/hero";
import { Intro } from "@/components/sections/intro";
import { USP } from "@/components/sections/usp";
import { Accommodations } from "@/components/sections/accommodations";
import { Testimonials } from "@/components/sections/testimonials";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferienwohnungen & Zimmer am Ammersee",
  description: "Familärer Urlaub in Herrsching am Ammersee. Entdecken Sie unsere gemütlichen Ferienwohnungen und Gästezimmer – persönlich, naturverbunden und nur 5 Minuten vom See.",
  keywords: "Ferienwohnung Herrsching, Gästezimmer Ammersee, Urlaub Herrsching, Übernachtung Ammersee, familär, Bayern",
  openGraph: {
    title: "Ferienwohnungen & Zimmer am Ammersee | Sonnenhof Herrsching",
    description: "Familärer Urlaub in Herrsching am Ammersee. Gemütliche Ferienwohnungen und Gästezimmer.",
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
      "https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1920&q=80",
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=80"
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Musterstraße 123",
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
    "email": "info@sonnenhof-herrsching.de",
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
        <Hero />
        <Accommodations />
        <Intro />
        <USP />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
