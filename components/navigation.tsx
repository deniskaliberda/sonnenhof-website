'use client';

import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { usePathname as useNextPathname } from "next/navigation";
import { useTranslations } from 'next-intl';
import Image from "next/image";
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

  const linkClass = showSolidBackground
    ? 'text-[#4A4234] hover:text-forest transition-colors'
    : 'text-white hover:text-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)] transition-colors';

  const desktopLinks = [
    { href: '/wohnen/ferienwohnungen', label: t('apartments') },
    { href: '/wohnen/zimmer', label: t('rooms') },
    { href: '/preise', label: t('pricing') },
    { href: '/erleben', label: t('experiences') },
  ] as const;

  const desktopLinksAfterBlog = [
    { href: '/gaestebuch', label: t('guestbook') },
  ] as const;

  return (
    <nav
      key="navigation-v2"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidBackground
          ? 'bg-stone/95 backdrop-blur-md border-b border-wood-dark/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-3.5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo-sonnenhof.png"
              alt="Sonnenhof Herrsching"
              width={44}
              height={44}
              className="rounded-full object-cover"
            />
            <span className="leading-none">
              <span
                className={`block font-serif text-[22px] font-semibold tracking-[0.01em] transition-colors ${
                  showSolidBackground ? 'text-forest' : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]'
                }`}
              >
                Sonnenhof
              </span>
              <span
                className={`mt-[3px] block text-[9px] uppercase tracking-[0.28em] transition-colors ${
                  showSolidBackground ? 'text-wood-dark' : 'text-gold drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
                }`}
              >
                Herrsching am Ammersee
              </span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-7 text-[14px]">
            {desktopLinks.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}
            <a href={blogHref} className={linkClass}>
              {t('blog')}
            </a>
            {desktopLinksAfterBlog.map((link) => (
              <Link key={link.href} href={link.href} className={linkClass}>
                {link.label}
              </Link>
            ))}

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
              className={`px-[22px] py-[11px] rounded-md text-[13.5px] tracking-[0.03em] font-medium transition-colors ${
                showSolidBackground
                  ? 'bg-forest text-stone hover:bg-forest-deep'
                  : 'bg-stone text-forest hover:bg-white'
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
          <div className="md:hidden mt-4 pb-4 space-y-1 rounded-lg">
            <Link
              href="/"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('home')}
            </Link>
            <Link
              href="/wohnen/ferienwohnungen"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('apartments')}
            </Link>
            <Link
              href="/wohnen/zimmer"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('rooms')}
            </Link>
            <Link
              href="/preise"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('pricing')}
            </Link>
            <Link
              href="/erleben"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('experiences')}
            </Link>
            <a
              href={blogHref}
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('blog')}
            </a>
            <Link
              href="/gaestebuch"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
            >
              {t('guestbook')}
            </Link>
            <Link
              href="/kontakt"
              className="block py-2 text-forest hover:text-wood-dark font-medium transition-colors"
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
              className="block w-full text-center px-6 py-3 rounded-md bg-forest text-stone hover:bg-forest-deep font-medium transition-colors mt-4"
            >
              {t('inquire')}
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
