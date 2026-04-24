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
        <section className="px-6 py-16 bg-forest text-white">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
              Travel Guides &amp; Insights
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto">
              Insider tips for your stay at Lake Ammersee — day trips, dog-friendly spots,
              visiting Munich from Herrsching and everything a first-time visitor should know.
            </p>
          </div>
        </section>

        <section className="px-6 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            {posts.length === 0 ? (
              <p className="text-text-primary/70 text-center py-12">
                More English articles coming soon. For now, please ask us directly —
                <Link href="/en/contact" className="text-wood underline ml-1">
                  send an enquiry
                </Link>
                .
              </p>
            ) : (
              <div className="grid gap-8 md:gap-10">
                {posts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/en/blog/${post.slug}`}
                    className="group grid md:grid-cols-[40%_60%] gap-6 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
                  >
                    <div className="relative h-48 md:h-full min-h-[200px]">
                      <Image
                        src={getImagePath(post.image)}
                        alt={post.h1}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                    <div className="p-6 md:p-8 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-sm text-text-primary/60 mb-2">
                        <span className="px-2 py-0.5 bg-wood/15 text-wood-dark rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                        <time>{formatDate(post.date)}</time>
                      </div>
                      <h2 className="font-serif text-2xl md:text-3xl mb-3 text-forest group-hover:text-wood transition-colors">
                        {post.h1}
                      </h2>
                      <p className="text-text-primary/80 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 text-wood-dark font-medium text-sm group-hover:underline">
                        Read article →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="px-6 py-16 bg-white border-t border-border">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl mb-4 text-forest">Plan your stay</h2>
            <p className="text-text-primary/80 mb-6 max-w-2xl mx-auto">
              Family-run accommodations in Herrsching on Lake Ammersee. 5 holiday apartments,
              7 guest rooms, just a few steps from the water. Dogs welcome.
            </p>
            <Button asChild size="lg">
              <Link href="/en/contact">Send an enquiry</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
