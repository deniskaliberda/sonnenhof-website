import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export function USP() {
  const t = useTranslations('USP');

  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  const features = [
    {
      title: t('personalTitle'),
      description: t('personalDescription'),
    },
    {
      title: t('locationTitle'),
      description: t('locationDescription'),
    },
    {
      title: t('experienceTitle'),
      description: t('experienceDescription'),
    },
  ];

  const extras = [t('freeParking'), t('freeWifi'), t('dogsWelcome')];

  const tiles = [
    {
      image: "/images/allgemein/erleben-05.jpg",
      title: t('erleben1Title'),
      text: t('erleben1Text'),
    },
    {
      image: "/images/allgemein/erleben-07.jpg",
      title: t('erleben2Title'),
      text: t('erleben2Text'),
    },
    {
      image: "/images/hero/hero-ammersee.jpg",
      title: t('erleben3Title'),
      text: t('erleben3Text'),
    },
  ];

  return (
    <>
      {/* forest stats */}
      <section className="bg-forest text-[#EFE7D6] py-[67px] md:py-[84px] px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1340px] mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-9">
          {stats.map((stat) => (
            <div key={stat.label} className="border-t border-[#EFE7D6]/[0.22] pt-4">
              <div className="font-serif text-[28px] md:text-[34px] text-gold">
                {stat.value}
              </div>
              <div className="text-sm text-[#C9D5CB] mt-2 leading-[1.5]">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* USP */}
      <section className="bg-stone py-20 md:py-24 px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1340px] mx-auto">
          <div className="text-center mb-[50px]">
            <p className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
              {t('eyebrow')}
            </p>
            <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest">
              {t('heading')}
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-[30px] mb-10">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] px-7 py-8 md:px-9 md:py-[38px]"
              >
                <h3 className="font-serif text-2xl text-forest mb-3">
                  {feature.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#5A5142]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3.5">
            {extras.map((label) => (
              <span
                key={label}
                className="inline-block bg-sand text-[#3C362B] text-sm rounded-full px-5 py-[9px]"
              >
                ✓ {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* erleben tiles */}
      <section className="bg-stone pb-20 md:pb-[100px] px-6 sm:px-10 lg:px-16">
        <div className="max-w-[1340px] mx-auto">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <p className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
                {t('erlebenEyebrow')}
              </p>
              <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest">
                {t('erlebenHeading')}
              </h2>
            </div>
            <Link
              href="/erleben"
              className="text-sm text-wood-dark hover:text-forest transition-colors"
            >
              {t('erlebenLink')} →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[22px]">
            {tiles.map((tile) => (
              <Link key={tile.title} href="/erleben" className="group">
                <figure className="m-0">
                  <div className="relative h-[240px] md:h-[280px] rounded-[10px] overflow-hidden">
                    <Image
                      src={tile.image}
                      alt={tile.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                      quality={85}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <figcaption className="pt-[18px] px-1">
                    <div className="font-serif font-semibold text-[21px] text-forest">
                      {tile.title}
                    </div>
                    <div className="text-sm text-[#5A5142] leading-[1.6] mt-[5px]">
                      {tile.text}
                    </div>
                  </figcaption>
                </figure>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
