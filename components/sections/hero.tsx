import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { useTranslations } from 'next-intl';
import { googleRating } from "@/lib/mock-data";

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative h-[560px] md:h-[680px]">
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/hero/hero-sonnenhof.jpg"
          alt="Sonnenhof Herrsching"
          fill
          className="object-cover object-[center_58%]"
          priority
          fetchPriority="high"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/2wBDACgcHiMeGSgjISMtKygwPGRBPDc3PHtYXUlkkYCZlo+AjIqgtObDoKrarYqMyP/L2u71////m8H////6/+b9//j/2wBDASstLTw1PHZBQXb4pYyl+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj4+Pj/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAID/8QAHBAAAQUAAwAAAAAAAAAAAAAAAQACAxEhEhNB/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAH/xAAWEQEBAQAAAAAAAAAAAAAAAAAAARH/2gAMAwEAAhEDEQA/AM3Ol7Q7k4U7ATVKDHuzC/dKIpLo/9k="
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(28,40,30,0.34),rgba(28,40,30,0.08)_38%,rgba(28,40,30,0.66))]" />
      </div>

      <div className="relative z-10 h-full max-w-[1340px] mx-auto flex flex-col justify-end px-6 sm:px-10 lg:px-16 pb-14 md:pb-[70px]">
        <p className="text-[11px] tracking-[0.34em] uppercase text-[#EAD9B8] mb-[22px]">
          {t('eyebrow')}
        </p>
        <h1 className="font-serif font-medium text-[42px] md:text-[54px] lg:text-[70px] leading-[1.04] text-[#FBF6EC] max-w-[840px] [text-shadow:0_2px_24px_rgba(0,0,0,0.30)]">
          {t.rich('heading', {
            i: (chunks) => <span className="italic font-normal">{chunks}</span>,
          })}
        </h1>

        <p className="text-base md:text-lg leading-[1.6] text-[#F0E9DA] max-w-[560px] mt-6 mb-8 [text-shadow:0_1px_12px_rgba(0,0,0,0.3)]">
          {t('subheading')}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6">
          <Link
            href="/kontakt"
            className="inline-flex justify-center items-center self-start bg-wood text-[#241B0F] text-[15px] font-semibold px-8 py-4 rounded-md hover:bg-[#D3AC6E] transition-colors"
          >
            {t('ctaPrimary')}
          </Link>
          <span className="flex items-center gap-2.5 text-[#F0E9DA] text-sm">
            <span className="text-[#F0C868] text-[15px] tracking-[1px]" aria-label={`${googleRating.score} von ${googleRating.maxScore} Sternen`}>
              ★★★★★
            </span>
            {t('ratingLabel', { score: googleRating.score.toLocaleString("de-DE"), count: googleRating.reviewCount })}
          </span>
        </div>
      </div>
    </section>
  );
}
