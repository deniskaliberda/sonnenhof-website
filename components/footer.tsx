import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-forest py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 items-start">
          {/* Unterkünfte */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base mb-4">{t('accommodation')}</h3>
            <Link
              href="/wohnen"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('overview')}
            </Link>
            <Link
              href="/wohnen/ferienwohnungen"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('apartments')}
            </Link>
            <Link
              href="/wohnen/zimmer"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('guestRooms')}
            </Link>
          </div>

          {/* Informationen */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base mb-4">{t('information')}</h3>
            <Link
              href="/erleben"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('experienceAmmersee')}
            </Link>
            <Link
              href="/ueber-uns"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('aboutUs')}
            </Link>
            <Link
              href="/kontakt"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('contactBooking')}
            </Link>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold text-base mb-4">{t('legal')}</h3>
            <a
              href="/impressum"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('imprint')}
            </a>
            <a
              href="/datenschutz"
              className="block text-white/90 hover:text-wood transition-colors text-sm"
            >
              {t('privacy')}
            </a>
            <div className="pt-4 border-t border-white/20 space-y-2">
              <a
                href="https://www.bayregio.de/gastgeber/Sonnenhof-Herrsching"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-white/90 hover:text-wood transition-colors text-sm"
              >
                {t('reviewsBayRegio')}
              </a>
              <a
                href="https://www.ferienhausmarkt.com/"
                target="_blank"
                rel="noopener nofollow noreferrer"
                className="block text-white/90 hover:text-wood transition-colors text-sm"
              >
                Ferienhausmarkt.com
              </a>
              <a
                href="http://www.urlaubimferienhaus.net/"
                target="_blank"
                rel="noopener nofollow noreferrer"
                className="block text-white/90 hover:text-wood transition-colors text-sm"
              >
                Urlaub im Ferienhaus
              </a>
            </div>
          </div>

          {/* Rechts - Kontakt */}
          <div className="space-y-2">
            <h3 className="text-white font-semibold text-base mb-4">{t('contact')}</h3>
            <p className="text-white/85 text-sm leading-relaxed">Sonnenhof Herrsching</p>
            <p className="text-white/85 text-sm leading-relaxed">Summerstraße 23</p>
            <p className="text-white/85 text-sm leading-relaxed">82211 Herrsching am Ammersee</p>
            <div className="mt-4 pt-3 space-y-1">
              <p className="text-white/90 text-sm">
                <a
                  href="tel:+4981529679300"
                  className="hover:text-wood transition-colors font-medium"
                >
                  +49 (0) 8152 / 96793-0
                </a>
              </p>
              <p className="text-white/90 text-sm">
                <a
                  href="mailto:sonnenhof@sonnenhof-herrsching.de"
                  className="hover:text-wood transition-colors"
                >
                  sonnenhof@sonnenhof-herrsching.de
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center">
          <p className="font-serif text-xl text-white font-semibold mb-2">
            Sonnenhof Herrsching
          </p>
          <p className="text-white/85 text-sm mb-3">
            {t('tagline')}
          </p>
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
