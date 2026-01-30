import Image from "next/image";

export function Intro() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Seit über 40 Jahren in Herrsching
            </h2>
            <div className="space-y-4 text-lg text-text-primary/80 leading-relaxed">
              <p>
                Der Sonnenhof wird in 3. Generation von den Frauen unserer Familie geführt. 
                Was uns auszeichnet? <strong className="text-forest">Bei uns reden Sie mit 
                Menschen, nicht mit KI oder Computern.</strong>
              </p>
              <p>
                Wir sind bayrisch und legen Wert auf Qualität, Nachhaltigkeit und Nähe. 
                Ob bei Tipps für Ausflüge ans Kloster Andechs, einem Geheimtipp für die 
                schönste Dampferfahrt oder Fragen zu Ihrer Unterkunft: Hier sprechen Sie 
                immer direkt mit der Chefin.
              </p>
              <p className="text-forest font-semibold">
                Hunde und Kinder herzlich willkommen!
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/allgemein/erleben-01.jpg"
              alt="Ammersee Region"
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
