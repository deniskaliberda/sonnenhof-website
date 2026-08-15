import "./blog-prose.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/sections/faq";
import { BlogCTA } from "@/components/sections/blog-cta";
import { BlogStayLinks } from "@/components/sections/blog-stay-links";
import { JsonLd } from "@/components/json-ld";
import { createBreadcrumbSchema, BASE_URL, createHreflangLanguages } from "@/lib/seo";
import { getPostBySlug, getAllSlugsAsync } from "@/lib/blog";
import { notFound } from "next/navigation";
import { format, parseISO } from "date-fns";
import { de } from "date-fns/locale";
import type { Metadata } from "next";

export const revalidate = 3600;

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

  // Use the image path for the hero, falling back to a default.
  // Legacy admin uploads that saved only a relative /blog/... path without a blob-URL
  // (broken Vercel Blob config in March 2026) would otherwise 404. Detect and fall back.
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
        {/* Artikel-Kopf — Layout wie Landhaus-Preview "PAGE: ARTIKEL" */}
        <section className="relative min-h-[440px] bg-forest">
          <Image
            src={heroImage}
            alt={post.h1}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(28,40,30,0.35)] to-[rgba(28,40,30,0.78)]" />
          <div className="relative min-h-[440px] flex flex-col justify-end max-w-[900px] mx-auto px-6 md:px-16 pb-[54px] pt-24">
            <Link
              href="/blog"
              className="text-[13.5px] text-[#EAD9B8] hover:text-white mb-5 transition-colors self-start"
            >
              &larr; Zurück zum Blog
            </Link>
            {/* Meta-Zeile */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-gold text-[#241B0F] px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.06em] font-semibold">
                {post.category}
              </span>
              <time className="text-[13px] text-[#EAD9B8]" dateTime={post.date}>
                {formatDate(post.date)}
              </time>
            </div>
            <h1 className="font-serif font-medium text-3xl md:text-4xl lg:text-[44px] leading-[1.12] text-[#FBF6EC] m-0 [text-shadow:0_2px_20px_rgba(0,0,0,0.3)]">
              {post.h1}
            </h1>
          </div>
        </section>

        {/* Article Content */}
        <article className="max-w-[820px] mx-auto px-6 md:px-16 pt-16 pb-10">
          {/* Lead — wie Preview */}
          {post.description && (
            <p className="font-serif italic text-xl md:text-[22px] leading-[1.5] text-[#5A5142] mb-10 pb-[34px] border-b border-[rgba(166,121,78,0.28)]">
              {post.description}
            </p>
          )}

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

          {/* Interne Verlinkung auf die Buchungsseiten (GSC-Hebel 2026-08) */}
          <BlogStayLinks category={post.category} />

          {/* Back to Blog */}
          <div className="mt-12 pt-8 border-t border-[rgba(166,121,78,0.28)]">
            <Link
              href="/blog"
              className="text-wood-dark hover:text-forest font-semibold text-lg inline-flex items-center gap-2 transition-colors"
            >
              &larr; Zurück zum Blog
            </Link>
          </div>
        </article>

        {/* Abschluss-CTA — wie Preview */}
        <section className="max-w-[820px] mx-auto px-6 md:px-16 pt-5 pb-24">
          <div className="bg-forest text-[#EFE7D6] rounded-[14px] px-6 py-10 md:px-12 md:py-11 text-center">
            <div className="font-serif text-[26px] text-[#FBF6EC] mb-2.5">
              Fragen zu Ihrem Aufenthalt?
            </div>
            <p className="text-[15px] text-[#C9D5CB] mx-auto mb-[26px] max-w-[480px] leading-[1.6]">
              Schreiben Sie uns — Sie erreichen immer direkt die Chefin, keine KI und kein
              Callcenter.
            </p>
            <Link
              href="/kontakt"
              className="inline-block bg-wood hover:bg-[#D3AC6E] text-[#241B0F] text-[15px] font-semibold px-8 py-[15px] rounded-md transition-colors"
            >
              Jetzt anfragen
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
