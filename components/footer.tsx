import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-forest py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-start">
          {/* Links */}
          <div className="space-y-3">
            <Link 
              href="/ueber-uns" 
              className="block text-white/90 hover:text-wood transition-colors text-base font-medium"
            >
              Über uns
            </Link>
            <Link 
              href="/kontakt" 
              className="block text-white/90 hover:text-wood transition-colors text-base font-medium"
            >
              Kontakt
            </Link>
            <Link 
              href="/impressum" 
              className="block text-white/90 hover:text-wood transition-colors text-base font-medium"
            >
              Impressum
            </Link>
            <Link 
              href="/datenschutz" 
              className="block text-white/90 hover:text-wood transition-colors text-base font-medium"
            >
              Datenschutz
            </Link>
          </div>

          {/* Mitte - Claim */}
          <div className="text-center">
            <p className="font-serif text-2xl text-white font-semibold leading-relaxed mb-3">
              Sonnenhof Herrsching
            </p>
            <p className="text-white/85 text-base mb-6">
              Tradition trifft Moderne
            </p>
            <p className="text-white/60 text-sm">
              &copy; {new Date().getFullYear()} Alle Rechte vorbehalten
            </p>
          </div>

          {/* Rechts - Kontakt */}
          <div className="text-right space-y-2">
            <p className="text-white font-semibold text-base mb-3">Sonnenhof Herrsching</p>
            <p className="text-white/85 text-sm leading-relaxed">Musterstraße 123</p>
            <p className="text-white/85 text-sm leading-relaxed">82211 Herrsching am Ammersee</p>
            <div className="mt-4 pt-3 space-y-1">
              <p className="text-white/90 text-sm">
                <a 
                  href="tel:+498152123456" 
                  className="hover:text-wood transition-colors font-medium"
                >
                  +49 (0) 8152 / 123 456
                </a>
              </p>
              <p className="text-white/90 text-sm">
                <a 
                  href="mailto:info@sonnenhof-herrsching.de" 
                  className="hover:text-wood transition-colors"
                >
                  info@sonnenhof-herrsching.de
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
