import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/json-ld";
import { getAccommodationBySlug, accommodations, priceInfo } from "@/lib/mock-data";
import { getAccommodationSchema, getAccommodationFaqSchema, getAccommodationFaqItems } from "@/lib/schema";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { FAQ } from "@/components/sections/faq";
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
  ShowerHead,
  Sparkles,
  Train,
  Sun,
  Bath,
  Accessibility,
  Building,
  type LucideIcon
} from "lucide-react";
import type { Metadata } from "next";

// Icon Mapping
const iconMap: Record<string, LucideIcon> = {
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
  Shower: ShowerHead,
  Sparkles,
  Train,
  Users,
  Maximize,
  Sun,
  Bath,
  Accessibility,
  Building
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

  return {
    title: accommodation.title,
    description: `${accommodation.shortDescription} • ${accommodation.size} m² • ab ${accommodation.pricePerNight} € pro Nacht • Direkt am Ammersee`,
    keywords: `${accommodation.title}, Herrsching, Unterkunft Ammersee, ${accommodation.size}m², Urlaub Bayern`,
    alternates: {
      canonical: `https://www.sonnenhof-herrsching.de/unterkunft/${slug}`,
      languages: createHreflangLanguages(`/unterkunft/${slug}`),
    },
    openGraph: {
      title: `${accommodation.title} | Sonnenhof Herrsching`,
      description: `${accommodation.shortDescription} • ${accommodation.size} m² • ab ${accommodation.pricePerNight}€/Nacht`,
      url: `https://www.sonnenhof-herrsching.de/unterkunft/${slug}`,
      images: [accommodation.images[0].src],
      type: "website",
      locale: "de_DE",
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

  const isFeWo = accommodation.type === 'ferienwohnung';

  // Schema.org JSON-LD Markup — load from pre-built JSON files, fallback to dynamic
  const prebuiltSchema = getAccommodationSchema(slug);
  const schemaOrgData = prebuiltSchema ?? {
    "@context": "https://schema.org",
    "@type": isFeWo ? "Apartment" : "HotelRoom",
    "name": accommodation.title,
    "description": accommodation.shortDescription,
    "image": accommodation.images.map(i => i.src),
    "floorSize": {
      "@type": "QuantitativeValue",
      "value": accommodation.size,
      "unitCode": "MTK"
    },
    "occupancy": {
      "@type": "QuantitativeValue",
      "minValue": 1,
      "maxValue": accommodation.capacity.maxPersons
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

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Unterkünfte", path: "/wohnen" },
    { name: accommodation.title, path: `/unterkunft/${slug}` }
  ]);

  const faqSchema = getAccommodationFaqSchema(slug);
  const faqItems = getAccommodationFaqItems(slug);

  return (
    <>
      <JsonLd data={schemaOrgData} />
      <JsonLd data={breadcrumbSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <Navigation />
      <main className="pt-20 bg-stone">

        {/* Hero Image */}
        <section className="relative h-[55vh] md:h-[65vh]">
          <Image
            src={accommodation.images[0].src}
            alt={accommodation.images[0].alt}
            fill
            className="object-cover"
            priority
            quality={90}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(28,40,30,0.72)] via-[rgba(28,40,30,0.28)] to-[rgba(28,40,30,0.10)]" />

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
            <div className="max-w-[1180px] mx-auto">
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#EAD9B8] mb-4">
                {accommodation.floor} · {accommodation.size} m²
              </p>
              <h1 className="font-serif font-medium text-4xl md:text-[54px] leading-[1.1] md:leading-[1.05] text-[#FBF6EC] mb-4">
                {accommodation.title}
              </h1>
              <p className="text-[17px] leading-relaxed text-[#F0E9DA] max-w-[600px]">
                {accommodation.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="py-16 px-6">
          <div className="max-w-[1180px] mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
              {/* Left Column (2/3) */}
              <div className="lg:col-span-2 space-y-8">
                {/* Beschreibung */}
                <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-10">
                  <h2 className="font-serif font-semibold text-[27px] text-forest mb-6">
                    Beschreibung
                  </h2>
                  <div className="text-[15px] leading-[1.75] text-[#5A5142]">
                    {accommodation.description.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>

                  {/* Highlights */}
                  {accommodation.highlights && accommodation.highlights.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-sand">
                      <h3 className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-4">Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {accommodation.highlights.map((highlight, index) => (
                          <span
                            key={index}
                            className="bg-sand text-[#3C362B] rounded-full text-[12.5px] px-[13px] py-1.5"
                          >
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ausstattung */}
                <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-10">
                  <h2 className="font-serif font-semibold text-[27px] text-forest mb-6">
                    Ausstattung
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {accommodation.amenities.map((amenity, index) => {
                      const IconComponent = iconMap[amenity.icon];
                      return (
                        <div key={index} className="flex items-center gap-3">
                          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-sand flex items-center justify-center">
                            {IconComponent && (
                              <IconComponent className="w-5 h-5 text-forest" />
                            )}
                          </div>
                          <span className="text-[14.5px] text-[#5A5142]">{amenity.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bilder-Galerie */}
                <div>
                  <h2 className="font-serif font-semibold text-[27px] text-forest mb-6">
                    Impressionen
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    {accommodation.images.slice(1).map((image, index) => (
                      <div
                        key={index}
                        className="relative h-64 rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)]"
                      >
                        <Image
                          src={image.src}
                          alt={image.alt}
                          fill
                          className="object-cover"
                          quality={85}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column (1/3) - Sticky Booking Card */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 sticky top-24">
                  <div className="space-y-6">
                    {/* Preis */}
                    <div className="text-center pb-6 border-b border-sand">
                      <p className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-2">Hauptsaison</p>
                      <p className="font-serif font-medium text-[42px] leading-none text-forest">
                        {accommodation.pricePerNight} €
                      </p>
                      <p className="text-[13px] text-[#9A8C72] mt-2">pro Nacht (2 Pers.)</p>

                      {accommodation.pricePerNightLowSeason && (
                        <div className="mt-5">
                          <p className="text-[11px] uppercase tracking-[0.1em] text-wood-dark mb-1">Nebensaison</p>
                          <p className="font-serif text-[26px] text-forest">
                            {accommodation.pricePerNightLowSeason} €
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Details */}
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[14.5px] text-[#5A5142]">
                          <Users className="w-5 h-5 text-forest" />
                          <span>Max. Personen</span>
                        </div>
                        <span className="font-semibold text-forest">
                          {accommodation.capacity.maxPersons}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[14.5px] text-[#5A5142]">
                          <Maximize className="w-5 h-5 text-forest" />
                          <span>Größe</span>
                        </div>
                        <span className="font-semibold text-forest">
                          {accommodation.size} m²
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-[14.5px] text-[#5A5142]">
                          <Building className="w-5 h-5 text-forest" />
                          <span>Etage</span>
                        </div>
                        <span className="font-semibold text-forest">
                          {accommodation.floor}
                        </span>
                      </div>
                    </div>

                    {/* Zusatzkosten */}
                    <div className="text-xs text-[#9A8C72] space-y-1 pt-4 border-t border-sand">
                      <p>Zzgl. {priceInfo.kurtaxe.toFixed(2)} € Kurtaxe/Nacht/Erw.</p>
                      <p>Hunde: {priceInfo.hundePreis.toFixed(2)} €/Nacht</p>
                      {!isFeWo && <p>Mindestaufenthalt: {priceInfo.mindestaufenthaltZimmer} Nächte</p>}
                    </div>

                    {/* CTA Button */}
                    <Link
                      href={`/kontakt?unit=${accommodation.slug}`}
                      className="block w-full text-center bg-wood text-[#241B0F] hover:bg-[#D3AC6E] transition-colors rounded-md text-[15px] font-semibold px-6 py-4 mt-6"
                    >
                      Jetzt anfragen
                    </Link>

                    <p className="text-xs text-[#9A8C72] text-center">
                      Sie sprechen immer mit der Chefin persönlich
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <FAQ
            items={faqItems}
            heading={`Häufige Fragen ${isFeWo ? 'zur' : 'zum'} ${accommodation.title}`}
          />
        )}

        {/* CTA Section */}
        <section className="py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-medium text-3xl md:text-[38px] text-forest mb-4">
              Interesse geweckt?
            </h2>
            <p className="text-base leading-[1.7] text-[#5A5142] mb-8">
              Bitte fragen Sie an und fragen Sie nach. Bei uns reden Sie mit Menschen, nicht mit Computern.
            </p>
            <Link
              href={`/kontakt?unit=${accommodation.slug}`}
              className="inline-block bg-wood text-[#241B0F] hover:bg-[#D3AC6E] transition-colors rounded-md text-[15px] font-semibold px-9 py-4"
            >
              Jetzt persönlich anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
