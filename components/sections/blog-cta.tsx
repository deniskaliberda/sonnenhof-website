import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { googleRating } from "@/lib/mock-data";

export function BlogCTA() {
  const t = useTranslations('BlogCTA');

  return (
    <aside className="my-12 py-8 px-6 bg-white rounded-xl border border-[#EFE7D6] shadow-[0_1px_2px_rgba(42,36,28,0.06)] max-w-2xl mx-auto text-center">
      <p className="font-serif text-2xl text-forest mb-3">
        {t('heading')}
      </p>
      <p className="text-[#5A5142] mb-6">
        {t('description')}
      </p>
      <Button
        asChild
        size="lg"
        className="bg-wood hover:bg-[#D3AC6E] text-[#241B0F] font-semibold rounded-md px-8 py-5"
      >
        <Link href="/kontakt">{t('button')}</Link>
      </Button>
      <p className="mt-4 text-sm text-[#9A8C72]">
        <span className="text-wood">★</span> {googleRating.score.toLocaleString("de-DE")} · {googleRating.reviewCount} {t('reviews')}
      </p>
    </aside>
  );
}
