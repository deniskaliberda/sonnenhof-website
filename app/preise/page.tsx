import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { CTA } from "@/components/sections/cta";
import { JsonLd } from "@/components/json-ld";
import { getFerienwohnungen, getZimmer, priceInfo, bookingInfo } from "@/lib/mock-data";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Preise & Leistungen | Ferienwohnungen & Zimmer ab 75€",
  description:
    "Alle Preise im Überblick: 5 Ferienwohnungen (90–112€) & 7 Gästezimmer (75–117€) im Sonnenhof Herrsching am Ammersee. Nebensaison-Rabatt, Zusatzkosten & Buchungsinfos.",
  alternates: {
    canonical: "https://www.sonnenhof-herrsching.de/preise",
    languages: createHreflangLanguages("/preise"),
  },
  openGraph: {
    title: "Preise & Leistungen | Sonnenhof Herrsching am Ammersee",
    description:
      "Alle Preise im Überblick: 5 Ferienwohnungen & 7 Gästezimmer im familiengeführten Sonnenhof Herrsching. Ab 75€/Nacht.",
    url: "https://www.sonnenhof-herrsching.de/preise",
    type: "website",
    locale: "de_DE",
  },
};

export default function PreisePage() {
  const ferienwohnungen = getFerienwohnungen();
  const zimmer = getZimmer();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Preise & Leistungen", path: "/preise" },
  ]);

  // Schema.org Offer markup
  const offersSchema = {
    "@context": "https://schema.org",
    "@type": "LodgingBusiness",
    "@id": "https://www.sonnenhof-herrsching.de/#lodgingbusiness",
    name: "Sonnenhof Herrsching",
    url: "https://www.sonnenhof-herrsching.de/preise",
    makesOffer: [
      ...ferienwohnungen.map((fewo) => ({
        "@type": "Offer",
        name: fewo.title,
        description: fewo.shortDescription,
        url: `https://www.sonnenhof-herrsching.de/unterkunft/${fewo.slug}`,
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            price: fewo.pricePerNight,
            priceCurrency: "EUR",
            unitText: "Nacht",
            name: "Hauptsaison",
          },
          {
            "@type": "UnitPriceSpecification",
            price: fewo.pricePerNightLowSeason,
            priceCurrency: "EUR",
            unitText: "Nacht",
            name: "Nebensaison",
          },
        ],
      })),
      ...zimmer.map((z) => ({
        "@type": "Offer",
        name: z.title,
        description: z.shortDescription,
        url: `https://www.sonnenhof-herrsching.de/unterkunft/${z.slug}`,
        priceSpecification: [
          {
            "@type": "UnitPriceSpecification",
            price: z.pricePerNight,
            priceCurrency: "EUR",
            unitText: "Nacht",
            name: "Hauptsaison",
          },
          {
            "@type": "UnitPriceSpecification",
            price: z.pricePerNightLowSeason,
            priceCurrency: "EUR",
            unitText: "Nacht",
            name: "Nebensaison",
          },
        ],
      })),
    ],
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={offersSchema} />
      <Navigation />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 bg-forest text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl mb-4">
              Preise & Leistungen
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Transparent und fair – alle Preise pro Nacht im Überblick.
              Bettwäsche, Handtücher, WLAN und Parkplatz sind immer inklusive.
            </p>
          </div>
        </section>

        {/* Ferienwohnungen Preistabelle */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-8 text-center">
              Ferienwohnungen
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm">
                <thead>
                  <tr className="bg-forest text-white text-left">
                    <th className="px-6 py-4 font-medium">Wohnung</th>
                    <th className="px-6 py-4 font-medium">Größe</th>
                    <th className="px-6 py-4 font-medium">Personen</th>
                    <th className="px-6 py-4 font-medium">Hauptsaison</th>
                    <th className="px-6 py-4 font-medium">Nebensaison</th>
                    <th className="px-6 py-4 font-medium">Highlights</th>
                  </tr>
                </thead>
                <tbody>
                  {ferienwohnungen.map((fewo, i) => (
                    <tr
                      key={fewo.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-stone/50"}
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/unterkunft/${fewo.slug}`}
                          className="font-semibold text-forest hover:text-wood transition-colors"
                        >
                          {fewo.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">{fewo.size} m²</td>
                      <td className="px-6 py-4">
                        max. {fewo.capacity.maxPersons}
                      </td>
                      <td className="px-6 py-4 font-semibold">
                        {fewo.pricePerNight}€
                      </td>
                      <td className="px-6 py-4 text-wood font-semibold">
                        {fewo.pricePerNightLowSeason}€
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary/70">
                        {fewo.highlights.slice(0, 2).join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {ferienwohnungen.map((fewo) => (
                <div
                  key={fewo.id}
                  className="bg-white rounded-2xl p-5 shadow-sm border border-forest/5"
                >
                  <Link
                    href={`/unterkunft/${fewo.slug}`}
                    className="font-serif text-xl text-forest hover:text-wood transition-colors block mb-3"
                  >
                    {fewo.title}
                  </Link>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-text-primary/50">Größe:</span>{" "}
                      {fewo.size} m²
                    </div>
                    <div>
                      <span className="text-text-primary/50">Personen:</span>{" "}
                      max. {fewo.capacity.maxPersons}
                    </div>
                    <div>
                      <span className="text-text-primary/50">Hauptsaison:</span>{" "}
                      <span className="font-semibold">
                        {fewo.pricePerNight}€
                      </span>
                    </div>
                    <div>
                      <span className="text-text-primary/50">Nebensaison:</span>{" "}
                      <span className="font-semibold text-wood">
                        {fewo.pricePerNightLowSeason}€
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-primary/60">
                    {fewo.highlights.slice(0, 2).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Zimmer Preistabelle */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-8 text-center">
              Gästezimmer
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full bg-white rounded-2xl overflow-hidden shadow-sm border border-forest/10">
                <thead>
                  <tr className="bg-forest text-white text-left">
                    <th className="px-6 py-4 font-medium">Zimmer</th>
                    <th className="px-6 py-4 font-medium">Größe</th>
                    <th className="px-6 py-4 font-medium">Personen</th>
                    <th className="px-6 py-4 font-medium">Hauptsaison</th>
                    <th className="px-6 py-4 font-medium">Nebensaison</th>
                    <th className="px-6 py-4 font-medium">Highlights</th>
                  </tr>
                </thead>
                <tbody>
                  {zimmer.map((z, i) => (
                    <tr
                      key={z.id}
                      className={i % 2 === 0 ? "bg-white" : "bg-stone/50"}
                    >
                      <td className="px-6 py-4">
                        <Link
                          href={`/unterkunft/${z.slug}`}
                          className="font-semibold text-forest hover:text-wood transition-colors"
                        >
                          {z.title}
                        </Link>
                      </td>
                      <td className="px-6 py-4">{z.size} m²</td>
                      <td className="px-6 py-4">max. {z.capacity.maxPersons}</td>
                      <td className="px-6 py-4 font-semibold">
                        {z.pricePerNight}€
                      </td>
                      <td className="px-6 py-4 text-wood font-semibold">
                        {z.pricePerNightLowSeason}€
                      </td>
                      <td className="px-6 py-4 text-sm text-text-primary/70">
                        {z.highlights.slice(0, 2).join(", ")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {zimmer.map((z) => (
                <div
                  key={z.id}
                  className="bg-stone rounded-2xl p-5 shadow-sm border border-forest/5"
                >
                  <Link
                    href={`/unterkunft/${z.slug}`}
                    className="font-serif text-xl text-forest hover:text-wood transition-colors block mb-3"
                  >
                    {z.title}
                  </Link>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                    <div>
                      <span className="text-text-primary/50">Größe:</span>{" "}
                      {z.size} m²
                    </div>
                    <div>
                      <span className="text-text-primary/50">Personen:</span>{" "}
                      max. {z.capacity.maxPersons}
                    </div>
                    <div>
                      <span className="text-text-primary/50">Hauptsaison:</span>{" "}
                      <span className="font-semibold">{z.pricePerNight}€</span>
                    </div>
                    <div>
                      <span className="text-text-primary/50">Nebensaison:</span>{" "}
                      <span className="font-semibold text-wood">
                        {z.pricePerNightLowSeason}€
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-primary/60">
                    {z.highlights.slice(0, 2).join(" · ")}
                  </p>
                </div>
              ))}
            </div>

            <p className="text-center text-sm text-text-primary/50 mt-6">
              Mindestaufenthalt: {priceInfo.mindestaufenthaltZimmer} Nächte ·
              Zimmerreinigung jeden 3. Tag · Teeküche im 1. Stock
            </p>
          </div>
        </section>

        {/* Saisonzeiten & Zusatzkosten */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-10 text-center">
              Saisonzeiten & Zusatzkosten
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Saisonzeiten */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-forest mb-4">
                  Saisonzeiten
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-forest mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">Hauptsaison</p>
                      <p className="text-text-primary/70">
                        {bookingInfo.ferienwohnungen.hauptsaison}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="inline-block w-3 h-3 rounded-full bg-wood mt-1 shrink-0" />
                    <div>
                      <p className="font-semibold">
                        Nebensaison (–{priceInfo.nebensaisonRabatt}€/Nacht)
                      </p>
                      <p className="text-text-primary/70">
                        Ab {priceInfo.nebensaisonAb},{" "}
                        {priceInfo.nebensaisonMonate.join(", ")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Zusatzkosten */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="font-serif text-xl text-forest mb-4">
                  Zusatzkosten
                </h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">Kurtaxe</dt>
                    <dd className="font-medium">
                      {priceInfo.kurtaxe.toFixed(2)}€ / Nacht / Erwachsener
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">Hunde</dt>
                    <dd className="font-medium">
                      {priceInfo.hundePreis}€ / Nacht
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">
                      Kinder bis {priceInfo.kinderFrei} Jahre
                    </dt>
                    <dd className="font-medium text-forest">kostenlos</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">Kinder 3–10 Jahre</dt>
                    <dd className="font-medium">
                      {priceInfo.zusatzKindBis10}€ / Nacht
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">Kinder ab 10 Jahre</dt>
                    <dd className="font-medium">
                      {priceInfo.zusatzKindAb10}€ / Nacht
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-text-primary/70">
                      Zusatzperson (Erwachsen)
                    </dt>
                    <dd className="font-medium">
                      {priceInfo.zusatzPersonErwachsen}€ / Nacht
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* Inklusive-Leistungen & Zahlung */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-serif text-3xl text-forest mb-10 text-center">
              Immer inklusive
            </h2>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-12">
              {[
                { label: "Bettwäsche & Handtücher", detail: "Erste Garnitur inklusive" },
                { label: "Kostenloses WLAN", detail: "In allen Unterkünften" },
                { label: "Kostenloser Parkplatz", detail: "PKW-Stellplatz auf dem Hof" },
                { label: "Keine Endreinigung", detail: "Keine zusätzlichen Gebühren" },
                { label: "Toaster & Fön", detail: "In jeder Ferienwohnung" },
                { label: "Teeküche (Zimmer)", detail: "Kaffeemaschine, Wasserkocher, Kühlschrank" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-stone rounded-xl p-5 text-center"
                >
                  <p className="font-semibold text-forest mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-text-primary/60">{item.detail}</p>
                </div>
              ))}
            </div>

            {/* Zahlungshinweis */}
            <div className="bg-forest/5 rounded-2xl p-6 max-w-2xl mx-auto text-center">
              <h3 className="font-serif text-xl text-forest mb-3">
                Bezahlung
              </h3>
              <p className="text-text-primary/70 text-sm">
                Wir akzeptieren{" "}
                <strong>Vorabüberweisung</strong> und{" "}
                <strong>Barzahlung bei Anreise</strong>.{" "}
                {bookingInfo.allgemein.keineKarten}
              </p>
              <p className="text-text-primary/50 text-xs mt-3">
                Check-in: {bookingInfo.allgemein.anreise}
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <CTA />
      </main>
      <Footer />
    </>
  );
}
