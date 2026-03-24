import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { Link } from "@/i18n/navigation";
import {
  Waves, Mountain, Bike, Train, MapPin, Church, Sailboat,
  Footprints, Coffee, TreePine, Sparkles, Clock, ArrowRight
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
  const t = await getTranslations({ locale, namespace: 'ErlebenPage' });
  const tFaq = await getTranslations({ locale, namespace: 'FAQ' });
  const isEn = locale === 'en';

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: isEn ? "Explore Lake Ammersee" : "Ammersee erleben", path: "/erleben" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {erlebenSchemas.map((schema, i) => (
        <JsonLd key={i} data={schema} />
      ))}
      <Navigation />
      <main className="pt-20 bg-white">
        <ErlebenHero />

        {/* Info bar */}
        <section className="py-8 px-6 bg-stone">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <Train className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">{t('toSBahn')}</p>
                <p className="text-sm text-text-primary/60">{t('munichIn45')}</p>
              </div>
              <div className="text-center">
                <Waves className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">{t('toAmmersee')}</p>
                <p className="text-sm text-text-primary/60">{t('secondRow')}</p>
              </div>
              <div className="text-center">
                <Mountain className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">{t('alpsPanorama')}</p>
                <p className="text-sm text-text-primary/60">{t('stunningView')}</p>
              </div>
              <div className="text-center">
                <Bike className="w-8 h-8 text-wood mx-auto mb-2" />
                <p className="font-semibold text-forest">{t('fiveSeenLand')}</p>
                <p className="text-sm text-text-primary/60">{t('hikingParadise')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Activities */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
              {t('whatAwaits')}
            </h2>
            <p className="text-center text-text-primary/70 mb-4 max-w-2xl mx-auto">
              {t('discoverRegion')}
            </p>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">
              {t('bookAccommodation')}
            </p>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Ammersee */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0">
                    <Waves className="w-8 h-8 text-wood" />
                  </div>
                  <h3 className="font-serif text-3xl text-forest">{isEn ? 'Lake Ammersee' : 'Der Ammersee'}</h3>
                </div>
                <p className="text-text-primary/80 mb-6">{isEn ? 'Stunning pre-Alpine lake right on your doorstep' : 'Traumhafter Voralpensee direkt vor der Haustür'}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Sailboat className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div><strong className="text-forest">{isEn ? 'Steamboat Cruises' : 'Dampferfahrten'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Cruises to Dießen, Utting and around the lake' : 'Rundfahrten nach Dießen, Utting und rund um den See'}</p></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div><strong className="text-forest">{isEn ? 'Swimming & Water Sports' : 'Baden & Wassersport'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Lidos, sailing, SUP, surfing' : 'Strandbäder, Segeln, SUP, Surfen'}</p></div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Footprints className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" />
                    <div><strong className="text-forest">{isEn ? "Germany's Longest Lake Promenade" : 'Längste Seepromenade Deutschlands'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Walks with Alpine views' : 'Spaziergänge mit Alpenblick'}</p></div>
                  </li>
                </ul>
                <div className="mt-6 pt-6 border-t border-forest/10">
                  <p className="text-sm text-amber-700 font-medium">{isEn ? "Just 5 minutes' walk from the Sonnenhof · Also ideal with dogs" : "Nur 5 Gehminuten vom Sonnenhof · Auch ideal mit Hund"}</p>
                </div>
              </Card>

              {/* Hiking */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0"><Mountain className="w-8 h-8 text-wood" /></div>
                  <h3 className="font-serif text-3xl text-forest">{isEn ? 'Hiking' : 'Wandern'}</h3>
                </div>
                <p className="text-text-primary/80 mb-6">{isEn ? 'Numerous hiking trails for all levels' : 'Zahlreiche Wanderwege für jeden Anspruch'}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><Church className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">Kloster Andechs</strong><p className="text-sm text-text-primary/70">{isEn ? '4.5 km through the forest, beer garden with Alpine views' : '4,5 km durch den Wald, Biergarten mit Alpenblick'}</p></div></li>
                  <li className="flex items-start gap-3"><TreePine className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">Kiental</strong><p className="text-sm text-text-primary/70">{isEn ? 'Romantic nature gem, idyllic forest trails' : 'Romantisches Naturjuwel, idyllische Waldwege'}</p></div></li>
                  <li className="flex items-start gap-3"><Mountain className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">{isEn ? 'Rolling Moraine Landscape' : 'Hügelige Moränenlandschaft'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Marked trails with wonderful views' : 'Markierte Wege mit herrlichen Ausblicken'}</p></div></li>
                </ul>
                <div className="mt-6 pt-6 border-t border-forest/10"><p className="text-sm text-amber-700 font-medium">{isEn ? 'Alps reachable in 1 hour' : 'Alpen in 1 Stunde erreichbar'}</p></div>
              </Card>

              {/* Cycling */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0"><Bike className="w-8 h-8 text-wood" /></div>
                  <h3 className="font-serif text-3xl text-forest">{isEn ? 'Cycling' : 'Radfahren'}</h3>
                </div>
                <p className="text-text-primary/80 mb-6">{isEn ? "Cyclist's paradise in the Five Lakes Region" : 'Paradies für Radler im Fünf-Seen-Land'}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><Bike className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">{isEn ? 'Ammersee Circuit' : 'Ammersee-Rundweg'}</strong><p className="text-sm text-text-primary/70">{isEn ? '47 km, mostly flat, constant lake views' : '47 km meist flach, ständiger Seeblick'}</p></div></li>
                  <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">{isEn ? 'Five Lakes Region' : 'Fünf-Seen-Land'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Tours to Starnberger See, Wörthsee, Pilsensee' : 'Touren zu Starnberger See, Wörthsee, Pilsensee'}</p></div></li>
                  <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">{isEn ? 'Well-maintained cycle paths' : 'Bestens ausgebaute Radwege'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Through gentle hills and picturesque villages' : 'Durch sanfte Hügel und malerische Dörfer'}</p></div></li>
                </ul>
                <div className="mt-6 pt-6 border-t border-forest/10"><p className="text-sm text-amber-700 font-medium">{isEn ? 'E-bike rental in Herrsching' : 'E-Bike-Verleih in Herrsching'}</p></div>
              </Card>

              {/* Day Trips */}
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-wood/20 flex items-center justify-center flex-shrink-0"><Train className="w-8 h-8 text-wood" /></div>
                  <h3 className="font-serif text-3xl text-forest">{isEn ? 'Day Trips' : 'Ausflugsziele'}</h3>
                </div>
                <p className="text-text-primary/80 mb-6">{isEn ? 'Perfect connections to all highlights' : 'Perfekte Anbindung zu allen Highlights'}</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3"><Train className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">{isEn ? 'Munich by S8' : 'München mit S8'}</strong><p className="text-sm text-text-primary/70">{isEn ? '45 min to Marienplatz, direct to airport' : '45 Min. zum Marienplatz, direkt zum Flughafen'}</p></div></li>
                  <li className="flex items-start gap-3"><Mountain className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">{isEn ? 'Royal Castles' : 'Königsschlösser'}</strong><p className="text-sm text-text-primary/70">{isEn ? 'Neuschwanstein & Linderhof in 1 hour' : 'Neuschwanstein & Linderhof in 1 Stunde'}</p></div></li>
                  <li className="flex items-start gap-3"><Sparkles className="w-5 h-5 text-wood flex-shrink-0 mt-0.5" /><div><strong className="text-forest">Garmisch & Zugspitze</strong><p className="text-sm text-text-primary/70">{isEn ? 'Mountains and winter sports in 1 hour' : 'Berge und Wintersport in 1 Stunde'}</p></div></li>
                </ul>
                <div className="mt-6 pt-6 border-t border-forest/10"><p className="text-sm text-amber-700 font-medium">{isEn ? "5 min walk to S-Bahn station" : "5 Min. zu Fuß zum S-Bahnhof"}</p></div>
              </Card>
            </div>
          </div>
        </section>

        {/* Hiking Routes */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">{isEn ? 'Best Hikes from Herrsching' : 'Die besten Wanderungen ab Herrsching'}</h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">{isEn ? "Start the region's most beautiful hiking trails directly from the Sonnenhof – something for every level." : 'Direkt vom Sonnenhof starten Sie in die schönsten Wanderrouten der Region – für jeden Anspruch ist etwas dabei.'}</p>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4"><Church className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Kiental to Andechs Monastery' : 'Kiental → Kloster Andechs'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">5 km</span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? 'approx. 1.5 hrs' : 'ca. 1,5 Std.'}</span>
                  <span className="inline-flex items-center px-3 py-1 bg-wood/20 text-wood text-sm rounded-full font-medium">{isEn ? 'moderate' : 'mittel'}</span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">{isEn ? "Hike through the romantic Kiental on idyllic forest trails up to the famous Andechs Monastery. The path leads through shady beech forests and rewards you with the legendary beer garden and breathtaking Alpine panorama." : 'Durch das romantische Kiental wandern Sie auf idyllischen Waldwegen hinauf zum berühmten Kloster Andechs. Der Weg führt durch schattige Buchenwälder und belohnt Sie am Ziel mit dem legendären Biergarten und einem atemberaubenden Alpenpanorama.'}</p>
                <div className="mt-4 pt-4 border-t border-forest/10"><p className="text-sm text-amber-700 font-medium">{isEn ? 'Highlight: Beer garden with Alpine views' : 'Highlight: Biergarten mit Alpenblick am Ziel'}</p></div>
              </Card>
              <Card className="bg-white border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4"><Waves className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Ammersee West Shore Trail' : 'Ammersee-Westufer Weg'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">10 km</span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? 'approx. 3 hrs' : 'ca. 3 Std.'}</span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? 'easy' : 'leicht'}</span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">{isEn ? "Walk along the picturesque west shore of Lake Ammersee on mostly flat paths from Herrsching towards Dießen. The trail offers constant lake views, shady forest sections and idyllic swimming spots. Ideal for a relaxed half-day walk with the family." : 'Entlang des malerischen Westufers des Ammersees wandern Sie auf meist flachen Wegen von Herrsching Richtung Dießen. Der Weg bietet ständigen Seeblick, schattige Waldpassagen und idyllische Badestellen zum Abkühlen unterwegs.'}</p>
                <div className="mt-4 pt-4 border-t border-forest/10"><p className="text-sm text-amber-700 font-medium">{isEn ? 'Highlight: Swimming spots with lake views along the way' : 'Highlight: Badestellen mit Seeblick entlang des Weges'}</p></div>
              </Card>
              <Card className="bg-white border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4"><Mountain className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Herrsching Panorama Trail' : 'Panoramaweg Herrsching'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">3 km</span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? 'approx. 1 hr' : 'ca. 1 Std.'}</span>
                  <span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? 'easy' : 'leicht'}</span>
                </div>
                <p className="text-text-primary/80 leading-relaxed">{isEn ? 'This short panorama trail is perfect for a relaxed afternoon stroll. It leads over the hills of Herrsching and offers wonderful views of Lake Ammersee and, on clear days, all the way to the Alps.' : 'Der kurze Panoramaweg ist perfekt für einen entspannten Nachmittagsspaziergang. Er führt über die Höhen von Herrsching und bietet herrliche Ausblicke auf den Ammersee und bei klarer Sicht bis zu den Alpen.'}</p>
                <div className="mt-4 pt-4 border-t border-forest/10"><p className="text-sm text-amber-700 font-medium">{isEn ? 'Highlight: Alpine panorama on clear days' : 'Highlight: Alpenpanorama bei Föhn'}</p></div>
              </Card>
            </div>
          </div>
        </section>

        {/* Cycling Tours */}
        <section className="py-24 px-6 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">{isEn ? 'Cycling Tours at Lake Ammersee' : 'Radtouren am Ammersee'}</h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">{isEn ? "The Five Lakes Region is a cyclist's paradise – well-maintained paths through gentle hills, always with lake views." : 'Das Fünfseenland ist ein Paradies für Radfahrer – bestens ausgebaute Wege durch sanfte Hügellandschaft und immer mit Seeblick.'}</p>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4"><Bike className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">{isEn ? 'Ammersee Circuit' : 'Ammersee-Rundweg'}</h3></div>
                <div className="flex flex-wrap gap-2 mb-4"><span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">46 km</span><span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? '3-4 hrs' : '3–4 Std.'}</span></div>
                <p className="text-text-primary/80 leading-relaxed">{isEn ? "The most popular cycle tour in the region takes you all the way around Lake Ammersee. Mostly flat on well-maintained cycle paths, passing picturesque towns like Dießen, Utting and Schondorf. Numerous beer gardens and swimming spots invite you to linger." : 'Die beliebteste Radtour der Region führt einmal komplett um den Ammersee. Meist flach und auf gut ausgebauten Radwegen, passieren Sie malerische Orte wie Dießen, Utting und Schondorf. Zahlreiche Biergärten und Badestellen laden zu gemütlichen Pausen ein.'}</p>
              </Card>
              <Card className="bg-stone border-none p-8 rounded-2xl">
                <div className="flex items-center gap-3 mb-4"><Bike className="w-8 h-8 text-wood" /><h3 className="font-serif text-2xl text-forest">Herrsching – Dießen – Andechs</h3></div>
                <div className="flex flex-wrap gap-2 mb-4"><span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">25 km</span><span className="inline-flex items-center px-3 py-1 bg-forest/10 text-forest text-sm rounded-full font-medium">{isEn ? 'approx. 2 hrs' : 'ca. 2 Std.'}</span></div>
                <p className="text-text-primary/80 leading-relaxed">{isEn ? "This varied circuit combines the region's highlights: from the Ammersee shore through the artist town of Dießen, up to Andechs Monastery and back to Herrsching. The route has some climbs but rewards with stunning views." : 'Diese abwechslungsreiche Rundtour verbindet die Highlights der Region: Vom Ammersee-Ufer über das Künstlerstädtchen Dießen hinauf zum Kloster Andechs und zurück nach Herrsching. Die Strecke hat einige Steigungen, belohnt aber mit traumhaften Ausblicken.'}</p>
              </Card>
            </div>
            <div className="text-center mt-10">
              <p className="text-text-primary/70">{isEn ? 'Detailed route descriptions and tips in our ' : 'Ausführliche Routenbeschreibungen und Tipps finden Sie in unserem '}<a href="/blog/radtour-ammersee-unterkunft" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">{isEn ? 'Cycling Guide at Lake Ammersee' : 'Radtour-Guide am Ammersee'}</a>.</p>
            </div>
          </div>
        </section>

        {/* Regional excursions */}
        <section className="py-24 px-6 bg-stone">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">{isEn ? 'Regional Excursions' : 'Ausflüge in die Region'}</h2>
            <p className="text-center text-text-primary/70 mb-16 max-w-2xl mx-auto">{isEn ? 'Herrsching is the ideal base for day trips – culture, nature or the big city.' : 'Herrsching ist der ideale Ausgangspunkt für Tagesausflüge – ob Kultur, Natur oder Großstadt.'}</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Church className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">Kloster Andechs</h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">{isEn ? '3 km away' : '3 km entfernt'}</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">{isEn ? 'The "Holy Mountain" with pilgrimage church, brewery and legendary beer garden with Alpine panorama.' : 'Der \u201EHeilige Berg\u201C mit Wallfahrtskirche, Brauerei und legendärem Biergarten mit Alpenpanorama.'}</p>
              </Card>
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Waves className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">Starnberger See</h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">{isEn ? '20 km away' : '20 km entfernt'}</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">{isEn ? 'The famous neighbouring lake with Berg Castle, Rose Island and numerous swimming spots.' : 'Der berühmte Nachbarsee mit Schloss Berg, Roseninsel und zahlreichen Bademöglichkeiten.'}</p>
              </Card>
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Train className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">{isEn ? 'Munich City Centre' : 'München Innenstadt'}</h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">{isEn ? '45 min by S8' : '45 Min. mit S8'}</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">{isEn ? 'Direct S-Bahn to Marienplatz – museums, shopping and beer gardens.' : 'Direkte S-Bahn-Verbindung zum Marienplatz – Museen, Shopping und Biergärten.'}</p>
              </Card>
              <Card className="bg-white border-none p-6 rounded-2xl text-center">
                <Sparkles className="w-10 h-10 text-wood mx-auto mb-3" />
                <h3 className="font-serif text-xl text-forest mb-2">{isEn ? 'Neuschwanstein Castle' : 'Schloss Neuschwanstein'}</h3>
                <p className="text-sm text-text-primary/60 font-medium mb-3">{isEn ? '90 min drive' : '90 Min. Fahrt'}</p>
                <p className="text-text-primary/80 text-sm leading-relaxed">{isEn ? "The world-famous fairy-tale castle of King Ludwig II – an unforgettable day trip." : 'Das weltberühmte Märchenschloss von König Ludwig II. – ein unvergesslicher Tagesausflug.'}</p>
              </Card>
            </div>
          </div>
        </section>

        {/* Blog Tips */}
        <section className="py-16 px-6 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-10">{isEn ? 'Tips for your stay' : 'Passende Tipps für Ihren Aufenthalt'}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { href: "/blog/ausflugsziele-herrsching-ammersee", title: isEn ? "Day trips around Herrsching" : "Ausflugsziele rund um Herrsching" },
                { href: "/blog/radtour-ammersee-unterkunft", title: isEn ? "Cycling & swimming at Lake Ammersee" : "Radtour & Baden am Ammersee" },
                { href: "/blog/ferienwohnung-fuenfseenland", title: isEn ? "Discover the Five Lakes Region" : "Das Fünfseenland entdecken" },
                { href: "/blog/ferienwohnung-ammersee-mit-hund", title: isEn ? "Lake Ammersee with your dog" : "Ammersee mit Hund" },
              ].map((post) => (
                <a key={post.href} href={post.href} className="group">
                  <Card className="p-6 bg-stone border-none hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
                    <h3 className="font-serif text-lg text-forest group-hover:text-wood transition-colors mb-4">{post.title}</h3>
                    <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 text-sm transition-colors">{isEn ? 'Read more' : 'Weiterlesen'} <ArrowRight className="w-4 h-4" /></span>
                  </Card>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <FAQ
          items={extractFaqItems(erlebenSchemas[1])}
          heading={isEn ? 'Frequently Asked Questions about Herrsching & Lake Ammersee' : 'Häufige Fragen zu Herrsching & Ammersee'}
          subheading={isEn ? 'Everything you need to know for your stay in the region' : 'Alles Wichtige für Ihren Aufenthalt in der Region'}
        />

        {/* Final CTA */}
        <section className="py-24 px-6 bg-gradient-to-b from-stone to-white">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">{isEn ? 'Your Perfect Retreat' : 'Ihr perfekter Rückzugsort'}</h2>
              <p className="text-xl text-text-primary/80 leading-relaxed max-w-3xl mx-auto">{isEn ? 'After an eventful day at the lake, hiking or cycling, look forward to your cosy accommodation at the Sonnenhof.' : 'Nach einem erlebnisreichen Tag am See, beim Wandern oder Radfahren freuen Sie sich auf Ihre gemütliche Unterkunft im Sonnenhof.'}</p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <Card className="bg-white border-2 border-forest/20 p-6 hover:border-forest/40 transition-colors">
                <h3 className="font-serif text-2xl text-forest mb-3">{isEn ? 'Holiday Apartments' : 'Ferienwohnungen'}</h3>
                <p className="text-text-primary/80 mb-4">{isEn ? 'Fully equipped with kitchen, balcony or terrace. Perfect for longer stays and families.' : 'Komplett ausgestattet mit Küche, Balkon oder Terrasse. Perfekt für längere Aufenthalte und Familien.'}</p>
                <Button asChild className="w-full bg-forest hover:bg-forest/90"><Link href="/wohnen/ferienwohnungen">{isEn ? 'View apartments' : 'Ferienwohnungen ansehen'}</Link></Button>
              </Card>
              <Card className="bg-white border-2 border-forest/20 p-6 hover:border-forest/40 transition-colors">
                <h3 className="font-serif text-2xl text-forest mb-3">{isEn ? 'Guest Rooms' : 'Gästezimmer'}</h3>
                <p className="text-text-primary/80 mb-4">{isEn ? 'Cosy rooms with private bathroom and access to kitchenette. Ideal for short stays and city trips.' : 'Gemütliche Zimmer mit eigenem Bad und Zugang zur Teeküche. Ideal für Kurzaufenthalte und Städtetrips.'}</p>
                <Button asChild variant="outline" className="w-full border-forest text-forest hover:bg-forest/10"><Link href="/wohnen/zimmer">{isEn ? 'View rooms' : 'Gästezimmer ansehen'}</Link></Button>
              </Card>
            </div>
            <div className="text-center">
              <p className="text-text-primary/60 mb-4">{isEn ? 'Or enquire directly:' : 'Oder direkt anfragen:'}</p>
              <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600"><Link href="/kontakt">{isEn ? 'Send an enquiry' : 'Unverbindlich anfragen'}</Link></Button>
            </div>
          </div>
        </section>

        {/* Practical Info */}
        <section className="py-16 px-6 bg-amber-50/30">
          <div className="max-w-6xl mx-auto">
            <h3 className="font-serif text-3xl text-forest mb-8 text-center">{isEn ? 'Practical Information' : 'Praktische Informationen'}</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-white border-none p-6">
                <Clock className="w-8 h-8 text-wood mb-4" />
                <h4 className="font-semibold text-forest mb-3">{isEn ? 'Best Time to Visit' : 'Beste Reisezeit'}</h4>
                <p className="text-text-primary/80 text-sm"><strong>{isEn ? 'Peak season:' : 'Hauptsaison:'}</strong> {isEn ? 'June to October' : 'Juni bis Oktober'}<br />{isEn ? 'Perfect for swimming, hiking and cycling' : 'Perfekt für Baden, Wandern und Radfahren'}</p>
              </Card>
              <Card className="bg-white border-none p-6">
                <MapPin className="w-8 h-8 text-wood mb-4" />
                <h4 className="font-semibold text-forest mb-3">{isEn ? 'Distances' : 'Entfernungen'}</h4>
                <ul className="text-sm text-text-primary/80 space-y-1">
                  <li>• {isEn ? 'Lake Ammersee: 5 min walk' : 'Ammersee: 5 Min. zu Fuß'}</li>
                  <li>• {isEn ? 'S-Bahn station: 5 min walk' : 'S-Bahnhof: 5 Min. zu Fuß'}</li>
                  <li>• Kloster Andechs: 4,5 km</li>
                  <li>• {isEn ? 'Munich: 45 min by S8' : 'München: 45 Min. mit S8'}</li>
                </ul>
              </Card>
              <Card className="bg-white border-none p-6">
                <Coffee className="w-8 h-8 text-wood mb-4" />
                <h4 className="font-semibold text-forest mb-3">{isEn ? 'Nearby' : 'Vor Ort'}</h4>
                <ul className="text-sm text-text-primary/80 space-y-1">
                  <li>• {isEn ? 'Bakery: 5 min walk' : 'Bäcker: 5 Min. zu Fuß'}</li>
                  <li>• {isEn ? 'Supermarket: 10 min walk' : 'Supermarkt: 10 Min. zu Fuß'}</li>
                  <li>• {isEn ? 'Restaurants & cafes' : 'Restaurants & Cafés'}</li>
                  <li>• {isEn ? 'E-bike rental' : 'E-Bike-Verleih'}</li>
                </ul>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
