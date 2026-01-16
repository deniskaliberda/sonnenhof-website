import Image from "next/image";

export function Intro() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Willkommen in unserer Familie
            </h2>
            <div className="space-y-4 text-lg text-text-primary/80 leading-relaxed">
              <p>
                Der Sonnenhof wird seit Generationen von unserer Familie geführt. 
                Was uns auszeichnet? Die persönliche Note, die in einem großen Hotel 
                oft verloren geht.
              </p>
              <p>
                Bei uns sind Sie nicht nur Gast – Sie werden Teil unserer Geschichte. 
                Ob beim Frühstück auf der Terrasse, bei Tipps für Ausflüge ans Kloster 
                Andechs oder einem spontanen Plausch am Abend: Hier spüren Sie echte 
                bayerische Gastfreundschaft.
              </p>
              <p className="text-forest font-semibold">
                Familiär. Naturverbunden. Einzigartig.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80"
              alt="Ammersee bei Sonnenuntergang"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
