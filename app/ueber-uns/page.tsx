import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Familie & Tradition | Über uns - Sonnenhof Herrsching am Ammersee",
  description: "Familiengeführt in 3. Generation – von Frauen geleitet. Gastgeber aus Leidenschaft seit über 40 Jahren in Herrsching am Ammersee.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/ueber-uns',
  },
  openGraph: {
    title: "Familie & Tradition | Sonnenhof Herrsching",
    description: "Familiengeführt in 3. Generation. Gastgeber aus Leidenschaft seit über 40 Jahren.",
    url: 'https://www.sonnenhof-herrsching.de/ueber-uns',
    type: 'website',
    locale: 'de_DE',
  },
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
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/20 to-transparent lg:hidden" />
          </div>

          {/* Right Side - Content */}
          <div className="flex items-center justify-center px-6 py-16 lg:py-20 order-2 lg:order-2">
            <div className="max-w-2xl">
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest mb-8 leading-tight">
                Familie Sonnenhof – In 3. Generation von Frauen geführt
              </h1>

              <div className="space-y-6 text-lg text-text-primary/80 leading-relaxed">
                <p>
                  Der Sonnenhof wird in 3. Generation von den Frauen unserer Familie geführt. 
                  Seit über 40 Jahren sind wir fester Bestandteil von Herrsching und passen 
                  uns den Zeiten an – ohne dabei unsere Wurzeln zu vergessen.
                </p>

                <p>
                  <strong className="text-forest">Wir sind bayrisch und legen Wert auf 
                  Qualität, Nachhaltigkeit und Nähe.</strong> Bei uns reden Sie mit Menschen, 
                  nicht mit KI oder Computern. Wenn Sie{" "}
                  <Link href="/kontakt" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                    anrufen
                  </Link>, sprechen Sie immer mit der 
                  Chefin persönlich.
                </p>

                <p>
                  Was uns auszeichnet? Die perfekte Balance zwischen bayerischer Tradition 
                  und zeitgemäßem Komfort. Wir haben alles, was Sie brauchen:{" "}
                  <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                    Schöne Ferienwohnungen
                  </Link>{" "}
                  und{" "}
                  <Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                    Zimmer
                  </Link>, eine sehr gute Lage, Parkplätze und 
                  gutes Internet.
                </p>

                <p>
                  Herrsching ist unsere Heimat, und wir kennen jeden Winkel dieser 
                  wunderschönen Region. Ob Sie nach den besten Wanderwegen fragen, 
                  einen Geheimtipp für ein Restaurant suchen oder wissen möchten, 
                  wann die{" "}
                  <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                    Dampferfahrt am schönsten
                  </Link>{" "}
                  ist – wir sind für Sie da.
                </p>

                <p className="bg-stone/50 p-4 rounded-lg border-l-4 border-wood">
                  <strong className="text-forest">Hunde und Kinder herzlich willkommen!</strong><br />
                  Bei uns fühlt sich die ganze Familie wohl – inklusive der vierbeinigen Mitglieder.
                </p>
              </div>

              <div className="mt-12 pt-8 border-t border-forest/20">
                <p className="font-serif text-2xl text-forest mb-2">
                  Bitte fragen Sie an und fragen Sie nach.
                </p>
                <p className="font-serif text-xl text-forest/80">
                  Sie sprechen immer mit der Chefin.
                </p>
                <p className="text-sm text-text-primary/60 mt-2">
                  Sonnenhof Herrsching – seit über 40 Jahren
                </p>
              </div>

              <div className="mt-12">
                <Button 
                  asChild 
                  size="lg"
                  className="bg-forest hover:bg-forest/90"
                >
                  <Link href="/kontakt">Jetzt persönlich anfragen</Link>
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

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🏡</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Persönlich</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Bei uns reden Sie mit Menschen, nicht mit Computern. 
                  Kein Callcenter – Sie sprechen immer direkt mit der Chefin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Qualität</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Seit über 40 Jahren legen wir Wert auf gepflegte Unterkünfte 
                  und einen hohen Standard für unsere Gäste.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Nachhaltig</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Wir achten auf einen bewussten Umgang mit Ressourcen und 
                  setzen auf regionale Verbundenheit.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-stone mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🤝</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Nähe</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Wir sind Teil von Herrsching und kennen die Region wie unsere 
                  Westentasche – fragen Sie uns nach Tipps!
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
