import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';
import { googleRating, bayregioRating } from "@/lib/mock-data";

const testimonials = [
  {
    text: "Super nette Eigentümerin, die sehr hilfreiche Tipps für die Region hatte. Das Zimmer war schön, hatte einen hübschen Balkon. Die Lage war top und die Zimmer preiswert.",
    author: "Marc Alex",
  },
  {
    text: "Ganze Familie & Freunde im Sonnenhof untergebracht. Alle super happy — schöne, authentische Zimmer, gutes Preis-Leistungs-Verhältnis und unschlagbare Nähe zum Ammersee. Jederzeit wieder!",
    author: "Ben Evento",
  },
  {
    text: "Wir lieben diese Ferienwohnung, die Lage, die Ruhe, die freundliche Vermieterin, die tolle Sauberkeit — und mieten seit Jahren. Wir freuen uns schon aufs nächste Mal!",
    author: "Roland Hage",
  },
  {
    text: "Perfekte Lage direkt am Ammersee, sehr sauber und liebevoll eingerichtet. Die Gastgeberin ist herzlich und gibt tolle Ausflugstipps. Kommen gerne wieder!",
    author: "Sabine W.",
  },
];

const guestbookStyles = `
.gb-invite {
  display: inline-flex; align-items: center; gap: 30px; cursor: pointer; text-align: left;
  background: #FBF6EC; border: 1px solid rgba(166,121,78,0.28); border-radius: 14px;
  padding: 26px 36px 26px 28px; box-shadow: 0 1px 2px rgba(42,36,28,0.06);
  transition: box-shadow .28s ease, border-color .28s ease; max-width: 100%;
}
.gb-invite:hover { box-shadow: 0 14px 34px rgba(42,36,28,0.14); border-color: rgba(166,121,78,0.45); }
.gb-mini { position: relative; width: 104px; height: 132px; flex: none; perspective: 620px; }
.gb-mini-page {
  position: absolute; inset: 0; border-radius: 3px 6px 6px 3px;
  background: linear-gradient(105deg,#FAF4E6,#FCF8EE 40%,#F8F1E0);
  border: 1px solid rgba(166,121,78,0.25); box-shadow: inset 9px 0 16px rgba(120,90,60,0.10);
  overflow: hidden;
}
.gb-mini-page > i {
  position: absolute; left: 13px; right: 11px; top: 20px; bottom: 18px; display: block;
  background: repeating-linear-gradient(to bottom,transparent 0 11px,rgba(166,121,78,0.26) 11px 12px);
}
.gb-mini-cover {
  position: absolute; inset: 0; transform-origin: left center; border-radius: 3px 6px 6px 3px;
  background: linear-gradient(140deg,#33594A,#2C4F40 45%,#24422F);
  box-shadow: inset 0 0 0 1px rgba(232,197,126,0.28), 3px 4px 12px rgba(0,0,0,0.22);
  display: flex; align-items: center; justify-content: center;
  transform: rotateY(-13deg); transition: transform .6s cubic-bezier(0.4,0.08,0.28,1);
  animation: gbBreathe 4.4s ease-in-out infinite;
}
.gb-mini-cover > b {
  font-family: var(--font-serif); font-weight: 500; font-size: 15px; color: #E8C57E;
  letter-spacing: 0.02em; text-shadow: 0 1px 0 rgba(0,0,0,0.35);
}
.gb-mini-cover::before {
  content: ""; position: absolute; inset: 9px; border: 1px solid rgba(232,197,126,0.45); border-radius: 3px;
}
.gb-invite:hover .gb-mini-cover { transform: rotateY(-64deg); animation: none; }
@keyframes gbBreathe { 0%, 100% { transform: rotateY(-13deg) } 50% { transform: rotateY(-27deg) } }
@media (prefers-reduced-motion: reduce) {
  .gb-mini-cover { animation: none; transition: none; }
}
.gb-invite-eyebrow { display: block; font-size: 11px; letter-spacing: 0.32em; text-transform: uppercase; color: #A6794E; margin-bottom: 12px; }
.gb-invite-head { display: block; font-family: var(--font-serif); font-weight: 500; font-size: 25px; line-height: 1.28; color: #2C4F40; max-width: 24ch; text-wrap: pretty; }
.gb-invite-cta { display: inline-block; margin-top: 16px; font-size: 14.5px; font-weight: 600; color: #A6794E; }
.gb-invite:hover .gb-invite-cta { color: #2C4F40; }
@media (max-width: 680px) {
  .gb-invite { flex-direction: column; text-align: center; gap: 22px; padding: 28px 24px; }
  .gb-invite-head { font-size: 21px; max-width: none; }
  .gb-mini-cover { animation: none; transform: rotateY(-18deg); }
}
`;

export function Testimonials() {
  const t = useTranslations('Testimonials');

  return (
    <section className="bg-sand py-20 md:py-24 px-6 sm:px-10 lg:px-16">
      <style>{guestbookStyles}</style>
      <div className="max-w-[1340px] mx-auto">
        <div className="text-center mb-[46px]">
          <p className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest mb-3.5">
            {t('heading')}
          </h2>

          <div className="inline-flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-[15px] text-[#5A5142]">
            <span
              className="text-wood text-[17px] tracking-[1px]"
              aria-label={t('starsLabel', { score: googleRating.score, max: googleRating.maxScore })}
            >
              ★★★★★
            </span>
            <span>
              <strong className="text-forest font-semibold">
                {googleRating.score.toLocaleString("de-DE")}/{googleRating.maxScore}
              </strong>{" "}
              <a
                href={googleRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-forest transition-colors"
              >
                {t('atGoogle')} ({googleRating.reviewCount})
              </a>
              {" · "}
              <strong className="text-forest font-semibold">
                {bayregioRating.score.toLocaleString("de-DE")}/{bayregioRating.maxScore}
              </strong>{" "}
              <a
                href={bayregioRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-forest transition-colors"
              >
                {t('atBayregio')} ({bayregioRating.reviewCount})
              </a>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-[11px] px-[26px] py-7 shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex flex-col"
            >
              <div className="text-wood text-[15px] tracking-[1px] mb-3.5" aria-hidden="true">
                ★★★★★
              </div>
              <p className="text-[13.5px] leading-[1.65] text-[#4A4234] mb-[18px] flex-1">
                {testimonial.text}
              </p>
              <div className="border-t border-sand pt-3.5">
                <p className="text-[13px] font-semibold text-forest">{testimonial.author}</p>
                <p className="text-[11px] text-[#9A8C72]">{t('googleReview')}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-[52px] pt-[38px] border-t border-[rgba(166,121,78,0.22)]">
          <Link href="/gaestebuch" className="gb-invite">
            <span className="gb-mini">
              <span className="gb-mini-page"><i></i></span>
              <span className="gb-mini-cover"><b>{t('gbCover')}</b></span>
            </span>
            <span>
              <span className="gb-invite-eyebrow">{t('gbEyebrow')}</span>
              <span className="gb-invite-head">{t('gbHeading')}</span>
              <span className="gb-invite-cta">{t('gbCta')} →</span>
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
