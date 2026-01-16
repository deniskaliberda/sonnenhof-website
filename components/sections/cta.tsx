import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
          Bereit für Ihren Aufenthalt?
        </h2>
        <p className="text-lg text-text-primary/80 mb-10 max-w-2xl mx-auto">
          Schicken Sie uns eine unverbindliche Anfrage und wir melden uns schnellstmöglich 
          bei Ihnen mit einem persönlichen Angebot.
        </p>
        
        <Button 
          asChild 
          size="lg" 
          className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
        >
          <Link href="/kontakt">Jetzt unverbindlich anfragen</Link>
        </Button>
        
        <div className="mt-12 pt-12 border-t border-stone">
          <p className="text-text-primary/60 mb-4">Oder rufen Sie uns direkt an:</p>
          <a 
            href="tel:+498152123456" 
            className="text-2xl font-semibold text-forest hover:text-wood transition-colors"
          >
            +49 (0) 8152 / 123 456
          </a>
        </div>
      </div>
    </section>
  );
}
