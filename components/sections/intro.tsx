import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export function Intro() {
  const t = useTranslations('Intro');

  return (
    <section className="bg-stone">
      <div className="grid lg:grid-cols-[1.06fr_0.94fr] items-stretch">
        <div className="flex flex-col justify-center px-6 py-16 md:py-20 lg:py-[92px] lg:pl-16 lg:pr-16 max-w-3xl lg:justify-self-end w-full">
          <h2 className="font-serif font-medium text-3xl md:text-[40px] md:leading-[1.12] text-forest mb-6">
            {t('heading')}
          </h2>
          <div className="space-y-4 text-[17px] leading-[1.7] text-[#4A4234]">
            <p>
              {t('p1')}{' '}
              <strong className="font-semibold text-forest">{t('p1Bold')}</strong>
            </p>
            <p>
              {t('p2')}{' '}
              {t('tipsIntro')}{' '}
              <Link href="/erleben" className="text-forest font-medium underline decoration-2 underline-offset-2 hover:text-wood-dark transition-colors">
                {t('klosterAndechs')}
              </Link>, {t('secretTip')}{' '}
              <Link href="/erleben" className="text-forest font-medium underline decoration-2 underline-offset-2 hover:text-wood-dark transition-colors">
                {t('steamboat')}
              </Link>{' '}
              {t('orQuestions')}{' '}
              <Link href="/wohnen" className="text-forest font-medium underline decoration-2 underline-offset-2 hover:text-wood-dark transition-colors">
                {t('accommodation')}
              </Link>: {t('alwaysChef')}
            </p>
            <p className="text-forest font-semibold">
              {t('dogsChildren')}
            </p>
          </div>
          <p className="mt-6 font-serif italic text-lg text-[#8A7C63]">
            {t('signature')}
          </p>
        </div>

        <div className="relative min-h-[360px] md:min-h-[480px] lg:min-h-[560px]">
          <Image
            src="/images/allgemein/conny-sonnenhof.jpeg"
            alt="Conny - Sonnenhof Herrsching"
            fill
            className="object-cover object-[center_22%]"
            quality={85}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}
