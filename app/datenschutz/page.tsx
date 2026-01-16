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
                1. Datenschutz auf einen Blick
              </h2>
              
              <h3 className="font-semibold text-forest mt-6 mb-3">Allgemeine Hinweise</h3>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren 
                personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene 
                Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
              </p>

              <h3 className="font-semibold text-forest mt-6 mb-3">Datenerfassung auf dieser Website</h3>
              <p className="text-text-primary/80 leading-relaxed">
                Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. 
                Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" 
                in dieser Datenschutzerklärung entnehmen.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                2. Verantwortliche Stelle
              </h2>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
              </p>
              <address className="not-italic text-text-primary/80 leading-relaxed">
                <strong className="text-forest">Sonnenhof Herrsching</strong><br />
                Familie Müller<br />
                Musterstraße 123<br />
                82211 Herrsching am Ammersee<br /><br />
                <strong>Telefon:</strong> +49 (0) 8152 / 123 456<br />
                <strong>E-Mail:</strong> info@sonnenhof-herrsching.de
              </address>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                3. Datenerfassung auf dieser Website
              </h2>
              
              <h3 className="font-semibold text-forest mt-6 mb-3">Kontaktformular</h3>
              <p className="text-text-primary/80 leading-relaxed mb-4">
                Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben 
                aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten 
                zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              </p>
              <p className="text-text-primary/80 leading-relaxed">
                Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, 
                sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung 
                vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die 
                Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der 
                an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                4. Ihre Rechte
              </h2>
              <div className="text-text-primary/80 leading-relaxed space-y-4">
                <p>Sie haben das Recht:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    gemäß Art. 15 DSGVO Auskunft über Ihre von uns verarbeiteten personenbezogenen 
                    Daten zu verlangen
                  </li>
                  <li>
                    gemäß Art. 16 DSGVO unverzüglich die Berichtigung unrichtiger oder Vervollständigung 
                    Ihrer bei uns gespeicherten personenbezogenen Daten zu verlangen
                  </li>
                  <li>
                    gemäß Art. 17 DSGVO die Löschung Ihrer bei uns gespeicherten personenbezogenen Daten 
                    zu verlangen
                  </li>
                  <li>
                    gemäß Art. 18 DSGVO die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten 
                    zu verlangen
                  </li>
                  <li>
                    gemäß Art. 20 DSGVO Ihre personenbezogenen Daten in einem strukturierten, gängigen 
                    und maschinenlesbaren Format zu erhalten
                  </li>
                  <li>
                    gemäß Art. 7 Abs. 3 DSGVO Ihre einmal erteilte Einwilligung jederzeit gegenüber 
                    uns zu widerrufen
                  </li>
                  <li>
                    gemäß Art. 77 DSGVO sich bei einer Aufsichtsbehörde zu beschweren
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-forest mb-4">
                5. SSL- bzw. TLS-Verschlüsselung
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
                Stand: Januar 2026<br />
                Diese Datenschutzerklärung wurde mit Hilfe von professionellen Generatoren erstellt 
                und sollte von einem Rechtsanwalt für Datenschutz geprüft werden.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
