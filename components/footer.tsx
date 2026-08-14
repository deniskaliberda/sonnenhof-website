import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { googleRating } from "@/lib/mock-data";

export function Footer() {
  const t = useTranslations('Footer');

  return (
    <footer className="bg-forest-deep px-6 py-14 text-[#A8C0AE]">
      <div className="max-w-7xl mx-auto">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr] items-start text-[13.5px] leading-[1.7]">
          {/* Brand + Kontakt */}
          <div className="max-w-[340px]">
            <p className="font-serif text-[22px] font-semibold text-[#FBF6EC] mb-1">Sonnenhof</p>
            <p className="text-[11px] uppercase tracking-[0.18em] text-[#7E9787] mb-4">{t('tagline')}</p>
            <p>Summerstraße 23 · 82211 Herrsching am Ammersee</p>
            <p className="mt-1">
              <a
                href="mailto:sonnenhof@sonnenhof-herrsching.de"
                className="text-gold hover:text-[#F0C868] transition-colors"
              >
                sonnenhof@sonnenhof-herrsching.de
              </a>
            </p>
            <p className="mt-1">
              <a href="tel:+4981529679300" className="hover:text-gold transition-colors">
                +49 (0) 8152 / 96793-0
              </a>
            </p>
            <p className="mt-4 flex items-center gap-2 text-[#C9D5CB]">
              <span className="text-[#F0C868]" aria-hidden>★★★★★</span>
              {String(googleRating.score).replace('.', ',')} · {googleRating.reviewCount} Bewertungen auf Google
            </p>
          </div>

          {/* Unterkünfte */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[#FBF6EC] mb-1 font-medium">{t('accommodation')}</span>
            <Link href="/wohnen" className="self-start hover:text-gold transition-colors">
              {t('overview')}
            </Link>
            <Link href="/wohnen/ferienwohnungen" className="self-start hover:text-gold transition-colors">
              {t('apartments')}
            </Link>
            <Link href="/wohnen/zimmer" className="self-start hover:text-gold transition-colors">
              {t('guestRooms')}
            </Link>
            <Link href="/preise" className="self-start hover:text-gold transition-colors">
              {t('pricing')}
            </Link>
          </div>

          {/* Informationen */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[#FBF6EC] mb-1 font-medium">{t('information')}</span>
            <Link href="/erleben" className="self-start hover:text-gold transition-colors">
              {t('experienceAmmersee')}
            </Link>
            <Link href="/ueber-uns" className="self-start hover:text-gold transition-colors">
              {t('aboutUs')}
            </Link>
            <Link href="/kontakt" className="self-start hover:text-gold transition-colors">
              {t('contactBooking')}
            </Link>
            <Link href="/gaestebuch" className="self-start hover:text-gold transition-colors">
              {t('guestbook')}
            </Link>
          </div>

          {/* Rechtliches + Partner */}
          <div className="flex flex-col gap-2.5">
            <span className="text-[#FBF6EC] mb-1 font-medium">{t('legal')}</span>
            <a href="/impressum" className="self-start hover:text-gold transition-colors">
              {t('imprint')}
            </a>
            <a href="/datenschutz" className="self-start hover:text-gold transition-colors">
              {t('privacy')}
            </a>
            <div className="mt-3 flex flex-col gap-2.5 border-t border-[#A8C0AE]/20 pt-4">
              <a
                href="https://www.bayregio.de/gastgeber/Sonnenhof-Herrsching"
                target="_blank"
                rel="noopener noreferrer"
                className="self-start hover:text-gold transition-colors"
              >
                {t('reviewsBayRegio')}
              </a>
              <a
                href="https://www.ferienhausmarkt.com/"
                target="_blank"
                rel="noopener nofollow noreferrer"
                className="self-start hover:text-gold transition-colors"
              >
                Ferienhausmarkt.com
              </a>
              <a
                href="http://www.urlaubimferienhaus.net/"
                target="_blank"
                rel="noopener nofollow noreferrer"
                className="self-start hover:text-gold transition-colors"
              >
                Urlaub im Ferienhaus
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-9 flex flex-col gap-2 border-t border-[#A8C0AE]/20 pt-5 text-[12px] text-[#7E9787] sm:flex-row sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Sonnenhof Ferienwohnungen und Zimmer · Cornelia Römmelt · {t('copyright')}
          </span>
          <span>
            <a
              href="https://myhiwi.de"
              target="_blank"
              rel="noopener"
              className="hover:text-gold transition-colors"
            >
              Umsetzung: MyHiwi
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
