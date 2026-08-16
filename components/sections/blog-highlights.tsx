import { useTranslations } from 'next-intl';

export function BlogHighlights() {
  const t = useTranslations('BlogHighlights');

  const highlights = [
    {
      href: "/blog/ferienwohnung-ammersee-mit-hund",
      title: t('dogTitle'),
      description: t('dogDescription'),
    },
    {
      href: "/blog/ferienwohnung-muenchen-umgebung",
      title: t('munichTitle'),
      description: t('munichDescription'),
    },
    {
      href: "/blog/familienurlaub-ammersee",
      title: t('familyTitle'),
      description: t('familyDescription'),
    },
    {
      href: "/blog/pension-am-ammersee",
      title: t('pensionTitle'),
      description: t('pensionDescription'),
    },
    {
      href: "/blog/guenstige-pension-ammersee",
      title: t('budgetTitle'),
      description: t('budgetDescription'),
    },
  ];

  return (
    <section className="bg-sand py-20 md:py-24 px-6 sm:px-10 lg:px-16">
      <div className="max-w-[1340px] mx-auto">
        <div className="text-center mb-[46px]">
          <p className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest mb-3">
            {t('heading')}
          </h2>
          <p className="text-[17px] text-[#5A5142]">
            {t('subheading')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[26px]">
          {highlights.map((item) => (
            <a key={item.href} href={item.href} className="group">
              <article className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] transition-shadow duration-300 group-hover:shadow-[0_12px_30px_rgba(42,36,28,0.12)] px-8 pt-[34px] pb-[30px] h-full flex flex-col">
                <h3 className="font-serif font-semibold text-2xl text-forest mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#5A5142] mb-[22px] flex-1">
                  {item.description}
                </p>
                <span className="text-sm font-medium text-wood-dark">
                  {t('readMore')} →
                </span>
              </article>
            </a>
          ))}
          <a href="/blog" className="group">
            <article className="bg-forest rounded-xl px-8 pt-[34px] pb-[30px] h-full flex flex-col justify-center transition-colors duration-300 group-hover:bg-forest-deep">
              <h3 className="font-serif font-semibold text-2xl text-[#FBF6EC] mb-3">
                {t('allTitle')}
              </h3>
              <p className="text-[15px] leading-[1.7] text-[#C9D5CB] mb-[22px]">
                {t('allDescription')}
              </p>
              <span className="text-sm font-medium text-gold">
                {t('allCta')} →
              </span>
            </article>
          </a>
        </div>
      </div>
    </section>
  );
}
