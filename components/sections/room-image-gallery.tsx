"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface RoomImageGalleryProps {
  images: { src: string; alt: string }[];
}

export function RoomImageGallery({ images }: RoomImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalImages = images.length;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalImages - 1 : prev - 1));
  };

  return (
    <div className="relative bg-black">
      <div className="relative h-80 md:h-full min-h-[400px]">
        <Image
          src={images[currentIndex].src}
          alt={images[currentIndex].alt}
          fill
          className="object-cover"
          quality={85}
          sizes="(max-width: 768px) 100vw, 50vw"
        />

        {totalImages > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
              aria-label="Vorheriges Bild"
            >
              <ChevronLeft className="w-6 h-6 text-forest" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-all shadow-lg"
              aria-label="Nächstes Bild"
            >
              <ChevronRight className="w-6 h-6 text-forest" />
            </button>
          </>
        )}

        <div className="absolute top-4 right-4 bg-forest/80 backdrop-blur-sm px-3 py-1 rounded-full text-white text-sm">
          {currentIndex + 1} / {totalImages}
        </div>
      </div>

      {totalImages > 1 && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {images.map((image, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all relative ${
                  idx === currentIndex
                    ? 'border-white shadow-lg scale-110'
                    : 'border-white/30 hover:border-white/60 opacity-70 hover:opacity-100'
                }`}
              >
                <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="80px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
