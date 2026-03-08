'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { PostForm } from '@/components/admin/post-form';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PostData {
  id: number;
  slug: string;
  title: string;
  h1: string;
  description: string;
  content: string;
  category: string;
  keywords: string[];
  heroImage: string;
  faqItems: { question: string; answer: string }[];
  published: boolean;
}

export default function EditPostPage() {
  const params = useParams();
  const id = params.id as string;
  const [post, setPost] = useState<PostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts/${id}`);
        if (!res.ok) {
          setError('Beitrag nicht gefunden');
          return;
        }
        const data = await res.json();
        setPost(data);
      } catch {
        setError('Fehler beim Laden');
        toast.error('Fehler beim Laden des Beitrags');
      } finally {
        setLoading(false);
      }
    }
    fetchPost();
  }, [id]);

  return (
    <div className="min-h-screen bg-stone">
      {/* Header */}
      <header className="bg-forest text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center gap-4">
          <Link href="/admin" className="text-white/70 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-serif text-xl">Beitrag bearbeiten</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 text-forest animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-destructive mb-4">{error}</p>
            <Link href="/admin" className="text-forest hover:underline">
              Zurück zur Übersicht
            </Link>
          </div>
        ) : post ? (
          <PostForm initialData={post} isEditing />
        ) : null}
      </main>
    </div>
  );
}
