'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { PostForm } from '@/components/admin/post-form';
import { getTemplateContent } from '@/components/admin/template-picker';
import { ArrowLeft } from 'lucide-react';
import { Suspense } from 'react';

function NewPostContent() {
  const searchParams = useSearchParams();
  const title = searchParams.get('title') || '';
  const category = searchParams.get('category') || '';
  const templateId = searchParams.get('template') || '';
  const templateContent = templateId ? getTemplateContent(templateId) : '';

  const initialData = (title || category || templateContent)
    ? {
        slug: '',
        title,
        h1: title,
        description: '',
        content: templateContent,
        category: category || 'Unterkunft & Tipps',
        keywords: [],
        heroImage: '',
        faqItems: [],
        published: false,
      }
    : undefined;

  return <PostForm initialData={initialData} />;
}

export default function NewPostPage() {
  return (
    <div className="min-h-screen bg-stone">
      {/* Header */}
      <header className="bg-forest text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-xl">Neuer Beitrag</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <Suspense>
          <NewPostContent />
        </Suspense>
      </main>
    </div>
  );
}
