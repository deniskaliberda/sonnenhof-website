import { Car, Wifi, Dog } from "lucide-react";
import { useTranslations } from 'next-intl';

export function USP() {
  const t = useTranslations('USP');

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

  const extras = [
    { icon: Car, label: t('freeParking') },
    { icon: Wifi, label: t('freeWifi') },
    { icon: Dog, label: t('dogsWelcome') },
  ];

  return (
    <section className="bg-stone py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest text-center mb-12">
          {t('heading')}
        </h2>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-10">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] px-8 py-9"
            >
              <h3 className="font-serif font-semibold text-2xl text-forest mb-3">
                {feature.title}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#5A5142]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-3.5">
          {extras.map((extra) => (
            <span
              key={extra.label}
              className="inline-flex items-center gap-2 bg-sand text-[#3C362B] text-[13px] rounded-full px-4 py-1.5"
            >
              <extra.icon className="w-4 h-4 text-wood-dark" aria-hidden="true" />
              {extra.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
