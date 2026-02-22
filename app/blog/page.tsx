import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog | Tipps & Infos rund um Herrsching & den Ammersee",
  description: "Entdecken Sie unseren Blog mit nützlichen Tipps für Ihren Urlaub am Ammersee. Ausflugsziele, Wanderrouten und alles rund um Herrsching.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/blog',
    languages: createHreflangLanguages('/blog'),
  },
  openGraph: {
    title: "Blog | Tipps & Infos rund um Herrsching & den Ammersee",
    description: "Entdecken Sie unseren Blog mit nützlichen Tipps für Ihren Urlaub am Ammersee.",
    url: 'https://www.sonnenhof-herrsching.de/blog',
    type: 'website',
    locale: 'de_DE',
  },
};

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d. MMMM yyyy", { locale: de });
  } catch {
    return dateStr;
  }
}

function getImagePath(image: string): string {
  if (image.startsWith("http")) {
    try {
      const url = new URL(image);
      return url.pathname;
    } catch {
      return "/images/hero/hero-sonnenhof.jpg";
    }
  }
  return image;
}

export default function BlogPage() {
  const blogPosts = getAllPosts();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" }
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
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
                    <Image
                      src={getImagePath(post.image)}
                      alt={post.h1}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-forest text-white px-3 py-1 rounded-full text-sm font-medium">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-text-primary/60 mb-2">{formatDate(post.date)}</p>
                    <h2 className="font-serif text-2xl text-forest mb-3 hover:text-wood transition-colors leading-tight">
                      {post.h1}
                    </h2>
                    <p className="text-text-primary/80 leading-relaxed mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <span className="text-forest hover:text-wood font-medium inline-flex items-center gap-2">
                      Weiterlesen &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
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
