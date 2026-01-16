import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum | Sonnenhof Herrsching",
  description: "Impressum und Angaben gemäß § 5 TMG",
};

export default function ImpressumPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl text-forest mb-12">
            Impressum
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Angaben gemäß § 5 TMG
              </h2>
              <address className="not-italic text-text-primary/80 leading-relaxed">
                <strong className="text-forest">Sonnenhof Herrsching</strong><br />
                Familie Müller<br />
                Musterstraße 123<br />
                82211 Herrsching am Ammersee<br />
                Deutschland
              </address>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">Kontakt</h2>
              <div className="text-text-primary/80 space-y-2">
                <p>
                  <strong>Telefon:</strong>{" "}
                  <a href="tel:+498152123456" className="hover:text-forest transition-colors">
                    +49 (0) 8152 / 123 456
                  </a>
                </p>
                <p>
                  <strong>E-Mail:</strong>{" "}
                  <a href="mailto:info@sonnenhof-herrsching.de" className="hover:text-forest transition-colors">
                    info@sonnenhof-herrsching.de
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Umsatzsteuer-ID
              </h2>
              <p className="text-text-primary/80">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                <strong>DE123456789</strong> (Platzhalter)
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
              </h2>
              <p className="text-text-primary/80">
                Familie Müller<br />
                Musterstraße 123<br />
                82211 Herrsching am Ammersee
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                EU-Streitschlichtung
              </h2>
              <p className="text-text-primary/80 leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{" "}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-forest hover:text-wood transition-colors underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                <br />
                Unsere E-Mail-Adresse finden Sie oben im Impressum.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Verbraucherstreitbeilegung/Universalschlichtungsstelle
              </h2>
              <p className="text-text-primary/80 leading-relaxed">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer 
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">Haftungsausschluss</h2>
              
              <h3 className="font-semibold text-forest mt-6 mb-2">Haftung für Inhalte</h3>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
              </p>

              <h3 className="font-semibold text-forest mt-6 mb-2">Haftung für Links</h3>
              <p className="text-text-primary/80 leading-relaxed">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
