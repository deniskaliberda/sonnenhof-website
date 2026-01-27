import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      text: "Ein wunderbarer Ort zum Entspannen. Die Familie ist so herzlich und die Lage direkt am See ist traumhaft. Wir kommen definitiv wieder!",
      author: "Familie Schmidt",
      location: "München",
    },
    {
      text: "Perfekt für meinen Geschäftstrip. Ruhige Lage, aber trotzdem gut erreichbar. Die Teeküche ist super praktisch und die Gastgeberin sehr zuvorkommend.",
      author: "Thomas K.",
      location: "Frankfurt",
    },
    {
      text: "Wir haben uns sofort wie zuhause gefühlt. Die Wohnung war liebevoll eingerichtet und hatte alles, was man braucht. Der Ammersee ist einfach ein Traum!",
      author: "Lisa & Mark",
      location: "Hamburg",
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
