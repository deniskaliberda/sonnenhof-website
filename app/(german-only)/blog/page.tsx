import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
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
  // Absolute URLs (Vercel Blob, Unsplash) sind in next.config remotePatterns
  // freigegeben und muessen unveraendert durchgereicht werden.
  return image || "/images/hero/hero-sonnenhof.jpg";
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
        {/* Hero Section — Layout wie Landhaus-Preview "PAGE: BLOG" */}
        <section className="bg-forest px-6 py-16 md:py-[70px] text-center">
          <div className="max-w-[900px] mx-auto">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#A8C0AE] mb-[18px]">
              Reisetipps &amp; Einblicke
            </div>
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] text-[#FBF6EC] leading-[1.05] m-0">
              Der Sonnenhof-Blog
            </h1>
            <p className="text-[17px] text-[#C9D5CB] mt-5 mx-auto max-w-[640px] leading-[1.6]">
              Insider-Tipps für Ihren Aufenthalt am Ammersee — Ausflüge, Wanderungen, Urlaub
              mit Hund, München und alles, was Sie vor der Anreise wissen sollten. Geschrieben
              von Ihrer Gastgeberin Conny.
            </p>
          </div>
        </section>

        {/* Blog Posts Grid — Karten-Raster wie Preview */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-16 py-14 md:py-[70px] md:pb-[100px]">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
            {blogPosts.map((post) => (
              <article
                key={post.slug}
                className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] hover:shadow-[0_14px_34px_rgba(42,36,28,0.13)] transition-shadow duration-300 flex flex-col"
              >
                <Link href={`/blog/${post.slug}`} className="flex flex-col flex-1">
                  <div className="relative h-[200px] overflow-hidden bg-sand">
                    <Image
                      src={getImagePath(post.image)}
                      alt={post.h1}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="px-7 pt-[26px] pb-[30px] flex flex-col flex-1">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="bg-[#F3EADA] text-[#A6794E] px-3 py-[5px] rounded-full text-[11px] uppercase tracking-[0.06em] font-semibold">
                        {post.category}
                      </span>
                      <span className="text-[12.5px] text-[#9A8C72]">{formatDate(post.date)}</span>
                    </div>
                    <h2 className="font-serif font-semibold text-[22px] leading-[1.25] text-forest mb-3 hover:text-wood-dark transition-colors">
                      {post.h1}
                    </h2>
                    <p className="text-[#5A5142] text-[14.5px] leading-[1.65] mb-[18px] line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <span className="text-wood-dark font-semibold text-sm inline-flex items-center gap-2">
                      Artikel lesen &rarr;
                    </span>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        </section>

        {/* CTA Section — wie Preview */}
        <section className="px-6 md:px-16 pb-20 md:pb-[100px] text-center">
          <div className="max-w-[1240px] mx-auto bg-sand rounded-2xl px-6 py-14 md:p-14">
            <h2 className="font-serif font-medium text-3xl md:text-[34px] text-forest mb-3.5">
              Planen Sie Ihren Aufenthalt
            </h2>
            <p className="text-base text-[#5A5142] leading-[1.6] mb-7 max-w-[560px] mx-auto">
              Familiengeführte Ferienwohnungen und Zimmer in Herrsching am Ammersee — wenige
              Schritte vom Wasser. Hunde willkommen.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-forest hover:bg-forest-deep text-[#F3EADA] text-[15px] font-semibold px-[34px] py-[15px] rounded-md transition-colors"
            >
              Unverbindlich anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
