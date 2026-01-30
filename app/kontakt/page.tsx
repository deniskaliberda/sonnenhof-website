import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry-form";
import { Phone, Mail, MapPin, Clock, CreditCard, Car, Wifi, Dog, Baby, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Anfrage | Sonnenhof Herrsching",
  description: "Kontaktieren Sie uns für Ihre Anfrage. Sie sprechen immer mit der Chefin persönlich. Ferienwohnungen und Zimmer am Ammersee.",
};

export default function KontaktPage() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/60" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 drop-shadow-lg">
              Kontakt & Anfrage
            </h1>
            <p className="text-xl text-white drop-shadow-md">
              Sie sprechen immer mit der Chefin persönlich
            </p>
          </div>
        </section>

        {/* Wichtige Hinweise */}
        <section className="py-12 px-6 bg-forest/5">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              <Card className="bg-white border-none p-4 rounded-xl flex items-center gap-3">
                <Dog className="w-8 h-8 text-wood flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest">Hunde willkommen</p>
                  <p className="text-sm text-text-primary/70">10€ pro Nacht</p>
                </div>
              </Card>
              <Card className="bg-white border-none p-4 rounded-xl flex items-center gap-3">
                <Baby className="w-8 h-8 text-wood flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest">Kinder willkommen</p>
                  <p className="text-sm text-text-primary/70">Bis 3 Jahre frei</p>
                </div>
              </Card>
              <Card className="bg-white border-none p-4 rounded-xl flex items-center gap-3">
                <Car className="w-8 h-8 text-wood flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest">Parkplatz</p>
                  <p className="text-sm text-text-primary/70">Kostenlos am Hof</p>
                </div>
              </Card>
              <Card className="bg-white border-none p-4 rounded-xl flex items-center gap-3">
                <Wifi className="w-8 h-8 text-wood flex-shrink-0" />
                <div>
                  <p className="font-semibold text-forest">WLAN</p>
                  <p className="text-sm text-text-primary/70">Kostenlos</p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Formular Section */}
        <section className="py-16 px-6">
          <InquiryForm />
        </section>

        {/* Buchungsinformationen */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-12">
              Wichtige Informationen zur Buchung
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Anreise & Check-in */}
              <Card className="bg-stone border-none p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Clock className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                  <h3 className="font-serif text-xl text-forest">Anreise & Erreichbarkeit</h3>
                </div>
                <p className="text-text-primary/80 mb-4">
                  <strong>Anreise:</strong> Täglich zwischen <strong>15:00 und 18:00 Uhr</strong> 
                  oder nach Vereinbarung.
                </p>
                <p className="text-text-primary/80 mb-4">
                  <strong>Anfragen:</strong> Ganztags per E-Mail oder telefonisch möglich. 
                  Sie sprechen immer direkt mit der Chefin.
                </p>
                <p className="text-text-primary/80">
                  <strong>Zimmer:</strong> Mindestübernachtung 2 Nächte<br />
                  <strong>Ferienwohnungen:</strong> Buchbar wochenweise von Wochenende zu Wochenende
                </p>
              </Card>

              {/* Bezahlung */}
              <Card className="bg-amber-50 border-2 border-amber-200 p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <CreditCard className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                  <h3 className="font-serif text-xl text-forest">Bezahlung – Bitte beachten!</h3>
                </div>
                <p className="text-text-primary/80 mb-4">
                  Die Bezahlung kann durch <strong>Vorabüberweisung</strong> oder 
                  <strong> Barzahlung bei Anreise</strong> erfolgen.
                </p>
                <p className="text-forest font-semibold mb-4 bg-white/60 p-3 rounded-lg border border-amber-300">
                  ⚠️ Wichtig: Leider können wir keine EC- oder Kreditkarten nehmen.
                </p>
                <p className="text-text-primary/80">
                  Bei Buchung einer <strong>Ferienwohnung</strong> ist eine Anzahlung notwendig.
                </p>
              </Card>

              {/* Preise */}
              <Card className="bg-stone border-none p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                  <h3 className="font-serif text-xl text-forest">Zusätzliche Kosten</h3>
                </div>
                <ul className="space-y-2 text-text-primary/80">
                  <li>• <strong>Kurtaxe:</strong> 2,00 € pro Nacht und Erwachsenem</li>
                  <li>• <strong>Hunde:</strong> 10,00 € pro Nacht</li>
                  <li>• <strong>Zusätzliche Person:</strong> 23,00 € pro Nacht</li>
                  <li>• <strong>Kind bis 10 Jahre:</strong> 15,00 € pro Nacht</li>
                  <li>• <strong>Kind ab 10 Jahre:</strong> 20,00 € pro Nacht</li>
                  <li>• <strong>Kinder bis 3 Jahre:</strong> frei</li>
                </ul>
              </Card>

              {/* Stornierung */}
              <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl">
                <div className="flex items-start gap-4 mb-4">
                  <Info className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                  <h3 className="font-serif text-xl text-forest">Stornierung</h3>
                </div>
                <p className="text-text-primary/80 mb-4">
                  Eine kostenlose Stornierung ist leider nicht möglich. Sollte eine Reise 
                  nicht angetreten werden können, muss trotzdem der gesamte Reisepreis bezahlt werden.
                </p>
                <p className="text-text-primary/80 mb-4">
                  Wir sind zu klein, um dieses Risiko für unsere Gäste zu tragen. Dieses 
                  Risiko müssten unsere Gäste über eine <strong>private Reiserücktrittversicherung</strong> abdecken, 
                  welche es schon für wenig Geld gibt.
                </p>
                <p className="text-text-primary/80 font-medium text-forest">
                  Wir bemühen uns jedoch sehr um Ersatzbuchungen. In diesem Fall ist eine 
                  Bezahlung natürlich nicht nötig.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Kontaktinformationen & Anfahrt */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-forest text-center mb-12">
              Kontakt & Anfahrt
            </h2>
            
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Links: Kontaktdaten */}
              <div className="space-y-8">
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-6">
                    Kontaktdaten
                  </h3>
                  
                  <address className="not-italic space-y-6">
                    {/* Adresse */}
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-forest mb-1">Adresse</p>
                        <p className="text-lg text-text-primary">
                          Sonnenhof Herrsching<br />
                          Summerstraße 23<br />
                          82211 Herrsching am Ammersee<br />
                          Deutschland
                        </p>
                      </div>
                    </div>

                    {/* Telefon */}
                    <div className="flex items-start gap-4">
                      <Phone className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-forest mb-1">Telefon</p>
                        <a 
                          href="tel:+498152123456" 
                          className="text-lg text-text-primary hover:text-wood transition-colors"
                        >
                          +49 (0) 8152 / 123 456
                        </a>
                        <p className="text-sm text-text-primary/60 mt-1">
                          Sie sprechen immer mit der Chefin
                        </p>
                      </div>
                    </div>

                    {/* E-Mail */}
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-forest mb-1">E-Mail</p>
                        <a 
                          href="mailto:sonnenhof@sonnenhof-herrsching.de" 
                          className="text-lg text-text-primary hover:text-wood transition-colors"
                        >
                          sonnenhof@sonnenhof-herrsching.de
                        </a>
                      </div>
                    </div>
                  </address>
                </div>

                {/* Erreichbarkeit */}
                <Card className="bg-white border-none p-6 rounded-xl">
                  <h3 className="font-serif text-xl text-forest mb-4">
                    Persönlich für Sie da
                  </h3>
                  <p className="text-text-primary/80 mb-4">
                    <strong>Bitte fragen Sie an und fragen Sie nach.</strong><br />
                    Bei uns reden Sie mit Menschen, nicht mit Computern. 
                    Sie sprechen immer direkt mit der Chefin.
                  </p>
                  <p className="text-sm text-text-primary/60">
                    Wir melden uns schnellstmöglich bei Ihnen zurück.
                  </p>
                </Card>
              </div>

              {/* Rechts: Google Maps */}
              <div>
                <h3 className="font-serif text-2xl text-forest mb-6">
                  Anfahrt
                </h3>
                <div className="aspect-[4/3] w-full bg-stone/30 rounded-2xl shadow-lg overflow-hidden border-2 border-white">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2685.4!2d11.1743!3d47.9994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479dd6f14ab8e6e5%3A0x8c6c6c6c6c6c6c6c!2sSummerstra%C3%9Fe%2023%2C%2082211%20Herrsching%20am%20Ammersee!5e0!3m2!1sde!2sde!4v1706000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Sonnenhof Herrsching, Summerstraße 23"
                  />
                </div>
                <div className="mt-6 space-y-4 text-text-primary/80">
                  <div>
                    <p className="font-semibold text-forest mb-2">Mit dem Auto:</p>
                    <p className="text-sm">
                      A96 München-Lindau, Ausfahrt Inning am Ammersee. 
                      Von dort ca. 8 km nach Herrsching. <strong>Kostenloser Parkplatz auf dem Hof.</strong>
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-forest mb-2">Mit der S-Bahn:</p>
                    <p className="text-sm mb-2">
                      <strong>S8</strong> von München Hauptbahnhof bis Herrsching (Endstation). 
                      Fahrzeit ca. 50 Minuten zum Marienplatz/Innenstadt. 
                      Wir sind <strong>10 Gehminuten vom S-Bahnhof</strong> entfernt.
                    </p>
                    <p className="text-sm text-forest">
                      Die S8 fährt auch direkt zum <strong>Münchner Flughafen</strong> – 
                      perfekt für Gäste ohne Auto!
                    </p>
                  </div>
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
