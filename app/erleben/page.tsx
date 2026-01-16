import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { FeatureSection } from "@/components/sections/feature-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erleben in Herrsching | Ammersee, Andechs & Fünf-Seen-Land",
  description: "Entdecken Sie Herrsching am Ammersee: Seepromenade, Dampfersteg, Kloster Andechs und Radtouren im Fünf-Seen-Land. Ihr perfekter Ausgangspunkt für unvergessliche Erlebnisse.",
  keywords: "Herrsching, Ammersee, Kloster Andechs, Fünf-Seen-Land, Seepromenade, Dampfersteg, Wandern, Radfahren, Bayern",
};

export default function ErlebenPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[70vh] flex items-center justify-center px-6">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80"
              alt="Ammersee mit Bergen im Hintergrund"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/30 to-white" />
          </div>

          <div className="relative z-10 text-center max-w-4xl mx-auto py-20">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg leading-tight">
              Zwischen See und Bergen
            </h1>
            <p className="text-xl md:text-2xl text-white/95 drop-shadow-md max-w-2xl mx-auto leading-relaxed">
              Herrsching ist der ideale Ausgangspunkt für Entdecker
            </p>
          </div>
        </section>

        {/* Sektion 1: Der Ammersee */}
        <FeatureSection
          title="Der Ammersee"
          description={`Direkt vor Ihrer Haustür erstreckt sich einer der schönsten Voralpenseen Bayerns. Die längste Seepromenade Deutschlands lädt zu ausgedehnten Spaziergängen mit Blick auf die Alpen ein.

Vom historischen Dampfersteg aus starten Schiffe zu malerischen Rundfahrten über den See. Genießen Sie eine entspannte Überfahrt nach Dießen, Utting oder rund um den gesamten Ammersee.

Im Sommer locken zahlreiche Badestellen und Strandbäder. Wassersportler finden ideale Bedingungen zum Segeln, Stand-Up-Paddling oder Surfen. Der Ammersee ist ein Paradies für alle, die das Wasser lieben.`}
          imageSrc="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1200&q=80"
          imageAlt="Segelboote auf dem Ammersee"
          imagePosition="left"
        />

        <Separator className="max-w-7xl mx-auto my-8" />

        {/* Sektion 2: Kultur & Genuss */}
        <FeatureSection
          title="Kultur & Genuss"
          description={`Nur eine kurze Wanderung entfernt liegt das weltberühmte Kloster Andechs auf dem Heiligen Berg. Der Weg führt Sie durch schattige Wälder und bietet immer wieder herrliche Ausblicke auf See und Alpen.

Oben angekommen erwartet Sie nicht nur eine prachtvolle Barockkirche, sondern auch die älteste Klosterbrauerei Bayerns. Genießen Sie ein frisch gezapftes Andechser Bier im idyllischen Biergarten – mit Blick über das Alpenvorland.

Die Brotzeit mit regionalen Spezialitäten macht die Einkehr perfekt. Der Rückweg nach Herrsching führt Sie durch das romantische Kiental – ein Naturjuwel der besonderen Art.`}
          imageSrc="https://images.unsplash.com/photo-1618495668865-9954c64b16be?w=1200&q=80"
          imageAlt="Kloster Andechs"
          imagePosition="right"
        />

        <Separator className="max-w-7xl mx-auto my-8" />

        {/* Sektion 3: Aktiv sein */}
        <FeatureSection
          title="Aktiv sein"
          description={`Das Fünf-Seen-Land ist ein Eldorado für Radfahrer. Bestens ausgebaute Radwege führen Sie durch sanfte Hügel, vorbei an glitzernden Seen und durch malerische Dörfer.

Die gemütliche Tour um den Ammersee ist ein Klassiker: 47 Kilometer meist flacher Weg mit ständigem Seeblick. Für sportlichere Naturen bieten sich Touren zu den benachbarten Seen an – Starnberger See, Wörthsee, Pilsensee und Weßlinger See liegen alle in Reichweite.

Wanderer finden unzählige markierte Wege durch die hügelige Moränenlandschaft. Von leichten Uferpromenaden bis zu anspruchsvollen Bergtouren in die nahen Alpen – hier ist für jeden etwas dabei.`}
          imageSrc="https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=1200&q=80"
          imageAlt="Radfahren am Ammersee"
          imagePosition="left"
        />

        {/* Final CTA Section */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Nach dem Ausflug nach Hause kommen
            </h2>
            <p className="text-xl text-text-primary/80 mb-10 leading-relaxed">
              Nach einem erlebnisreichen Tag am See, beim Wandern oder Radfahren freuen Sie sich 
              auf Ihre gemütliche Unterkunft. Entdecken Sie unsere liebevoll eingerichteten 
              Ferienwohnungen und Gästezimmer – Ihr perfekter Rückzugsort in Herrsching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
              >
                <Link href="/wohnen/ferienwohnungen">Ferienwohnungen entdecken</Link>
              </Button>
              <Button 
                asChild 
                size="lg"
                variant="outline"
                className="text-lg px-12 py-6"
              >
                <Link href="/wohnen/zimmer">Gästezimmer ansehen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Info Box für Local SEO */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-5xl mx-auto">
            <div className="bg-stone/50 rounded-2xl p-8 md:p-12">
              <h3 className="font-serif text-2xl md:text-3xl text-forest mb-6 text-center">
                Gut zu wissen
              </h3>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <p className="font-semibold text-forest mb-2">Zum Ammersee</p>
                  <p className="text-text-primary/80">5 Gehminuten zum Dampfersteg und Seeufer</p>
                </div>
                <div>
                  <p className="font-semibold text-forest mb-2">Nach Andechs</p>
                  <p className="text-text-primary/80">4,5 km Wanderweg durch den Wald (ca. 1 Stunde)</p>
                </div>
                <div>
                  <p className="font-semibold text-forest mb-2">Nach München</p>
                  <p className="text-text-primary/80">40 km – S-Bahn-Verbindung ab Herrsching</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
