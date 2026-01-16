import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { InquiryForm } from "@/components/inquiry-form";
import { Phone, Mail, MapPin } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt & Anfrage | Sonnenhof Herrsching",
  description: "Kontaktieren Sie uns für Ihre unverbindliche Anfrage. Wir freuen uns auf Ihren Besuch am Ammersee.",
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
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
              alt="Kontakt Sonnenhof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-forest/60" />
          </div>
          
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 drop-shadow-lg">
              Kontakt
            </h1>
            <p className="text-xl text-white drop-shadow-md">
              Wir freuen uns auf Ihre Anfrage
            </p>
          </div>
        </section>

        {/* Formular Section */}
        <section className="py-16 px-6">
          <InquiryForm />
        </section>

        {/* Kontaktinformationen & Anfahrt - 2-Spalten-Grid */}
        <section className="py-16 px-6 bg-white">
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
                          Musterstraße 123<br />
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
                      </div>
                    </div>

                    {/* E-Mail */}
                    <div className="flex items-start gap-4">
                      <Mail className="w-6 h-6 text-forest flex-shrink-0 mt-1" />
                      <div>
                        <p className="font-semibold text-forest mb-1">E-Mail</p>
                        <a 
                          href="mailto:info@sonnenhof-herrsching.de" 
                          className="text-lg text-text-primary hover:text-wood transition-colors"
                        >
                          info@sonnenhof-herrsching.de
                        </a>
                      </div>
                    </div>
                  </address>
                </div>

                {/* Erreichbarkeit */}
                <div className="pt-6 border-t border-stone">
                  <h3 className="font-serif text-xl text-forest mb-4">
                    Erreichbarkeit
                  </h3>
                  <div className="space-y-2 text-text-primary/80">
                    <p><strong>Montag - Freitag:</strong> 9:00 - 18:00 Uhr</p>
                    <p><strong>Samstag:</strong> 10:00 - 16:00 Uhr</p>
                    <p><strong>Sonntag:</strong> Nach Vereinbarung</p>
                  </div>
                  <p className="text-sm text-text-primary/60 mt-4">
                    Außerhalb dieser Zeiten erreichen Sie uns per E-Mail. 
                    Wir melden uns schnellstmöglich bei Ihnen zurück.
                  </p>
                </div>
              </div>

              {/* Rechts: Google Maps */}
              <div>
                <h3 className="font-serif text-2xl text-forest mb-6">
                  Anfahrt
                </h3>
                <div className="aspect-[4/3] w-full bg-stone/30 rounded-2xl shadow-lg overflow-hidden border-2 border-stone">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d10768.956826633308!2d11.168786!3d47.9994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479e6f7f6f6f6f6f%3A0x6f6f6f6f6f6f6f6f!2sHerrsching%20am%20Ammersee!5e0!3m2!1sde!2sde!4v1234567890"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps - Sonnenhof Herrsching"
                  />
                </div>
                <div className="mt-6 space-y-4 text-text-primary/80">
                  <div>
                    <p className="font-semibold text-forest mb-2">Mit dem Auto:</p>
                    <p className="text-sm">
                      A96 München-Lindau, Ausfahrt Inning am Ammersee. 
                      Von dort ca. 8 km nach Herrsching. Kostenlose Parkplätze am Haus.
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-forest mb-2">Mit der S-Bahn:</p>
                    <p className="text-sm">
                      S8 von München Hauptbahnhof bis Herrsching (Endstation). 
                      Fahrzeit ca. 50 Minuten. Wir sind 10 Gehminuten vom Bahnhof entfernt.
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
