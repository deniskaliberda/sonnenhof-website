import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bed, Coffee, Wifi, Sparkles, Clock, Dog, Car, Sun } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gästezimmer | Sonnenhof Herrsching",
  description: "Gemütliche Gästezimmer am Ammersee mit eigenem Bad. Doppelzimmer und Einzelzimmer, mit oder ohne Balkon. Teeküche zur Selbstversorgung. Hunde willkommen.",
};

export default function ZimmerPage() {
  const zimmerTypen = [
    {
      title: "Doppelzimmer mit Balkon",
      preis: "117,00 €",
      preisNebensaison: "107,00 €",
      beschreibung: "Komfortables Doppelzimmer mit eigenem Balkon und Bad/Dusche/WC.",
    },
    {
      title: "Doppelzimmer ohne Balkon",
      preis: "107,00 €",
      preisNebensaison: "97,00 €",
      beschreibung: "Gemütliches Doppelzimmer mit eigenem Bad/Dusche/WC.",
    },
    {
      title: "Einzelzimmer mit Balkon",
      preis: "97,00 €",
      preisNebensaison: "87,00 €",
      beschreibung: "Komfortables Einzelzimmer mit eigenem Balkon und Bad/Dusche/WC.",
    },
    {
      title: "Einzelzimmer ohne Balkon",
      preis: "85,00 €",
      preisNebensaison: "75,00 €",
      beschreibung: "Gemütliches Einzelzimmer mit eigenem Bad/Dusche/WC.",
    },
  ];

  const ausstattung = [
    { icon: Bed, label: "Komfortable Betten" },
    { icon: Coffee, label: "Teeküche zur Selbstversorgung" },
    { icon: Wifi, label: "Kostenloses WLAN" },
    { icon: Sparkles, label: "Reinigung jeden 3. Tag" },
    { icon: Car, label: "Kostenloser Parkplatz" },
    { icon: Dog, label: "Hunde willkommen (10€/Nacht)" },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=1920&q=80"
              alt="Gästezimmer Sonnenhof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Unsere Gästezimmer
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              7 gemütliche Zimmer – Doppel- und Einzelzimmer, mit oder ohne Balkon
            </p>
            <p className="text-lg text-white/90 mb-8">
              Mindestübernachtung: 2 Nächte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/kontakt">Jetzt anfragen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Zimmerübersicht mit Preisen */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              Zimmer & Preise
            </h2>
            <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
              Alle Zimmer ohne Frühstück, mit eigenem Bad/Dusche/WC. 
              Zzgl. 2,00 € Kurtaxe pro Nacht und Erwachsenem.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {zimmerTypen.map((zimmer) => (
                <Card key={zimmer.title} className="bg-stone border-none p-6 rounded-xl">
                  <h3 className="font-serif text-xl text-forest mb-2">{zimmer.title}</h3>
                  <p className="text-text-primary/70 mb-4">{zimmer.beschreibung}</p>
                  <div className="flex flex-wrap gap-4">
                    <div>
                      <p className="text-sm text-text-primary/60">Hauptsaison</p>
                      <p className="text-2xl font-semibold text-forest">{zimmer.preis}</p>
                      <p className="text-xs text-text-primary/60">pro Nacht</p>
                    </div>
                    <div>
                      <p className="text-sm text-text-primary/60">Nebensaison</p>
                      <p className="text-2xl font-semibold text-wood">{zimmer.preisNebensaison}</p>
                      <p className="text-xs text-text-primary/60">pro Nacht</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl">
              <h3 className="font-serif text-xl text-forest mb-4">Saisonzeiten</h3>
              <div className="grid md:grid-cols-2 gap-4 text-text-primary/80">
                <div>
                  <p className="font-semibold text-forest">Hauptsaison:</p>
                  <p>Mai, Juni, Juli, August, September, bis 10. Oktober</p>
                </div>
                <div>
                  <p className="font-semibold text-forest">Nebensaison:</p>
                  <p>Januar, Februar, März, April, ab 10. Oktober, November, Dezember</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Ausstattung */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Ausstattung & Service
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {ausstattung.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="text-lg text-text-primary font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-white border-none p-8 rounded-2xl">
              <h3 className="font-serif text-2xl text-forest mb-4">Was Sie erwartet:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <h4 className="font-semibold text-forest mb-3">Zimmer</h4>
                  <ul className="space-y-2">
                    <li>• Doppel- oder Einzelbett</li>
                    <li>• Eigenes Bad/Dusche/WC</li>
                    <li>• Kostenloses WLAN</li>
                    <li>• Teils mit Balkon</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Service</h4>
                  <ul className="space-y-2">
                    <li>• Zimmerreinigung jeden 3. Tag</li>
                    <li>• Bettwäsche & Handtücher inkl.</li>
                    <li>• Kostenloser Parkplatz am Hof</li>
                    <li>• Hunde willkommen (10€/Nacht)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Teeküche - ersetzt Frühstück */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                Kaffee und Tee, wann immer Sie wollen
              </h2>
              <p className="text-lg text-text-primary/80">
                Unsere Teeküche im 1. Stock steht Ihnen rund um die Uhr zur Verfügung
              </p>
            </div>

            <Card className="bg-stone border-none p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-4">Teeküche im 1. Stock</h3>
                  <p className="text-text-primary/80 mb-6">
                    Wir haben im 1. Stock eine kleine Teeküche, in der Sie sich selbst 
                    ein kleines Frühstück zubereiten können – oder Sie gehen in eines 
                    der vielen nahegelegenen Cafés und Bäckereien.
                  </p>
                  <ul className="space-y-3 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Kaffeemaschine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Wasserkocher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Kühlschrank</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Toaster</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Mikrowelle</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 md:h-auto relative rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                    alt="Teeküche"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Impressionen */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Impressionen
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80"
                  alt="Schlafzimmer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=600&q=80"
                  alt="Badezimmer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&q=80"
                  alt="Zimmerdetails"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Zimmer anfragen
            </h2>
            <p className="text-lg text-text-primary/80 mb-4">
              Bitte fragen Sie an und fragen Sie nach. Sie sprechen immer mit der Chefin.
            </p>
            <p className="text-text-primary/60 mb-10">
              Mindestübernachtung: 2 Nächte
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt persönlich anfragen</Link>
            </Button>
            
            <div className="mt-12 pt-12 border-t border-stone">
              <p className="text-text-primary/60 mb-4">Oder direkt anrufen:</p>
              <a 
                href="tel:+498152123456" 
                className="text-2xl font-semibold text-forest hover:text-wood transition-colors"
              >
                +49 (0) 8152 / 123 456
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
