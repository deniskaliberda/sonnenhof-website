import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from 'next-intl';

export function Accommodations() {
  const t = useTranslations('Accommodations');

  const richTags = {
    strong: (chunks: React.ReactNode) => (
      <strong className="font-semibold text-forest">{chunks}</strong>
    ),
  };

  const cards = [
    {
      href: "/wohnen/ferienwohnungen" as const,
      image: "/images/ferienwohnungen/herrsching/herrsching-05-terrasse.jpg",
      imageAlt: "Terrasse der Ferienwohnung Herrsching",
      title: t('apartmentsTitle'),
      price: t('apartmentsPrice'),
      description: t.rich('apartmentsDescription', richTags),
    },
    {
      href: "/wohnen/zimmer" as const,
      image: "/images/zimmer/doppelzimmer-balkon/dz-balkon-01-zimmer.jpg",
      imageAlt: "Doppelzimmer mit Balkon im Sonnenhof",
      title: t('roomsTitle'),
      price: t('roomsPrice'),
      description: t.rich('roomsDescription', richTags),
    },
  ];

  return (
    <section className="bg-stone pt-20 pb-[83px] md:pt-24 md:pb-[104px] px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1340px] mx-auto">
        <div className="mb-[44px]">
          <p className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-[44px] md:leading-[1.05] text-forest">
            {t('heading')}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-[30px]">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="group">
              <article className="h-full bg-white rounded-[10px] overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] transition-shadow duration-300 group-hover:shadow-[0_12px_30px_rgba(42,36,28,0.12)]">
                <div className="h-[280px] md:h-[340px] relative overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.imageAlt}
                    fill
                    className="object-cover"
                    loading="lazy"
                    quality={85}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>

                <div className="px-6 md:px-[34px] pt-6 md:pt-8 pb-7 md:pb-9">
                  <div className="flex flex-wrap justify-between items-baseline gap-x-4 gap-y-1">
                    <h3 className="font-serif font-semibold text-2xl md:text-[28px] text-forest">
                      {card.title}
                    </h3>
                    <span className="text-[13px] font-semibold text-wood-dark">
                      {card.price}
                    </span>
                  </div>
                  <p className="text-[15px] leading-[1.65] text-[#5A5142] mt-[13px]">
                    {card.description}
                  </p>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
