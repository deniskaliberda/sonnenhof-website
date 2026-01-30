"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Bed, Coffee, Wifi, Sparkles, Dog, Car, Check, X } from "lucide-react";
import { getZimmer } from "@/lib/mock-data";
import { useState } from "react";

export default function ZimmerPage() {
  const zimmer = getZimmer();
  const [selectedImageIndex, setSelectedImageIndex] = useState<{[key: string]: number}>({});

  const ausstattung = [
    { icon: Bed, label: "Komfortable Betten" },
    { icon: Coffee, label: "Teeküche zur Selbstversorgung" },
    { icon: Wifi, label: "Kostenloses WLAN" },
    { icon: Sparkles, label: "Reinigung jeden 3. Tag" },
    { icon: Car, label: "Kostenloser Parkplatz" },
    { icon: Dog, label: "Hunde willkommen (10€/Nacht)" },
  ];

  return (
    <>
      <Navigation />
      <main className="pt-20">
        {/* Hero */}
        <section className="relative h-[70vh] flex items-center justify-center">
          <div className="absolute inset-0">
            <img
              src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer-2.jpg"
              alt="Gästezimmer Sonnenhof"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-forest/60 to-forest/40" />
          </div>
          
          <div className="relative z-10 text-center px-6 max-w-4xl">
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
              Unsere Gästezimmer
            </h1>
            <p className="text-xl md:text-2xl text-white mb-4">
              7 gemütliche Zimmer – Doppel- und Einzelzimmer, mit oder ohne Balkon
            </p>
            <p className="text-lg text-white/90 mb-8">
              Mindestübernachtung: 2 Nächte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg" 
                className="bg-white text-forest hover:bg-stone text-lg px-12 py-6"
              >
                <Link href="/kontakt">Jetzt anfragen</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Zimmerübersicht mit Preisen und Fotos */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
              Unsere Zimmer
            </h2>
            <p className="text-center text-text-primary/70 mb-12 max-w-2xl mx-auto">
              Alle Zimmer ohne Frühstück, mit eigenem Bad/Dusche/WC. 
              Zzgl. 2,00 € Kurtaxe pro Nacht und Erwachsenem.
            </p>

            <div className="space-y-12 mb-12">
              {zimmer.map((room) => {
                const mainImages = room.images.filter(img => !img.includes('bad'));
                const currentIndex = selectedImageIndex[room.id] || 0;
                const displayImages = room.images.slice(0, 6);
                
                return (
                  <Card key={room.id} className="bg-stone border-none rounded-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                      {/* Bildgalerie links */}
                      <div className="relative">
                        {mainImages.length > 0 && (
                          <div className="relative h-80 md:h-full">
                            <img
                              src={mainImages[currentIndex]}
                              alt={room.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Navigation Dots */}
                            {mainImages.length > 1 && (
                              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                                {mainImages.map((_, index) => (
                                  <button
                                    key={index}
                                    onClick={() => setSelectedImageIndex({...selectedImageIndex, [room.id]: index})}
                                    className={`w-2 h-2 rounded-full transition-all ${
                                      index === currentIndex 
                                        ? 'bg-white w-6' 
                                        : 'bg-white/50 hover:bg-white/75'
                                    }`}
                                    aria-label={`Bild ${index + 1} anzeigen`}
                                  />
                                ))}
                              </div>
                            )}
                            {/* Thumbnail Grid */}
                            {room.images.length > 1 && (
                              <div className="absolute top-4 right-4 flex flex-col gap-2">
                                {displayImages.slice(0, 3).map((img, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => {
                                      const actualIndex = mainImages.findIndex(mImg => mImg === img);
                                      if (actualIndex !== -1) {
                                        setSelectedImageIndex({...selectedImageIndex, [room.id]: actualIndex});
                                      }
                                    }}
                                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                                      img === mainImages[currentIndex]
                                        ? 'border-white shadow-lg'
                                        : 'border-white/30 hover:border-white/60'
                                    }`}
                                  >
                                    <img src={img} alt="" className="w-full h-full object-cover" />
                                  </button>
                                ))}
                                {room.images.length > 3 && (
                                  <div className="w-16 h-16 rounded-lg bg-forest/80 flex items-center justify-center text-white text-xs font-semibold">
                                    +{room.images.length - 3}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {/* Zimmerinfo rechts */}
                      <div className="p-8">
                        <h3 className="font-serif text-3xl text-forest mb-3">{room.title}</h3>
                        <p className="text-text-primary/70 mb-4">{room.shortDescription}</p>
                        
                        {/* Preise */}
                        <div className="flex flex-wrap gap-6 mb-6 pb-6 border-b border-forest/10">
                          <div>
                            <p className="text-sm text-text-primary/60 mb-1">Hauptsaison</p>
                            <p className="text-3xl font-semibold text-forest">{room.pricePerNight}€</p>
                            <p className="text-xs text-text-primary/60">pro Nacht</p>
                          </div>
                          <div>
                            <p className="text-sm text-text-primary/60 mb-1">Nebensaison</p>
                            <p className="text-3xl font-semibold text-wood">{room.pricePerNightLowSeason}€</p>
                            <p className="text-xs text-text-primary/60">pro Nacht</p>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="flex items-center gap-2">
                            <Bed className="w-5 h-5 text-forest" />
                            <span className="text-sm text-text-primary/80">{room.size} m²</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {room.hasBalcony ? (
                              <>
                                <Check className="w-5 h-5 text-green-600" />
                                <span className="text-sm text-text-primary/80">Mit Balkon</span>
                              </>
                            ) : (
                              <>
                                <X className="w-5 h-5 text-text-primary/30" />
                                <span className="text-sm text-text-primary/50">Ohne Balkon</span>
                              </>
                            )}
                          </div>
                        </div>

                        {/* Ausstattung */}
                        <div className="mb-6">
                          <h4 className="font-semibold text-forest mb-3 text-sm">Ausstattung:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {room.amenities.slice(0, 4).map((amenity, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-text-primary/70">
                                <Check className="w-4 h-4 text-wood flex-shrink-0" />
                                <span className="text-xs">{amenity.label}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <Button 
                          asChild
                          className="w-full bg-forest hover:bg-forest/90"
                        >
                          <Link href="/kontakt">Jetzt anfragen</Link>
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Card className="bg-forest/5 border-forest/20 p-6 rounded-xl">
              <h3 className="font-serif text-xl text-forest mb-4">Saisonzeiten</h3>
              <div className="grid md:grid-cols-2 gap-4 text-text-primary/80">
                <div>
                  <p className="font-semibold text-forest">Hauptsaison:</p>
                  <p>Mai, Juni, Juli, August, September, bis 10. Oktober</p>
                </div>
                <div>
                  <p className="font-semibold text-forest">Nebensaison:</p>
                  <p>Januar, Februar, März, April, ab 10. Oktober, November, Dezember</p>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Ausstattung */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Ausstattung & Service
            </h2>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {ausstattung.map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <p className="text-lg text-text-primary font-medium">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <Card className="bg-white border-none p-8 rounded-2xl">
              <h3 className="font-serif text-2xl text-forest mb-4">Was Sie erwartet:</h3>
              <div className="grid md:grid-cols-2 gap-6 text-text-primary/80">
                <div>
                  <h4 className="font-semibold text-forest mb-3">Zimmer</h4>
                  <ul className="space-y-2">
                    <li>• Doppel- oder Einzelbett</li>
                    <li>• Eigenes Bad/Dusche/WC</li>
                    <li>• Kostenloses WLAN</li>
                    <li>• Teils mit Balkon</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-forest mb-3">Service</h4>
                  <ul className="space-y-2">
                    <li>• Zimmerreinigung jeden 3. Tag</li>
                    <li>• Bettwäsche & Handtücher inkl.</li>
                    <li>• Kostenloser Parkplatz am Hof</li>
                    <li>• Hunde willkommen (10€/Nacht)</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Teeküche - ersetzt Frühstück */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
                Kaffee und Tee, wann immer Sie wollen
              </h2>
              <p className="text-lg text-text-primary/80">
                Unsere Teeküche im 1. Stock steht Ihnen rund um die Uhr zur Verfügung
              </p>
            </div>

            <Card className="bg-stone border-none p-8 rounded-2xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-serif text-2xl text-forest mb-4">Teeküche im 1. Stock</h3>
                  <p className="text-text-primary/80 mb-6">
                    Wir haben im 1. Stock eine kleine Teeküche, in der Sie sich selbst 
                    ein kleines Frühstück zubereiten können – oder Sie gehen in eines 
                    der vielen nahegelegenen Cafés und Bäckereien.
                  </p>
                  <ul className="space-y-3 text-text-primary/80">
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Kaffeemaschine</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Wasserkocher</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Kühlschrank</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Toaster</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-wood mt-1">✓</span>
                      <span>Mikrowelle</span>
                    </li>
                  </ul>
                </div>
                <div className="h-64 md:h-auto relative rounded-lg overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80"
                    alt="Teeküche"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Impressionen */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
              Impressionen aus unseren Zimmern
            </h2>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg"
                  alt="Doppelzimmer mit Balkon"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="/images/zimmer/doppelzimmer/dz-02-zimmer.jpg"
                  alt="Doppelzimmer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="/images/zimmer/doppelzimmer-balkon/dz-balkon-03-balkon.jpg"
                  alt="Balkon"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="h-64 relative rounded-lg overflow-hidden">
                <img
                  src="/images/zimmer/einzelzimmer/ez-01-zimmer.jpg"
                  alt="Einzelzimmer"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Zimmer anfragen
            </h2>
            <p className="text-lg text-text-primary/80 mb-4">
              Bitte fragen Sie an und fragen Sie nach. Sie sprechen immer mit der Chefin.
            </p>
            <p className="text-text-primary/60 mb-10">
              Mindestübernachtung: 2 Nächte
            </p>
            <Button 
              asChild 
              size="lg" 
              className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
            >
              <Link href="/kontakt">Jetzt persönlich anfragen</Link>
            </Button>
            
            <div className="mt-12 pt-12 border-t border-stone">
              <p className="text-text-primary/60 mb-4">Oder direkt anrufen:</p>
              <a 
                href="tel:+498152123456" 
                className="text-2xl font-semibold text-forest hover:text-wood transition-colors"
              >
                +49 (0) 8152 / 123 456
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
