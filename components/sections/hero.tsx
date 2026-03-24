"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useTranslations } from 'next-intl';
import { googleRating } from "@/lib/mock-data";

const heroImages = [
  {
    src: "/images/hero/hero-ammersee.jpg",
    alt: "Ammersee mit Alpenpanorama",
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAH/xAAcEAEAAgEFAAAAAAAAAAAAAAABAAIDERNRgZH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFhEBAQEAAAAAAAAAAAAAAAAAAQAC/9oADAMBAAIRAxEAPwCmYA1sPUm/Tk8iINMMl//Z",
  },
  {
    src: "/images/hero/hero-ammersee2.jpg",
    alt: "Ammersee Sonnenuntergang",
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAME/8QAGxAAAwACAwAAAAAAAAAAAAAAAAECAyEEEWH/xAAUAQEAAAAAAAAAAAAAAAAAAAAC/8QAFREBAQAAAAAAAAAAAAAAAAAAABH/2gAMAwEAAhEDEQA/AM2DkSn3TfhK8yd097YAIdf/2Q==",
  },
  {
    src: "/images/hero/hero-sonnenhof.jpg",
    alt: "Sonnenhof Herrsching",
    blurDataURL: "data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAID/8QAHBAAAQUAAwAAAAAAAAAAAAAAAQACAxEhEhNB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AM3Ol7Q7k4U7ATVKDHuzC/dKIpLo/9k=",
  },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set([0]));
  const t = useTranslations('Hero');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const next = (prevIndex + 1) % heroImages.length;
        setLoadedIndices((prev) => new Set(prev).add(next));
        return next;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          loadedIndices.has(index) && (
            <Image
              key={image.src}
              src={image.src}
              alt={image.alt}
              fill
              className={`object-cover absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
              priority={index === 0}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              placeholder="blur"
              blurDataURL={image.blurDataURL}
              sizes="100vw"
            />
          )
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/20 to-forest/60" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg">
          {t('heading')}
        </h1>

        <div className="inline-flex items-center gap-2 mb-8 bg-amber-50/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-amber-200/50">
          <span className="text-lg text-amber-500" aria-label={`${googleRating.score} von ${googleRating.maxScore} Sternen`}>
            ★★★★<span className="relative inline-block" style={{ width: "1em" }}><span className="text-amber-200">★</span><span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>★</span></span>
          </span>
          <span className="text-forest font-semibold text-sm">
            {t('ratingLabel', { score: googleRating.score.toLocaleString("de-DE"), count: googleRating.reviewCount })}
          </span>
        </div>

        <p className="text-lg text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
          {t('subheading')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            asChild
            size="lg"
            className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-10 py-7 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/kontakt">{t('ctaPrimary')}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-white text-white bg-forest/30 hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
          >
            <Link href="/wohnen">{t('ctaSecondary')}</Link>
          </Button>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
