import Image from "next/image";
import { useTranslations } from "next-intl";

export function ErlebenHero() {
  const t = useTranslations("ErlebenPage");

  return (
    <section className="relative h-[340px] md:h-[400px]">
      <Image
        src="/images/allgemein/erleben-01.jpg"
        alt="Herrsching & Ammersee"
        fill
        className="object-cover object-[center_50%]"
        priority
        quality={85}
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[rgba(28,40,30,0.50)]" />
      <div className="relative h-full max-w-[1340px] mx-auto px-6 md:px-16 flex flex-col justify-center">
        <div className="text-[11px] tracking-[0.32em] uppercase text-[#EAD9B8] mb-[18px]">
          {t("heroSubtitle")}
        </div>
        <h1 className="font-serif font-medium text-4xl md:text-[56px] text-[#FBF6EC] m-0 leading-[1.05] max-w-xl">
          {t("heroTitle")}
        </h1>
      </div>
    </section>
  );
}
