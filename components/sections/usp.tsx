import { Home, Heart, MapPin, Car, Wifi, Dog } from "lucide-react";

export function USP() {
  const features = [
    {
      icon: Heart,
      title: "Persönlich & Echt",
      description: "Bei uns reden Sie mit Menschen, nicht mit KI. Sie sprechen immer direkt mit der Chefin – kein Callcenter, keine anonymen Portale.",
    },
    {
      icon: MapPin,
      title: "Perfekte Lage",
      description: "5 Min. zum Bäcker, 10 Min. zum S-Bahnhof. Mit der S8 in 50 Min. nach München oder direkt zum Flughafen. Auch ohne Auto bestens erreichbar!",
    },
    {
      icon: Home,
      title: "Über 40 Jahre Erfahrung",
      description: "In 3. Generation geführt. Bayrische Gastfreundschaft mit Qualität, Nachhaltigkeit und echtem Charme.",
    },
  ];

  const extras = [
    { icon: Car, label: "Kostenloser Parkplatz" },
    { icon: Wifi, label: "Kostenloses WLAN" },
    { icon: Dog, label: "Hunde willkommen" },
  ];

  return (
    <section className="py-24 px-6 bg-stone">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest text-center mb-16">
          Warum Sonnenhof?
        </h2>
        
        <div className="grid md:grid-cols-3 gap-12 mb-16">
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

        {/* Extras */}
        <div className="flex flex-wrap justify-center gap-8 pt-8 border-t border-forest/10">
          {extras.map((extra) => (
            <div key={extra.label} className="flex items-center gap-3">
              <extra.icon className="w-5 h-5 text-wood" />
              <span className="text-text-primary/80">{extra.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
