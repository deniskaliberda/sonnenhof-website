import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export function CTA() {
  const t = useTranslations('CTA');

  return (
    <section className="relative py-24 md:py-[104px] px-6 overflow-hidden">
      <Image
        src="/images/hero/hero-ammersee2.jpg"
        alt=""
        fill
        className="object-cover"
        quality={80}
        sizes="100vw"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-[rgba(28,40,30,0.66)]" />

      <div className="relative text-center max-w-4xl mx-auto">
        <h2 className="font-serif font-normal text-3xl md:text-[50px] md:leading-[1.15] text-[#FBF6EC] max-w-[720px] mx-auto text-balance">
          {t('heading')}
        </h2>
        <p className="text-base text-[#E3DBCB] leading-[1.6] max-w-[540px] mx-auto mt-[22px] mb-[38px]">
          {t('description')}
        </p>

        <Link
          href="/kontakt"
          className="inline-flex justify-center items-center bg-wood text-[#241B0F] text-[15px] font-semibold px-8 py-4 rounded-md hover:bg-[#D3AC6E] transition-colors"
        >
          {t('button')}
        </Link>

        <div className="mt-12 pt-10 border-t border-[#EFE7D6]/20">
          <p className="text-[#C9D5CB] mb-3">{t('callUs')}</p>
          <a
            href="tel:+4981529679300"
            className="font-serif text-2xl font-semibold text-gold hover:text-[#F0C868] transition-colors"
          >
            +49 (0) 8152 / 96793-0
          </a>
        </div>
      </div>
    </section>
  );
}
