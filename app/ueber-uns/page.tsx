import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns | Familie Sonnenhof Herrsching",
  description: "Lernen Sie die Familie hinter dem Sonnenhof kennen. Gastgeber aus Leidenschaft – Tradition trifft Moderne am Ammersee.",
};

export default function UeberUnsPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Split-Screen Layout */}
        <section className="min-h-screen grid lg:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-[50vh] lg:h-screen order-1 lg:order-1">
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80"
              alt="Sonnenhof Herrsching"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent lg:hidden" />
          </div>

          {/* Right Side - Content */}
          <div className="flex items-center justify-center px-6 py-16 lg:py-20 order-2 lg:order-2">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-8 leading-tight">
                Gastgeber aus Leidenschaft
              </h1>

              <div className="space-y-6 text-lg text-text-primary/80 leading-relaxed">
                <p>
                  Der Sonnenhof ist mehr als nur eine Unterkunft – er ist unser Zuhause, 
                  das wir mit Ihnen teilen möchten. Seit Generationen führt unsere Familie 
                  dieses Haus mit Herz und Hingabe.
                </p>

                <p>
                  Was uns auszeichnet? Die perfekte Balance zwischen bayerischer Tradition 
                  und zeitgemäßem Komfort. Wir lieben die Werte vergangener Zeiten – 
                  echte Gastfreundschaft, persönliche Betreuung und die Freude daran, 
                  unseren Gästen einen unvergesslichen Aufenthalt zu bereiten.
                </p>

                <p>
                  Gleichzeitig wissen wir, dass moderne Reisende Wert auf Komfort und 
                  Funktionalität legen. Deshalb haben wir unsere Ferienwohnungen und 
                  Gästezimmer mit allem ausgestattet, was Sie für einen entspannten 
                  Aufenthalt brauchen – ohne dabei den Charme und die Seele des Hauses 
                  zu verlieren.
                </p>

                <p>
                  Herrsching ist unsere Heimat, und wir kennen jeden Winkel dieser 
                  wunderschönen Region. Ob Sie nach den besten Wanderwegen fragen, 
                  einen Geheimtipp für ein Restaurant suchen oder wissen möchten, 
                  wann die Dampferfahrt am schönsten ist – wir sind für Sie da.
                </p>

                <p>
                  Bei uns sind Sie nicht einfach ein Gast – Sie werden Teil unserer 
                  Geschichte. Wir freuen uns darauf, Sie kennenzulernen und Ihnen zu 
                  zeigen, warum der Ammersee einer der schönsten Orte Bayerns ist.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-forest/20">
                <p className="font-serif text-2xl text-forest mb-2">
                  Herzlichst,
                </p>
                <p className="font-serif text-xl text-forest/80">
                  Ihre Familie Müller
                </p>
                <p className="text-sm text-text-primary/60 mt-2">
                  Gastgeber des Sonnenhof Herrsching
                </p>
              </div>

              <div className="mt-12">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-forest hover:bg-forest/90"
                >
                  <Link href="/kontakt">Lernen Sie uns persönlich kennen</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Zusätzliche Info-Sektion */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-12">
              Was uns wichtig ist
            </h2>

            <div className="grid md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🏡</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Persönlich</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Wir nehmen uns Zeit für Sie. Kein Callcenter, keine anonymen 
                  Buchungsportale – nur echte Menschen mit echtem Interesse an Ihrem Wohlbefinden.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Nachhaltig</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Wir setzen auf regionale Produkte beim Frühstück, nutzen 
                  umweltfreundliche Reinigungsmittel und achten auf einen 
                  bewussten Umgang mit Ressourcen.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">❤️</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Mit Herz</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Gastfreundschaft ist für uns keine Dienstleistung, sondern 
                  eine Herzensangelegenheit. Wir lieben, was wir tun – und das merken Sie.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
