import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Users, Wifi, Car, Sun, Dog, Bath, Utensils } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ferienwohnungen | Sonnenhof Herrsching",
  description: "5 gemütliche Ferienwohnungen am Ammersee. Mit Balkon oder Terrasse, voll ausgestatteter Küche. Ideal für Familien. Hunde willkommen.",
};

export default function FerienwohnungenPage() {
  const ferienwohnungen = [
    {
      name: "FeWo Ammersee",
      etage: "2. Stock",
      groesse: "ca. 27 m²",
      maxPersonen: "2 Personen",
      preis: "100,00 €",
      preisNebensaison: "90,00 €",
      highlight: "Großer, sonniger Westbalkon",
      ausstattung: ["Schlafzimmer", "Essküche", "Bad/Dusche/WC", "Westbalkon"],
    },
    {
      name: "FeWo Utting",
      etage: "2. Stock",
      groesse: "ca. 38 m²",
      maxPersonen: "2 + 1 Kind + Kinderbett",
      preis: "106,00 €",
      preisNebensaison: "96,00 €",
      highlight: "Sonniger Westbalkon, Kinderbett möglich",
      ausstattung: ["Schlafzimmer", "Wohn-Esszimmer mit Küchennische", "Bad/Dusche/WC", "Westbalkon"],
    },
    {
      name: "FeWo Andechs",
      etage: "1. Stock",
      groesse: "ca. 55 m²",
      maxPersonen: "Max. 5 (davon max. 3 Erw.)",
      preis: "108,00 €",
      preisNebensaison: "98,00 €",
      highlight: "Zwei Schlafbereiche, großer Südostbalkon",
      ausstattung: ["Wohn-/Schlafzimmer", "Kleines Schlafzimmer", "Essküche", "Bad/Dusche/WC", "Südostbalkon"],
    },
    {
      name: "FeWo Herrsching",
      etage: "Erdgeschoss",
      groesse: "ca. 46 m²",
      maxPersonen: "2 Personen",
      preis: "106,00 €",
      preisNebensaison: "96,00 €",
      highlight: "Sehr große, sonnige Südostterrasse",
      ausstattung: ["Schlafzimmer", "Wohn-Essküche", "Geräumiges Bad/Dusche/WC", "Große Südostterrasse"],
    },
    {
      name: "FeWo Dießen",
      etage: "Erdgeschoss",
      groesse: "ca. 55 m²",
      maxPersonen: "Max. 4-5 Personen",
      preis: "112,00 €",
      preisNebensaison: "102,00 €",
      highlight: "Badewanne, Spülmaschine, große Terrasse",
      ausstattung: [
        "Großes Schlafzimmer (Doppelbett + Extrabett)",
        "Küche mit Spülmaschine & Mikrowelle",
        "Bad mit Badewanne & Echtholzdecke",
        "Wohn-/Esszimmer mit Sofa",
        "Südostterrasse"
      ],
    },
  ];

  const ausstattung = [
    { icon: Home, label: "27-55 m² Wohnfläche" },
    { icon: Users, label: "2-5 Personen" },
    { icon: Utensils, label: "Ausgestattete Küche" },
    { icon: Wifi, label: "Kostenloses WLAN" },
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
              src="https://images.unsplash.com/photo-1502672260066-6bc35f0a1f80?w=1920&q=80"
              alt="Ferienwohnung Sonnenhof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Unsere 5 Ferienwohnungen
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              Ihr Zuhause auf Zeit – buchbar wochenweise von Wochenende zu Wochenende
            </p>
            <p className="text-lg text-white/90 mb-8">
              Hauptsaison: Juni bis 15. Oktober
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/kontakt">Verfügbarkeit anfragen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Alle Ferienwohnungen */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              Wohnungen & Preise
            </h2>
            <p className="text-center text-text-primary/70 mb-4 max-w-2xl mx-auto">
              Alle Preise für 2 Personen pro Nacht. Zzgl. 2,00 € Kurtaxe pro Nacht und Erwachsenem.
            </p>
            <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
              Die erste Garnitur Handtücher und Bettwäsche ist inklusive. Keine Endreinigungsgebühr.
            </p>

            <div className="space-y-6">
              {ferienwohnungen.map((fewo) => (
                <Card key={fewo.name} className="bg-stone border-none p-6 rounded-xl">
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <h3 className="font-serif text-2xl text-forest">{fewo.name}</h3>
                        <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full">
                          {fewo.etage}
                        </span>
                        <span className="text-sm bg-wood/10 text-wood px-3 py-1 rounded-full">
                          {fewo.groesse}
                        </span>
                      </div>
                      <p className="text-forest font-medium mb-3">{fewo.highlight}</p>
                      <p className="text-text-primary/70 mb-3">Max. {fewo.maxPersonen}</p>
                      <div className="flex flex-wrap gap-2">
                        {fewo.ausstattung.map((item) => (
                          <span key={item} className="text-sm text-text-primary/60 bg-white px-3 py-1 rounded-full">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-text-primary/60">Hauptsaison</p>
                          <p className="text-2xl font-semibold text-forest">{fewo.preis}</p>
                          <p className="text-xs text-text-primary/60">pro Nacht</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-primary/60">Nebensaison</p>
                          <p className="text-2xl font-semibold text-wood">{fewo.preisNebensaison}</p>
                          <p className="text-xs text-text-primary/60">pro Nacht</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Zusätzliche Kosten */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl text-forest text-center mb-8">
              Zusätzliche Personen & Kinder
            </h2>
            <Card className="bg-white border-none p-6 rounded-xl">
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <h3 className="font-semibold text-forest mb-3">Zusätzliche Personen</h3>
                  <ul className="space-y-2">
                    <li>• Je weitere Person: <strong>23,00 €</strong> pro Nacht</li>
                    <li>• Jedes Kind bis 10 Jahre: <strong>15,00 €</strong> pro Nacht</li>
                    <li>• Jedes Kind ab 10 Jahre: <strong>20,00 €</strong> pro Nacht</li>
                    <li>• Kinder bis einschl. 3 Jahre: <strong>frei</strong></li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-forest mb-3">Sonstiges</h3>
                  <ul className="space-y-2">
                    <li>• Hunde: <strong>10,00 €</strong> pro Nacht</li>
                    <li>• Kurtaxe: <strong>2,00 €</strong> pro Nacht/Erwachsenem</li>
                    <li>• Handtücher & Bettwäsche: <strong>inklusive</strong></li>
                    <li>• Endreinigung: <strong>keine Gebühr</strong></li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Saisonzeiten */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl">
              <h3 className="font-serif text-xl text-forest mb-4">Saisonzeiten & Buchung</h3>
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <p className="font-semibold text-forest mb-2">Hauptsaison:</p>
                  <p>Juni, Juli, August, September, bis 15. Oktober</p>
                </div>
                <div>
                  <p className="font-semibold text-forest mb-2">Nebensaison:</p>
                  <p>Januar bis Mai, ab 16. Oktober bis Dezember<br />(10 € weniger pro Nacht)</p>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-forest/10">
                <p className="text-text-primary/80">
                  <strong className="text-forest">Buchung:</strong> Wochenweise von Wochenende zu Wochenende 
                  bzw. bis Mittwoch. Bei Buchung einer Ferienwohnung ist eine Anzahlung notwendig.
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Ausstattung */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Ausstattung & Details
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
                  <h4 className="font-semibold text-forest mb-3">Wohnbereich</h4>
                  <ul className="space-y-2">
                    <li>• Gemütlicher Wohn-/Essbereich</li>
                    <li>• Balkon oder Terrasse</li>
                    <li>• Kostenloses WLAN</li>
                    <li>• Viel natürliches Licht</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Küche</h4>
                  <ul className="space-y-2">
                    <li>• Herd & Kühlschrank</li>
                    <li>• Kaffeemaschine & Wasserkocher</li>
                    <li>• Geschirr & Kochutensilien</li>
                    <li>• Teils mit Spülmaschine & Mikrowelle</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Schlafzimmer</h4>
                  <ul className="space-y-2">
                    <li>• Komfortable Betten</li>
                    <li>• Kleiderschrank</li>
                    <li>• Bettwäsche inklusive</li>
                    <li>• Teils Kinderbett möglich</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Bad & Extras</h4>
                  <ul className="space-y-2">
                    <li>• Bad mit Dusche oder Badewanne</li>
                    <li>• Handtücher inklusive</li>
                    <li>• Kostenloser Parkplatz am Hof</li>
                    <li>• Hunde willkommen</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Bildergalerie */}
        <section className="py-24 px-6 bg-white">
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
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Bereit für Ihren Urlaub?
            </h2>
            <p className="text-lg text-text-primary/80 mb-4">
              Bitte fragen Sie an und fragen Sie nach. Sie sprechen immer mit der Chefin.
            </p>
            <p className="text-text-primary/60 mb-10">
              Buchung wochenweise • Anzahlung erforderlich
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt persönlich anfragen</Link>
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
