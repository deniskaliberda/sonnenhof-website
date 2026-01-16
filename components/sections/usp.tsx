import { Home, Heart, MapPin } from "lucide-react";

export function USP() {
  const features = [
    {
      icon: Heart,
      title: "Familiär & Persönlich",
      description: "Kein anonymes Hotel – bei uns werden Sie Teil der Familie. Persönliche Betreuung und echte Gastfreundschaft.",
    },
    {
      icon: MapPin,
      title: "Direkt am Ammersee",
      description: "Nur wenige Gehminuten zum Dampfersteg und Seeufer. Perfekt für Erholung und Aktivitäten am Wasser.",
    },
    {
      icon: Home,
      title: "Tradition trifft Moderne",
      description: "Bayerische Gemütlichkeit in zeitgemäßem Ambiente. Hochwertige Ausstattung mit viel Liebe zum Detail.",
    },
  ];

  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
          Warum Sonnenhof?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-wood/20 mb-6">
                <feature.icon className="w-8 h-8 text-wood" />
              </div>
              <h3 className="font-serif text-2xl text-forest mb-4">
                {feature.title}
              </h3>
              <p className="text-text-primary/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
