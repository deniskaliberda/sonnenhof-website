import { Home, Heart, MapPin, Car, Wifi, Dog } from "lucide-react";
import { useTranslations } from 'next-intl';

export function USP() {
  const t = useTranslations('USP');

  const features = [
    {
      icon: Heart,
      title: t('personalTitle'),
      description: t('personalDescription'),
    },
    {
      icon: MapPin,
      title: t('locationTitle'),
      description: t('locationDescription'),
    },
    {
      icon: Home,
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
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
          {t('heading')}
        </h2>

        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wood/20 mb-6">
                <feature.icon className="w-8 h-8 text-wood" />
              </div>
              <h3 className="font-serif text-2xl text-forest mb-4">
                {feature.title}
              </h3>
              <p className="text-text-primary/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-forest/10">
          {extras.map((extra) => (
            <div key={extra.label} className="flex items-center gap-3">
              <extra.icon className="w-5 h-5 text-wood" />
              <span className="text-text-primary/80">{extra.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
