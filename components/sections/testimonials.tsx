import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import { googleRating } from "@/lib/mock-data";

const testimonials = [
  {
    text: "Super nette Eigentümerin, die sehr hilfreiche Tipps für die Region hatte und immer sehr freundlich war. Das Zimmer war schön, hatte einen hübschen Balkon, generell war auch das Gebäude sehr schön. Die Lage war top und die Zimmer waren preiswert.",
    author: "Marc Alex",
    rating: 5,
  },
  {
    text: "Wir hatten unsere ganze Familie & Freunde im Zuge einer Feier im Sonnenhof Herrsching untergebracht. Alle waren super happy und dankbar. … schöne, authentische Zimmer, gutes Preis/ Leistungsverhältnis - und unschlagbare Nähe zum Ammersee Strand. Jederzeit wieder!!",
    author: "Ben Evento",
    rating: 5,
  },
  {
    text: "Wir lieben diese Ferienwohnung, die Lage, die Ruhe die freundliche Vermieterin die tolle Sauberkeit. Und mieten Sie seit Jahren, da wir Berufsmäßig in Herrsching tätig sind. Vielen Dank, wir freuen uns schon auf das nächste mal",
    author: "Roland Hage",
    rating: 5,
  },
  {
    text: "Perfekte Lage direkt am Ammersee, sehr sauber und liebevoll eingerichtet. Die Gastgeberin ist herzlich und gibt tolle Ausflugstipps. Kommen gerne wieder!",
    author: "Sabine W.",
    rating: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <span className="text-amber-500" aria-label={`${count} von 5 Sternen`}>
      {"★".repeat(count)}
      {"☆".repeat(5 - count)}
    </span>
  );
}

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-4">
          Gästestimmen
        </h2>

        {/* Aggregate Rating */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="text-2xl text-amber-500" aria-label={`${googleRating.score} von ${googleRating.maxScore} Sternen`}>
              ★★★★★
            </span>
            <span className="text-2xl font-semibold text-forest">
              {googleRating.score.toLocaleString("de-DE")} von {googleRating.maxScore}
            </span>
          </div>
          <p className="text-text-primary/60">
            Basierend auf{" "}
            <a
              href={googleRating.url}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-forest transition-colors"
            >
              {googleRating.reviewCount} Google-Bewertungen
            </a>
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm bg-white">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 mb-3">
                  <Quote className="w-6 h-6 text-wood/30 shrink-0" />
                  <Stars count={testimonial.rating} />
                </div>
                <p className="text-text-primary/80 mb-6 leading-relaxed text-sm">
                  {testimonial.text}
                </p>
                <div className="border-t border-stone pt-4">
                  <p className="font-semibold text-forest">{testimonial.author}</p>
                  <p className="text-xs text-text-primary/60">Google-Bewertung</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
