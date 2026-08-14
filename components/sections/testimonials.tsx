import { useTranslations } from 'next-intl';
import { googleRating, bayregioRating } from "@/lib/mock-data";

const testimonials = [
  {
    text: "Super nette Eigentümerin, die sehr hilfreiche Tipps für die Region hatte und immer sehr freundlich war. Das Zimmer war schön, hatte einen hübschen Balkon, generell war auch das Gebäude sehr schön. Die Lage war top und die Zimmer waren preiswert.",
    author: "Marc Alex",
    rating: 5,
  },
  {
    text: "Wir hatten unsere ganze Familie & Freunde im Zuge einer Feier im Sonnenhof Herrsching untergebracht. Alle waren super happy und dankbar. … schöne, authentische Zimmer, gutes Preis/ Leistungsverhältnis - und unschlagbare Nähe zum Ammersee Strand. Jederzeit wieder!!",
    author: "Ben Evento",
    rating: 5,
  },
  {
    text: "Wir lieben diese Ferienwohnung, die Lage, die Ruhe die freundliche Vermieterin die tolle Sauberkeit. Und mieten Sie seit Jahren, da wir Berufsmäßig in Herrsching tätig sind. Vielen Dank, wir freuen uns schon auf das nächste mal",
    author: "Roland Hage",
    rating: 5,
  },
  {
    text: "Perfekte Lage direkt am Ammersee, sehr sauber und liebevoll eingerichtet. Die Gastgeberin ist herzlich und gibt tolle Ausflugstipps. Kommen gerne wieder!",
    author: "Sabine W.",
    rating: 5,
  },
];

function Stars({ score }: { score: number }) {
  const fullStars = Math.floor(score);
  const hasHalf = score % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <span className="text-wood tracking-[1px]" aria-label={`${score} von 5 Sternen`}>
      {"★".repeat(fullStars)}
      {hasHalf && (
        <span className="relative inline-block" style={{ width: "1em" }}>
          <span className="text-wood/30">★</span>
          <span className="absolute inset-0 overflow-hidden" style={{ width: "50%" }}>★</span>
        </span>
      )}
      {"☆".repeat(emptyStars)}
    </span>
  );
}

export function Testimonials() {
  const t = useTranslations('Testimonials');

  return (
    <section className="bg-sand py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest mb-4">
            {t('heading')}
          </h2>

          <div className="inline-flex flex-wrap justify-center items-center gap-x-2.5 gap-y-1 text-[15px] text-[#5A5142]">
            <span className="text-[17px]" aria-label={t('starsLabel', { score: googleRating.score, max: googleRating.maxScore })}>
              <Stars score={googleRating.score} />
            </span>
            <strong className="text-forest font-semibold">
              {googleRating.score.toLocaleString("de-DE")} {t('of')} {googleRating.maxScore}
            </strong>
            <span>
              <a
                href={googleRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-forest transition-colors"
              >
                {t('googleReviews', { count: googleRating.reviewCount })}
              </a>
              {" · "}
              <a
                href={bayregioRating.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 hover:text-forest transition-colors"
              >
                {bayregioRating.reviewCount}+ {bayregioRating.label}
              </a>
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl px-6 py-7 shadow-[0_1px_2px_rgba(42,36,28,0.06)] flex flex-col"
            >
              <div className="text-[15px] mb-3.5">
                <Stars score={testimonial.rating} />
              </div>
              <p className="text-[13.5px] leading-[1.65] text-[#4A4234] mb-4 flex-1">
                {testimonial.text}
              </p>
              <div className="border-t border-sand pt-3.5">
                <p className="text-[13px] font-semibold text-forest">{testimonial.author}</p>
                <p className="text-[11px] text-[#9A8C72]">{t('googleReview')}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
