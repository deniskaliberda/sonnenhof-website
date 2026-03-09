import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Familie & Tradition | Über uns",
  description: "Familiengeführt in 3. Generation – von Frauen geleitet. Gastgeber aus Leidenschaft seit über 40 Jahren in Herrsching am Ammersee.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/ueber-uns',
    languages: createHreflangLanguages('/ueber-uns'),
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
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Über uns", path: "/ueber-uns" }
  ]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Conny",
    "jobTitle": "Inhaberin & Gastgeberin",
    "worksFor": {
      "@type": "LodgingBusiness",
      "@id": "https://www.sonnenhof-herrsching.de/#lodgingbusiness",
      "name": "Sonnenhof Herrsching",
      "url": "https://www.sonnenhof-herrsching.de"
    },
    "description": "Gastgeberin in 3. Generation im Sonnenhof Herrsching am Ammersee. Seit über 40 Jahren in der Hotellerie.",
    "knowsAbout": ["Pension", "Ferienwohnungen", "Ammersee", "Herrsching", "Gastgewerbe"]
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={personSchema} />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Split-Screen Layout */}
        <section className="min-h-screen grid lg:grid-cols-2">
          {/* Left Side - Image */}
          <div className="relative h-[50vh] lg:h-screen order-1 lg:order-1">
            <Image
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
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

        {/* Unsere Geschichte */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-12">
              Unsere Geschichte – Drei Generationen am Ammersee
            </h2>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="inline-block w-12 h-12 rounded-full bg-forest text-white font-serif text-lg flex items-center justify-center">80er</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-forest mb-2">Die Anfänge</h3>
                  <p className="text-text-primary/80 leading-relaxed">
                    Alles begann in den 1980er Jahren, als meine Großmutter das Haus in der
                    Summerstraße 23 erwarb. Schon damals war ihr klar: Dieser Ort in Herrsching,
                    nur wenige Gehminuten vom Ammersee entfernt, ist wie geschaffen für Gäste.
                    Sie richtete die ersten Zimmer ein und empfing Besucher mit bayerischer
                    Herzlichkeit – so wie wir es heute noch tun.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="inline-block w-12 h-12 rounded-full bg-wood text-white font-serif text-lg flex items-center justify-center">90er</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-forest mb-2">Die zweite Generation</h3>
                  <p className="text-text-primary/80 leading-relaxed">
                    Meine Mutter übernahm den Sonnenhof und baute ihn weiter aus. Aus einfachen
                    Gästezimmern wurden komfortable{" "}
                    <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Ferienwohnungen mit eigener Küche
                    </Link>{" "}
                    und Balkon. Der Stammgästekreis wuchs – viele Familien kamen Jahr für Jahr
                    wieder. Manche davon besuchen uns noch heute, inzwischen mit ihren eigenen Kindern.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0 w-16 text-center">
                  <span className="inline-block w-12 h-12 rounded-full bg-forest text-white font-serif text-lg flex items-center justify-center">jetzt</span>
                </div>
                <div>
                  <h3 className="font-serif text-xl text-forest mb-2">Heute – Conny führt den Sonnenhof</h3>
                  <p className="text-text-primary/80 leading-relaxed">
                    Heute führe ich, Conny, den Sonnenhof in dritter Generation. Mit 5{" "}
                    <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Ferienwohnungen
                    </Link>{" "}
                    und 7{" "}
                    <Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                      Gästezimmern
                    </Link>{" "}
                    sind wir bewusst klein geblieben. Kein anonymes Hotel, kein
                    Buchungsportal-Einerlei. Wenn Sie bei uns anfragen, antworten nicht
                    Algorithmen – sondern ich persönlich.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Connys Alltag */}
        <section className="py-20 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-6">
              Ein Tag im Sonnenhof
            </h2>
            <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
              Was passiert eigentlich hinter den Kulissen einer kleinen Pension?
            </p>

            <div className="space-y-6 text-text-primary/80 leading-relaxed text-lg">
              <p>
                Mein Tag beginnt früh. Ich schaue, ob alles bereit ist für abreisende
                Gäste, prüfe die Wohnungen und Zimmer und bereite alles für die neuen
                Ankömmlinge vor. Bettwäsche, Handtücher, ein letzter Blick auf die
                Sauberkeit – das mache ich selbst. Keine Putzkolonne, keine
                Fremdfirma. Wenn Sie Ihre Unterkunft betreten, ist sie von mir
                persönlich vorbereitet.
              </p>

              <p>
                Zwischendurch beantworte ich Anfragen – am Telefon oder per E-Mail.
                Gäste fragen nach freien Terminen, nach{" "}
                <Link href="/preise" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Preisen
                </Link>,
                ob der Hund mitkommen darf (ja, immer!), ob es ein Kinderbett gibt.
                Jede Anfrage bekommt eine persönliche Antwort. Ich kenne Ihre
                Wohnung, ich kenne die Lage, ich kann Ihnen genau sagen, welche
                Unterkunft zu Ihnen passt.
              </p>

              <p>
                Am Nachmittag empfange ich die neuen Gäste. Ich zeige Ihnen die
                Wohnung, erkläre, wo der nächste Bäcker ist, welcher Biergarten sich
                lohnt und wann die beste Zeit für eine{" "}
                <Link href="/blog/radtour-ammersee-unterkunft" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Radtour um den Ammersee
                </Link>{" "}
                ist. Dieses Wissen kommt nicht aus dem Internet – das kommt aus 40
                Jahren Leben in Herrsching.
              </p>
            </div>
          </div>
        </section>

        {/* Herrsching - unsere Heimat */}
        <section className="py-20 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-6">
              Herrsching – Unsere Heimat
            </h2>

            <div className="space-y-6 text-text-primary/80 leading-relaxed text-lg">
              <p>
                Der Sonnenhof liegt in der Summerstraße, einer ruhigen Wohnstraße in
                Herrsching. In fünf Minuten sind Sie am Ammersee, in zehn Minuten am
                S-Bahnhof. München erreichen Sie in 45 Minuten mit der S8 – ohne
                Stau, ohne Parkplatzsuche.
              </p>

              <p>
                Aber Herrsching ist mehr als ein Ausgangspunkt. Es ist ein Ort zum
                Ankommen. Morgens mit dem Kaffee auf dem Balkon sitzen und auf den
                See schauen. Nachmittags zum{" "}
                <Link href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Kloster Andechs wandern
                </Link>{" "}
                und abends im Biergarten den Tag ausklingen lassen. Unsere Gäste
                sagen oft: {'\u201E'}Hier fühlt man sich sofort wie im Urlaub.{'\u201C'}
              </p>

              <p>
                Ob{" "}
                <Link href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Familienurlaub mit Kindern
                </Link>,{" "}
                <Link href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Urlaub mit Hund
                </Link>{" "}
                oder ein Wochenende zu zweit – wir haben den passenden Rückzugsort
                für Sie. Und falls Sie noch unsicher sind:{" "}
                <Link href="/kontakt" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Rufen Sie einfach an
                </Link>. Sie sprechen immer mit mir.
              </p>
            </div>
          </div>
        </section>

        {/* Was uns wichtig ist */}
        <section className="py-20 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-12">
              Was uns wichtig ist
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🏡</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Persönlich</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Bei uns reden Sie mit Menschen, nicht mit Computern.
                  Kein Callcenter – Sie sprechen immer direkt mit der Chefin.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">⭐</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Qualität</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Seit über 40 Jahren legen wir Wert auf gepflegte Unterkünfte
                  und einen hohen Standard für unsere Gäste.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
                  <span className="text-3xl">🌿</span>
                </div>
                <h3 className="font-serif text-xl text-forest mb-3">Nachhaltig</h3>
                <p className="text-text-primary/80 leading-relaxed">
                  Wir achten auf einen bewussten Umgang mit Ressourcen und
                  setzen auf regionale Verbundenheit.
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-white mx-auto mb-4 flex items-center justify-center">
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
