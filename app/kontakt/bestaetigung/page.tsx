import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anfrage erhalten | Sonnenhof Herrsching",
  description: "Vielen Dank für Ihre Anfrage. Wir melden uns persönlich bei Ihnen.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function BestaetigungPage() {
  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Kontakt", path: "/kontakt" },
    { name: "Bestätigung", path: "/kontakt/bestaetigung" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero Section */}
        <section className="relative h-[30vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero/hero-sonnenhof.jpg"
              alt="Sonnenhof Herrsching"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-forest/60" />
          </div>
          <div className="relative z-10 text-center px-6">
            <h1 className="font-serif text-4xl md:text-5xl text-white mb-4 drop-shadow-lg">
              Anfrage erhalten
            </h1>
          </div>
        </section>

        {/* Bestätigungs-Inhalt */}
        <section className="py-16 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white border-none shadow-2xl p-8 md:p-12 rounded-2xl">
              <div className="flex justify-center mb-6">
                <CheckCircle className="w-16 h-16 text-forest" />
              </div>
              <h2 className="font-serif text-3xl md:text-4xl text-forest mb-4">
                Vielen Dank!
              </h2>
              <p className="text-lg text-text-primary/80 mb-8 leading-relaxed">
                Vielen Dank für Ihre Anfrage. Wir melden uns so schnell wie möglich bei Ihnen.
              </p>

              {/* Kontaktdaten */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a
                  href="tel:+4981529679300"
                  className="flex items-center justify-center gap-2 text-forest hover:text-wood transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  +49 (0) 8152 / 96793-0
                </a>
                <a
                  href="mailto:sonnenhof@sonnenhof-herrsching.de"
                  className="flex items-center justify-center gap-2 text-forest hover:text-wood transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  sonnenhof@sonnenhof-herrsching.de
                </a>
              </div>

              <Button asChild className="bg-forest hover:bg-forest/90">
                <Link href="/">
                  Zurück zur Startseite
                </Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
