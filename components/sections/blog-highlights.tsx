import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const highlights = [
  {
    href: "/blog/ferienwohnung-ammersee-mit-hund",
    title: "Urlaub mit Hund",
    description: "Hundestrände, Wanderwege & Tipps für den Urlaub mit Hund am Ammersee.",
  },
  {
    href: "/blog/ferienwohnung-muenchen-umgebung",
    title: "München erleben",
    description: "In 45 Minuten von der Natur am Ammersee direkt ins Münchner Zentrum.",
  },
  {
    href: "/blog/familienurlaub-ammersee",
    title: "Familienurlaub",
    description: "Ausflugstipps, Strandbad & Spielplätze für den perfekten Familienurlaub.",
  },
  {
    href: "/blog/pension-am-ammersee",
    title: "Pension am Ammersee",
    description: "Was eine Pension ausmacht und warum Herrsching der perfekte Urlaubsort ist.",
  },
  {
    href: "/blog/guenstige-pension-ammersee",
    title: "Günstig am Ammersee",
    description: "Spartipps, Preisvergleich & kostenlose Aktivitäten für Ihren Ammersee-Urlaub.",
  },
];

export function BlogHighlights() {
  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-forest mb-4">
            Beliebte Themen
          </h2>
          <p className="text-lg text-text-primary/70">
            Tipps & Inspiration für Ihren Aufenthalt am Ammersee
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <Card className="bg-white border-none rounded-2xl shadow-md hover:shadow-xl transition-shadow p-8 h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-2xl text-forest group-hover:text-wood transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-text-primary/80 leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <span className="text-forest group-hover:text-wood font-medium inline-flex items-center gap-2 transition-colors">
                  Weiterlesen <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
