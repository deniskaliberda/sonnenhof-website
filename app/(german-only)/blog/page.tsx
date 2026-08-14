import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, createHreflangLanguages } from "@/lib/seo";
import { getAllPostsAsync } from "@/lib/blog";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import type { Metadata } from "next";

export const revalidate = 3600;

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

export default async function BlogPage() {
  const blogPosts = await getAllPostsAsync();

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
        <section className="bg-forest py-20 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-[#FBF6EC]">
              Blog & Tipps für Ihren Urlaub am Ammersee
            </h1>
            <p className="text-lg md:text-xl text-[#C9D5CB] leading-relaxed max-w-2xl mx-auto">
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
                className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] hover:shadow-[0_14px_34px_rgba(42,36,28,0.13)] transition-shadow duration-300 flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
                  <div className="relative h-48 overflow-hidden bg-sand">
                    <Image
                      src={getImagePath(post.image)}
                      alt={post.h1}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-6 pb-7 flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="bg-sand text-[#3C362B] px-3 py-1 rounded-full text-[11px] uppercase tracking-[0.06em] font-semibold">
                        {post.category}
                      </span>
                      <span className="text-[13px] text-[#9A8C72]">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="font-serif text-2xl text-forest mb-3 hover:text-wood-dark transition-colors leading-tight">
                      {post.h1}
                    </h2>
                    <p className="text-[#5A5142] text-[15px] leading-relaxed mb-4 line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="text-wood-dark font-semibold text-sm inline-flex items-center gap-2">
                      Weiterlesen &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 pb-20">
          <div className="max-w-6xl mx-auto bg-sand rounded-2xl px-6 py-14 text-center">
            <h2 className="font-serif text-3xl md:text-4xl text-forest mb-6">
              Haben Sie Fragen zu Ihrem Urlaub am Ammersee?
            </h2>
            <p className="text-lg text-[#5A5142] leading-relaxed mb-8 max-w-2xl mx-auto">
              Wir kennen jeden Winkel der Region und beraten Sie gerne persönlich.
            </p>
            <Link href="/kontakt">
              <Button size="lg" className="bg-forest hover:bg-forest-deep text-stone px-8 rounded-md font-semibold">
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
