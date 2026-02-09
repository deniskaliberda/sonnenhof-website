import Image from "next/image";
import Link from "next/link";

export function Intro() {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-forest mb-6">
              Ihre Pension in Herrsching – seit über 40 Jahren
            </h2>
            <div className="space-y-4 text-lg text-text-primary/80 leading-relaxed">
              <p>
                Sie suchen eine persönliche Unterkunft in Herrsching am Ammersee? 
                Der Sonnenhof wird in 3. Generation von den Frauen unserer Familie geführt. 
                Was uns auszeichnet? <strong className="text-forest">Bei uns reden Sie mit 
                Menschen, nicht mit KI oder Computern.</strong>
              </p>
              <p>
                Ob Ferienwohnung für die ganze Familie oder Gästezimmer für einen Kurztrip – 
                unsere Pension am Ammersee ist ideal für Ihren Urlaub in der Münchner Umgebung. 
                Ob bei Tipps für Ausflüge ans{" "}
                <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Kloster Andechs
                </Link>, einem Geheimtipp für die 
                schönste{" "}
                <Link href="/erleben" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Dampferfahrt
                </Link>{" "}
                oder Fragen zu Ihrer{" "}
                <Link href="/wohnen" className="text-forest hover:text-wood font-medium underline decoration-2 underline-offset-2">
                  Übernachtung am Ammersee
                </Link>: Hier sprechen Sie 
                immer direkt mit der Chefin.
              </p>
              <p className="text-forest font-semibold">
                Hunde und Kinder herzlich willkommen!
              </p>
              <p className="text-text-primary/60 italic mt-6">
                Conny – Sonnenhof
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-lg">
            <Image
              src="/images/allgemein/conny-sonnenhof.jpeg"
              alt="Conny - Sonnenhof Herrsching"
              fill
              className="object-cover"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
