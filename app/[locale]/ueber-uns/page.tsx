import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'UeberUnsPage' });

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/about'
    : 'https://www.sonnenhof-herrsching.de/ueber-uns';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: createHreflangLanguages('/ueber-uns'),
    },
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      url: canonical,
      type: 'website',
      locale: locale === 'en' ? 'en_US' : 'de_DE',
    },
  };
}

export default async function UeberUnsPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'UeberUnsPage' });

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: locale === 'en' ? "About Us" : "Über uns", path: "/ueber-uns" }
  ]);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Conny",
    "jobTitle": locale === 'en' ? "Owner & Host" : "Inhaberin & Gastgeberin",
    "worksFor": { "@type": "LodgingBusiness", "@id": "https://www.sonnenhof-herrsching.de/#lodgingbusiness", "name": "Sonnenhof Herrsching", "url": "https://www.sonnenhof-herrsching.de" },
    "description": locale === 'en' ? "Host in the 3rd generation at Sonnenhof Herrsching on Lake Ammersee. Over 40 years in hospitality." : "Gastgeberin in 3. Generation im Sonnenhof Herrsching am Ammersee. Seit über 40 Jahren in der Hotellerie.",
  };

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={personSchema} />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Intro: Portrait + Familie & Tradition */}
        <section className="px-6 py-16 md:py-24">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.92fr_1.08fr] gap-10 lg:gap-16 items-center">
            <div className="relative h-[380px] md:h-[480px] lg:h-[560px] rounded-[14px] overflow-hidden">
              <Image
                src="/images/allgemein/conny-sonnenhof.jpeg"
                alt="Conny - Sonnenhof Herrsching"
                fill
                className="object-cover object-[center_22%]"
                priority
                quality={85}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>

            <div>
              <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] text-forest mb-6 leading-[1.08]">
                {t('heroTitle')}
              </h1>

              <div className="space-y-5 text-[17px] text-[#5A5142] leading-[1.75]">
                <p>{t('p1')}</p>
                <p>
                  <strong className="text-forest font-semibold">{t('p2Bold')}</strong> {t('p2')}
                </p>
                <p>{t('p3')}</p>
                <p>{t('p4')}</p>
                <p className="bg-sand/70 p-4 rounded-lg border-l-4 border-wood">
                  <strong className="text-forest font-semibold">{t('dogsChildrenWelcome')}</strong>
                </p>
              </div>

              <div className="mt-10 pt-7 border-t border-wood-dark/30">
                <p className="font-serif text-2xl text-forest mb-2">{t('pleaseInquire')}</p>
                <p className="font-serif italic text-xl text-wood-dark">{t('alwaysChef')}</p>
                <p className="text-sm text-[#9A8C72] mt-2">{t('since40Years')}</p>
              </div>

              <div className="mt-10">
                <Button asChild size="lg" className="bg-wood text-[#241B0F] hover:bg-[#D3AC6E] rounded-md font-semibold">
                  <Link href="/kontakt">{t('inquirePersonally')}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* History — Drei Generationen */}
        <section className="py-20 md:py-24 px-6 bg-sand">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[40px] text-forest text-center mb-12 md:mb-14">{t('ourHistory')}</h2>

            <div className="grid md:grid-cols-3 gap-7">
              <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-9">
                <div className="font-serif text-4xl text-wood mb-3">{t('era80s')}</div>
                <h3 className="font-serif font-semibold text-xl text-forest mb-2">{t('beginningsTitle')}</h3>
                <p className="text-sm text-[#5A5142] leading-[1.7]">{t('beginningsText')}</p>
              </div>

              <div className="bg-white rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-8 md:p-9">
                <div className="font-serif text-4xl text-wood mb-3">{t('era90s')}</div>
                <h3 className="font-serif font-semibold text-xl text-forest mb-2">{t('secondGenTitle')}</h3>
                <p className="text-sm text-[#5A5142] leading-[1.7]">{t('secondGenText')}</p>
              </div>

              <div className="bg-forest rounded-xl p-8 md:p-9">
                <div className="font-serif text-4xl text-gold mb-3">{t('eraNow')}</div>
                <h3 className="font-serif font-semibold text-xl text-[#FBF6EC] mb-2">{t('todayTitle')}</h3>
                <p className="text-sm text-[#C9D5CB] leading-[1.7]">{t('todayText')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Day at Sonnenhof */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[40px] text-forest text-center mb-5">{t('dayInSonnenhof')}</h2>
            <p className="text-center text-[#9A8C72] mb-12 max-w-2xl mx-auto">{t('daySubtitle')}</p>

            <div className="space-y-6 text-[#5A5142] leading-[1.75] text-[17px]">
              {locale === 'en' ? (
                <>
                  <p>My day starts early. I check that everything is ready for departing guests, inspect the apartments and rooms, and prepare everything for new arrivals. Bed linen, towels, a final check on cleanliness – I do this myself. No cleaning crew, no outside firm. When you enter your accommodation, it has been personally prepared by me.</p>
                  <p>In between, I answer enquiries – by phone or email. Guests ask about availability, about <Link href="/preise" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">prices</Link>, whether the dog can come along (yes, always!), whether there&apos;s a crib available. Every enquiry gets a personal reply. I know your apartment, I know the location, I can tell you exactly which accommodation suits you.</p>
                  <p>In the afternoon I welcome new guests. I show you the apartment, explain where the nearest bakery is, which beer garden is worth visiting, and when the best time for a <a href="/blog/radtour-ammersee-unterkunft" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">cycle tour around Lake Ammersee</a> is. This knowledge doesn&apos;t come from the internet – it comes from 40 years of living in Herrsching.</p>
                </>
              ) : (
                <>
                  <p>Mein Tag beginnt früh. Ich schaue, ob alles bereit ist für abreisende Gäste, prüfe die Wohnungen und Zimmer und bereite alles für die neuen Ankömmlinge vor. Bettwäsche, Handtücher, ein letzter Blick auf die Sauberkeit – das mache ich selbst. Keine Putzkolonne, keine Fremdfirma. Wenn Sie Ihre Unterkunft betreten, ist sie von mir persönlich vorbereitet.</p>
                  <p>Zwischendurch beantworte ich Anfragen – am Telefon oder per E-Mail. Gäste fragen nach freien Terminen, nach{" "}<Link href="/preise" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Preisen</Link>, ob der Hund mitkommen darf (ja, immer!), ob es ein Kinderbett gibt. Jede Anfrage bekommt eine persönliche Antwort. Ich kenne Ihre Wohnung, ich kenne die Lage, ich kann Ihnen genau sagen, welche Unterkunft zu Ihnen passt.</p>
                  <p>Am Nachmittag empfange ich die neuen Gäste. Ich zeige Ihnen die Wohnung, erkläre, wo der nächste Bäcker ist, welcher Biergarten sich lohnt und wann die beste Zeit für eine{" "}<a href="/blog/radtour-ammersee-unterkunft" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Radtour um den Ammersee</a>{" "}ist. Dieses Wissen kommt nicht aus dem Internet – das kommt aus 40 Jahren Leben in Herrsching.</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Herrsching */}
        <section className="py-20 md:py-24 px-6 bg-stone">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[40px] text-forest text-center mb-10">{t('herrschingHome')}</h2>
            <div className="space-y-6 text-[#5A5142] leading-[1.75] text-[17px]">
              {locale === 'en' ? (
                <>
                  <p>The Sonnenhof is located on Summerstraße, a quiet residential street in Herrsching. In five minutes you are at Lake Ammersee, in ten minutes at the S-Bahn station. You can reach Munich in 45 minutes by S8 – no traffic, no parking hassle.</p>
                  <p>But Herrsching is more than a starting point. It is a place to arrive. Sitting on the balcony with coffee in the morning, gazing at the lake. Hiking to <a href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Andechs Monastery</a> in the afternoon and ending the day at a beer garden. Our guests often say: &ldquo;You feel like you&apos;re on holiday straight away.&rdquo;</p>
                  <p>Whether a <a href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">family holiday with children</a>, a <a href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">holiday with your dog</a> or a weekend for two – we have the perfect retreat for you. And if you are still unsure: <Link href="/kontakt" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">just call us</Link>. You always speak to me.</p>
                </>
              ) : (
                <>
                  <p>Der Sonnenhof liegt in der Summerstraße, einer ruhigen Wohnstraße in Herrsching. In fünf Minuten sind Sie am Ammersee, in zehn Minuten am S-Bahnhof. München erreichen Sie in 45 Minuten mit der S8 – ohne Stau, ohne Parkplatzsuche.</p>
                  <p>Aber Herrsching ist mehr als ein Ausgangspunkt. Es ist ein Ort zum Ankommen. Morgens mit dem Kaffee auf dem Balkon sitzen und auf den See schauen. Nachmittags zum{" "}<a href="/blog/ausflugsziele-herrsching-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Kloster Andechs wandern</a>{" "}und abends im Biergarten den Tag ausklingen lassen. Unsere Gäste sagen oft: {'„'}Hier fühlt man sich sofort wie im Urlaub.{'“'}</p>
                  <p>Ob{" "}<a href="/blog/familienurlaub-ammersee" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Familienurlaub mit Kindern</a>,{" "}<a href="/blog/ferienwohnung-ammersee-mit-hund" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Urlaub mit Hund</a>{" "}oder ein Wochenende zu zweit – wir haben den passenden Rückzugsort für Sie. Und falls Sie noch unsicher sind:{" "}<Link href="/kontakt" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">Rufen Sie einfach an</Link>. Sie sprechen immer mit mir.</p>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Values — Werte mit Wurzeln */}
        <section className="py-20 md:py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif font-medium text-3xl md:text-[40px] text-forest text-center mb-12 md:mb-14">{t('whatMatters')}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-7">
              {[
                { title: t('personalTitle'), text: t('personalText') },
                { title: t('qualityTitle'), text: t('qualityText') },
                { title: t('sustainableTitle'), text: t('sustainableText') },
                { title: t('closenessTitle'), text: t('closenessText') },
              ].map((item) => (
                <div key={item.title}>
                  <h3 className="font-serif font-semibold text-2xl text-forest mb-3">{item.title}</h3>
                  <p className="text-sm text-[#5A5142] leading-[1.7]">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
