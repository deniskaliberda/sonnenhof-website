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
              src="https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1920&q=80"
              alt="Traditionelles bayerisches Haus am See"
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
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                    alt="Helles Wohnzimmer mit moderner Küche"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    Unsere Ferienwohnungen
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    Viel Platz für Familien und Genießer. Mit eigener Küche, separatem Wohnbereich und Balkon mit Blick ins Grüne.
                  </p>
                  
                  <ul className="space-y-3 mb-6 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>50-70 m² Wohnfläche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Voll ausgestattete Küche</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Balkon oder Terrasse</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Kostenlose Parkplätze</span>
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
                    src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&q=80"
                    alt="Gemütliches Schlafzimmer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                <div className="p-8">
                  <h3 className="font-serif text-3xl text-forest mb-4">
                    Gästezimmer
                  </h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                    Komfortabel und ruhig. Ideal für Paare und Geschäftsreisende. Mit Frühstücksoption und persönlichem Service.
                  </p>
                  
                  <ul className="space-y-3 mb-6 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>20-30 m² Zimmer</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Frühstück optional buchbar</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>WLAN & Schreibtisch</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Eigenes Badezimmer</span>
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

        {/* CTA Section */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
              Noch unentschlossen?
            </h2>
            <p className="text-lg text-text-primary/80 mb-8">
              Wir beraten Sie gerne persönlich und finden gemeinsam die perfekte Unterkunft für Ihren Aufenthalt.
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt anfragen</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
