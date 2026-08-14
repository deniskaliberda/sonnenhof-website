"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';

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
  const t = useTranslations('ErlebenPage');

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
    <section className="relative bg-stone">
      <div className="relative w-full" style={{ height: '56vh', minHeight: '420px' }}>
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
        <div className="absolute inset-0 bg-[rgba(28,40,30,0.52)]" />

        <div className="absolute inset-0 flex items-center px-6 md:px-12">
          <div className="max-w-7xl mx-auto w-full">
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] text-[#FBF6EC] mb-5 leading-[1.05] max-w-3xl">
              {t('heroTitle')}
            </h1>
            <p className="text-lg md:text-xl text-[#EFE7D6]/90 leading-relaxed mb-8 max-w-2xl">
              {t('heroSubtitle')}
            </p>

            <div className="flex gap-0">
              {erlebenImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentImageIndex(index);
                    setLoadedIndices((prev) => new Set(prev).add(index));
                  }}
                  className="flex items-center justify-center w-7 h-7"
                  aria-label={t('showImage', { index: index + 1 })}
                >
                  <span className={`block h-2 rounded-full transition-all ${
                    index === currentImageIndex
                      ? 'bg-[#FBF6EC] w-8'
                      : 'bg-[#FBF6EC]/50 hover:bg-[#FBF6EC]/75 w-2'
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
