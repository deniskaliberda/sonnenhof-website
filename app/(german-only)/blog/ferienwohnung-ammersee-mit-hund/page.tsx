import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FAQ } from "@/components/sections/faq";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, BASE_URL, createHreflangLanguages } from "@/lib/seo";
import { getPostBySlug } from "@/lib/blog";
import Link from "next/link";
import Image from "next/image";
import {
  Dog,
  Waves,
  Trees,
  Home,
  Footprints,
  Car,
  Mountain,
  Church,
  MapPin,
  Check,
  Phone,
  UtensilsCrossed,
  ShieldCheck,
  Heart,
  FileText,
  Backpack,
  AlertTriangle,
  Train,
  ParkingCircle,
} from "lucide-react";
import type { Metadata } from "next";

const SLUG = "ferienwohnung-ammersee-mit-hund";

export const metadata: Metadata = {
  title: "Ferienwohnung Ammersee mit Hund",
  description:
    "Hundefreundliche Ferienwohnung am Ammersee: Hundestrände, Wanderwege & Tipps für den perfekten Urlaub mit Hund in Herrsching. Ab 90 €/Nacht.",
  keywords:
    "Ferienwohnung Ammersee mit Hund, Hundefreundliche Unterkunft Ammersee, Pension Ammersee Hund erlaubt, Urlaub mit Hund Ammersee, Hundestrand Ammersee, Herrsching mit Hund",
  alternates: {
    canonical: `${BASE_URL}/blog/${SLUG}`,
    languages: createHreflangLanguages(`/blog/${SLUG}`),
  },
  openGraph: {
    title:
      "Ferienwohnung am Ammersee mit Hund – So wird der Urlaub perfekt",
    description:
      "Hundefreundliche Ferienwohnung am Ammersee: Hundestrände, Wanderwege & Tipps für den perfekten Urlaub mit Hund in Herrsching. Ab 90 €/Nacht.",
    url: `${BASE_URL}/blog/${SLUG}`,
    type: "article",
    locale: "de_DE",
  },
};

