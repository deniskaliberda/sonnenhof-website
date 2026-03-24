"use client";

import { useState, useEffect } from "react";
import { usePathname as useNextPathname } from "next/navigation";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export function StickyCTA() {
  const [visible, setVisible] = useState(false);
  const pathname = useNextPathname();
  const t = useTranslations('StickyCTA');

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (
    pathname === "/kontakt" ||
    pathname === "/en/contact" ||
    pathname === "/impressum" ||
    pathname === "/datenschutz" ||
    pathname.startsWith("/admin")
  ) {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="bg-wood px-4 py-3 pb-6 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]">
        <Link
          href="/kontakt"
          className="block w-full text-center bg-forest text-white font-semibold py-3 rounded-lg text-base hover:bg-forest/90 transition-colors"
        >
          {t('inquireNow')}
        </Link>
        <p className="text-center text-white/80 text-xs mt-1.5">
          {t('fromPrice')}
        </p>
      </div>
    </div>
  );
}
