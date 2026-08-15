import { Link } from "@/i18n/navigation";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

import { Phone, Mail } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { createBreadcrumbSchema } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'BestaetigungPage' });

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    robots: { index: false, follow: false },
  };
}

export default async function BestaetigungPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'BestaetigungPage' });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "Contact" : "Kontakt", path: "/kontakt" },
    { name: locale === 'en' ? "Confirmation" : "Bestätigung", path: "/kontakt/bestaetigung" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        <section className="py-20 md:py-28 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <Card className="bg-white border-none shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-10 md:py-[60px] md:px-12 rounded-[14px]">
              <h1 className="font-serif font-medium text-[32px] text-forest mb-3.5">
                {t('thankYou')}
              </h1>
              <p className="text-base text-[#5A5142] leading-[1.6] mx-auto max-w-[380px] mb-8">
                {t('confirmationText')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <a href="tel:+4981529679300" className="flex items-center justify-center gap-2 text-forest hover:text-wood-dark transition-colors">
                  <Phone className="w-5 h-5" />
                  +49 (0) 8152 / 96793-0
                </a>
                <a href="mailto:sonnenhof@sonnenhof-herrsching.de" className="flex items-center justify-center gap-2 text-forest hover:text-wood-dark transition-colors break-all">
                  <Mail className="w-5 h-5" />
                  sonnenhof@sonnenhof-herrsching.de
                </a>
              </div>

              <Button asChild className="bg-wood text-[#241B0F] hover:bg-[#D3AC6E] rounded-md font-semibold">
                <Link href="/">{t('backToHome')}</Link>
              </Button>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
