import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pension am Ammersee: Warum Herrsching der perfekte Urlaubsort ist | Sonnenhof",
  description: "Suchen Sie eine gemütliche Pension am Ammersee? Der Sonnenhof in Herrsching bietet familiäre Atmosphäre, beste Lage und faire Preise. Jetzt entdecken!",
  keywords: "Pension am Ammersee, Unterkunft Herrsching am Ammersee, Ferienwohnung, Herrsching, Ammersee Urlaub",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/blog/pension-am-ammersee',
  },
  openGraph: {
    title: "Pension am Ammersee: Warum Herrsching der perfekte Urlaubsort ist",
    description: "Suchen Sie eine gemütliche Pension am Ammersee? Der Sonnenhof in Herrsching bietet familiäre Atmosphäre, beste Lage und faire Preise.",
    url: 'https://www.sonnenhof-herrsching.de/blog/pension-am-ammersee',
    type: 'article',
    locale: 'de_DE',
    images: [
      {
        url: '/images/hero/hero-sonnenhof.jpg',
        width: 1200,
        height: 630,
        alt: 'Sonnenhof Pension am Ammersee',
      },
    ],
  },
};

export default function PensionAmAmmerseePage() {
  // Schema.org Article strukturierte Daten
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Pension am Ammersee: Warum Herrsching der perfekte Urlaubsort ist",
    "description": "Suchen Sie eine gemütliche Pension am Ammersee? Der Sonnenhof in Herrsching bietet familiäre Atmosphäre, beste Lage und faire Preise. Jetzt entdecken!",
    "image": "https://www.sonnenhof-herrsching.de/images/hero/hero-sonnenhof.jpg",
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
            src="/images/hero/hero-sonnenhof.jpg"
            alt="Sonnenhof Pension am Ammersee"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center px-6 max-w-5xl leading-tight">
              Pension am Ammersee: Warum Herrsching der perfekte Urlaubsort ist
            </h1>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="prose prose-lg prose-stone max-w-none">
            <p className="text-xl md:text-2xl text-forest font-medium leading-relaxed mb-8">
              Sie suchen eine gemütliche Pension am Ammersee? Dann sind Sie in Herrsching genau richtig. 
              Der kleine Ort am Ostufer des Ammersees verbindet bayerische Gemütlichkeit mit perfekter 
              Anbindung an München – ideal für Naturliebhaber und Städtereisende gleichermaßen.
            </p>

            <hr className="my-12 border-forest/20" />

            {/* Warum eine Pension statt Hotel? */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Warum eine Pension statt Hotel?
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-4">
                Eine Pension am Ammersee bietet etwas, das große Hotels nicht können: persönlichen Kontakt 
                und echte Gastfreundschaft. Im <Link href="/" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">Sonnenhof</Link> begrüßt 
                Sie Ihre Gastgeberin Conny persönlich. Sie kennt die besten Wanderwege, die schönsten 
                Badestellen und gibt gerne Tipps für Ausflüge in der Region.
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                Dazu kommen faire Preise und eine familiäre Atmosphäre. Hier sind Sie kein anonymer Gast – 
                hier fühlen Sie sich wie zuhause.
              </p>
            </section>

            {/* Die perfekte Lage */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Die perfekte Lage: Unterkunft in Herrsching am Ammersee
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Der Sonnenhof liegt mitten in Herrsching, nur 50 Meter vom Seeufer entfernt. 
                In wenigen Minuten erreichen Sie:
              </p>
              <ul className="space-y-4 mb-6">
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Den Ammersee-Strand</strong> – zum Schwimmen, 
                  Spazieren oder einfach Entspannen
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Restaurants und Cafés</strong> – bayerische Küche 
                  und gemütliche Biergärten
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Die S-Bahn-Station</strong> – in 45 Minuten sind 
                  Sie am Münchner Marienplatz
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Wanderwege</strong> – zum Beispiel die beliebte 
                  Route zum Kloster Andechs
                </li>
              </ul>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                Ob Sie einen ruhigen Urlaub am See planen oder München erkunden möchten – von unserer 
                Pension am Ammersee aus ist beides möglich.
              </p>
            </section>

            {/* Für wen eignet sich eine Pension in Herrsching? */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Für wen eignet sich eine Pension in Herrsching?
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Unsere Unterkunft in Herrsching am Ammersee ist ideal für:
              </p>
              <ul className="space-y-3 mb-6">
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Paare</strong>, die Ruhe und Natur suchen
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Familien mit Kindern</strong>, die Platz zum Spielen brauchen
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Hundebesitzer</strong> – Vierbeiner sind herzlich willkommen!
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Geschäftsreisende</strong>, die eine Alternative zum Stadthotel suchen
                </li>
                <li className="text-lg text-text-primary/80 leading-relaxed">
                  <strong className="text-forest">Wanderer und Radfahrer</strong>, die das Fünfseenland erkunden
                </li>
              </ul>
            </section>

            {/* Ferienwohnung oder Zimmer */}
            <section className="mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Ferienwohnung oder Zimmer – Sie haben die Wahl
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-4">
                Im Sonnenhof bieten wir sowohl gemütliche Zimmer als auch voll ausgestattete Ferienwohnungen. 
                So finden Sie genau die Unterkunft, die zu Ihnen passt:
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-4">
                <strong className="text-forest">Unsere <Link href="/wohnen/zimmer" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">Zimmer</Link></strong> eignen 
                sich perfekt für Kurzaufenthalte und Durchreisende.
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                <strong className="text-forest">Unsere <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">Ferienwohnungen</Link></strong> bieten 
                Küche und Wohnbereich – ideal für längere Aufenthalte oder Familien, die sich selbst versorgen möchten.
              </p>
            </section>

            <hr className="my-12 border-forest/20" />

            {/* CTA Section */}
            <section className="bg-forest/5 rounded-lg p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
                Jetzt Ihre Pension am Ammersee buchen
              </h2>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-8">
                Sie möchten Ihren Urlaub in Herrsching verbringen? Wir freuen uns auf Ihre Anfrage!
              </p>
              
              <div className="space-y-4 text-lg text-text-primary/90 mb-8">
                <p>
                  📞 Telefon: <a href="tel:+4981523673330" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">08152 367330</a>
                </p>
                <p>
                  📧 E-Mail: <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">sonnenhof@sonnenhof-herrsching.de</a>
                </p>
                <p>
                  🌐 Alle Infos: <Link href="/" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">www.sonnenhof-herrsching.de</Link>
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
                Der Sonnenhof – Ihre familiengeführte Pension am Ammersee.
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
