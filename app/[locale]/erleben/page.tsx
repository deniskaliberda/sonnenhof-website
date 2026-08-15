import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card } from "@/components/ui/card";
import Image from "next/image";

import { Link } from "@/i18n/navigation";
import {
  Waves, Mountain, Bike, MapPin, Church,
  Coffee, Clock, ArrowRight
} from "lucide-react";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { erlebenSchemas, extractFaqItems } from "@/lib/schema";
import { FAQ } from "@/components/sections/faq";
import { ErlebenHero } from "@/components/sections/erleben-hero";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ErlebenPage' });

  const canonical = locale === 'en'
    ? 'https://www.sonnenhof-herrsching.de/en/experiences'
    : 'https://www.sonnenhof-herrsching.de/erleben';

  return {
    title: t('metaTitle'),
    description: t('metaDescription'),
    alternates: {
      canonical,
      languages: createHreflangLanguages('/erleben'),
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

export default async function ErlebenPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const isEn = locale === 'en';

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: isEn ? "Explore Lake Ammersee" : "Ammersee erleben", path: "/erleben" }
  ]);

  const ammerseeTags = isEn
    ? ["Swimming", "Sailing & surfing", "Steamboat cruises", "Ammersee circuit", "Dog beach"]
    : ["Baden", "Segeln & Surfen", "Dampferfahrten", "Ammersee-Rundweg", "Hundestrand"];

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {erlebenSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Navigation />
      <main className="pt-20 bg-stone">
        <ErlebenHero />

        {/* Der Ammersee */}
        <section className="max-w-[1340px] mx-auto px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-[54px] items-center">
          <div className="relative h-[300px] md:h-[440px] rounded-xl overflow-hidden">
            <Image
              src="/images/allgemein/erleben-05.jpg"
              alt={isEn ? "Lake Ammersee" : "Der Ammersee"}
              fill
              className="object-cover"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
              {isEn ? '50 metres away' : '50 Meter entfernt'}
            </div>
            <h2 className="font-serif font-medium text-3xl md:text-[38px] text-forest mb-[18px] leading-[1.1]">
              {isEn ? 'Lake Ammersee' : 'Der Ammersee'}
            </h2>
            <p className="text-base leading-[1.7] text-[#5A5142] mb-5">
              {isEn
                ? "Bavaria's third-largest lake lies right on your doorstep. Stroll along the shore, swim at one of the many spots or take a steamboat cruise to Dießen and Utting."
                : 'Der drittgrößte See Bayerns liegt direkt vor Ihrer Tür. Spazieren Sie am Ufer, baden Sie an einem der vielen Plätze oder unternehmen Sie eine Dampferfahrt nach Dießen und Utting.'}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {ammerseeTags.map((tag) => (
                <span key={tag} className="text-[13.5px] text-[#3C362B] bg-sand rounded-full px-4 py-[7px]">{tag}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Kloster Andechs */}
        <section className="py-16 md:py-24 px-6 md:px-16 bg-forest text-[#EFE7D6]">
          <div className="max-w-[1340px] mx-auto grid md:grid-cols-2 gap-10 md:gap-[54px] items-center">
            <div className="relative h-[300px] md:h-[440px] rounded-xl overflow-hidden">
              <Image
                src="/images/allgemein/erleben-07.jpg"
                alt="Kloster Andechs"
                fill
                className="object-cover"
                quality={85}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div>
              <div className="text-[11px] tracking-[0.32em] uppercase text-[#A8C0AE] mb-4">
                {isEn ? '45 min on foot' : '45 Min. zu Fuß'}
              </div>
              <h2 className="font-serif font-medium text-3xl md:text-[38px] text-[#FBF6EC] mb-[18px] leading-[1.1]">
                Kloster Andechs
              </h2>
              <p className="text-base leading-[1.7] text-[#C9D5CB] m-0">
                {isEn
                  ? 'A beautiful forest trail takes you up to the "Holy Mountain" with a wonderful view over the Five Lakes Region. At the top, the monastery brewery, a beer garden with panorama and Bavarian Brotzeit await — easily manageable for families too.'
                  : 'Über einen schönen Waldweg erreichen Sie den „Heiligen Berg" mit herrlichem Blick über das Fünf-Seen-Land. Oben warten die Klosterbrauerei, ein Biergarten mit Panorama und bayerische Brotzeit — auch für Familien gut zu schaffen.'}
              </p>
            </div>
          </div>
        </section>

        {/* München vor der Tür */}
        <section className="max-w-[1340px] mx-auto px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-2 gap-10 md:gap-[54px] items-center">
          <div className="relative h-[300px] md:h-[440px] rounded-xl overflow-hidden">
            <Image
              src="/images/hero/hero-ammersee.jpg"
              alt={isEn ? "Lake Ammersee and the region" : "Ammersee und Region"}
              fill
              className="object-cover"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div>
            <div className="text-[11px] tracking-[0.32em] uppercase text-wood-dark mb-4">
              {isEn ? '45 min by S8' : '45 Min. mit der S8'}
            </div>
            <h2 className="font-serif font-medium text-3xl md:text-[38px] text-forest mb-[18px] leading-[1.1]">
              {isEn ? 'Munich on your doorstep' : 'München vor der Tür'}
            </h2>
            <p className="text-base leading-[1.7] text-[#5A5142] mb-6">
              {isEn
                ? 'The S8 suburban train takes you directly to Marienplatz — Viktualienmarkt, museums, English Garden. The S8 also runs directly to the airport. Perfect for Munich visitors, even without a car.'
                : 'Die S-Bahn S8 bringt Sie direkt zum Marienplatz — Viktualienmarkt, Museen, Englischer Garten. Die S8 fährt auch direkt zum Flughafen. Perfekt für München-Besucher auch ohne Auto.'}
            </p>
            <div className="border-t border-wood-dark/30 pt-[22px]">
              <div className="text-xs tracking-[0.18em] uppercase text-wood-dark mb-3.5">
                {isEn ? 'More day trips' : 'Weitere Ausflugsziele'}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[11px] text-[14.5px] text-[#3C362B]">
                <div>Starnberger See · 20&nbsp;Min</div>
                <div>Fünf-Seen-Land</div>
                <div>{isEn ? "King Ludwig's castles" : 'Schlösser König Ludwigs'} · 1&nbsp;Std</div>
                <div>Garmisch &amp; Zugspitze · 1&nbsp;Std</div>
              </div>
            </div>
          </div>
        </section>

        {/* Hiking Routes */}
        <section className="py-24 px-6 bg-forest">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif font-medium text-4xl md:text-5xl text-[#FBF6EC] text-center mb-4">{isEn ? 'Best Hikes from Herrsching' : 'Die besten Wanderungen ab Herrsching'}</h2>
            <p className="text-center text-[#C9D5CB] mb-16 max-w-2xl mx-auto">{isEn ? "Start the region's most beautiful hiking trails directly from the Sonnenhof – something for every level." : 'Direkt vom Sonnenhof starten Sie in die schönsten Wanderrouten der Region – für jeden Anspruch ist etwas dabei.'}</p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-none p-8 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                <div className="flex items-center gap-3 mb-4"><Church className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Kiental to Andechs Monastery' : 'Kiental → Kloster Andechs'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">5 km</span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'approx. 1.5 hrs' : 'ca. 1,5 Std.'}</span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'moderate' : 'mittel'}</span>
                </div>
                <p className="text-[#5A5142] leading-relaxed">{isEn ? "Hike through the romantic Kiental on idyllic forest trails up to the famous Andechs Monastery. The path leads through shady beech forests and rewards you with the legendary beer garden and breathtaking Alpine panorama." : 'Durch das romantische Kiental wandern Sie auf idyllischen Waldwegen hinauf zum berühmten Kloster Andechs. Der Weg führt durch schattige Buchenwälder und belohnt Sie am Ziel mit dem legendären Biergarten und einem atemberaubenden Alpenpanorama.'}</p>
                <div className="mt-4 pt-4 border-t border-wood-dark/20"><p className="text-sm text-wood-dark font-medium">{isEn ? 'Highlight: Beer garden with Alpine views' : 'Highlight: Biergarten mit Alpenblick am Ziel'}</p></div>
              </Card>
              <Card className="bg-white border-none p-8 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                <div className="flex items-center gap-3 mb-4"><Waves className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Ammersee West Shore Trail' : 'Ammersee-Westufer Weg'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">10 km</span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'approx. 3 hrs' : 'ca. 3 Std.'}</span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'easy' : 'leicht'}</span>
                </div>
                <p className="text-[#5A5142] leading-relaxed">{isEn ? "Walk along the picturesque west shore of Lake Ammersee on mostly flat paths from Herrsching towards Dießen. The trail offers constant lake views, shady forest sections and idyllic swimming spots. Ideal for a relaxed half-day walk with the family." : 'Entlang des malerischen Westufers des Ammersees wandern Sie auf meist flachen Wegen von Herrsching Richtung Dießen. Der Weg bietet ständigen Seeblick, schattige Waldpassagen und idyllische Badestellen zum Abkühlen unterwegs.'}</p>
                <div className="mt-4 pt-4 border-t border-wood-dark/20"><p className="text-sm text-wood-dark font-medium">{isEn ? 'Highlight: Swimming spots with lake views along the way' : 'Highlight: Badestellen mit Seeblick entlang des Weges'}</p></div>
              </Card>
              <Card className="bg-white border-none p-8 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                <div className="flex items-center gap-3 mb-4"><Mountain className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Herrsching Panorama Trail' : 'Panoramaweg Herrsching'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">3 km</span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'approx. 1 hr' : 'ca. 1 Std.'}</span>
                  <span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'easy' : 'leicht'}</span>
                </div>
                <p className="text-[#5A5142] leading-relaxed">{isEn ? 'This short panorama trail is perfect for a relaxed afternoon stroll. It leads over the hills of Herrsching and offers wonderful views of Lake Ammersee and, on clear days, all the way to the Alps.' : 'Der kurze Panoramaweg ist perfekt für einen entspannten Nachmittagsspaziergang. Er führt über die Höhen von Herrsching und bietet herrliche Ausblicke auf den Ammersee und bei klarer Sicht bis zu den Alpen.'}</p>
                <div className="mt-4 pt-4 border-t border-wood-dark/20"><p className="text-sm text-wood-dark font-medium">{isEn ? 'Highlight: Alpine panorama on clear days' : 'Highlight: Alpenpanorama bei Föhn'}</p></div>
              </Card>
            </div>
          </div>
        </section>

        {/* Cycling Tours */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif font-medium text-4xl md:text-5xl text-forest text-center mb-4">{isEn ? 'Cycling Tours at Lake Ammersee' : 'Radtouren am Ammersee'}</h2>
            <p className="text-center text-[#5A5142] mb-16 max-w-2xl mx-auto">{isEn ? "The Five Lakes Region is a cyclist's paradise – well-maintained paths through gentle hills, always with lake views." : 'Das Fünfseenland ist ein Paradies für Radfahrer – bestens ausgebaute Wege durch sanfte Hügellandschaft und immer mit Seeblick.'}</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-white border-none p-8 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                <div className="flex items-center gap-3 mb-4"><Bike className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Ammersee Circuit' : 'Ammersee-Rundweg'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4"><span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">46 km</span><span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? '3-4 hrs' : '3–4 Std.'}</span></div>
                <p className="text-[#5A5142] leading-relaxed">{isEn ? "The most popular cycle tour in the region takes you all the way around Lake Ammersee. Mostly flat on well-maintained cycle paths, passing picturesque towns like Dießen, Utting and Schondorf. Numerous beer gardens and swimming spots invite you to linger." : 'Die beliebteste Radtour der Region führt einmal komplett um den Ammersee. Meist flach und auf gut ausgebauten Radwegen, passieren Sie malerische Orte wie Dießen, Utting und Schondorf. Zahlreiche Biergärten und Badestellen laden zu gemütlichen Pausen ein.'}</p>
              </Card>
              <Card className="bg-white border-none p-8 rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)]">
                <div className="flex items-center gap-3 mb-4"><Bike className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">Herrsching – Dießen – Andechs</h3></div>
                <div className="flex flex-wrap gap-2 mb-4"><span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">25 km</span><span className="inline-flex items-center px-4 py-1.5 bg-sand text-[#3C362B] text-[13px] rounded-full">{isEn ? 'approx. 2 hrs' : 'ca. 2 Std.'}</span></div>
                <p className="text-[#5A5142] leading-relaxed">{isEn ? "This varied circuit combines the region's highlights: from the Ammersee shore through the artist town of Dießen, up to Andechs Monastery and back to Herrsching. The route has some climbs but rewards with stunning views." : 'Diese abwechslungsreiche Rundtour verbindet die Highlights der Region: Vom Ammersee-Ufer über das Künstlerstädtchen Dießen hinauf zum Kloster Andechs und zurück nach Herrsching. Die Strecke hat einige Steigungen, belohnt aber mit traumhaften Ausblicken.'}</p>
              </Card>
            </div>
            <div className="text-center mt-10">
              <p className="text-[#5A5142]">{isEn ? 'Detailed route descriptions and tips in our ' : 'Ausführliche Routenbeschreibungen und Tipps finden Sie in unserem '}<a href="/blog/radtour-ammersee-unterkunft" className="text-forest hover:text-wood-dark font-medium underline decoration-2 underline-offset-2 decoration-wood/60">{isEn ? 'Cycling Guide at Lake Ammersee' : 'Radtour-Guide am Ammersee'}</a>.</p>
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="py-16 px-6 bg-sand">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif font-medium text-3xl md:text-4xl text-forest mb-10">{isEn ? 'Tips for your stay' : 'Passende Tipps für Ihren Aufenthalt'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { href: "/blog/ausflugsziele-herrsching-ammersee", title: isEn ? "Day trips around Herrsching" : "Ausflugsziele rund um Herrsching" },
                { href: "/blog/radtour-ammersee-unterkunft", title: isEn ? "Cycling & swimming at Lake Ammersee" : "Radtour & Baden am Ammersee" },
                { href: "/blog/ferienwohnung-fuenfseenland", title: isEn ? "Discover the Five Lakes Region" : "Das Fünfseenland entdecken" },
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: isEn ? "Lake Ammersee with your dog" : "Ammersee mit Hund" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <Card className="p-6 bg-white border-none rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] hover:shadow-md transition-shadow h-full flex flex-col justify-between">
                    <h3 className="font-serif text-lg text-forest group-hover:text-wood-dark transition-colors mb-4">{post.title}</h3>
                    <span className="text-forest group-hover:text-wood-dark font-medium inline-flex items-center gap-2 text-sm transition-colors">{isEn ? 'Read more' : 'Weiterlesen'} <ArrowRight className="w-4 h-4" /></span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Practical Info */}
        <section className="py-16 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif font-medium text-3xl text-forest mb-8 text-center">{isEn ? 'Practical Information' : 'Praktische Informationen'}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-none rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-6">
                <Clock className="w-8 h-8 text-wood-dark mb-4" />
                <h4 className="font-semibold text-forest mb-3">{isEn ? 'Best Time to Visit' : 'Beste Reisezeit'}</h4>
                <p className="text-[#5A5142] text-sm"><strong>{isEn ? 'Peak season:' : 'Hauptsaison:'}</strong> {isEn ? 'June to October' : 'Juni bis Oktober'}<br />{isEn ? 'Perfect for swimming, hiking and cycling' : 'Perfekt für Baden, Wandern und Radfahren'}</p>
              </Card>
              <Card className="bg-white border-none rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-6">
                <MapPin className="w-8 h-8 text-wood-dark mb-4" />
                <h4 className="font-semibold text-forest mb-3">{isEn ? 'Distances' : 'Entfernungen'}</h4>
                <ul className="text-sm text-[#5A5142] space-y-1">
                  <li>• {isEn ? 'Lake Ammersee: 5 min walk' : 'Ammersee: 5 Min. zu Fuß'}</li>
                  <li>• {isEn ? 'S-Bahn station: 5 min walk' : 'S-Bahnhof: 5 Min. zu Fuß'}</li>
                  <li>• Kloster Andechs: 4,5 km</li>
                  <li>• {isEn ? 'Munich: 45 min by S8' : 'München: 45 Min. mit S8'}</li>
                </ul>
              </Card>
              <Card className="bg-white border-none rounded-xl shadow-[0_1px_2px_rgba(42,36,28,0.06)] p-6">
                <Coffee className="w-8 h-8 text-wood-dark mb-4" />
                <h4 className="font-semibold text-forest mb-3">{isEn ? 'Nearby' : 'Vor Ort'}</h4>
                <ul className="text-sm text-[#5A5142] space-y-1">
                  <li>• {isEn ? 'Bakery: 5 min walk' : 'Bäcker: 5 Min. zu Fuß'}</li>
                  <li>• {isEn ? 'Supermarket: 10 min walk' : 'Supermarkt: 10 Min. zu Fuß'}</li>
                  <li>• {isEn ? 'Restaurants & cafes' : 'Restaurants & Cafés'}</li>
                  <li>• {isEn ? 'E-bike rental' : 'E-Bike-Verleih'}</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ
          items={extractFaqItems(erlebenSchemas[1])}
          heading={isEn ? 'Frequently Asked Questions about Herrsching & Lake Ammersee' : 'Häufige Fragen zu Herrsching & Ammersee'}
          subheading={isEn ? 'Everything you need to know for your stay in the region' : 'Alles Wichtige für Ihren Aufenthalt in der Region'}
        />

        {/* Quote + CTA */}
        <section className="px-6 md:px-16 pt-16 pb-24 md:pb-[100px] text-center bg-stone">
          <p className="font-serif italic text-[22px] text-wood-dark max-w-[640px] mx-auto mb-[30px] leading-[1.5]">
            {isEn
              ? '"Ask us for insider tips — we know the most beautiful hiking trails, cosy taverns and quiet swimming spots."'
              : '„Fragen Sie uns nach Geheimtipps — wir kennen die schönsten Wanderwege, gemütliche Wirtshäuser und ruhige Badeplätze."'}
          </p>
          <Link
            href="/kontakt"
            className="inline-block bg-wood text-[#241B0F] text-[15px] font-semibold px-9 py-4 rounded-md hover:bg-[#D3AC6E] transition-colors"
          >
            {isEn ? 'Enquire about your stay' : 'Aufenthalt anfragen'}
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
