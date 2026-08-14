"use client";

import { Link } from "@/i18n/navigation";
import Image from "next/image";
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
    <section className="relative min-h-[560px] md:min-h-[680px] flex flex-col justify-end">
      <div className="absolute inset-0 overflow-hidden">
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
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,40,30,0.34),rgba(28,40,30,0.08)_38%,rgba(28,40,30,0.66))]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pb-14 md:pb-[70px] pt-40">
        <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] leading-[1.06] text-[#FBF6EC] max-w-3xl [text-shadow:0_2px_24px_rgba(0,0,0,0.30)]">
          {t('heading')}
        </h1>

        <p className="text-base md:text-lg leading-relaxed text-[#F0E9DA] max-w-xl mt-6 mb-8 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
          {t('subheading')}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
          <Link
            href="/kontakt"
            className="inline-flex justify-center items-center bg-wood text-[#241B0F] text-[15px] font-semibold px-8 py-4 rounded-md hover:bg-[#D3AC6E] transition-colors"
          >
            {t('ctaPrimary')}
          </Link>
          <Link
            href="/wohnen"
            className="inline-flex justify-center items-center border border-[#F0E9DA]/60 text-[#FBF6EC] text-[15px] font-medium px-8 py-4 rounded-md hover:bg-white/10 transition-colors"
          >
            {t('ctaSecondary')}
          </Link>
          <span className="flex items-center gap-2.5 text-[#F0E9DA] text-sm">
            <span className="text-[#F0C868] text-[15px] tracking-[1px]" aria-label={`${googleRating.score} von ${googleRating.maxScore} Sternen`}>
              ★★★★★
            </span>
            {t('ratingLabel', { score: googleRating.score.toLocaleString("de-DE"), count: googleRating.reviewCount })}
          </span>
        </div>
      </div>
    </section>
  );
}
