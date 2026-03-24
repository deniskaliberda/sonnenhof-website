"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getFerienwohnungen, getZimmer } from "@/lib/mock-data";
import { useTranslations } from 'next-intl';
import { useState, useEffect } from "react";

export function Accommodations() {
  const ferienwohnungen = getFerienwohnungen();
  const zimmer = getZimmer();
  const t = useTranslations('Accommodations');

  const ferienwohnungenImages = ferienwohnungen.map(fewo => ({
    src: fewo.images[0]?.src || '/images/hero/hero-sonnenhof.jpg',
    alt: fewo.title,
  }));

  const zimmerImages = zimmer.map(room => {
    const mainImage = room.images.find(img => !img.src.includes('bad')) || room.images[0];
    return {
      src: mainImage?.src || '/images/hero/hero-sonnenhof.jpg',
      alt: room.title,
    };
  });

  const [currentFerienwohnungIndex, setCurrentFerienwohnungIndex] = useState(0);
  const [currentZimmerIndex, setCurrentZimmerIndex] = useState(0);
  const [loadedFewoIndices, setLoadedFewoIndices] = useState<Set<number>>(new Set([0]));
  const [loadedZimmerIndices, setLoadedZimmerIndices] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFerienwohnungIndex((prevIndex) => {
        const next = (prevIndex + 1) % ferienwohnungenImages.length;
        setLoadedFewoIndices((prev) => new Set(prev).add(next));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [ferienwohnungenImages.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentZimmerIndex((prevIndex) => {
        const next = (prevIndex + 1) % zimmerImages.length;
        setLoadedZimmerIndices((prev) => new Set(prev).add(next));
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [zimmerImages.length]);

  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-6">
          {t('heading')}
        </h2>
        <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
          {t('subheading')}
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
            <div className="h-80 relative overflow-hidden">
              {ferienwohnungenImages.map((image, index) => (
                loadedFewoIndices.has(index) && (
                  <Image
                    key={`fewo-${index}`}
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
                      index === currentFerienwohnungIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )
              ))}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-forest/80 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white text-sm font-medium">
                    {ferienwohnungenImages[currentFerienwohnungIndex]?.alt}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-0">
                {ferienwohnungenImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFerienwohnungIndex(index)}
                    className="flex items-center justify-center w-7 h-7"
                    aria-label={t('showApartment', { index: index + 1 })}
                  >
                    <span className={`block w-2 rounded-full transition-all ${
                      index === currentFerienwohnungIndex
                        ? 'bg-white h-4'
                        : 'bg-white/50 hover:bg-white/75 h-2'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              <h3 className="font-serif text-3xl text-forest mb-2">
                {t('apartmentsTitle')}
              </h3>
              <p className="text-wood font-medium mb-4">{t('apartmentsPrice')}</p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                {t('apartmentsDescription')}
              </p>
              <Button
                asChild
                className="w-full bg-forest hover:bg-forest/90"
              >
                <Link href="/wohnen/ferienwohnungen">{t('viewApartments')}</Link>
              </Button>
            </div>
          </Card>

          <Card className="bg-white border-none shadow-lg rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl group">
            <div className="h-80 relative overflow-hidden">
              {zimmerImages.map((image, index) => (
                loadedZimmerIndices.has(index) && (
                  <Image
                    key={`zimmer-${index}`}
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
                      index === currentZimmerIndex ? 'opacity-100' : 'opacity-0'
                    }`}
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                )
              ))}
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-forest/80 backdrop-blur-sm rounded-lg px-4 py-2">
                  <p className="text-white text-sm font-medium">
                    {zimmerImages[currentZimmerIndex]?.alt}
                  </p>
                </div>
              </div>
              <div className="absolute top-2 right-2 flex flex-col gap-0">
                {zimmerImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentZimmerIndex(index)}
                    className="flex items-center justify-center w-7 h-7"
                    aria-label={t('showRoom', { index: index + 1 })}
                  >
                    <span className={`block w-2 rounded-full transition-all ${
                      index === currentZimmerIndex
                        ? 'bg-white h-4'
                        : 'bg-white/50 hover:bg-white/75 h-2'
                    }`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="p-8">
              <h3 className="font-serif text-3xl text-forest mb-2">
                {t('roomsTitle')}
              </h3>
              <p className="text-wood font-medium mb-4">{t('roomsPrice')}</p>
              <p className="text-lg text-text-primary/80 leading-relaxed mb-6">
                {t('roomsDescription')}
              </p>
              <Button
                asChild
                className="w-full bg-forest hover:bg-forest/90"
              >
                <Link href="/wohnen/zimmer">{t('viewRooms')}</Link>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
