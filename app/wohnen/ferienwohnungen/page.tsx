import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Users, Utensils, Wifi, Car, Waves } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferienwohnungen | Sonnenhof Herrsching",
  description: "Geräumige Ferienwohnungen am Ammersee mit eigener Küche, Balkon und viel Platz für die ganze Familie. Perfekt für Ihren Urlaub in Herrsching.",
};

export default function FerienwohnungenPage() {
  const ausstattung = [
    { icon: Home, label: "50-70 m² Wohnfläche" },
    { icon: Users, label: "2-5 Personen" },
    { icon: Utensils, label: "Voll ausgestattete Küche" },
    { icon: Wifi, label: "Kostenloses WLAN" },
    { icon: Car, label: "Kostenloser Parkplatz" },
    { icon: Waves, label: "5 Min. zum Ammersee" },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1502672260066-6bc35f0a1f80?w=1920&q=80"
              alt="Ferienwohnung Sonnenhof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Unsere Ferienwohnungen
            </h1>
            <p className="text-xl md:text-2xl text-white mb-8">
              Ihr Zuhause auf Zeit – mit allem Komfort für einen entspannten Familienurlaub am Ammersee
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/unterkunft/ferienwohnung-alpenblick">Details ansehen</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-12 py-6"
              >
                <Link href="/kontakt?unit=ferienwohnung-alpenblick">Verfügbarkeit anfragen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ausstattung */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Ausstattung & Details
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {ausstattung.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-stone flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="text-lg text-text-primary font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-stone border-none p-8 rounded-2xl">
              <h3 className="font-serif text-2xl text-forest mb-4">Was Sie erwartet:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <h4 className="font-semibold text-forest mb-3">Wohnbereich</h4>
                  <ul className="space-y-2">
                    <li>• Gemütliches Sofa & Esstisch</li>
                    <li>• Flachbild-TV</li>
                    <li>• Balkon oder Terrasse</li>
                    <li>• Viel natürliches Licht</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Küche</h4>
                  <ul className="space-y-2">
                    <li>• Herd & Backofen</li>
                    <li>• Kühlschrank mit Gefrierfach</li>
                    <li>• Kaffeemaschine & Wasserkocher</li>
                    <li>• Geschirr & Kochutensilien</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Schlafzimmer</h4>
                  <ul className="space-y-2">
                    <li>• Komfortable Betten</li>
                    <li>• Kleiderschrank</li>
                    <li>• Verdunklungsmöglichkeit</li>
                    <li>• Bettwäsche inklusive</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Bad & Extras</h4>
                  <ul className="space-y-2">
                    <li>• Modernes Duschbad</li>
                    <li>• Handtücher inklusive</li>
                    <li>• Waschmaschine (optional)</li>
                    <li>• Fahrradabstellraum</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Bildergalerie Placeholder */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Impressionen
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                  alt="Wohnbereich"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=600&q=80"
                  alt="Küche"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80"
                  alt="Balkon"
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
              Bereit für Ihren Urlaub?
            </h2>
            <p className="text-lg text-text-primary/80 mb-10">
              Senden Sie uns eine unverbindliche Anfrage mit Ihrem Wunschzeitraum. 
              Wir prüfen die Verfügbarkeit und melden uns schnellstmöglich bei Ihnen.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt Ferienwohnung anfragen</Link>
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
