'use client';

import Link from 'next/link';
import { PostForm } from '@/components/admin/post-form';
import { ArrowLeft } from 'lucide-react';

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
        <PostForm />
      </main>
    </div>
  );
}
