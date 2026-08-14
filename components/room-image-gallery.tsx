"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface RoomPhotoGalleryProps {
  images: { src: string; alt: string }[];
  /** Badge text, e.g. "3 Fotos" */
  badgeLabel: string;
  /** Sizing classes for the clickable trigger area */
  className?: string;
  sizes?: string;
}

export function RoomPhotoGallery({
  images,
  badgeLabel,
  className = "h-[240px]",
  sizes = "(max-width: 768px) 100vw, 33vw",
}: RoomPhotoGalleryProps) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const total = images.length;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % total);
      if (e.key === "ArrowLeft") setIndex((i) => (i === 0 ? total - 1 : i - 1));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, total]);

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setIndex(0);
          setOpen(true);
        }}
        className={`relative block w-full cursor-pointer overflow-hidden text-left ${className}`}
        aria-label={badgeLabel}
      >
        <Image
          src={images[0].src}
          alt={images[0].alt}
          fill
          className="object-cover"
          quality={85}
          sizes={sizes}
        />
        <span className="absolute left-[14px] bottom-[14px] flex items-center gap-1.5 rounded-full bg-[rgba(28,40,30,0.80)] px-[13px] py-2 text-xs font-semibold text-[#F3EADA]">
          ▣ {badgeLabel}
        </span>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex flex-col bg-[rgba(20,28,22,0.94)]"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div
            className="flex items-center justify-between px-5 py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-sm text-[#F3EADA]">
              {index + 1} / {total}
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Schließen"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(243,234,218,0.14)] text-[#F3EADA] transition-colors hover:bg-[rgba(243,234,218,0.28)]"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div
            className="relative mx-4 mb-4 flex-1 md:mx-12"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[index].src}
              alt={images[index].alt}
              fill
              className="object-contain"
              quality={90}
              sizes="100vw"
            />
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i === 0 ? total - 1 : i - 1))}
                  aria-label="Vorheriges Bild"
                  className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(243,234,218,0.92)] text-forest shadow-lg transition-colors hover:bg-[#F3EADA]"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => setIndex((i) => (i + 1) % total)}
                  aria-label="Nächstes Bild"
                  className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-[rgba(243,234,218,0.92)] text-forest shadow-lg transition-colors hover:bg-[#F3EADA]"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </>
            )}
          </div>

          {total > 1 && (
            <div
              className="mx-auto mb-5 flex max-w-full gap-2 overflow-x-auto px-4 pb-1"
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((image, idx) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setIndex(idx)}
                  aria-label={image.alt}
                  className={`relative h-14 w-20 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all ${
                    idx === index
                      ? "border-gold"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
