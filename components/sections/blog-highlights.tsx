import { Card } from "@/components/ui/card";
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
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            {t('heading')}
          </h2>
          <p className="text-lg text-text-primary/70">
            {t('subheading')}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <a key={item.href} href={item.href} className="group">
              <Card className="bg-white border-none rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-forest group-hover:text-wood transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-primary/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 transition-colors">
                  {t('readMore')} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
