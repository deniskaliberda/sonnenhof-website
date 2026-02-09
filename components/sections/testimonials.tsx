import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      text: "Super nette Eigentümerin, die sehr hilfreiche Tipps für die Region hatte und immer sehr freundlich war. Das Zimmer war schön, hatte einen hübschen Balkon, generell war auch das Gebäude sehr schön. Die Lage war top und die Zimmer waren preiswert. Wenn wir wieder nach Herrsching kommen würden wir uns hier ohne zu zögern wieder einbuchen :-)",
      author: "Marc Alex",
      location: "Google-Bewertung",
    },
    {
      text: "Wir hatten unsere ganze Familie & Freunde im Zuge einer Feier im Sonnenhof Herrsching untergebracht. Alle waren super happy und dankbar. … schöne, authentische Zimmer, gutes Preis/ Leistungsverhältnis - und unschlagbare Nähe zum Ammersee Strand. Jederzeit wieder!!",
      author: "Ben Evento",
      location: "Google-Bewertung",
    },
    {
      text: "Wir lieben diese Ferienwohnung, die Lage, die Ruhe die freundliche Vermieterin die tolle Sauberkeit. Und mieten Sie seit Jahren, da wir Berufsmäßig in Herrsching tätig sind. Dieses Jahr bekamen wir die Ferienwohnung \"Herrsching\" zugeteilt (mit Küche, Terrasse, großem Bad, großem Schlafzimmer und großem Wohnbereich). Vielen Dank, wir freuen uns schon auf das nächste mal",
      author: "Roland Hage",
      location: "Google-Bewertung",
    },
  ];

  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
          Gästestimmen
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-none shadow-sm bg-white">
              <CardContent className="pt-6">
                <Quote className="w-10 h-10 text-wood/30 mb-4" />
                <p className="text-text-primary/80 mb-6 leading-relaxed">
                  {testimonial.text}
                </p>
                <div className="border-t border-stone pt-4">
                  <p className="font-semibold text-forest">{testimonial.author}</p>
                  <p className="text-sm text-text-primary/60">{testimonial.location}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
