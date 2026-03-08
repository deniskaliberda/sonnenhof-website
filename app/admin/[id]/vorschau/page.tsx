'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import '@/app/blog/[slug]/blog-prose.css';
import { FAQ } from '@/components/sections/faq';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { ArrowLeft, Edit } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Post {
  id: number;
  slug: string;
  title: string;
  h1: string;
  description: string;
  content: string;
  category: string;
  heroImage: string;
  faqItems: { question: string; answer: string }[];
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export default function PreviewPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (res.ok) {
          const data = await res.json();
          setPost(data);
        }
      } catch {
        // ignore
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Beitrag nicht gefunden</p>
      </div>
    );
  }

  const heroImage = post.heroImage || '/images/hero/hero-sonnenhof.jpg';
  const dateStr = post.publishedAt || post.createdAt;

  return (
    <>
      {/* Preview Banner */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-amber-500 text-white px-4 py-2 flex items-center justify-center gap-4 text-sm">
        <span className="font-medium">Vorschau</span>
        <span className="hidden sm:inline">&mdash; So sieht der Beitrag für Besucher aus</span>
        <div className="flex items-center gap-2 ml-auto">
          <Link href={`/admin/${id}`}>
            <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Edit className="w-3.5 h-3.5 mr-1" />
              Bearbeiten
            </Button>
          </Link>
          <Link href="/admin">
            <Button size="sm" variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Zurück
            </Button>
          </Link>
        </div>
      </div>

      <Navigation />
      <main className="pt-20 min-h-screen bg-stone" style={{ marginTop: '40px' }}>
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh]">
          <Image
            src={heroImage}
            alt={post.h1 || post.title}
            fill
            className="object-cover"
            sizes="100vw"
            unoptimized={heroImage.startsWith('http')}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/60 to-transparent" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl text-white text-center px-6 max-w-5xl leading-tight">
              {post.h1 || post.title}
            </h1>
          </div>
        </div>

        {/* Article Content */}
        <article className="max-w-4xl mx-auto px-6 py-16 lg:py-24">
          <div className="flex flex-wrap items-center gap-4 mb-10 text-sm">
            <span className="bg-forest text-white px-3 py-1 rounded-full font-medium">
              {post.category}
            </span>
            <time className="text-text-primary/60">
              {format(new Date(dateStr), 'd. MMMM yyyy', { locale: de })}
            </time>
            <span className="text-text-primary/40">&middot;</span>
            <span className="text-text-primary/60">
              {Math.max(1, Math.round(post.content.replace(/<[^>]+>/g, '').split(/\s+/).length / 200))} Min. Lesezeit
            </span>
          </div>

          <div
            className="blog-prose max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {post.faqItems.length > 0 && (
            <div className="mt-16">
              <FAQ items={post.faqItems} />
            </div>
          )}

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
