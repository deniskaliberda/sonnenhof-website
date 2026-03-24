import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';

export function CTA() {
  const t = useTranslations('CTA');

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
          {t('heading')}
        </h2>
        <p className="text-lg text-text-primary/80 mb-10 max-w-2xl mx-auto">
          {t('description')}
        </p>

        <Button
          asChild
          size="lg"
          className="bg-forest hover:bg-forest/90 text-lg px-12 py-6"
        >
          <Link href="/kontakt">{t('button')}</Link>
        </Button>

        <div className="mt-12 pt-12 border-t border-stone">
          <p className="text-text-primary/60 mb-4">{t('callUs')}</p>
          <a
            href="tel:+4981529679300"
            className="text-2xl font-semibold text-forest hover:text-wood transition-colors"
          >
            +49 (0) 8152 / 96793-0
          </a>
        </div>
      </div>
    </section>
  );
}