export default async function FerienwohnungAmmerseeHundPage() {
  const post = await getPostBySlug(SLUG);
  const faqItems = post?.faqItems ?? [];
  const jsonLdSchema = post?.jsonLd ?? {};

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    {
      name: "Ferienwohnung am Ammersee mit Hund",
      path: `/blog/${SLUG}`,
    },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {Object.keys(jsonLdSchema).length > 0 && (
        <JsonLd data={jsonLdSchema} />
      )}
      <Navigation />
      <main className="pt-20 bg-white">
        {/* Hero */}
        <section className="relative h-[50vh] md:h-[60vh] lg:h-[70vh]">
          <Image
            src="/images/blog/ferienwohnung-ammersee-mit-hund.jpg"
            alt="Hund am Ammersee – Ferienwohnung Sonnenhof Herrsching"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/60" />
          <div className="absolute inset-0 flex items-center justify-center px-6">
            <div className="text-center max-w-5xl">
              <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                Urlaub mit Hund
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-7xl text-white drop-shadow-lg leading-tight">
                Ferienwohnung am Ammersee mit Hund – So wird der Urlaub perfekt
              </h1>
            </div>
          </div>
        </section>

        {/* Auf einen Blick — Info-Leiste */}
        <section className="py-8 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              <div className="text-center">
                <Waves className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest text-sm">Hundestrand</p>
                <p className="text-xs text-text-primary/60">10 Min. zu Fuß</p>
              </div>
              <div className="text-center">
                <Dog className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest text-sm">Hunde willkommen</p>
                <p className="text-xs text-text-primary/60">10 €/Nacht</p>
              </div>
              <div className="text-center">
                <Trees className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest text-sm">Garten zum Toben</p>
                <p className="text-xs text-text-primary/60">Eingefasster Garten</p>
              </div>
              <div className="text-center">
                <Home className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest text-sm">Seenähe</p>
                <p className="text-xs text-text-primary/60">50 m zum Ammersee</p>
              </div>
              <div className="text-center">
                <Footprints className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest text-sm">Wanderwege</p>
                <p className="text-xs text-text-primary/60">Direkt ab Haustür</p>
              </div>
              <div className="text-center">
                <Car className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest text-sm">Parkplätze</p>
                <p className="text-xs text-text-primary/60">Kostenlos am Haus</p>
              </div>
            </div>
          </div>
        </section>

        {/* Lead-Text */}
        <article>
          <section className="py-20 px-6">
            <div className="max-w-3xl mx-auto">
              <p className="text-xl md:text-2xl text-forest font-medium leading-relaxed mb-8">
                Wenn unser Golden Retriever Balu morgens an der Leine zieht, weil er den Ammersee schon riecht, dann weiß ich: Wir haben hier am See genau den richtigen Ort für Mensch und Tier. Seit über 40 Jahren begrüße ich, Conny vom Sonnenhof in Herrsching, Gäste mit ihren Vierbeinern – und ich kann Ihnen sagen: Der Ammersee ist wie gemacht für einen Urlaub mit Hund.
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                Viele Hundebesitzer stehen vor dem gleichen Problem: Wohin in den Urlaub, wenn der Hund mitkommen soll? Hotels winken oft ab, Ferienwohnungen haben strenge Auflagen, und an vielen Seen gilt striktes Hundeverbot.
              </p>
              <p className="text-lg text-text-primary/80 leading-relaxed">
                Am Ammersee ist das anders. Hier gibt es ausgewiesene Hundestrände, hunderte Kilometer Wanderwege durch Wälder und Wiesen und eine Willkommenskultur, die auch den treuesten Begleiter auf vier Pfoten einschließt.
              </p>
            </div>
          </section>

          {/* Warum der Ammersee ideal ist */}
          <section className="py-20 px-6 bg-stone">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
                Warum der Ammersee ideal für Urlaub mit Hund ist
              </h2>
              <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
                Sauberes Wasser, flache Ufer und eine hundefreundliche Willkommenskultur
              </p>

              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    Der Ammersee gehört zu den saubersten Seen Bayerns. Mit seinen flachen Uferbereichen, naturbelassenen Abschnitten und weitläufigen Wiesen bietet er alles, was ein Hundeherz begehrt. Anders als am Starnberger See, wo vieles strenger geregelt ist, geht es am Ammersee entspannter zu – auch was Hunde betrifft.
                  </p>
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    Die Gemeinden rund um den Ammersee haben erkannt, dass Hundebesitzer eine große und treue Gästegruppe sind. Deshalb gibt es an mehreren Stellen ausgewiesene Hundebadestellen, an denen Ihr Vierbeiner nach Herzenslust ins Wasser springen darf.
                  </p>
                  <p className="text-lg text-text-primary/80 leading-relaxed">
                    Was den Ammersee besonders auszeichnet: Die Kombination aus See, Bergen und Wäldern. Morgens ein Bad im See, mittags eine Wanderung durch schattige Buchenwälder, nachmittags ein Eis in einem der hundefreundlichen Cafés in Herrsching – so sieht ein perfekter Urlaubstag mit Hund aus.
                  </p>
                </div>
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg">
                  <Image
                    src="/images/blog/ferienwohnung-ammersee-mit-hund.jpg"
                    alt="Ammersee – Naturbelassenes Ufer zum Baden mit Hund"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Hundestrände */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
                Hundestrände und Badestellen am Ammersee
              </h2>
              <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
                Vier ausgewiesene Badestellen in der Nähe des Sonnenhofs
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-stone border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Waves className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Hundestrand Herrsching</h3>
                      <p className="text-sm text-wood font-medium">10 Min. zu Fuß</p>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed">
                    Nur wenige Gehminuten von unserem Sonnenhof entfernt liegt der beliebte Hundestrand von Herrsching. Er befindet sich am südlichen Ende der Seepromenade, wo das Ufer naturbelassener wird und Hunde offiziell ins Wasser dürfen. Der Einstieg ist flach und sandig – perfekt auch für Hunde, die das Wasser erst kennenlernen.
                  </p>
                  <div className="mt-4 pt-4 border-t border-forest/10">
                    <p className="text-sm text-amber-700 font-medium">
                      Flacher, sandiger Einstieg – ideal für wasserscheue Hunde
                    </p>
                  </div>
                </Card>

                <Card className="bg-stone border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Hundestrand Stegen</h3>
                      <p className="text-sm text-wood font-medium">5 Min. mit dem Auto</p>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed">
                    In Stegen, nur wenige Kilometer nördlich von Herrsching, gibt es eine weitere ausgewiesene Hundebadestelle. Der Bereich ist etwas abgelegener und daher oft ruhiger. Gerade wenn Ihr Hund noch unsicher mit anderen Vierbeinern ist, kann das ein guter Platz sein.
                  </p>
                  <div className="mt-4 pt-4 border-t border-forest/10">
                    <p className="text-sm text-amber-700 font-medium">
                      Ruhiger, abgelegener – gut bei unsicheren Hunden
                    </p>
                  </div>
                </Card>

                <Card className="bg-stone border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Trees className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Ufer Herrsching–Breitbrunn</h3>
                      <p className="text-sm text-wood font-medium">15 Min. zu Fuß / Rad</p>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed">
                    Zwischen den Ortschaften gibt es am Ammersee immer wieder Abschnitte, an denen kaum jemand badet. Besonders schön ist der Uferweg zwischen Herrsching und Breitbrunn – hier finden Sie ruhige Stellen, an denen Ihr Hund ungestört planschen kann.
                  </p>
                  <div className="mt-4 pt-4 border-t border-forest/10">
                    <p className="text-sm text-amber-700 font-medium">
                      Naturbelassen, oft menschenleer
                    </p>
                  </div>
                </Card>

                <Card className="bg-stone border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Car className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Westufer (Schondorf/Utting)</h3>
                      <p className="text-sm text-wood font-medium">20 Min. mit dem Auto</p>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed">
                    Auch am Westufer, etwa bei Schondorf oder Utting, gibt es hundefreundliche Bereiche. Die Fahrt dorthin dauert mit dem Auto etwa 20 Minuten und lohnt sich besonders an heißen Sommertagen, wenn die Herrschinger Strände gut besucht sind.
                  </p>
                  <div className="mt-4 pt-4 border-t border-forest/10">
                    <p className="text-sm text-amber-700 font-medium">
                      Ideal an heißen Sommertagen als Ausweichoption
                    </p>
                  </div>
                </Card>
              </div>

              {/* Wichtig-Callout */}
              <div className="mt-10 bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl max-w-3xl mx-auto">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-text-primary/80 leading-relaxed">
                    <strong className="text-amber-700">Wichtig:</strong> In Naturschutzgebieten, besonders im Ampermoos am Nordende des Sees, gelten besondere Regeln zum Schutz der Vogelwelt. Achten Sie bitte auf die Beschilderung.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Wanderwege */}
          <section className="py-20 px-6 bg-stone">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
                Wanderwege für Hund und Herrchen
              </h2>
              <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
                Die schönsten Touren rund um Herrsching und den Ammersee
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                <Card className="bg-white border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Church className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Kiental → Kloster Andechs</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">ca. 5 km</span>
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">Leicht–Mittel</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed mb-4">
                    Die Wanderung von Herrsching zum Kloster Andechs ist ein Klassiker – und mit Hund besonders schön. Der Weg führt durch den Kiental, einen schattigen Waldweg, der auch an heißen Tagen angenehm kühl bleibt. Die Strecke ist moderat ansteigend, also auch für ältere Hunde machbar.
                  </p>
                  <div className="bg-wood/10 p-4 rounded-lg">
                    <p className="text-sm text-text-primary/80">
                      <strong className="text-wood">Mein Tipp:</strong> Im Biergarten des Klosters sind Hunde im Außenbereich willkommen. Nehmen Sie einen Wassernapf mit – oben gibt es keinen Brunnen für Vierbeiner.
                    </p>
                  </div>
                </Card>

                <Card className="bg-white border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Footprints className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Ammersee-Rundweg</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">ca. 45 km</span>
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">Mittel</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Badestellen</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed">
                    Für ambitionierte Wanderer bietet der Ammersee-Rundweg rund 45 Kilometer pures Naturvergnügen. Sie müssen ihn natürlich nicht an einem Tag schaffen. Besonders schön sind die Teilstrecken am Westufer zwischen Dießen und Herrsching. Ihr Hund findet unterwegs genügend Möglichkeiten zum Trinken und Abkühlen.
                  </p>
                </Card>

                <Card className="bg-white border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Mountain className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Pähler Schlucht</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">ca. 3 km</span>
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">Mittel</span>
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Leinenpflicht</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed mb-4">
                    Ein echtes Naturerlebnis, etwa 15 Autominuten südlich von Herrsching. Der Weg führt durch eine beeindruckende Klamm zu einem Wasserfall.
                  </p>
                  <div className="bg-forest/5 border-l-4 border-forest p-4 rounded-r-lg">
                    <p className="text-sm text-text-primary/80">
                      <strong className="text-forest">Hinweis:</strong> Hunde müssen hier an der Leine geführt werden – der Pfad ist stellenweise schmal und steil.
                    </p>
                  </div>
                </Card>

                <Card className="bg-white border-none p-8 rounded-2xl">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                      <Waves className="w-7 h-7 text-wood" />
                    </div>
                    <div>
                      <h3 className="font-serif text-2xl text-forest">Rund um den Pilsensee</h3>
                      <div className="flex gap-3 mt-1">
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">ca. 8 km</span>
                        <span className="text-xs bg-forest/10 text-forest px-2 py-0.5 rounded-full">Leicht</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">Badestellen</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-text-primary/80 leading-relaxed">
                    Der kleine Pilsensee liegt nur wenige Kilometer östlich von Herrsching und bietet eine schöne Rundwanderung von etwa 8 Kilometern. Der Weg ist flach und gut begehbar. Am Nordufer gibt es Stellen, an denen Ihr Hund ins Wasser kann. Eine perfekte Nachmittagstour.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Was der Sonnenhof bietet */}
          <section className="py-20 px-6">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
                Was der Sonnenhof für Hundebesitzer bietet
              </h2>
              <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
                Bei uns sind Hunde seit jeher willkommen – für 10 Euro pro Nacht darf Ihr Vierbeiner mit in die{" "}
                <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Ferienwohnung
                </Link>{" "}
                einziehen.
              </p>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-wood/15 mx-auto mb-4 flex items-center justify-center">
                    <Trees className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-3">Garten zum Toben</h3>
                  <p className="text-text-primary/80 leading-relaxed text-sm">
                    Ihr Hund kann sich nach der Ankunft erst einmal die Beine vertreten – und abends den Tag draußen ausklingen lassen.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-wood/15 mx-auto mb-4 flex items-center justify-center">
                    <Waves className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-3">50 Meter zum See</h3>
                  <p className="text-text-primary/80 leading-relaxed text-sm">
                    Morgens kurz mit dem Hund ans Wasser, bevor der Tag richtig losgeht. Kein Auto nötig, einfach losmarschieren.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-wood/15 mx-auto mb-4 flex items-center justify-center">
                    <ParkingCircle className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-3">Kostenlose Parkplätze</h3>
                  <p className="text-text-primary/80 leading-relaxed text-sm">
                    Für Tagesausflüge in die Berge oder zu anderen Seen – in Herrsching selbst sind Parkplätze im Sommer oft knapp.
                  </p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-wood/15 mx-auto mb-4 flex items-center justify-center">
                    <Heart className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-xl text-forest mb-3">40+ Jahre Erfahrung</h3>
                  <p className="text-text-primary/80 leading-relaxed text-sm">
                    Vom Chihuahua bis zur Deutschen Dogge – wir kennen die besten Gassi-Routen, hundefreundlichen Restaurants und{" "}
                    <Link href="/erleben" className="text-forest hover:text-wood underline decoration-1 underline-offset-2">
                      Ausflugsziele
                    </Link>.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Praktische Tipps */}
          <section className="py-20 px-6 bg-stone">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
                Praktische Tipps für den Hundeurlaub
              </h2>
              <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
                Alles Wissenswerte für Ihren Aufenthalt mit Vierbeiner
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white border-none p-6 rounded-2xl">
                  <Phone className="w-8 h-8 text-wood mb-4" />
                  <h3 className="font-serif text-xl text-forest mb-3">Tierarzt in Herrsching</h3>
                  <p className="text-text-primary/80 text-sm leading-relaxed">
                    In Herrsching gibt es eine Tierarztpraxis, die im Notfall schnell erreichbar ist. Die nächste Tierklinik mit 24-Stunden-Notdienst befindet sich in Starnberg (ca. 20 Min.). Fragen Sie mich bei der Ankunft nach den aktuellen Kontaktdaten.
                  </p>
                </Card>

                <Card className="bg-white border-none p-6 rounded-2xl">
                  <UtensilsCrossed className="w-8 h-8 text-wood mb-4" />
                  <h3 className="font-serif text-xl text-forest mb-3">Hundefreundliche Restaurants</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80"><strong className="text-forest">Seepromenade:</strong> Mit Blick auf den See essen</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80"><strong className="text-forest">Kloster Andechs:</strong> Hunde gehören zum Bild</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80"><strong className="text-forest">Cafés in der Ortsmitte:</strong> Wassernäpfe bereit</span>
                    </li>
                  </ul>
                  <div className="bg-wood/10 p-3 rounded-lg mt-4">
                    <p className="text-xs text-text-primary/70">
                      <strong className="text-wood">Mein Tipp:</strong> Fragen Sie mich bei der Ankunft nach aktuellen Geheimtipps.
                    </p>
                  </div>
                </Card>

                <Card className="bg-white border-none p-6 rounded-2xl">
                  <ShieldCheck className="w-8 h-8 text-wood mb-4" />
                  <h3 className="font-serif text-xl text-forest mb-3">Leinenpflicht & Regeln</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold flex-shrink-0">!</span>
                      <span className="text-text-primary/80">Bebaute Gebiete: <strong className="text-forest">Ja, immer</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80">Hundestrände: <strong className="text-forest">Nein</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80">Wald- und Feldwege: <strong className="text-forest">Nein, wenn abrufbar</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-amber-600 font-bold flex-shrink-0">!</span>
                      <span className="text-text-primary/80">Naturschutzgebiete: <strong className="text-forest">Ja, immer</strong></span>
                    </li>
                  </ul>
                  <p className="text-xs text-text-primary/60 mt-4">
                    Bitte Hundekotbeutel mitnehmen und entsorgen – damit Hunde auch in Zukunft willkommen bleiben.
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Checkliste */}
          <section className="py-20 px-6 bg-amber-50/30">
            <div className="max-w-6xl mx-auto">
              <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
                Checkliste für den Urlaub mit Hund
              </h2>
              <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
                Damit Sie nichts vergessen – bewährt in über 40 Jahren bei unseren Gästen
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <Card className="bg-white border-none rounded-2xl overflow-hidden">
                  <div className="bg-forest p-5">
                    <div className="flex items-center gap-3">
                      <FileText className="w-6 h-6 text-white" />
                      <h3 className="font-serif text-lg text-white">Dokumente & Gesundheit</h3>
                    </div>
                  </div>
                  <ul className="p-6 space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">EU-Heimtierausweis (für Gäste aus dem Ausland)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Impfpass mit aktueller Tollwutimpfung</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Zeckenschutz – in den bayerischen Wäldern von Frühjahr bis Herbst aktiv</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-white border-none rounded-2xl overflow-hidden">
                  <div className="bg-forest p-5">
                    <div className="flex items-center gap-3">
                      <Dog className="w-6 h-6 text-white" />
                      <h3 className="font-serif text-lg text-white">Futter & Ausstattung</h3>
                    </div>
                  </div>
                  <ul className="p-6 space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Gewohntes Futter für die ersten Tage</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Hundenapf für Wasser und Futter</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Hundebett oder Decke – ein vertrauter Schlafplatz hilft beim Eingewöhnen</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Lieblingsspielzeug und Kauknochen</span>
                    </li>
                  </ul>
                </Card>

                <Card className="bg-white border-none rounded-2xl overflow-hidden">
                  <div className="bg-forest p-5">
                    <div className="flex items-center gap-3">
                      <Backpack className="w-6 h-6 text-white" />
                      <h3 className="font-serif text-lg text-white">Für unterwegs</h3>
                    </div>
                  </div>
                  <ul className="p-6 space-y-3">
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Leine und Geschirr – idealerweise eine kurze und eine Schleppleine</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Hundekotbeutel in ausreichender Menge</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                      <span className="text-text-primary/80 text-sm">Handtuch für den Hund – nach dem Baden im Ammersee wird es gebraucht</span>
                    </li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Anreise & Buchung CTA */}
          <section className="py-24 px-6 bg-gradient-to-b from-white to-stone">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                  Anreise und Buchung
                </h2>
                <p className="text-xl text-text-primary/80 leading-relaxed max-w-3xl mx-auto">
                  Für Fragen oder Buchungen erreichen Sie mich am besten über unsere Kontaktseite oder telefonisch. Ich freue mich auf Sie – und auf Ihren Hund!
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-12">
                <Card className="bg-white border-none p-6 text-center">
                  <Train className="w-8 h-8 text-wood mx-auto mb-3" />
                  <h3 className="font-semibold text-forest mb-2">Anreise</h3>
                  <ul className="text-sm text-text-primary/80 space-y-1">
                    <li>Auto: A96, Ausfahrt Herrsching</li>
                    <li>S-Bahn: S8 ab München, 45 Min.</li>
                    <li>Vom Bahnhof: wenige Gehminuten</li>
                  </ul>
                </Card>
                <Card className="bg-white border-none p-6 text-center">
                  <Home className="w-8 h-8 text-wood mx-auto mb-3" />
                  <h3 className="font-semibold text-forest mb-2">Unterkünfte</h3>
                  <ul className="text-sm text-text-primary/80 space-y-1">
                    <li>Ferienwohnungen: 30–55 m²</li>
                    <li>Ab 90 €/Nacht</li>
                    <li>Hundezuschlag: 10 €/Nacht</li>
                  </ul>
                </Card>
                <Card className="bg-white border-none p-6 text-center">
                  <ParkingCircle className="w-8 h-8 text-wood mx-auto mb-3" />
                  <h3 className="font-semibold text-forest mb-2">Vor Ort</h3>
                  <ul className="text-sm text-text-primary/80 space-y-1">
                    <li>Parkplätze kostenlos am Haus</li>
                    <li>Summerstraße 23, Herrsching</li>
                    <li>Garten, WLAN, Seenähe</li>
                  </ul>
                </Card>
              </div>

              <div className="text-center space-y-4">
                <Button asChild size="lg" className="bg-forest hover:bg-forest/90">
                  <Link href="/kontakt">Unverbindlich anfragen</Link>
                </Button>
                <p className="text-text-primary/60 text-sm">
                  oder schauen Sie sich unsere{" "}
                  <Link href="/wohnen/ferienwohnungen" className="text-forest hover:text-wood underline">
                    Ferienwohnungen
                  </Link>{" "}
                  an
                </p>
              </div>
            </div>
          </section>
        </article>

        {/* FAQ */}
        {faqItems.length > 0 && (
          <FAQ
            items={faqItems}
            heading="Häufige Fragen zum Urlaub mit Hund"
            subheading="Antworten auf die wichtigsten Fragen unserer Gäste mit Vierbeinern"
          />
        )}

        {/* Back to Blog */}
        <section className="py-8 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <Link
              href="/blog"
              className="text-forest hover:text-wood font-medium text-lg inline-flex items-center gap-2"
            >
              &larr; Zurück zum Blog
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
