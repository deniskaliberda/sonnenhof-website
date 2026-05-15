'use client';

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import { Menu, X } from "lucide-react";
import { LanguageSwitcher, LanguageSwitcherHero } from "./language-switcher";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = useNextPathname();
  const t = useTranslations('Navigation');

  const isHomePage = pathname === '/' || pathname === '/en';
  // Hide language switcher on German-only pages (DE blog, datenschutz, impressum, unterkunft).
  // The EN blog (/en/blog) keeps the switcher visible since it has a translated index.
  const isEnglish = pathname?.startsWith('/en') ?? false;
  const isGermanOnly =
    (pathname?.startsWith('/blog') && !isEnglish) ||
    pathname?.startsWith('/unterkunft') ||
    pathname === '/datenschutz' ||
    pathname === '/impressum';
  const blogHref = isEnglish ? '/en/blog' : '/blog';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showSolidBackground = !isHomePage || isScrolled;

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      key="navigation-v2"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidBackground
          ? 'bg-white shadow-md border-b border-stone/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`font-serif text-3xl font-bold tracking-wide transition-colors ${
              showSolidBackground ? 'text-forest' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
            }`}
          >
            SONNENHOF
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('home')}
            </Link>
            <Link
              href="/wohnen/ferienwohnungen"
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('apartments')}
            </Link>
            <Link
              href="/wohnen/zimmer"
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('rooms')}
            </Link>
            <Link
              href="/preise"
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('pricing')}
            </Link>
            <Link
              href="/erleben"
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('experiences')}
            </Link>
            <a
              href={blogHref}
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('blog')}
            </a>
            <Link
              href="/kontakt"
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood'
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              {t('contact')}
            </Link>

            {/* Language Switcher */}
            {!isGermanOnly && (
              showSolidBackground ? (
                <LanguageSwitcher />
              ) : (
                <LanguageSwitcherHero />
              )
            )}

            {/* CTA Button */}
            <Link
              href="/kontakt"
              className={`px-6 py-2.5 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl ${
                showSolidBackground
                  ? 'bg-forest text-white hover:bg-wood'
                  : 'bg-white text-forest hover:bg-wood hover:text-white'
              }`}
            >
              {t('inquire')}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              showSolidBackground
                ? 'text-forest hover:bg-forest/10'
                : 'text-white hover:bg-white/10'
            }`}
            aria-label={t('menu')}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/"
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/wohnen/ferienwohnungen"
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('apartments')}
            </Link>
            <Link
              href="/wohnen/zimmer"
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('rooms')}
            </Link>
            <Link
              href="/preise"
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('pricing')}
            </Link>
            <Link
              href="/erleben"
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('experiences')}
            </Link>
            <a
              href={blogHref}
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('blog')}
            </a>
            <Link
              href="/kontakt"
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              {t('contact')}
            </Link>
            {!isGermanOnly && (
              <div className="py-2">
                <LanguageSwitcher />
              </div>
            )}
            <Link
              href="/kontakt"
              className="block w-full text-center px-6 py-3 rounded-lg bg-forest text-white hover:bg-wood font-medium transition-colors mt-4"
            >
              {t('inquire')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
