import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema } from "@/lib/seo";
import { getAllEnPostsMeta } from "@/lib/blog-en";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'en') return {};

  return {
    title: "Blog | Tips & Insights on Herrsching & Lake Ammersee",
    description: "Travel guides and insider tips for your stay at Lake Ammersee. Walking routes, day trips, visiting Munich from Herrsching — straight from your hosts.",
    alternates: {
      canonical: 'https://www.sonnenhof-herrsching.de/en/blog',
      languages: {
        'de-DE': 'https://www.sonnenhof-herrsching.de/blog',
        'en-US': 'https://www.sonnenhof-herrsching.de/en/blog',
        'x-default': 'https://www.sonnenhof-herrsching.de/blog',
      },
    },
    openGraph: {
      title: "Blog | Tips & Insights on Herrsching & Lake Ammersee",
      description: "Travel guides and insider tips for your stay at Lake Ammersee.",
      url: 'https://www.sonnenhof-herrsching.de/en/blog',
      type: 'website',
      locale: 'en_US',
    },
  };
}

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMMM yyyy", { locale: enUS });
  } catch {
    return dateStr;
  }
}

function getImagePath(image: string): string {
  // Absolute URLs (Vercel Blob, Unsplash) sind in next.config remotePatterns
  // freigegeben und muessen unveraendert durchgereicht werden.
  return image || "/images/hero/hero-sonnenhof.jpg";
}

export default async function EnBlogIndexPage({ params }: PageProps) {
  const { locale } = await params;
  if (locale !== 'en') notFound();

  const posts = getAllEnPostsMeta();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/en" },
    { name: "Blog", path: "/en/blog" },
  ]);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero — layout mirrors Landhaus preview "PAGE: BLOG" */}
        <section className="bg-forest px-6 py-16 md:py-[70px] text-center">
          <div className="max-w-[900px] mx-auto">
            <div className="text-[11px] tracking-[0.32em] uppercase text-[#A8C0AE] mb-[18px]">
              Travel Guides &amp; Insights
            </div>
            <h1 className="font-serif font-medium text-4xl md:text-5xl lg:text-[54px] text-[#FBF6EC] leading-[1.05] m-0">
              The Sonnenhof Blog
            </h1>
            <p className="text-[17px] text-[#C9D5CB] mt-5 mx-auto max-w-[640px] leading-[1.6]">
              Insider tips for your stay at Lake Ammersee — day trips, dog-friendly spots,
              visiting Munich from Herrsching and everything a first-time visitor should know.
            </p>
          </div>
        </section>

        {/* Card grid — as in the preview */}
        <section className="max-w-[1240px] mx-auto px-6 md:px-16 py-14 md:py-[70px] md:pb-[100px]">
          {posts.length === 0 ? (
            <p className="text-[#5A5142] text-center py-12">
              More English articles coming soon. For now, please ask us directly —
              <Link href="/en/contact" className="text-wood-dark underline ml-1">
                send an enquiry
              </Link>
              .
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {posts.map((post) => (
                <article
                  key={post.slug}
                  className="bg-white rounded-xl overflow-hidden shadow-[0_1px_2px_rgba(42,36,28,0.06)] hover:shadow-[0_14px_34px_rgba(42,36,28,0.13)] transition-shadow duration-300 flex flex-col"
                >
                  <Link href={`/en/blog/${post.slug}`} className="group flex flex-col flex-1">
                    <div className="relative h-[200px] overflow-hidden bg-sand">
                      <Image
                        src={getImagePath(post.image)}
                        alt={post.h1}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="px-7 pt-[26px] pb-[30px] flex flex-col flex-1">
                      <div className="flex items-center gap-2.5 mb-3">
                        <span className="bg-[#F3EADA] text-[#A6794E] px-3 py-[5px] rounded-full text-[11px] uppercase tracking-[0.06em] font-semibold">
                          {post.category}
                        </span>
                        <time className="text-[12.5px] text-[#9A8C72]">{formatDate(post.date)}</time>
                      </div>
                      <h2 className="font-serif font-semibold text-[22px] leading-[1.25] text-forest mb-3 group-hover:text-wood-dark transition-colors">
                        {post.h1}
                      </h2>
                      <p className="text-[#5A5142] text-[14.5px] leading-[1.65] mb-[18px] line-clamp-3 flex-1">
                        {post.excerpt}
                      </p>
                      <span className="text-wood-dark font-semibold text-sm inline-flex items-center gap-2">
                        Read article &rarr;
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* CTA — as in the preview */}
        <section className="px-6 md:px-16 pb-20 md:pb-[100px] text-center">
          <div className="max-w-[1240px] mx-auto bg-sand rounded-2xl px-6 py-14 md:p-14">
            <h2 className="font-serif font-medium text-3xl md:text-[34px] text-forest mb-3.5">Plan your stay</h2>
            <p className="text-base text-[#5A5142] leading-[1.6] mb-7 max-w-[560px] mx-auto">
              Family-run accommodations in Herrsching on Lake Ammersee. 5 holiday apartments,
              7 guest rooms, just a few steps from the water. Dogs welcome.
            </p>
            <Button asChild size="lg" className="bg-forest hover:bg-forest-deep text-stone rounded-md font-semibold">
              <Link href="/en/contact">Send an enquiry</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
