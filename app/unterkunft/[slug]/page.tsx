import { notFound } from "next/navigation";
import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JsonLd } from "@/components/json-ld";
import { getAccommodationBySlug, accommodations } from "@/lib/mock-data";
import { 
  Users, 
  Maximize, 
  Wifi, 
  Tv, 
  Utensils, 
  Waves, 
  Car, 
  Home, 
  Wind, 
  Shirt, 
  Baby, 
  Dog, 
  Briefcase, 
  Coffee, 
  Shower, 
  Sparkles, 
  Train 
} from "lucide-react";
import type { Metadata } from "next";

// Icon Mapping
const iconMap: Record<string, any> = {
  Wifi, Tv, Utensils, Waves, Car, Home, Wind, Shirt, Baby, Dog,
  Briefcase, Coffee, Shower, Sparkles, Train, Users, Maximize
};

// Generate Static Params für alle Unterkünfte
export async function generateStaticParams() {
  return accommodations.map((acc) => ({
    slug: acc.slug,
  }));
}

// Generate Metadata für SEO
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}): Promise<Metadata> {
  const { slug } = await params;
  const accommodation = getAccommodationBySlug(slug);
  
  if (!accommodation) {
    return {
      title: "Unterkunft nicht gefunden",
    };
  }

  const typeLabel = accommodation.type === 'ferienwohnung' ? 'Ferienwohnung' : 'Gästezimmer';

  return {
    title: `${accommodation.title} | ${typeLabel} Herrsching`,
    description: `${accommodation.shortDescription} • ${accommodation.size} m² • ab ${accommodation.pricePerNight} € pro Nacht • Direkt am Ammersee`,
    keywords: `${accommodation.title}, ${typeLabel} Herrsching, Unterkunft Ammersee, ${accommodation.size}m², Urlaub Bayern`,
    openGraph: {
      title: `${accommodation.title} | ${typeLabel} Herrsching`,
      description: accommodation.shortDescription,
      images: [accommodation.images[0]],
      type: "website",
    },
  };
}

export default async function UnterkunftDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const accommodation = getAccommodationBySlug(slug);

  if (!accommodation) {
    notFound();
  }

  // Schema.org JSON-LD Markup
  const schemaOrgData = {
    "@context": "https://schema.org",
    "@type": accommodation.type === 'ferienwohnung' ? "Apartment" : "HotelRoom",
    "name": accommodation.title,
    "description": accommodation.shortDescription,
    "image": accommodation.images,
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": accommodation.size,
      "unitCode": "MTK"
    },
    "occupancy": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": accommodation.capacity.adults + accommodation.capacity.children
    },
    "amenityFeature": accommodation.amenities.map(amenity => ({
      "@type": "LocationFeatureSpecification",
      "name": amenity.label
    })),
    "offers": {
      "@type": "Offer",
      "price": accommodation.pricePerNight,
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock"
    }
  };

  return (
    <>
      <JsonLd data={schemaOrgData} />
      <Navigation />
      <main className="pt-20">

        {/* Hero Image */}
        <section className="relative h-[60vh] md:h-[70vh]">
          <img
            src={accommodation.images[0]}
            alt={accommodation.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          
          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 drop-shadow-lg">
                {accommodation.title}
              </h1>
              <p className="text-xl text-white/90 drop-shadow-md">
                {accommodation.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Left Column (2/3) */}
              <div className="lg:col-span-2 space-y-12">
                {/* Beschreibung */}
                <Card className="bg-white border-none shadow-lg p-8 rounded-2xl">
                  <h2 className="font-serif text-3xl text-forest mb-6">
                    Beschreibung
                  </h2>
                  <div className="prose prose-lg max-w-none text-text-primary/80">
                    {accommodation.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4 leading-relaxed">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>

                {/* Ausstattung */}
                <Card className="bg-white border-none shadow-lg p-8 rounded-2xl">
                  <h2 className="font-serif text-3xl text-forest mb-6">
                    Ausstattung
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {accommodation.amenities.map((amenity, index) => {
                      const IconComponent = iconMap[amenity.icon];
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-stone flex items-center justify-center">
                            {IconComponent && (
                              <IconComponent className="w-5 h-5 text-forest" />
                            )}
                          </div>
                          <span className="text-text-primary/80">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </Card>

                {/* Bilder-Galerie */}
                <div>
                  <h2 className="font-serif text-3xl text-forest mb-6">
                    Impressionen
                  </h2>
                  <div className="grid md:grid-cols-2 gap-4">
                    {accommodation.images.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                      >
                        <img
                          src={image}
                          alt={`${accommodation.title} - Bild ${index + 2}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (1/3) - Sticky Booking Card */}
              <div className="lg:col-span-1">
                <Card className="bg-white border-none shadow-2xl p-8 rounded-2xl sticky top-24">
                  <div className="space-y-6">
                    {/* Preis */}
                    <div className="text-center pb-6 border-b border-stone">
                      <p className="text-sm text-text-primary/60 mb-2">Preis pro Nacht</p>
                      <p className="font-serif text-4xl text-forest font-bold">
                        ab {accommodation.pricePerNight} €
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-text-primary/80">
                          <Users className="w-5 h-5 text-forest" />
                          <span>Kapazität</span>
                        </div>
                        <span className="font-semibold text-forest">
                          {accommodation.capacity.adults} {accommodation.capacity.adults === 1 ? 'Person' : 'Personen'}
                          {accommodation.capacity.children > 0 && ` + ${accommodation.capacity.children} Kinder`}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-text-primary/80">
                          <Maximize className="w-5 h-5 text-forest" />
                          <span>Größe</span>
                        </div>
                        <span className="font-semibold text-forest">
                          {accommodation.size} m²
                        </span>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <Button
                      asChild
                      className="w-full h-14 text-lg font-semibold bg-forest hover:bg-forest/90 mt-6"
                    >
                      <Link href={`/kontakt?unit=${accommodation.slug}`}>
                        Jetzt anfragen
                      </Link>
                    </Button>

                    <p className="text-xs text-text-primary/60 text-center">
                      Unverbindliche Anfrage – wir melden uns schnellstmöglich bei Ihnen
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Interesse geweckt?
            </h2>
            <p className="text-lg text-text-primary/80 mb-8">
              Senden Sie uns eine unverbindliche Anfrage und wir prüfen die Verfügbarkeit für Ihren Wunschzeitraum.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href={`/kontakt?unit=${accommodation.slug}`}>
                Verfügbarkeit anfragen
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
