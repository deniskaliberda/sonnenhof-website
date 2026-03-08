'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Edit, Trash2, LogOut, Eye, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

interface Post {
  id: number;
  slug: string;
  title: string;
  h1: string;
  heroImage: string;
  category: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<number | null>(null);

  const fetchPosts = useCallback(async () => {
    try {
      const res = await fetch('/api/posts');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch {
      toast.error('Fehler beim Laden der Beiträge');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleDelete = async (id: number, title: string) => {
    if (!window.confirm(`"${title}" wirklich löschen? Das kann nicht rückgängig gemacht werden.`)) {
      return;
    }

    setDeleting(id);
    try {
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts((prev) => prev.filter((p) => p.id !== id));
        toast.success('Beitrag gelöscht');
      } else {
        toast.error('Fehler beim Löschen');
      }
    } catch {
      toast.error('Fehler beim Löschen');
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-stone">
      {/* Header */}
      <header className="bg-forest text-white px-4 py-4 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <h1 className="font-serif text-xl">Sonnenhof Blog</h1>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-white/70 hover:text-white text-sm hidden sm:inline">
              Zur Website
            </Link>
            <button
              onClick={handleLogout}
              className="text-white/70 hover:text-white flex items-center gap-1 text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Abmelden</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title + New Post Button */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-serif text-2xl text-forest">Meine Beiträge</h2>
            <p className="text-sm text-muted-foreground mt-1">
              {posts.length} {posts.length === 1 ? 'Beitrag' : 'Beiträge'}
            </p>
          </div>
          <Link href="/admin/neu">
            <Button className="bg-forest hover:bg-forest/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Neuer Beitrag
            </Button>
          </Link>
        </div>

        {/* Posts List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-xl">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="font-serif text-xl text-forest mb-2">Noch keine Beiträge</h3>
            <p className="text-muted-foreground mb-6">Schreibe deinen ersten Blogbeitrag!</p>
            <Link href="/admin/neu">
              <Button className="bg-forest hover:bg-forest/90 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Ersten Beitrag erstellen
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-border overflow-hidden flex flex-col sm:flex-row"
              >
                {/* Image */}
                <div className="relative w-full sm:w-48 h-32 sm:h-auto shrink-0">
                  <Image
                    src={post.heroImage || '/images/hero/hero-sonnenhof.jpg'}
                    alt={post.h1 || post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 192px"
                    unoptimized={post.heroImage?.startsWith('http')}
                  />
                  {/* Status badge */}
                  <span
                    className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-medium ${
                      post.published
                        ? 'bg-green-100 text-green-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {post.published ? 'Online' : 'Entwurf'}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-serif text-lg text-forest leading-tight">
                        {post.h1 || post.title}
                      </h3>
                      <span className="text-xs text-muted-foreground bg-stone px-2 py-0.5 rounded-full shrink-0">
                        {post.category}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {post.publishedAt
                        ? `Veröffentlicht am ${format(new Date(post.publishedAt), 'd. MMM yyyy', { locale: de })}`
                        : `Erstellt am ${format(new Date(post.createdAt), 'd. MMM yyyy', { locale: de })}`}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 mt-3">
                    <Link href={`/admin/${post.id}`}>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3.5 h-3.5 mr-1" />
                        Bearbeiten
                      </Button>
                    </Link>
                    {post.published && (
                      <Link href={`/blog/${post.slug}`} target="_blank">
                        <Button variant="outline" size="sm">
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          Ansehen
                        </Button>
                      </Link>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(post.id, post.title)}
                      disabled={deleting === post.id}
                      className="text-destructive hover:text-destructive ml-auto"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Mobile FAB */}
      <Link
        href="/admin/neu"
        className="fixed bottom-6 right-6 sm:hidden bg-forest text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg hover:bg-forest/90 transition-colors"
      >
        <Plus className="w-6 h-6" />
      </Link>
    </div>
  );
}
