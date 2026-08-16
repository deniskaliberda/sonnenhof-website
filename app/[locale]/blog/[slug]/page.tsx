import "./blog-prose.css";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "@/components/sections/faq";
import { BlogCTA } from "@/components/sections/blog-cta";
import { BlogStayLinks } from "@/components/sections/blog-stay-links";
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
        {/* Article head — layout mirrors Landhaus preview "PAGE: ARTIKEL" */}
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
              href="/en/blog"
              className="text-[13.5px] text-[#EAD9B8] hover:text-white mb-5 transition-colors self-start"
            >
              &larr; Back to blog
            </Link>
            {/* Meta row */}
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

        <article className="max-w-[820px] mx-auto px-6 md:px-16 pt-16 pb-10">
          {/* Lead — as in the preview */}
          {post.description && (
            <p className="font-serif italic text-xl md:text-[22px] leading-[1.5] text-[#5A5142] mb-10 pb-[34px] border-b border-[rgba(166,121,78,0.28)]">
              {post.description}
            </p>
          )}

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

          {/* Internal links to the booking pages (GSC lever 2026-08) */}
          <BlogStayLinks category={post.category} />

          <div className="mt-12 pt-8 border-t border-[rgba(166,121,78,0.28)]">
            <Link
              href="/en/blog"
              className="text-wood-dark hover:text-forest font-semibold text-lg inline-flex items-center gap-2 transition-colors"
            >
              &larr; Back to blog
            </Link>
          </div>
        </article>

        {/* Closing CTA — as in the preview */}
        <section className="max-w-[820px] mx-auto px-6 md:px-16 pt-5 pb-24">
          <div className="bg-forest text-[#EFE7D6] rounded-[14px] px-6 py-10 md:px-12 md:py-11 text-center">
            <div className="font-serif text-[26px] text-[#FBF6EC] mb-2.5">
              Questions about your stay?
            </div>
            <p className="text-[15px] text-[#C9D5CB] mx-auto mb-[26px] max-w-[480px] leading-[1.6]">
              Write to us — you will always reach the owner directly, no AI and no call centre.
            </p>
            <Link
              href="/en/contact"
              className="inline-block bg-wood hover:bg-[#D3AC6E] text-[#241B0F] text-[15px] font-semibold px-8 py-[15px] rounded-md transition-colors"
            >
              Send an enquiry
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
