import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Accommodations() {
  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        {/* Überschrift */}
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
          Ihr Zuhause am Ammersee
        </h2>
        <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
          5 Ferienwohnungen und 7 Gästezimmer – für Familien, Paare und Alleinreisende
        </p>

        {/* Grid mit 2 Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Card 1: Ferienwohnungen */}
          <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
            {/* Bild */}
            <div className="h-80 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80"
                alt="Helles Wohnzimmer mit moderner Küche"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Content */}
            <div className="p-8">
              <h3 className="font-serif text-3xl text-forest mb-2">
                5 Ferienwohnungen
              </h3>
              <p className="text-wood font-medium mb-4">Ab 100€ pro Nacht (2 Pers.)</p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Von 27 bis 55 m² mit eigener Küche, Balkon oder Terrasse. Ideal für Familien.
              </p>
              <Button 
                asChild 
                className="w-full bg-forest hover:bg-forest/90"
              >
                <Link href="/wohnen/ferienwohnungen">Ferienwohnungen ansehen</Link>
              </Button>
            </div>
          </Card>

          {/* Card 2: Gästezimmer */}
          <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
            {/* Bild */}
            <div className="h-80 relative overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1631049552240-59c37f38802b?w=800&q=80"
                alt="Gemütliches Schlafzimmer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Content */}
            <div className="p-8">
              <h3 className="font-serif text-3xl text-forest mb-2">
                7 Gästezimmer
              </h3>
              <p className="text-wood font-medium mb-4">Ab 85€ pro Nacht</p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Doppel- und Einzelzimmer, mit oder ohne Balkon. Teeküche zur Selbstversorgung.
              </p>
              <Button 
                asChild 
                className="w-full bg-forest hover:bg-forest/90"
              >
                <Link href="/wohnen/zimmer">Zimmer ansehen</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
