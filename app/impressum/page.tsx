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
                <strong className="text-forest">Sonnenhof Ferienwohnungen und Zimmer</strong><br />
                Cornelia Römmelt<br />
                Summerstraße 23<br />
                82211 Herrsching am Ammersee<br />
                Deutschland
              </address>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">Kontakt</h2>
              <div className="text-text-primary/80 space-y-2">
                <p>
                  <strong>Telefon:</strong>{" "}
                  <a href="tel:+4981529679300" className="hover:text-forest transition-colors">
                    +49 (0) 8152 / 96793-0
                  </a>
                </p>
                <p>
                  <strong>Fax:</strong> +49 (0) 8152 / 96793-1
                </p>
                <p>
                  <strong>E-Mail:</strong>{" "}
                  <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="hover:text-forest transition-colors">
                    sonnenhof@sonnenhof-herrsching.de
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
                <strong>161/263/51333</strong>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Aufsichtsbehörde
              </h2>
              <p className="text-text-primary/80">
                Landratsamt Starnberg<br />
                Strandbadstraße 2<br />
                82319 Starnberg
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Verantwortlich für den Inhalt
              </h2>
              <p className="text-text-primary/80">
                Cornelia Römmelt<br />
                Summerstraße 23<br />
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
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung 
                nicht erkennbar.
              </p>

              <h3 className="font-semibold text-forest mt-6 mb-2">Urheberrecht</h3>
              <p className="text-text-primary/80 leading-relaxed">
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen 
                dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der 
                Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung 
                des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den 
                privaten, nicht kommerziellen Gebrauch gestattet.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
