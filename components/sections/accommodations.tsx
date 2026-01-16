import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function Accommodations() {
  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        {/* Überschrift */}
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
          Ihr Zuhause am Ammersee
        </h2>

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
              <h3 className="font-serif text-3xl text-forest mb-4">
                Unsere Ferienwohnungen
              </h3>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Viel Platz für Familien und Genießer. Mit eigener Küche und Balkon.
              </p>
              <div className="flex gap-3">
                <Button 
                  asChild 
                  className="flex-1 bg-forest hover:bg-forest/90"
                >
                  <Link href="/unterkunft/ferienwohnung-alpenblick">Details</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  className="flex-1"
                >
                  <Link href="/wohnen/ferienwohnungen">Alle Wohnungen</Link>
                </Button>
              </div>
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
              <h3 className="font-serif text-3xl text-forest mb-4">
                Gästezimmer
              </h3>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Komfortabel und ruhig. Ideal für Paare und Geschäftsreisende. Inklusive Frühstücksoption.
              </p>
              <div className="flex gap-3">
                <Button 
                  asChild 
                  className="flex-1 bg-forest hover:bg-forest/90"
                >
                  <Link href="/unterkunft/doppelzimmer-seerosentraum">Details</Link>
                </Button>
                <Button 
                  asChild 
                  variant="outline"
                  className="flex-1"
                >
                  <Link href="/wohnen/zimmer">Alle Zimmer</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
