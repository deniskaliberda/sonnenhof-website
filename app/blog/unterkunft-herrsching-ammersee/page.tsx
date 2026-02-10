import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unterkunft in Herrsching am Ammersee – Tipps für Ihren Aufenthalt | Sonnenhof",
  description: "Die beste Unterkunft in Herrsching am Ammersee finden: Tipps zu Lage, Aktivitäten & Ausflügen. Familiengeführte Pension mit Ferienwohnungen direkt am See.",
  keywords: "Unterkunft Herrsching am Ammersee, Übernachtung Ammersee, Pension Herrsching, Ferienwohnung Ammersee, Urlaub am Ammersee",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/blog/unterkunft-herrsching-ammersee',
  },
  openGraph: {
    title: "Unterkunft in Herrsching am Ammersee – Tipps für Ihren Aufenthalt",
    description: "Die beste Unterkunft in Herrsching am Ammersee finden: Tipps zu Lage, Aktivitäten & Ausflügen. Familiengeführte Pension direkt am See.",
    url: 'https://www.sonnenhof-herrsching.de/blog/unterkunft-herrsching-ammersee',
    type: 'article',
    locale: 'de_DE',
    images: [
      {
        url: '/images/hero/hero-ammersee.jpg',
        width: 1200,
        height: 630,
        alt: 'Unterkunft Herrsching am Ammersee',
      },
    ],
  },
};

