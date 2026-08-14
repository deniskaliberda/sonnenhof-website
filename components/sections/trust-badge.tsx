import { useTranslations } from 'next-intl';

export function TrustBadge() {
  const t = useTranslations('TrustBadge');

  const badges = [
    {
      text: t('over40years'),
      subtext: t('thirdGeneration'),
    },
    {
      text: t('personalBavarian'),
      subtext: t('genuineHospitality'),
    },
    {
      text: t('familyBusiness'),
      subtext: t('directlyFromOwner'),
    },
  ];

  return (
    <section className="bg-forest-deep text-[#EFE7D6] py-7 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 text-center">
        {badges.map((badge, index) => (
          <div
            key={index}
            className={
              index === 1
                ? "md:border-l md:border-r md:border-[#EFE7D6]/[0.18]"
                : undefined
            }
          >
            <p className="font-serif text-[19px] text-gold leading-snug">
              {badge.text}
            </p>
            <p className="text-[13px] text-[#A8C0AE] mt-1">
              {badge.subtext}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
