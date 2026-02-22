"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

const heroImages = [
  { src: "/images/hero/hero-ammersee.jpg", alt: "Ammersee mit Alpenpanorama" },
  { src: "/images/hero/hero-ammersee2.jpg", alt: "Ammersee Sonnenuntergang" },
  { src: "/images/hero/hero-sonnenhof.jpg", alt: "Sonnenhof Herrsching" },
];

export function Hero() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [loadedIndices, setLoadedIndices] = useState<Set<number>>(new Set([0]));

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => {
        const next = (prevIndex + 1) % heroImages.length;
        setLoadedIndices((prev) => new Set(prev).add(next));
        return next;
      });
    }, 5000);

    // Preload remaining images after initial paint
    const preloadTimer = setTimeout(() => {
      setLoadedIndices(new Set(heroImages.map((_, i) => i)));
    }, 2000);

    return () => {
      clearInterval(interval);
      clearTimeout(preloadTimer);
    };
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Hero Images - Rotating */}
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
              quality={80}
              sizes="100vw"
            />
          )
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/20 to-forest/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* H1 - Service + Location for Local SEO */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg">
          Ihre Pension & Ferienwohnung in Herrsching am Ammersee
        </h1>
        
        {/* ============================================
            TRUST BADGE - Social Proof Above the Fold
            Position: Below H1, Above CTA Buttons
            Purpose: Answer "Why should I book here?" instantly
            ============================================ */}
        {/* Kompakte Trust Badge */}
        <div className="inline-flex items-center gap-2 mb-8 bg-amber-50/90 backdrop-blur-sm rounded-full px-5 py-2.5 shadow-lg border border-amber-200/50">
          <span className="text-lg text-amber-500" aria-label="5 von 5 Sternen">★★★★★</span>
          <span className="text-forest font-semibold text-sm">Gästeliebling am Ammersee</span>
        </div>
        
        {/* Supporting Text */}
        <p className="text-lg text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
          Familiengeführte Unterkunft mit 5 Ferienwohnungen & 7 Gästezimmern – nur wenige Schritte vom See
        </p>
        
        {/* CTA Buttons - Primary action most prominent (Goal Completion) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-amber-500 hover:bg-amber-600 text-white text-lg px-10 py-7 font-semibold shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/kontakt">Unverbindlich anfragen</Link>
          </Button>
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-2 border-white text-white bg-forest/30 hover:bg-white/20 backdrop-blur-sm text-lg px-8 py-6"
          >
            <Link href="/wohnen">Unterkünfte entdecken</Link>
          </Button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-white rounded-full" />
        </div>
      </div>
    </section>
  );
}