export default function UnterkunftHerrschingPage() {
  // Schema.org Article strukturierte Daten
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Unterkunft in Herrsching am Ammersee – Tipps für Ihren Aufenthalt",
    "description": "Die beste Unterkunft in Herrsching am Ammersee finden: Tipps zu Lage, Aktivitäten & Ausflügen. Familiengeführte Pension mit Ferienwohnungen direkt am See.",
    "image": "https://www.sonnenhof-herrsching.de/images/hero/hero-ammersee.jpg",
    "author": {
      "@type": "Organization",
      "name": "Sonnenhof Herrsching"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sonnenhof Herrsching",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.sonnenhof-herrsching.de/images/hero/hero-sonnenhof.jpg"
      }
    },
    "datePublished": "2026-02-09",
    "dateModified": "2026-02-09"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <img
            src="/images/hero/hero-ammersee.jpg"
            alt="Unterkunft in Herrsching am Ammersee"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center px-6 max-w-5xl leading-tight">
              Unterkunft in Herrsching am Ammersee – Tipps für Ihren Aufenthalt
            </h1>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl md:text-2xl text-forest font-medium leading-relaxed mb-8">
              Sie planen einen Urlaub am Ammersee und suchen die passende Unterkunft in Herrsching? 
              Gute Wahl! Herrsching ist der ideale Ausgangspunkt für Ihren Bayern-Urlaub. In diesem 
              Beitrag erfahren Sie, worauf Sie bei der Wahl Ihrer Unterkunft achten sollten – und warum 
              sich Herrsching besonders lohnt.
            </p>

            <hr className="my-12 border-forest/20" />

            {/* Warum Herrsching am Ammersee? */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Warum Herrsching am Ammersee?
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Herrsching ist der größte Ort am Ammersee und bietet die beste Infrastruktur für Urlauber:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Direkte S-Bahn-Anbindung</strong> nach München 
                  (Linie S8, 45 Minuten zum Marienplatz)
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Längste Uferpromenade</strong> am Ammersee – 
                  perfekt zum Flanieren
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Restaurants, Cafés und Biergärten</strong> direkt am Wasser
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Ausgangspunkt für Wanderungen</strong> zum 
                  Kloster Andechs und ins Fünfseenland
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Strandbad und Badestellen</strong> für heiße Sommertage
                </li>
              </ul>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                Wer eine Unterkunft in Herrsching am Ammersee bucht, hat alles in Reichweite – ohne Auto.
              </p>
            </section>

            {/* Worauf sollten Sie bei der Unterkunft achten? */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Worauf sollten Sie bei der Unterkunft achten?
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Bei der Suche nach einer Übernachtung am Ammersee gibt es ein paar Dinge zu beachten:
              </p>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-forest mb-2">1. Lage zum See</h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    Je näher am Wasser, desto schöner. Ideal sind Unterkünfte, von denen Sie in 
                    wenigen Minuten am Ufer sind.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-forest mb-2">2. Anbindung an öffentliche Verkehrsmittel</h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    Wenn Sie Ausflüge nach München planen, sollte die S-Bahn-Station fußläufig erreichbar sein.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-forest mb-2">3. Persönlicher Service</h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    In einer familiengeführten Pension bekommen Sie Geheimtipps von Einheimischen – 
                    das kann kein Hotelportal ersetzen.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-forest mb-2">4. Preis-Leistung</h3>
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    Große Hotelketten sind oft teurer als kleine Pensionen oder Ferienwohnungen – 
                    bei weniger Charme.
                  </p>
                </div>
              </div>
            </section>

            {/* Der Sonnenhof */}
            <section className="mb-12 bg-forest/5 rounded-lg p-8 md:p-10">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Der Sonnenhof: Ihre Unterkunft in Herrsching am Ammersee
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Im <Link href="/" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">Sonnenhof</Link> vereinen wir all das:
              </p>
              <div className="space-y-3 mb-6">
                <p className="text-lg text-text-primary/80 leading-relaxed">
                  ✅ <strong className="text-forest">50 Meter zum See</strong> – näher geht's kaum
                </p>
                <p className="text-lg text-text-primary/80 leading-relaxed">
                  ✅ <strong className="text-forest">5 Minuten zur S-Bahn</strong> – München ist schnell erreicht
                </p>
                <p className="text-lg text-text-primary/80 leading-relaxed">
                  ✅ <strong className="text-forest">Familiengeführt</strong> – Gastgeberin Conny ist immer ansprechbar
                </p>
                <p className="text-lg text-text-primary/80 leading-relaxed">
                  ✅ <strong className="text-forest">Faire Preise</strong> – für Zimmer und Ferienwohnungen
                </p>
                <p className="text-lg text-text-primary/80 leading-relaxed">
                  ✅ <strong className="text-forest">Hunde willkommen</strong> – Vierbeiner sind bei uns gern gesehen
                </p>
              </div>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                Ob Kurztrip übers Wochenende oder längerer Urlaub – bei uns finden Sie die passende Unterkunft.
              </p>
            </section>

            {/* Was können Sie in Herrsching unternehmen? */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Was können Sie in Herrsching unternehmen?
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Mit Ihrer Unterkunft in Herrsching am Ammersee als Basis haben Sie viele Möglichkeiten:
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-forest text-white">
                      <th className="px-6 py-4 text-left font-semibold">Aktivität</th>
                      <th className="px-6 py-4 text-left font-semibold">Entfernung</th>
                      <th className="px-6 py-4 text-left font-semibold">Dauer</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-stone/30">
                      <td className="px-6 py-4 text-text-primary/80">Baden im Ammersee</td>
                      <td className="px-6 py-4 text-text-primary/80">50 m</td>
                      <td className="px-6 py-4 text-text-primary/80">–</td>
                    </tr>
                    <tr className="border-b border-stone/30 bg-stone/20">
                      <td className="px-6 py-4 text-text-primary/80">Wanderung Kloster Andechs</td>
                      <td className="px-6 py-4 text-text-primary/80">5 km</td>
                      <td className="px-6 py-4 text-text-primary/80">ca. 1,5 Std</td>
                    </tr>
                    <tr className="border-b border-stone/30">
                      <td className="px-6 py-4 text-text-primary/80">Schifffahrt über den Ammersee</td>
                      <td className="px-6 py-4 text-text-primary/80">200 m (Anleger)</td>
                      <td className="px-6 py-4 text-text-primary/80">1-2 Std</td>
                    </tr>
                    <tr className="border-b border-stone/30 bg-stone/20">
                      <td className="px-6 py-4 text-text-primary/80">Radtour Fünfseenland</td>
                      <td className="px-6 py-4 text-text-primary/80">ab Haustür</td>
                      <td className="px-6 py-4 text-text-primary/80">2-4 Std</td>
                    </tr>
                    <tr className="border-b border-stone/30">
                      <td className="px-6 py-4 text-text-primary/80">Tagesausflug München</td>
                      <td className="px-6 py-4 text-text-primary/80">S-Bahn</td>
                      <td className="px-6 py-4 text-text-primary/80">45 Min</td>
                    </tr>
                    <tr className="bg-stone/20">
                      <td className="px-6 py-4 text-text-primary/80">Schloss Neuschwanstein</td>
                      <td className="px-6 py-4 text-text-primary/80">Auto/Bahn</td>
                      <td className="px-6 py-4 text-text-primary/80">ca. 1,5 Std</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </section>

            {/* Ferienwohnung oder Zimmer? */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Ferienwohnung oder Zimmer?
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Im Sonnenhof haben Sie die Wahl:
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-4">
                <strong className="text-forest"><Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">Zimmer</Link></strong> – 
                perfekt für kurze Aufenthalte, Paare oder Geschäftsreisende.
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                <strong className="text-forest"><Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">Ferienwohnung</Link></strong> – 
                ideal für Familien oder längere Aufenthalte. Mit eigener Küche können Sie sich selbst 
                versorgen und sparen bei den Restaurantbesuchen.
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed mt-6">
                Beide Optionen bieten Ihnen eine gemütliche Unterkunft in Herrsching am Ammersee zu fairen Preisen.
              </p>
            </section>

            <hr className="my-12 border-forest/20" />

            {/* CTA Section */}
            <section className="bg-forest/5 rounded-lg p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Jetzt anfragen
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-8">
                Sie haben Fragen oder möchten buchen? Wir freuen uns auf Sie!
              </p>
              
              <div className="space-y-4 text-lg text-text-primary/90 mb-8">
                <p>
                  📞 Telefon: <a href="tel:+4981523673330" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">08152 367330</a>
                </p>
                <p>
                  📧 E-Mail: <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">sonnenhof@sonnenhof-herrsching.de</a>
                </p>
                <p>
                  🌐 Website: <Link href="/" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">www.sonnenhof-herrsching.de</Link>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/kontakt">
                  <Button size="lg" className="bg-forest hover:bg-forest/90 text-white px-8">
                    Jetzt anfragen
                  </Button>
                </Link>
                <Link href="/wohnen">
                  <Button size="lg" variant="outline" className="border-forest text-forest hover:bg-forest/10 px-8">
                    Unterkünfte ansehen
                  </Button>
                </Link>
              </div>

              <p className="text-sm text-text-primary/60 italic mt-8">
                Der Sonnenhof – Ihre familiengeführte Unterkunft in Herrsching am Ammersee.
              </p>
            </section>

            {/* Back to Blog */}
            <div className="mt-12 pt-8 border-t border-forest/20">
              <Link href="/blog" className="text-forest hover:text-wood font-medium text-lg inline-flex items-center gap-2">
                ← Zurück zum Blog
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
