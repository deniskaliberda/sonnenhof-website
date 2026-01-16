import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bed, Coffee, Wifi, Briefcase, Sparkles, Clock } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gästezimmer | Sonnenhof Herrsching",
  description: "Komfortable Gästezimmer am Ammersee. Ideal für Paare, Geschäftsreisende und Kurztrips. Optional mit Frühstück.",
};

export default function ZimmerPage() {
  const ausstattung = [
    { icon: Bed, label: "Komfortable Betten" },
    { icon: Coffee, label: "Frühstück optional" },
    { icon: Wifi, label: "Kostenloses WLAN" },
    { icon: Briefcase, label: "Arbeitsplatz" },
    { icon: Sparkles, label: "Tägliche Reinigung" },
    { icon: Clock, label: "Flexibler Check-in" },
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
            <p className="text-xl md:text-2xl text-white mb-8">
              Ihr persönlicher Rückzugsort – perfekt für Paare, Einzelreisende und Business-Gäste
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/unterkunft/doppelzimmer-seerosentraum">Details ansehen</Link>
              </Button>
              <Button 
                asChild 
                size="lg" 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 text-lg px-12 py-6"
              >
                <Link href="/kontakt?unit=doppelzimmer-seerosentraum">Verfügbarkeit anfragen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Ausstattung */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Ausstattung & Service
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
                  <h4 className="font-semibold text-forest mb-3">Zimmer</h4>
                  <ul className="space-y-2">
                    <li>• 20-30 m² Wohnfläche</li>
                    <li>• Doppelbett oder 2 Einzelbetten</li>
                    <li>• Kleiderschrank & Kommode</li>
                    <li>• Sitzecke am Fenster</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Bad</h4>
                  <ul className="space-y-2">
                    <li>• Eigenes modernes Duschbad</li>
                    <li>• Handtücher & Föhn inklusive</li>
                    <li>• Hochwertige Pflegeprodukte</li>
                    <li>• Heizung & gute Belüftung</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Arbeiten</h4>
                  <ul className="space-y-2">
                    <li>• Schreibtisch mit Stuhl</li>
                    <li>• Schnelles WLAN (50 Mbit/s)</li>
                    <li>• Gute Beleuchtung</li>
                    <li>• Ruhige Lage</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Extras</h4>
                  <ul className="space-y-2">
                    <li>• Flachbild-TV</li>
                    <li>• Minikühlschrank</li>
                    <li>• Wasserkocher & Kaffee/Tee</li>
                    <li>• Kostenlose Parkplätze</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Frühstück */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                Frühstück (optional)
              </h2>
              <p className="text-lg text-text-primary/80">
                Starten Sie gestärkt in den Tag – mit unserem reichhaltigen bayerischen Frühstück
              </p>
            </div>

            <Card className="bg-white border-none p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-4">Was wir anbieten:</h3>
                  <ul className="space-y-3 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Frische Brötchen vom Bäcker</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Aufschnitt & Käse aus der Region</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Hausgemachte Marmelade</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Frisches Obst & Joghurt</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Kaffee, Tee & Säfte</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 relative rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1533777324565-a040eb52facd?w=600&q=80"
                    alt="Frühstück"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-stone">
                <p className="text-text-primary/80">
                  <span className="font-semibold text-forest">Preis:</span> 12 € pro Person – 
                  einfach bei der Buchung dazubuchen oder spontan vor Ort anfragen.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Impressionen */}
        <section className="py-24 px-6 bg-white">
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
                  alt="Arbeitsplatz"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Zimmer anfragen
            </h2>
            <p className="text-lg text-text-primary/80 mb-10">
              Senden Sie uns Ihre Anfrage mit Ihrem Wunschzeitraum. 
              Wir prüfen die Verfügbarkeit und erstellen Ihnen gerne ein unverbindliches Angebot.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt Zimmer anfragen</Link>
            </Button>
            
            <div className="mt-12 pt-12 border-t border-white/20">
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
