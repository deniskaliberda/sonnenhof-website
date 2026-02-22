"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import {
  Waves,
  Mountain,
  Bike,
  Train,
  MapPin,
  Church,
  Sailboat,
  Footprints,
  Coffee,
  TreePine,
  Sparkles,
  Clock,
  ArrowRight
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema } from "@/lib/seo";
import { erlebenSchemas, extractFaqItems } from "@/lib/schema";
import { FAQ } from "@/components/sections/faq";
import { useState, useEffect } from "react";

export default function ErlebenPage() {
  const erlebenImages = [
    { src: '/images/allgemein/erleben-01.jpg', alt: 'Ammersee Region' },
    { src: '/images/allgemein/erleben-02.jpg', alt: 'Herrsching Landschaft' },
    { src: '/images/allgemein/erleben-03.jpg', alt: 'Natur am Ammersee' },
    { src: '/images/allgemein/erleben-04.jpg', alt: 'Bayerische Alpen' },
    { src: '/images/allgemein/erleben-05.jpg', alt: 'Ammersee Panorama' },
    { src: '/images/allgemein/erleben-06.jpg', alt: 'Region Herrsching' },
    { src: '/images/allgemein/erleben-07.jpg', alt: 'Ausflugsziele' },
    { src: '/images/allgemein/erleben-08.jpg', alt: 'Fünf-Seen-Land' },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % erlebenImages.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }, [erlebenImages.length]);

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Ammersee erleben", path: "/erleben" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {erlebenSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Navigation />
      <main className="pt-20 bg-white">
        {/* Hero Section mit Bildrotation - Neue Struktur */}
        <section className="relative bg-white">
          {/* Bildbereich */}
          <div className="relative w-full" style={{ height: '70vh', minHeight: '500px' }}>
            {erlebenImages.map((image, index) => (
              <div
                key={image.src}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === currentImageIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: 'center 40%' }}
                  priority={index === 0}
                  quality={85}
                  sizes="100vw"
                />
              </div>
            ))}
            <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/60" />
            
            {/* Hero Content - Über dem Bild */}
            <div className="absolute inset-0 flex items-center justify-center px-6">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg leading-tight">
                  Herrsching & Ammersee erleben – Ihre Urlaubsregion
                </h1>
                <p className="text-xl md:text-2xl text-white/95 drop-shadow-md leading-relaxed mb-8">
                  Herrsching – Ihr perfekter Ausgangspunkt für unvergessliche Erlebnisse
                </p>
                
                {/* Navigation Dots */}
                <div className="flex justify-center gap-2">
                  {erlebenImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentImageIndex 
                          ? 'bg-white w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Bild ${index + 1} anzeigen`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info-Leiste direkt unter dem Hero */}
        <section className="py-8 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Train className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">10 Min. zur S-Bahn</p>
                <p className="text-sm text-text-primary/60">München in 45 Min.</p>
              </div>
              <div className="text-center">
                <Waves className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">30 Sek. zum Ammersee</p>
                <p className="text-sm text-text-primary/60">Zweite Reihe am See</p>
              </div>
              <div className="text-center">
                <Mountain className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">Alpen-Panorama</p>
                <p className="text-sm text-text-primary/60">Traumhafte Aussicht</p>
              </div>
              <div className="text-center">
                <Bike className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">Fünf-Seen-Land</p>
                <p className="text-sm text-text-primary/60">Rad- & Wanderparadies</p>
              </div>
            </div>
          </div>
        </section>

        {/* Hauptaktivitäten - Strukturiert mit Bullet Points */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
              Was Sie hier erwartet
            </h2>
            <p className="text-center text-text-primary/70 mb-4 max-w-2xl mx-auto">
              Entdecken Sie die Vielfalt der Region – vom See bis zu den Bergen
            </p>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Buchen Sie Ihre{" "}
              <Link href="/wohnen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                Unterkunft am Ammersee
              </Link>{" "}
              und erleben Sie unvergessliche Momente.
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ammersee */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                    <Waves className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-3xl text-forest">Der Ammersee</h3>
                </div>
                
                <p className="text-text-primary/80 mb-6">
                  Traumhafter Voralpensee direkt vor der Haustür
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Sailboat className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Dampferfahrten</strong>
                      <p className="text-sm text-text-primary/70">Rundfahrten nach Dießen, Utting und rund um den See</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Baden & Wassersport</strong>
                      <p className="text-sm text-text-primary/70">Strandbäder, Segeln, SUP, Surfen</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Footprints className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Längste Seepromenade Deutschlands</strong>
                      <p className="text-sm text-text-primary/70">Spaziergänge mit Alpenblick</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    ⏱️ Nur 5 Gehminuten vom{" "}
                    <Link href="/ueber-uns" className="hover:underline">
                      Sonnenhof
                    </Link>
                  </p>
                </div>
              </Card>

              {/* Wandern */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                    <Mountain className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-3xl text-forest">Wandern</h3>
                </div>
                
                <p className="text-text-primary/80 mb-6">
                  Zahlreiche Wanderwege für jeden Anspruch
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Church className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Kloster Andechs</strong>
                      <p className="text-sm text-text-primary/70">4,5 km durch den Wald, Biergarten mit Alpenblick</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <TreePine className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Kiental</strong>
                      <p className="text-sm text-text-primary/70">Romantisches Naturjuwel, idyllische Waldwege</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mountain className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Hügelige Moränenlandschaft</strong>
                      <p className="text-sm text-text-primary/70">Markierte Wege mit herrlichen Ausblicken</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    🏔️ Alpen in 1 Stunde erreichbar
                  </p>
                </div>
              </Card>

              {/* Radfahren */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                    <Bike className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-3xl text-forest">Radfahren</h3>
                </div>
                
                <p className="text-text-primary/80 mb-6">
                  Paradies für Radler im Fünf-Seen-Land
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Bike className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Ammersee-Rundweg</strong>
                      <p className="text-sm text-text-primary/70">47 km meist flach, ständiger Seeblick</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Fünf-Seen-Land</strong>
                      <p className="text-sm text-text-primary/70">Touren zu Starnberger See, Wörthsee, Pilsensee</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Bestens ausgebaute Radwege</strong>
                      <p className="text-sm text-text-primary/70">Durch sanfte Hügel und malerische Dörfer</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    🚲 E-Bike-Verleih in Herrsching
                  </p>
                </div>
              </Card>

              {/* München & Ausflugsziele */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                    <Train className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-3xl text-forest">Ausflugsziele</h3>
                </div>
                
                <p className="text-text-primary/80 mb-6">
                  Perfekte Anbindung zu allen Highlights
                </p>

                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Train className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">München mit S8</strong>
                      <p className="text-sm text-text-primary/70">45 Min. zum Marienplatz, direkt zum Flughafen</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Mountain className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Königsschlösser</strong>
                      <p className="text-sm text-text-primary/70">Neuschwanstein & Linderhof in 1 Stunde</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-forest">Garmisch & Zugspitze</strong>
                      <p className="text-sm text-text-primary/70">Berge und Wintersport in 1 Stunde</p>
                    </div>
                  </li>
                </ul>

                <div className="mt-6 pt-6 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    🚉 5 Min. zu Fuß zum S-Bahnhof
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Wanderungen - Detaillierte Routenbeschreibungen */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
              Die besten Wanderungen ab Herrsching
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Direkt vom Sonnenhof starten Sie in die schönsten Wanderrouten
              der Region – für jeden Anspruch ist etwas dabei.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Kiental → Kloster Andechs */}
              <Card className="bg-white border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Church className="w-8 h-8 text-wood" />
                  <h3 className="font-serif text-2xl text-forest">
                    Kiental → Kloster Andechs
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    5 km
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    ca. 1,5 Std.
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-wood/20 text-wood text-sm rounded-full font-medium">
                    mittel
                  </span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">
                  Durch das romantische Kiental wandern Sie auf idyllischen
                  Waldwegen hinauf zum berühmten Kloster Andechs. Der Weg
                  führt durch schattige Buchenwälder und belohnt Sie am Ziel
                  mit dem legendären Biergarten und einem atemberaubenden
                  Alpenpanorama. Der Aufstieg ist moderat und auch für
                  gelegentliche Wanderer gut machbar.
                </p>
                <div className="mt-4 pt-4 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    Highlight: Biergarten mit Alpenblick am Ziel
                  </p>
                </div>
              </Card>

              {/* Ammersee-Westufer Weg */}
              <Card className="bg-white border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Waves className="w-8 h-8 text-wood" />
                  <h3 className="font-serif text-2xl text-forest">
                    Ammersee-Westufer Weg
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    10 km
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    ca. 3 Std.
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    leicht
                  </span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">
                  Entlang des malerischen Westufers des Ammersees wandern Sie
                  auf meist flachen Wegen von Herrsching Richtung Dießen.
                  Der Weg bietet ständigen Seeblick, schattige Waldpassagen
                  und idyllische Badestellen zum Abkühlen unterwegs. Ideal
                  für eine gemütliche Halbtageswanderung mit der Familie.
                </p>
                <div className="mt-4 pt-4 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    Highlight: Badestellen mit Seeblick entlang des Weges
                  </p>
                </div>
              </Card>

              {/* Panoramaweg Herrsching */}
              <Card className="bg-white border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Mountain className="w-8 h-8 text-wood" />
                  <h3 className="font-serif text-2xl text-forest">
                    Panoramaweg Herrsching
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    3 km
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    ca. 1 Std.
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    leicht
                  </span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">
                  Der kurze Panoramaweg ist perfekt für einen entspannten
                  Nachmittagsspaziergang. Er führt über die Höhen von Herrsching
                  und bietet herrliche Ausblicke auf den Ammersee und bei klarer
                  Sicht bis zu den Alpen. Besonders bei Föhnlage ist das
                  Bergpanorama spektakulär.
                </p>
                <div className="mt-4 pt-4 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">
                    Highlight: Alpenpanorama bei Föhn
                  </p>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Radtouren am Ammersee */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
              Radtouren am Ammersee
            </h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Das Fünfseenland ist ein Paradies für Radfahrer – bestens
              ausgebaute Wege durch sanfte Hügellandschaft und immer mit Seeblick.
            </p>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {/* Ammersee-Rundweg */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Bike className="w-8 h-8 text-wood" />
                  <h3 className="font-serif text-2xl text-forest">
                    Ammersee-Rundweg
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    46 km
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    3–4 Std.
                  </span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">
                  Die beliebteste Radtour der Region führt einmal komplett
                  um den Ammersee. Meist flach und auf gut ausgebauten
                  Radwegen, passieren Sie malerische Orte wie Dießen, Utting
                  und Schondorf. Zahlreiche Biergärten und Badestellen laden
                  zu gemütlichen Pausen ein.
                </p>
              </Card>

              {/* Herrsching – Dießen – Andechs */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Bike className="w-8 h-8 text-wood" />
                  <h3 className="font-serif text-2xl text-forest">
                    Herrsching – Dießen – Andechs
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    25 km
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">
                    ca. 2 Std.
                  </span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">
                  Diese abwechslungsreiche Rundtour verbindet die Highlights
                  der Region: Vom Ammersee-Ufer über das Künstlerstädtchen
                  Dießen hinauf zum Kloster Andechs und zurück nach Herrsching.
                  Die Strecke hat einige Steigungen, belohnt aber mit
                  traumhaften Ausblicken.
                </p>
              </Card>
            </div>

            <div className="text-center mt-10">
              <p className="text-text-primary/70">
                Ausführliche Routenbeschreibungen und Tipps finden Sie in unserem{" "}
                <Link
                  href="/blog/radtour-ammersee-unterkunft"
                  className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2"
                >
                  Radtour-Guide am Ammersee
                </Link>.
              </p>
            </div>
          </div>
        </section>

        {/* Ausflüge in die Region */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
              Ausflüge in die Region
            </h2>
            <p className="text-center text-text-primary/70 mb-4 max-w-2xl mx-auto">
              Herrsching ist der ideale Ausgangspunkt für Tagesausflüge – ob
              Kultur, Natur oder Großstadt.
            </p>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              Entdecken Sie das{" "}
              <Link
                href="/blog/ferienwohnung-fuenfseenland"
                className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2"
              >
                Fünfseenland und seine Highlights
              </Link>.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Kloster Andechs */}
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Church className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">
                  Kloster Andechs
                </h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">3 km entfernt</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">
                  Der {'\u201E'}Heilige Berg{'\u201C'} mit Wallfahrtskirche, Brauerei und
                  legendärem Biergarten mit Alpenpanorama.
                </p>
              </Card>

              {/* Starnberger See */}
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Waves className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">
                  Starnberger See
                </h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">20 km entfernt</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">
                  Der berühmte Nachbarsee mit Schloss Berg, Roseninsel und
                  zahlreichen Bademöglichkeiten.
                </p>
              </Card>

              {/* München Innenstadt */}
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Train className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">
                  München Innenstadt
                </h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">45 Min. mit S8</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">
                  Direkte S-Bahn-Verbindung zum Marienplatz – Museen,
                  Shopping und Biergärten der Landeshauptstadt.
                </p>
              </Card>

              {/* Schloss Neuschwanstein */}
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Sparkles className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">
                  Schloss Neuschwanstein
                </h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">90 Min. Fahrt</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">
                  Das weltberühmte Märchenschloss von König Ludwig II. –
                  ein unvergesslicher Tagesausflug.
                </p>
              </Card>
            </div>

            <div className="text-center mt-10">
              <p className="text-text-primary/70">
                Alle Ausflugsziele im Detail:{" "}
                <Link
                  href="/blog/ausflugsziele-herrsching-ammersee"
                  className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2"
                >
                  Ausflugsziele rund um Herrsching am Ammersee
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Blog-Tipps */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">
              Passende Tipps für Ihren Aufenthalt
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { href: "/blog/ausflugsziele-herrsching-ammersee", title: "Ausflugsziele rund um Herrsching" },
                { href: "/blog/radtour-ammersee-unterkunft", title: "Radtour & Baden am Ammersee" },
                { href: "/blog/ferienwohnung-fuenfseenland", title: "Das Fünfseenland entdecken" },
              ].map((post) => (
                <Link key={post.href} href={post.href} className="group">
                  <Card className="p-6 bg-stone border-none hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
                    <h3 className="font-serif text-lg text-forest group-hover:text-wood transition-colors mb-4">
                      {post.title}
                    </h3>
                    <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 text-sm transition-colors">
                      Weiterlesen <ArrowRight className="w-4 h-4" />
                    </span>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ
          items={extractFaqItems(erlebenSchemas[1])}
          heading="Häufige Fragen zu Herrsching & Ammersee"
          subheading="Alles Wichtige für Ihren Aufenthalt in der Region"
        />

        {/* Final CTA Section */}
        <section className="py-24 px-6 bg-gradient-to-b from-stone to-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                Ihr perfekter Rückzugsort
              </h2>
              <p className="text-xl text-text-primary/80 leading-relaxed max-w-3xl mx-auto">
                Nach einem erlebnisreichen Tag am See, beim Wandern oder Radfahren freuen Sie sich 
                auf Ihre gemütliche Unterkunft im Sonnenhof.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="bg-white border-2 border-forest/20 p-6 hover:border-forest/40 transition-colors">
                <h3 className="font-serif text-2xl text-forest mb-3">Ferienwohnungen</h3>
                <p className="text-text-primary/80 mb-4">
                  Komplett ausgestattet mit Küche, Balkon oder Terrasse. 
                  Perfekt für längere Aufenthalte und Familien.
                </p>
                <Button asChild className="w-full bg-forest hover:bg-forest/90">
                  <Link href="/wohnen/ferienwohnungen">Ferienwohnungen ansehen</Link>
                </Button>
              </Card>

              <Card className="bg-white border-2 border-forest/20 p-6 hover:border-forest/40 transition-colors">
                <h3 className="font-serif text-2xl text-forest mb-3">Gästezimmer</h3>
                <p className="text-text-primary/80 mb-4">
                  Gemütliche Zimmer mit eigenem Bad und Zugang zur Teeküche. 
                  Ideal für Kurzaufenthalte und Städtetrips.
                </p>
                <Button asChild variant="outline" className="w-full border-forest text-forest hover:bg-forest/10">
                  <Link href="/wohnen/zimmer">Gästezimmer ansehen</Link>
                </Button>
              </Card>
            </div>

            <div className="text-center">
              <p className="text-text-primary/60 mb-4">Oder direkt anfragen:</p>
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600">
                <Link href="/kontakt">Unverbindlich anfragen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Praktische Infos */}
        <section className="py-16 px-6 bg-amber-50/30">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif text-3xl text-forest mb-8 text-center">
              Praktische Informationen
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-none p-6">
                <Clock className="w-8 h-8 text-wood mb-4" />
                <h4 className="font-semibold text-forest mb-3">Beste Reisezeit</h4>
                <p className="text-text-primary/80 text-sm">
                  <strong>Hauptsaison:</strong> Juni bis Oktober<br />
                  Perfekt für Baden, Wandern und Radfahren
                </p>
              </Card>
              
              <Card className="bg-white border-none p-6">
                <MapPin className="w-8 h-8 text-wood mb-4" />
                <h4 className="font-semibold text-forest mb-3">Entfernungen</h4>
                <ul className="text-sm text-text-primary/80 space-y-1">
                  <li>• Ammersee: 5 Min. zu Fuß</li>
                  <li>• S-Bahnhof: 5 Min. zu Fuß</li>
                  <li>• Kloster Andechs: 4,5 km</li>
                  <li>• München: 45 Min. mit S8</li>
                </ul>
              </Card>
              
              <Card className="bg-white border-none p-6">
                <Coffee className="w-8 h-8 text-wood mb-4" />
                <h4 className="font-semibold text-forest mb-3">Vor Ort</h4>
                <ul className="text-sm text-text-primary/80 space-y-1">
                  <li>• Bäcker: 5 Min. zu Fuß</li>
                  <li>• Supermarkt: 10 Min. zu Fuß</li>
                  <li>• Restaurants & Cafés</li>
                  <li>• E-Bike-Verleih</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
