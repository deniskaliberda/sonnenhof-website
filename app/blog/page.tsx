import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tipps & Infos rund um Herrsching & den Ammersee - Sonnenhof",
  description: "Entdecken Sie unseren Blog mit nützlichen Tipps für Ihren Urlaub am Ammersee. Ausflugsziele, Wanderrouten und alles rund um Herrsching.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/blog',
  },
  openGraph: {
    title: "Blog | Tipps & Infos rund um Herrsching & den Ammersee",
    description: "Entdecken Sie unseren Blog mit nützlichen Tipps für Ihren Urlaub am Ammersee.",
    url: 'https://www.sonnenhof-herrsching.de/blog',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function BlogPage() {
  // Blog-Posts Array (kann später erweitert werden)
  const blogPosts = [
    {
      title: "Unterkunft in Herrsching am Ammersee – Tipps für Ihren Aufenthalt",
      slug: "unterkunft-herrsching-ammersee",
      excerpt: "Sie planen einen Urlaub am Ammersee und suchen die passende Unterkunft in Herrsching? Erfahren Sie, worauf Sie bei der Wahl Ihrer Unterkunft achten sollten und was Herrsching so besonders macht.",
      image: "/images/hero/hero-ammersee.jpg",
      date: "9. Februar 2026",
      category: "Unterkunft & Tipps"
    },
    {
      title: "Pension am Ammersee: Warum Herrsching der perfekte Urlaubsort ist",
      slug: "pension-am-ammersee",
      excerpt: "Sie suchen eine gemütliche Pension am Ammersee? Dann sind Sie in Herrsching genau richtig. Der kleine Ort am Ostufer des Ammersees verbindet bayerische Gemütlichkeit mit perfekter Anbindung an München.",
      image: "/images/hero/hero-sonnenhof.jpg",
      date: "9. Februar 2026",
      category: "Unterkunft & Tipps"
    }
  ];

  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero Section */}
        <section className="bg-forest text-white py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight">
              Blog & Tipps für Ihren Urlaub am Ammersee
            </h1>
            <p className="text-xl md:text-2xl text-white/90 leading-relaxed">
              Entdecken Sie Herrsching, den Ammersee und die Region durch die Augen 
              Ihrer Gastgeber. Hier teilen wir unsere besten Tipps und lokales Wissen.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="max-w-6xl mx-auto px-6 py-16 lg:py-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.slug}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <Link href={`/blog/${post.slug}`}>
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4 bg-forest text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-text-primary/60 mb-2">{post.date}</p>
                    <h2 className="font-serif text-2xl text-forest mb-3 hover:text-wood transition-colors leading-tight">
                      {post.title}
                    </h2>
                    <p className="text-text-primary/80 leading-relaxed mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-forest hover:text-wood font-medium inline-flex items-center gap-2">
                      Weiterlesen →
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* Placeholder für zukünftige Posts */}
          <div className="mt-16 text-center">
            <p className="text-lg text-text-primary/70 mb-6">
              Weitere Beiträge folgen in Kürze. Schauen Sie bald wieder vorbei!
            </p>
            <Link href="/">
              <Button size="lg" variant="outline" className="border-forest text-forest hover:bg-forest/10">
                Zur Startseite
              </Button>
            </Link>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-forest/5 py-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
              Haben Sie Fragen zu Ihrem Urlaub am Ammersee?
            </h2>
            <p className="text-lg text-text-primary/80 leading-relaxed mb-8">
              Wir kennen jeden Winkel der Region und beraten Sie gerne persönlich.
            </p>
            <Link href="/kontakt">
              <Button size="lg" className="bg-forest hover:bg-forest/90 text-white px-8">
                Jetzt Kontakt aufnehmen
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
