import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wohnen | Sonnenhof Herrsching",
  description: "Ferienwohnungen und Gästezimmer am Ammersee. Wählen Sie zwischen geräumigen Wohnungen für Familien oder komfortablen Zimmern für Paare und Geschäftsreisende.",
};

export default function WohnenPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative h-[85vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching am Ammersee"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/30 to-forest/60" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
              Wohnen am Ammersee
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
                  <img
                    src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                    alt="Ferienwohnung Wohnbereich"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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
                  <img
                    src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg"
                    alt="Gästezimmer mit Balkon"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
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

        {/* Hinweise */}
        <section className="py-12 px-6 bg-white">
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

        {/* CTA Section */}
        <section className="py-16 px-6 bg-stone">
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
