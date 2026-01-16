import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Hero Image - Bayerischer See mit Bergen */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1527004013197-933c4bb611b3?w=1920&q=80"
          alt="Ammersee mit Alpenpanorama"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/20 to-forest/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 drop-shadow-lg">
          Willkommen am Ammersee
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md max-w-2xl mx-auto">
          Familiär, naturverbunden und nur wenige Schritte vom See entfernt – 
          Ihr persönlicher Rückzugsort in Herrsching.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-white text-forest hover:bg-stone text-lg px-8 py-6"
          >
            <Link href="/kontakt">Unverbindlich anfragen</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6"
          >
            <Link href="/wohnen">Unterkünfte entdecken</Link>
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
