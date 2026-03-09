import "./blog-prose.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/sections/faq";
import { BlogCTA } from "@/components/sections/blog-cta";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, BASE_URL, createHreflangLanguages } from "@/lib/seo";
import { getPostBySlug, getAllSlugsAsync } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import type { Metadata } from "next";

function formatDate(dateStr: string): string {
  try {
    return format(parseISO(dateStr), "d. MMMM yyyy", { locale: de });
  } catch {
    return dateStr;
  }
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugsAsync();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords.join(", "),
    alternates: {
      canonical: `${BASE_URL}/blog/${post.slug}`,
      languages: createHreflangLanguages(`/blog/${post.slug}`),
    },
    openGraph: {
      title: post.h1,
      description: post.description,
      url: `${BASE_URL}/blog/${post.slug}`,
      type: "article",
      locale: "de_DE",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const breadcrumbSchema = createBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.h1, path: `/blog/${post.slug}` },
  ]);

  // Use the image path for the hero, falling back to a default
  const heroImage = post.image.startsWith("http")
    ? post.image.replace(`${BASE_URL}`, "")
    : post.image;

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      {post.jsonLd && Object.keys(post.jsonLd).length > 0 && (
        <JsonLd data={post.jsonLd} />
      )}
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone">
        {/* Hero Image */}
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

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          {/* Article Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-10 text-sm">
            <span className="bg-forest text-white px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <time className="text-text-primary/60" dateTime={post.date}>
              {formatDate(post.date)}
            </time>
            <span className="text-text-primary/40">&middot;</span>
            <span className="text-text-primary/60">
              {Math.max(1, Math.round(post.content.replace(/<[^>]+>/g, "").split(/\s+/).length / 200))} Min. Lesezeit
            </span>
          </div>

          {(() => {
            // Insert CTA after the 2nd <h2> section
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

          {/* FAQ */}
          {post.faqItems.length > 0 && (
            <div className="mt-16">
              <FAQ items={post.faqItems} />
            </div>
          )}

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-forest/20">
            <Link
              href="/blog"
              className="text-forest hover:text-wood font-medium text-lg inline-flex items-center gap-2"
            >
              &larr; Zurück zum Blog
            </Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
