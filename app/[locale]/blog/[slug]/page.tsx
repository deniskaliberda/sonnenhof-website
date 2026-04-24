import "./blog-prose.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/sections/faq";
import { BlogCTA } from "@/components/sections/blog-cta";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, BASE_URL } from "@/lib/seo";
import { getEnPostBySlug, getAllEnSlugs } from "@/lib/blog-en";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";
import type { Metadata } from "next";

export const revalidate = 3600;

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d MMMM yyyy", { locale: enUS });
  } catch {
    return dateStr;
  }
}

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllEnSlugs();
  return slugs.map((slug) => ({ slug, locale: 'en' }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  if (locale !== 'en') return {};
  const post = await getEnPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `${BASE_URL}/en/blog/${post.slug}`,
      languages: {
        'de-DE': `${BASE_URL}/blog`,
        'en-US': `${BASE_URL}/en/blog/${post.slug}`,
        'x-default': `${BASE_URL}/blog`,
      },
    },
    openGraph: {
      title: post.h1,
      description: post.description,
      url: `${BASE_URL}/en/blog/${post.slug}`,
      type: "article",
      locale: "en_US",
    },
  };
}

export default async function EnBlogPostPage({ params }: PageProps) {
  const { locale, slug } = await params;
  if (locale !== 'en') notFound();
  const post = await getEnPostBySlug(slug);
  if (!post) notFound();

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/en" },
    { name: "Blog", path: "/en/blog" },
    { name: post.h1, path: `/en/blog/${post.slug}` },
  ]);

  const rawImage = post.image || "";
  const isValidImage =
    rawImage.startsWith("http") ||
    rawImage.startsWith("/images/") ||
    rawImage === "";
  const heroImage = isValidImage
    ? (rawImage.startsWith("http") ? rawImage.replace(`${BASE_URL}`, "") : rawImage)
    : "/images/hero/hero-sonnenhof.jpg";

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {post.jsonLd && Object.keys(post.jsonLd).length > 0 && (
        <JsonLd data={post.jsonLd} />
      )}
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <Image
            src={heroImage}
            alt={post.h1}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center px-6 max-w-5xl leading-tight">
              {post.h1}
            </h1>
          </div>
        </div>

        <article className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-wrap items-center gap-4 mb-10 text-sm">
            <span className="bg-forest text-white px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <time className="text-text-primary/60" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="text-text-primary/40">&middot;</span>
            <span className="text-text-primary/60">
              {Math.max(1, Math.round(post.content.replace(/<[^>]+>/g, "").split(/\s+/).length / 200))} min read
            </span>
          </div>

          {(() => {
            const h2Regex = /<h2[\s>]/gi;
            let match;
            let count = 0;
            let splitIndex = -1;
            const content = post.content;
            while ((match = h2Regex.exec(content)) !== null) {
              count++;
              if (count === 3) {
                splitIndex = match.index;
                break;
              }
            }
            if (splitIndex > 0) {
              const before = content.slice(0, splitIndex);
              const after = content.slice(splitIndex);
              return (
                <>
                  <div className="blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: before }} />
                  <BlogCTA />
                  <div className="blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: after }} />
                </>
              );
            }
            return (
              <div className="blog-prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
            );
          })()}

          {post.faqItems.length > 0 && (
            <div className="mt-16">
              <FAQ items={post.faqItems} />
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-forest/20">
            <Link
              href="/en/blog"
              className="text-forest hover:text-wood font-medium text-lg inline-flex items-center gap-2"
            >
              &larr; Back to blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
