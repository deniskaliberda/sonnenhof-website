import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { googleRating } from "@/lib/mock-data";

export function BlogCTA() {
  const t = useTranslations('BlogCTA');

  return (
    <aside className="my-12 py-8 px-6 bg-white rounded-2xl border border-forest/10 max-w-2xl mx-auto text-center">
      <p className="font-serif text-2xl text-forest mb-3">
        {t('heading')}
      </p>
      <p className="text-text-primary/70 mb-6">
        {t('description')}
      </p>
      <Button
        asChild
        size="lg"
        className="bg-wood hover:bg-wood/90 text-white px-8 py-5"
      >
        <Link href="/kontakt">{t('button')}</Link>
      </Button>
      <p className="mt-4 text-sm text-text-primary/50">
        ★ {googleRating.score.toLocaleString("de-DE")} · {googleRating.reviewCount} {t('reviews')}
      </p>
    </aside>
  );
}
