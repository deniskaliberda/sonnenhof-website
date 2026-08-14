import { ArrowRight } from "lucide-react";
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
    <section className="bg-sand py-20 md:py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-11">
          <h2 className="font-serif font-medium text-3xl md:text-[42px] text-forest mb-3">
            {t('heading')}
          </h2>
          <p className="text-[17px] text-[#5A5142]">
            {t('subheading')}
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((item) => (
            <a key={item.href} href={item.href} className="group">
              <article className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] transition-shadow duration-300 group-hover:shadow-[0_12px_30px_rgba(42,36,28,0.12)] px-8 pt-8 pb-7 h-full flex flex-col">
                <h3 className="font-serif font-semibold text-2xl text-forest mb-3">
                  {item.title}
                </h3>
                <p className="text-[15px] leading-[1.7] text-[#5A5142] mb-6 flex-1">
                  {item.description}
                </p>
                <span className="text-sm font-medium text-wood-dark inline-flex items-center gap-2">
                  {t('readMore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </article>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
