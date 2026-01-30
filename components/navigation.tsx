'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  
  // Nur auf der Startseite ist die Navigation transparent
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auf anderen Seiten als Home immer weißer Hintergrund
  const showSolidBackground = !isHomePage || isScrolled;

  // Mobile Menu schließen bei Route-Wechsel
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolidBackground
          ? 'bg-white/95 backdrop-blur-lg shadow-md border-b border-stone/30' 
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
              Home
            </Link>
            <Link 
              href="/wohnen/ferienwohnungen" 
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood' 
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              Ferienwohnungen
            </Link>
            <Link 
              href="/wohnen/zimmer" 
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood' 
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              Zimmer
            </Link>
            <Link 
              href="/erleben" 
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood' 
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              Erleben
            </Link>
            <Link 
              href="/kontakt" 
              className={`font-medium transition-colors ${
                showSolidBackground
                  ? 'text-forest hover:text-wood' 
                  : 'text-white hover:text-wood drop-shadow-[0_1px_3px_rgba(0,0,0,0.3)]'
              }`}
            >
              Kontakt
            </Link>
            
            {/* CTA Button */}
            <Link 
              href="/kontakt" 
              className={`px-6 py-2.5 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl ${
                showSolidBackground
                  ? 'bg-forest text-white hover:bg-wood'
                  : 'bg-white text-forest hover:bg-wood hover:text-white'
              }`}
            >
              Anfragen
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
            aria-label="Menü"
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
              Home
            </Link>
            <Link 
              href="/wohnen/ferienwohnungen" 
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              Ferienwohnungen
            </Link>
            <Link 
              href="/wohnen/zimmer" 
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              Zimmer
            </Link>
            <Link 
              href="/erleben" 
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              Erleben
            </Link>
            <Link 
              href="/kontakt" 
              className="block py-2 text-forest hover:text-wood font-medium transition-colors"
            >
              Kontakt
            </Link>
            <Link 
              href="/kontakt" 
              className="block w-full text-center px-6 py-3 rounded-lg bg-forest text-white hover:bg-wood font-medium transition-colors mt-4"
            >
              Anfragen
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
