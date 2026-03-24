import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from 'next-intl';

export function Intro() {
  const t = useTranslations('Intro');

  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              {t('heading')}
            </h2>
            <div className="space-y-4 text-lg text-text-primary/80 leading-relaxed">
              <p>
                {t('p1')}{' '}
                <strong className="text-forest">{t('p1Bold')}</strong>
              </p>
              <p>
                {t('p2')}{' '}
                {t('tipsIntro')}{' '}
                <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  {t('klosterAndechs')}
                </Link>, {t('secretTip')}{' '}
                <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  {t('steamboat')}
                </Link>{' '}
                {t('orQuestions')}{' '}
                <Link href="/wohnen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  {t('accommodation')}
                </Link>: {t('alwaysChef')}
              </p>
              <p className="text-forest font-semibold">
                {t('dogsChildren')}
              </p>
              <p className="text-text-primary/60 italic mt-6">
                {t('signature')}
              </p>
            </div>
          </div>

          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/allgemein/conny-sonnenhof.jpeg"
              alt="Conny - Sonnenhof Herrsching"
              fill
              className="object-cover"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
