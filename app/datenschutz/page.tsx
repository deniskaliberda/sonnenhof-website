import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz | Sonnenhof Herrsching",
  description: "Datenschutzerklärung gemäß DSGVO",
};

export default function DatenschutzPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        <div className="max-w-4xl mx-auto px-6 py-16">
          <h1 className="font-serif text-4xl md:text-5xl text-forest mb-12">
            Datenschutzerklärung
          </h1>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 space-y-8">
            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Datenschutz
              </h2>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. 
                Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder 
                E-Mail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. 
                Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
              </p>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation 
                per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem 
                Zugriff durch Dritte ist nicht möglich.
              </p>
              <p className="text-text-primary/80 leading-relaxed">
                Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte 
                zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien 
                wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich 
                rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch 
                Spam-Mails, vor.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Verantwortliche Stelle (DSGVO)
              </h2>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Verantwortliche Stelle i.S.d. Datenschutzgesetzes und der DSGVO ist:
              </p>
              <address className="not-italic text-text-primary/80 leading-relaxed">
                <strong className="text-forest">Sonnenhof Ferienwohnungen und Zimmer</strong><br />
                Cornelia Römmelt<br />
                Summerstraße 23<br />
                82211 Herrsching am Ammersee<br /><br />
                <strong>Telefon:</strong>{" "}
                <a href="tel:+4981529679300" className="hover:text-forest transition-colors">
                  +49 (0) 8152 / 96793-0
                </a>
                <br />
                <strong>E-Mail:</strong>{" "}
                <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="hover:text-forest transition-colors">
                  sonnenhof@sonnenhof-herrsching.de
                </a>
              </address>
              <p className="text-text-primary/80 leading-relaxed mt-4">
                <strong>Datenschutzbeauftragte:</strong> Cornelia Römmelt
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Datenverarbeitung und -speicherung
              </h2>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Wir verwenden und erheben Daten ausschließlich um Ihre Anfragen und Reservierungen zu 
                bearbeiten und um eine ordnungsgemäße Vertragserfüllung zu ermöglichen.
              </p>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Nach Ende Ihres Urlaubs bei uns bzw. nach Bearbeitung Ihrer Anfrage werden Ihre Daten nicht 
                mehr weiterverwendet und nur im Rahmen gesetzlicher Speicherungs- und Meldevorschriften 
                (Steuer und gemeindliche Meldepflicht) weitergeleitet und gespeichert.
              </p>
              <p className="text-text-primary/80 leading-relaxed">
                Nach Ablauf der gesetzlichen Aufbewahrungsfristen werden Ihre Daten gelöscht.
              </p>
              <p className="text-text-primary/80 leading-relaxed mt-4 text-sm">
                Rechtsgrundlagen: Art. 6, 7, 17, 18 DSGVO | §§ 147 I, 257 I Nr.1, 4 IV AO
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Ihre Rechte
              </h2>
              <div className="text-text-primary/80 leading-relaxed space-y-4">
                <p>Sie haben folgende Rechte:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Art. 15 DSGVO:</strong> Auskunft über Ihre von uns verarbeiteten personenbezogenen 
                    Daten zu verlangen
                  </li>
                  <li>
                    <strong>Art. 16 DSGVO:</strong> Unverzüglich die Berichtigung unrichtiger oder Vervollständigung 
                    Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen
                  </li>
                  <li>
                    <strong>Art. 17 DSGVO:</strong> Die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten 
                    zu verlangen
                  </li>
                  <li>
                    <strong>Art. 18 DSGVO:</strong> Die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                    zu verlangen
                  </li>
                  <li>
                    <strong>Art. 20 DSGVO:</strong> Ihre personenbezogenen Daten in einem strukturierten, gängigen 
                    und maschinenlesbaren Format zu erhalten
                  </li>
                  <li>
                    <strong>Art. 7 Abs. 3 DSGVO:</strong> Ihre einmal erteilte Einwilligung jederzeit gegenüber 
                    uns zu widerrufen
                  </li>
                  <li>
                    <strong>Art. 77 DSGVO:</strong> Sich bei einer Aufsichtsbehörde zu beschweren (
                    <a 
                      href="https://www.bfdi.bund.de" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-forest hover:text-wood underline"
                    >
                      bfdi.bund.de
                    </a>
                    )
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Haftung für Inhalte
              </h2>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, 
                Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
              </p>
              <p className="text-text-primary/80 leading-relaxed">
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten 
                nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als 
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde 
                Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige 
                Tätigkeit hinweisen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                Haftung für Links
              </h2>
              <p className="text-text-primary/80 leading-relaxed">
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen 
                Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. 
                Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der 
                Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf 
                mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung 
                nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne 
                konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von 
                Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                SSL- bzw. TLS-Verschlüsselung
              </h2>
              <p className="text-text-primary/80 leading-relaxed">
                Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher 
                Inhalte eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen 
                Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt 
                und an dem Schloss-Symbol in Ihrer Browserzeile.
              </p>
            </section>

            <section className="pt-8 border-t border-stone">
              <p className="text-sm text-text-primary/60">
                Stand: Januar 2026
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
