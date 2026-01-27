import { Award, Users, Heart } from "lucide-react";

export function TrustBadge() {
  const badges = [
    {
      icon: Award,
      text: "Seit über 40 Jahren",
      subtext: "in 3. Generation geführt",
    },
    {
      icon: Heart,
      text: "Persönlich & Bayrisch",
      subtext: "echte Gastfreundschaft",
    },
    {
      icon: Users,
      text: "Familienbetrieb",
      subtext: "direkt von der Chefin",
    },
  ];

  return (
    <section className="bg-forest/95 py-4 md:py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12">
          {badges.map((badge, index) => (
            <div 
              key={index} 
              className="flex items-center gap-3 text-white"
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <badge.icon className="w-5 h-5 text-amber-400" />
              </div>
              <div className="text-left">
                <p className="font-semibold text-sm md:text-base leading-tight">
                  {badge.text}
                </p>
                <p className="text-white/70 text-xs md:text-sm">
                  {badge.subtext}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
