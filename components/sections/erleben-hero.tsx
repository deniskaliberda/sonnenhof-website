"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

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

export function ErlebenHero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set([0]));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const next = (prevIndex + 1) % erlebenImages.length;
        setLoadedIndices((prev) => new Set(prev).add(next));
        return next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-white">
      <div className="relative w-full" style={{ height: '70vh', minHeight: '500px' }}>
        {erlebenImages.map((image, index) => (
          loadedIndices.has(index) && (
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
                loading={index === 0 ? "eager" : "lazy"}
                quality={85}
                sizes="100vw"
              />
            </div>
          )
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-transparent to-forest/60" />

        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg leading-tight">
              Herrsching & Ammersee erleben – Ihre Urlaubsregion
            </h1>
            <p className="text-xl md:text-2xl text-white/95 drop-shadow-md leading-relaxed mb-8">
              Herrsching – Ihr perfekter Ausgangspunkt für unvergessliche Erlebnisse
            </p>

            <div className="flex justify-center gap-0">
              {erlebenImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLoadedIndices((prev) => new Set(prev).add(index));
                  }}
                  className="flex items-center justify-center w-7 h-7"
                  aria-label={`Bild ${index + 1} anzeigen`}
                >
                  <span className={`block h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-white w-8'
                      : 'bg-white/50 hover:bg-white/75 w-2'
                  }`} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
