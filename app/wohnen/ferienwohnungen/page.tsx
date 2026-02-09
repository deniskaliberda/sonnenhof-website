import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Home, Users, Wifi, Car, Sun, Dog, Bath, Utensils } from "lucide-react";
import { getFerienwohnungen } from "@/lib/mock-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "5 Ferienwohnungen in Herrsching | Ab 1 Woche am Ammersee buchen",
  description: "Gemütliche Ferienwohnungen 27-55 m² mit Balkon/Terrasse und Küche. Buchbar wochenweise. Ab 595€/Woche. Hunde willkommen. Nur 5 Min. zum Ammersee.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/wohnen/ferienwohnungen',
  },
  openGraph: {
    title: "5 Ferienwohnungen in Herrsching am Ammersee",
    description: "Gemütliche Ferienwohnungen 27-55 m² mit Balkon/Terrasse und Küche. Wochenweise buchbar.",
    url: 'https://www.sonnenhof-herrsching.de/wohnen/ferienwohnungen',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function FerienwohnungenPage() {
  const ferienwohnungen = getFerienwohnungen();

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
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching Außenansicht"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              5 Ferienwohnungen in Herrsching – Wochenweise buchen
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

            <div className="space-y-12">
              {ferienwohnungen.map((fewo) => (
                <Card key={fewo.id} className="bg-stone border-none p-6 rounded-xl overflow-hidden">
                  {/* Header mit Namen und Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h3 className="font-serif text-3xl text-forest">{fewo.title}</h3>
                    <span className="text-sm bg-forest/10 text-forest px-3 py-1 rounded-full">
                      {fewo.floor}
                    </span>
                    <span className="text-sm bg-wood/10 text-wood px-3 py-1 rounded-full">
                      {fewo.size} m²
                    </span>
                  </div>

                  {/* Bildergalerie - JETZT SICHTBAR */}
                  {fewo.images && fewo.images.length > 0 && (
                    <div className="mb-6">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {fewo.images.slice(0, 4).map((image, index) => (
                          <div key={index} className="relative h-40 rounded-lg overflow-hidden group">
                            <img
                              src={image}
                              alt={`${fewo.title} - Bild ${index + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            />
                          </div>
                        ))}
                      </div>
                      {fewo.images.length > 4 && (
                        <p className="text-sm text-text-primary/60 mt-2 text-center">
                          + {fewo.images.length - 4} weitere Fotos
                        </p>
                      )}
                    </div>
                  )}

                  {/* Inhalt Grid */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <p className="text-forest font-medium mb-3">{fewo.shortDescription}</p>
                      <p className="text-text-primary/70 mb-3">
                        Max. {fewo.capacity.maxPersons} Personen
                        {fewo.capacity.children > 0 && ` (inkl. Kinder)`}
                      </p>
                      
                      {/* Highlights */}
                      {fewo.highlights && fewo.highlights.length > 0 && (
                        <div className="mb-4">
                          {fewo.highlights.map((highlight, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm text-text-primary/70 mb-1">
                              <span className="text-wood mt-0.5">✓</span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Link zur Detailseite */}
                      <Button asChild variant="outline" className="mt-4">
                        <Link href={`/unterkunft/${fewo.slug}`}>
                          Mehr Details & alle Fotos ansehen →
                        </Link>
                      </Button>
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                          <p className="text-sm text-text-primary/60">Hauptsaison</p>
                          <p className="text-2xl font-semibold text-forest">{fewo.pricePerNight},00 €</p>
                          <p className="text-xs text-text-primary/60">pro Nacht</p>
                        </div>
                        <div>
                          <p className="text-sm text-text-primary/60">Nebensaison</p>
                          <p className="text-2xl font-semibold text-wood">{fewo.pricePerNightLowSeason},00 €</p>
                          <p className="text-xs text-text-primary/60">pro Nacht</p>
                        </div>
                      </div>
                      
                      <Button asChild className="w-full bg-forest hover:bg-forest/90">
                        <Link href="/kontakt">Jetzt anfragen</Link>
                      </Button>
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
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              Ausstattung & Details
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Sie suchen lieber ein{" "}
              <Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                Gästezimmer für einen Kurzaufenthalt
              </Link>? Wir haben auch 7 gemütliche Zimmer ab 1 Nacht.
            </p>

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
                    <li>• Toaster in jeder Wohnung</li>
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
                    <li>• Fön in jeder Wohnung</li>
                    <li>• Handtücher inklusive</li>
                    <li>• Kostenloser Parkplatz am Hof</li>
                    <li>• Hunde willkommen</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Lage & Verkehrsanbindung */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              Perfekte Lage
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Ob mit Auto oder Bahn – der Sonnenhof ist bestens erreichbar und ideal für{" "}
              <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                Ausflüge in die Region
              </Link>{" "}
              und nach München
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <h3 className="font-serif text-2xl text-forest mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Zu Fuß erreichbar
                </h3>
                <ul className="space-y-3 text-text-primary/80">
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">5 Min.</span>
                    <span>zum nächsten Bäcker</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">10 Min.</span>
                    <span>zum Supermarkt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">10 Min.</span>
                    <span>zum S-Bahnhof Herrsching</span>
                  </li>
                </ul>
              </Card>

              <Card className="bg-forest/5 border-forest/20 p-8 rounded-2xl">
                <h3 className="font-serif text-2xl text-forest mb-6 flex items-center gap-3">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Mit der S-Bahn S8
                </h3>
                <ul className="space-y-3 text-text-primary/80">
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">50 Min.</span>
                    <span>nach München Marienplatz/Innenstadt</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-forest font-semibold min-w-[60px]">direkt</span>
                    <span>zum Münchner Flughafen</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-amber-600 text-sm">💡</span>
                    <span className="text-sm">Perfekt für München-Besucher auch ohne Auto!</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* Ausflugsziele */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              Ausflugsziele
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Entdecken Sie Bayern – Seen, Berge und Königsschlösser in Ihrer Nähe
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white border-none p-6 rounded-xl">
                <h3 className="font-serif text-xl text-forest mb-4">Seen & Baden</h3>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>Ammersee</strong> – direkt vor der Tür</li>
                  <li>• <strong>Starnberger See</strong> – nur 20 Min.</li>
                  <li>• Dampferfahrten auf beiden Seen</li>
                  <li>• Badeplätze & Strandleben</li>
                </ul>
              </Card>

              <Card className="bg-white border-none p-6 rounded-xl">
                <h3 className="font-serif text-xl text-forest mb-4">Kultur & Stadt</h3>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>München</strong> – 50 Min. mit S8</li>
                  <li>• Marienplatz & Altstadt</li>
                  <li>• Museen & Sehenswürdigkeiten</li>
                  <li>• Shopping & Biergärten</li>
                </ul>
              </Card>

              <Card className="bg-white border-none p-6 rounded-xl">
                <h3 className="font-serif text-xl text-forest mb-4">Berge & Schlösser</h3>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>Schlösser König Ludwig</strong> – 1 Std.</li>
                  <li>• <strong>Garmisch-Partenkirchen</strong> – 1 Std.</li>
                  <li>• <strong>Zugspitze</strong> – 1 Std.</li>
                  <li>• Wandern & Bergtouren</li>
                </ul>
              </Card>
            </div>

            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl text-center">
              <p className="text-text-primary/80">
                <span className="text-forest font-semibold">Tipp:</span> Fragen Sie uns nach Geheimtipps! 
                Wir kennen die schönsten Wanderwege, gemütliche Wirtshäuser und ruhige Badeplätze.
              </p>
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
                  src="/images/ferienwohnungen/herrsching/herrsching-01-wohnbereich.jpg"
                  alt="Wohnbereich Ferienwohnung"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="/images/ferienwohnungen/andechs/andechs-03-kueche.jpg"
                  alt="Küche Ferienwohnung"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="/images/ferienwohnungen/ammersee/ammersee-05-balkon.jpg"
                  alt="Balkon mit Aussicht"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
