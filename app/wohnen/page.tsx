import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unterkünfte am Ammersee | Pension & Ferienwohnung Herrsching",
  description: "Pension am Ammersee: 5 Ferienwohnungen (ab 1 Woche) und 7 Gästezimmer (ab 2 Nächte) in Herrsching. Ideal als Übernachtung in München Umgebung.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/wohnen',
    languages: createHreflangLanguages('/wohnen'),
  },
  openGraph: {
    title: "Unterkünfte am Ammersee | Ferienwohnungen & Zimmer",
    description: "5 Ferienwohnungen und 7 Gästezimmer in Herrsching am Ammersee. Für Familien, Paare und Geschäftsreisende.",
    url: 'https://www.sonnenhof-herrsching.de/wohnen',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function WohnenPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Unterkünfte", path: "/wohnen" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching am Ammersee"
              fill
              className="object-cover"
              priority
              quality={90}
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/30 to-forest/60" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
              Ihre Unterkunft am Ammersee – Wohnungen & Zimmer
            </h1>
            <p className="text-xl md:text-2xl text-white max-w-2xl mx-auto drop-shadow-md">
              Wählen Sie zwischen geräumigen Ferienwohnungen und komfortablen Gästezimmern
            </p>
          </div>
        </section>

        {/* Übersicht */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                Unsere Unterkünfte
              </h2>
              <p className="text-lg text-text-primary/80 max-w-2xl mx-auto">
                Ob für einen längeren Aufenthalt mit der ganzen Familie oder einen kurzen Business-Trip – 
                bei uns finden Sie die passende Unterkunft.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ferienwohnungen */}
              <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
                <div className="h-80 relative overflow-hidden">
                  <Image
                    src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                    alt="Ferienwohnung Wohnbereich"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    5 Ferienwohnungen
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    Von 27 bis 55 m² für 2-5 Personen. Mit eigener Küche und Balkon oder Terrasse. Ideal für Familien.
                  </p>
                  
                  <ul className="space-y-3 mb-6 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>27-55 m² Wohnfläche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Ausgestattete Küche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Balkon oder Terrasse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Ab 100€ pro Nacht (2 Pers.)</span>
                    </li>
                  </ul>
                  
                  <Button 
                    asChild 
                    className="w-full bg-forest hover:bg-forest/90 text-lg py-6"
                  >
                    <Link href="/wohnen/ferienwohnungen">Wohnungen entdecken</Link>
                  </Button>
                </div>
              </Card>

              {/* Gästezimmer */}
              <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
                <div className="h-80 relative overflow-hidden">
                  <Image
                    src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg"
                    alt="Gästezimmer mit Balkon"
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    7 Gästezimmer
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    Doppel- und Einzelzimmer, mit oder ohne Balkon. Eigenes Bad und Zugang zur Teeküche.
                  </p>
                  
                  <ul className="space-y-3 mb-6 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Eigenes Bad/Dusche/WC</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Teeküche zur Selbstversorgung</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Teils mit Balkon</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Ab 85€ pro Nacht</span>
                    </li>
                  </ul>
                  
                  <Button 
                    asChild 
                    className="w-full bg-forest hover:bg-forest/90 text-lg py-6"
                  >
                    <Link href="/wohnen/zimmer">Zimmer ansehen</Link>
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Welche Unterkunft passt zu Ihnen? */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-12">
              Welche Unterkunft passt zu Ihnen?
            </h2>

            <div className="space-y-8 text-text-primary/80 leading-relaxed">
              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">Ferienwohnung oder Gästezimmer?</h3>
                <p>
                  Der wichtigste Unterschied: Unsere <strong>Ferienwohnungen</strong> haben eine eigene Küche,
                  in der Sie sich selbst versorgen können – ideal für Familien und längere Aufenthalte ab einer Woche.
                  Die <strong>Gästezimmer</strong> sind kompakter und perfekt für kürzere Aufenthalte ab 2 Nächten.
                  Statt einer Küche steht Ihnen eine gemeinsame Teeküche im 1. Stock zur Verfügung,
                  mit Kaffeemaschine, Wasserkocher, Kühlschrank und Toaster.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">Lage: 50 Meter zum Ammersee</h3>
                <p>
                  Alle Unterkünfte befinden sich im Sonnenhof in der Summerstraße 23 in Herrsching am Ammersee –
                  nur 50 Meter vom Seeufer entfernt. Von hier aus erreichen Sie den{" "}
                  <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                    Ammersee-Rundweg
                  </Link>,
                  die Schifffahrt nach Diessen und das Kloster Andechs bequem zu Fuß oder mit dem Fahrrad.
                  Der S-Bahnhof Herrsching (S8) ist 10 Gehminuten entfernt – in 45 Minuten sind Sie am Münchner Marienplatz.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">Familiengeführt seit über 40 Jahren</h3>
                <p>
                  Der Sonnenhof wird in dritter Generation von Gastgeberin Conny geführt.
                  Bei uns gibt es keinen anonymen Hotelservice – Sie sprechen immer direkt mit der Chefin.
                  Ob besondere Wünsche, Ausflugstipps oder eine frühe Anreise:
                  Conny kümmert sich persönlich um alles. Deshalb kommen viele unserer Gäste seit Jahren immer wieder.
                </p>
              </div>

              <div>
                <h3 className="font-serif text-2xl text-forest mb-3">Gut zu wissen</h3>
                <p>
                  Alle Unterkünfte sind mit eigenem Bad, kostenlosem WLAN und einem kostenlosen Parkplatz am Hof ausgestattet.
                  Hunde sind herzlich willkommen (10€/Nacht). Kinder bis 3 Jahre übernachten kostenlos.
                  Bettwäsche und Handtücher sind inklusive.
                  Zusätzlich fällt die Kurtaxe der Gemeinde Herrsching von 2,00€ pro Nacht und Erwachsenem an.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hinweise */}
        <section className="py-12 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl mb-2">🐕</p>
                <p className="font-semibold text-forest">Hunde willkommen</p>
                <p className="text-sm text-text-primary/70">10€ pro Nacht</p>
              </div>
              <div>
                <p className="text-3xl mb-2">👶</p>
                <p className="font-semibold text-forest">Kinder willkommen</p>
                <p className="text-sm text-text-primary/70">Bis 3 Jahre frei</p>
              </div>
              <div>
                <p className="text-3xl mb-2">🚗</p>
                <p className="font-semibold text-forest">Parkplatz inklusive</p>
                <p className="text-sm text-text-primary/70">Kostenlos am Hof</p>
              </div>
            </div>
          </div>
        </section>

        {/* Blog-Tipps */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              Tipps für Ihren Aufenthalt
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: "Urlaub mit Hund am Ammersee" },
                { href: "/blog/ferienwohnung-muenchen-umgebung", title: "Ferienwohnung in Münchens Umgebung" },
                { href: "/blog/familienurlaub-ammersee", title: "Familienurlaub am Ammersee" },
              ].map((post) => (
                <Link key={post.href} href={post.href} className="group">
                  <Card className="p-6 bg-white border-none hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
                    <h3 className="font-serif text-lg text-forest group-hover:text-wood transition-colors mb-4">
                      {post.title}
                    </h3>
                    <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 text-sm transition-colors">
                      Weiterlesen <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Sie sprechen immer mit der Chefin
            </h2>
            <p className="text-lg text-text-primary/80 mb-8">
              Bitte fragen Sie an und fragen Sie nach. Bei uns reden Sie mit Menschen, nicht mit Computern.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt persönlich anfragen</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
