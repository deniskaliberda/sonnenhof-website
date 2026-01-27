"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  // Hero Images Rotation
  const heroImages = [
    { src: "/images/hero/hero-ammersee.jpg", alt: "Ammersee mit Alpenpanorama" },
    { src: "/images/hero/hero-ammersee2.jpg", alt: "Ammersee Sonnenuntergang" },
    { src: "/images/hero/hero-sonnenhof.jpg", alt: "Sonnenhof Herrsching" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        (prevIndex + 1) % heroImages.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  // Verified Benefits - derived from real guest feedback
  const verifiedBenefits = [
    "Traumhafte Lage am See",
    "Hundefreundlich & familiär",
    "Faire Preise",
  ];

  return (
    <section className="relative h-screen flex items-center justify-center">
      {/* Hero Images - Rotating */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <img
            key={image.src}
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-1000 ${
              index === currentImageIndex ? 'opacity-100' : 'opacity-0'
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-forest/40 via-forest/20 to-forest/60" />
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* H1 - Service + Location for Local SEO */}
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 drop-shadow-lg">
          Ferienwohnungen & Zimmer direkt am Ammersee
        </h1>
        
        {/* ============================================
            TRUST BADGE - Social Proof Above the Fold
            Position: Below H1, Above CTA Buttons
            Purpose: Answer "Why should I book here?" instantly
            ============================================ */}
        <div className="inline-block mb-8">
          <div className="bg-amber-50/95 backdrop-blur-sm rounded-2xl px-6 py-5 shadow-xl border border-amber-200/50">
            {/* 5-Star Visual + Authority Statement */}
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-2xl text-amber-500" aria-label="5 von 5 Sternen">★★★★★</span>
              <span className="text-forest font-semibold text-lg">Gästeliebling am Ammersee</span>
            </div>
            
            {/* Verified Benefits - The "Why" (answers user's implicit question) */}
            <ul className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-2 text-sm">
              {verifiedBenefits.map((benefit, index) => (
                <li key={index} className="flex items-center justify-center sm:justify-start gap-2 text-forest/80">
                  <Check className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Supporting Text */}
        <p className="text-lg text-white/90 mb-8 drop-shadow-md max-w-2xl mx-auto">
          Hunde und Kinder herzlich willkommen – nur wenige Schritte vom See!
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
