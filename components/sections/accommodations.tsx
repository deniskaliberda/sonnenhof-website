"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
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
    <section className="bg-stone py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-11">
          <h2 className="font-serif font-medium text-3xl md:text-[44px] md:leading-[1.05] text-forest">
            {t('heading')}
          </h2>
          <p className="text-[#5A5142] mt-4 max-w-2xl leading-relaxed">
            {t('subheading')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <article className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(42,36,28,0.12)]">
            <div className="h-72 md:h-[340px] relative overflow-hidden">
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
                <div className="bg-forest-deep/80 backdrop-blur-sm rounded-md px-4 py-2">
                  <p className="text-[#EFE7D6] text-sm font-medium">
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

            <div className="px-8 pt-8 pb-9">
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                <h3 className="font-serif font-semibold text-2xl md:text-[28px] text-forest">
                  {t('apartmentsTitle')}
                </h3>
                <span className="text-[13px] font-semibold text-wood-dark">
                  {t('apartmentsPrice')}
                </span>
              </div>
              <p className="text-[15px] leading-[1.65] text-[#5A5142] mt-3 mb-6">
                {t('apartmentsDescription')}
              </p>
              <Link
                href="/wohnen/ferienwohnungen"
                className="flex w-full justify-center items-center bg-forest text-stone text-[15px] font-medium px-6 py-3 rounded-md hover:bg-forest-deep transition-colors"
              >
                {t('viewApartments')}
              </Link>
            </div>
          </article>

          <article className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_30px_rgba(42,36,28,0.12)]">
            <div className="h-72 md:h-[340px] relative overflow-hidden">
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
                <div className="bg-forest-deep/80 backdrop-blur-sm rounded-md px-4 py-2">
                  <p className="text-[#EFE7D6] text-sm font-medium">
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

            <div className="px-8 pt-8 pb-9">
              <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                <h3 className="font-serif font-semibold text-2xl md:text-[28px] text-forest">
                  {t('roomsTitle')}
                </h3>
                <span className="text-[13px] font-semibold text-wood-dark">
                  {t('roomsPrice')}
                </span>
              </div>
              <p className="text-[15px] leading-[1.65] text-[#5A5142] mt-3 mb-6">
                {t('roomsDescription')}
              </p>
              <Link
                href="/wohnen/zimmer"
                className="flex w-full justify-center items-center bg-forest text-stone text-[15px] font-medium px-6 py-3 rounded-md hover:bg-forest-deep transition-colors"
              >
                {t('viewRooms')}
              </Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
