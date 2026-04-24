'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BlogEditor } from './blog-editor';
import { ImageUpload } from './image-upload';
import { FaqEditor } from './faq-editor';
import { SeoHints, CharCounter } from './seo-hints';
import { GooglePreview } from './google-preview';
import { PublishSuccess } from './publish-success';
import { Save, Eye, Send, ChevronDown, ChevronUp, Loader2, Check } from 'lucide-react';
import { toast } from 'sonner';

interface FaqItem {
  question: string;
  answer: string;
}

interface PostData {
  id?: number;
  slug: string;
  title: string;
  h1: string;
  description: string;
  content: string;
  category: string;
  keywords: string[];
  heroImage: string;
  faqItems: FaqItem[];
  published: boolean;
}

interface PostFormProps {
  initialData?: PostData;
  isEditing?: boolean;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[äÄ]/g, 'ae')
    .replace(/[öÖ]/g, 'oe')
    .replace(/[üÜ]/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 80);
}

const CATEGORIES = [
  'Unterkunft & Tipps',
  'Ausflugsziele',
  'Familienurlaub',
  'Urlaub mit Hund',
  'Wandern & Natur',
  'Kulinarik',
  'Veranstaltungen',
  'Sonstiges',
];

export function PostForm({ initialData, isEditing }: PostFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'idle' | 'saved'>('idle');
  const [showSuccess, setShowSuccess] = useState(false);
  const autoSaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [title, setTitle] = useState(initialData?.title || '');
  const [h1, setH1] = useState(initialData?.h1 || '');
  const [slug, setSlug] = useState(initialData?.slug || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [category, setCategory] = useState(initialData?.category || 'Unterkunft & Tipps');
  const [keywords, setKeywords] = useState(initialData?.keywords?.join(', ') || '');
  const [heroImage, setHeroImage] = useState(initialData?.heroImage || '');
  const [faqItems, setFaqItems] = useState<FaqItem[]>(initialData?.faqItems || []);
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(false);

  // Word count
  const wordCount = useMemo(() => {
    const text = content.replace(/<[^>]+>/g, '').trim();
    if (!text) return 0;
    return text.split(/\s+/).length;
  }, [content]);

  // Auto-generate slug from title
  useEffect(() => {
    if (!slugManuallyEdited && !isEditing) {
      setSlug(generateSlug(title));
    }
  }, [title, slugManuallyEdited, isEditing]);

  // Auto-generate h1 from title if empty
  useEffect(() => {
    if (!h1 && title) {
      setH1(title);
    }
  }, [title, h1]);

  // Auto-generate description from content
  useEffect(() => {
    if (!description && content) {
      const plainText = content.replace(/<[^>]+>/g, '').trim();
      const firstSentences = plainText.substring(0, 155);
      const cutOff = firstSentences.lastIndexOf('.');
      setDescription(cutOff > 50 ? firstSentences.substring(0, cutOff + 1) : firstSentences);
    }
  }, [content, description]);

  // Auto-save draft every 30 seconds (only for existing posts).
  // Skip the auto-save while the title or slug is very short — otherwise the
  // user mid-typing can clobber a previously-saved valid title (bug from the
  // 17 Mar 2026 post where the title ended up as just "D" because auto-save
  // fired while re-typing).
  useEffect(() => {
    if (!isEditing || !initialData?.id) return;

    autoSaveTimer.current = setInterval(async () => {
      // Defensive: do not overwrite with a title that's clearly mid-edit.
      if (title.trim().length < 5 || slug.trim().length < 5) return;

      try {
        const res = await fetch(`/api/posts/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title, h1, slug, description, content, category,
            keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
            heroImage, faqItems,
          }),
        });
        if (res.ok) {
          setAutoSaveStatus('saved');
          setTimeout(() => setAutoSaveStatus('idle'), 3000);
        }
      } catch {
        // Silent fail for auto-save
      }
    }, 30000);

    return () => {
      if (autoSaveTimer.current) clearInterval(autoSaveTimer.current);
    };
  }, [isEditing, initialData?.id, title, h1, slug, description, content, category, keywords, heroImage, faqItems]);

  const handleSave = useCallback(async (publish: boolean) => {
    if (!title.trim()) {
      toast.error('Bitte gib einen Titel ein');
      return;
    }
    if (title.trim().length < 10) {
      toast.error('Titel ist zu kurz (mindestens 10 Zeichen)');
      return;
    }
    if (!slug.trim()) {
      toast.error('Bitte gib eine URL ein');
      return;
    }
    if (publish && !heroImage) {
      toast.error('Bitte lade ein Hero-Bild hoch, bevor du veroeffentlichst');
      return;
    }
    if (publish && heroImage && !heroImage.startsWith('http') && !heroImage.startsWith('/images/')) {
      toast.error('Das Hero-Bild hat einen ungueltigen Pfad. Bitte neu hochladen.');
      return;
    }

    const setLoading = publish ? setPublishing : setSaving;
    setLoading(true);

    const body = {
      title, h1: h1 || title, slug, description, content, category,
      keywords: keywords.split(',').map((k) => k.trim()).filter(Boolean),
      heroImage: heroImage || '/images/hero/hero-sonnenhof.jpg',
      faqItems: faqItems.filter((f) => f.question && f.answer),
      published: publish,
    };

    try {
      const url = isEditing && initialData?.id
        ? `/api/posts/${initialData.id}`
        : '/api/posts';
      const method = isEditing ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        toast.error(data.error || 'Fehler beim Speichern');
        return;
      }

      if (publish) {
        setShowSuccess(true);
      } else {
        toast.success('Entwurf gespeichert!');
        router.push('/admin');
        router.refresh();
      }
    } catch {
      toast.error('Fehler beim Speichern');
    } finally {
      setLoading(false);
    }
  }, [title, h1, slug, description, content, category, keywords, heroImage, faqItems, isEditing, initialData?.id, router]);

  return (
    <div className="space-y-6">
      {/* Hero Image */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Hero-Bild</Label>
        <ImageUpload value={heroImage} onChange={setHeroImage} />
      </div>

      {/* Title */}
      <div>
        <div className="flex items-center justify-between mb-1">
          <Label htmlFor="title" className="text-sm font-medium">Titel</Label>
          <CharCounter value={title} min={30} max={65} />
        </div>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="z.B. Die schönsten Wanderwege am Ammersee"
          className="text-lg"
        />
        {/* Slug preview */}
        <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
          <span>URL:</span>
          <code className="bg-stone px-2 py-0.5 rounded">/blog/{slug || '...'}</code>
          {!isEditing && (
            <button
              type="button"
              onClick={() => setSlugManuallyEdited(!slugManuallyEdited)}
              className="text-forest hover:underline"
            >
              {slugManuallyEdited ? 'Auto' : 'Bearbeiten'}
            </button>
          )}
        </div>
        {slugManuallyEdited && (
          <Input
            value={slug}
            onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
            className="mt-2 text-sm"
            placeholder="url-slug"
          />
        )}
      </div>

      {/* Google Preview */}
      {title && <GooglePreview title={title} description={description} slug={slug} />}

      {/* Content Editor */}
      <div>
        <Label className="text-sm font-medium mb-2 block">Inhalt</Label>
        <BlogEditor content={content} onChange={setContent} />
        {/* Word count + Auto-save status bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-stone/50 rounded-b-lg border border-t-0 border-border text-xs text-muted-foreground">
          <span>{wordCount} {wordCount === 1 ? 'Wort' : 'Wörter'}</span>
          {autoSaveStatus === 'saved' && (
            <span className="flex items-center gap-1 text-green-600">
              <Check className="w-3 h-3" />
              Gespeichert
            </span>
          )}
        </div>
      </div>

      {/* SEO Hints */}
      <SeoHints title={title} content={content} description={description} />

      {/* Advanced Section */}
      <div className="border border-border rounded-lg overflow-hidden">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="w-full flex items-center justify-between px-4 py-3 bg-stone/30 hover:bg-stone/50 transition-colors"
        >
          <span className="text-sm font-medium text-text-primary">Erweiterte Einstellungen</span>
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showAdvanced && (
          <div className="p-4 space-y-4 border-t border-border">
            {/* H1 (if different from title) */}
            <div>
              <Label htmlFor="h1" className="text-sm font-medium">H1-Überschrift (falls anders als Titel)</Label>
              <Input
                id="h1"
                value={h1}
                onChange={(e) => setH1(e.target.value)}
                placeholder="Wird im Beitrag als Hauptüberschrift angezeigt"
                className="mt-1"
              />
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between">
                <Label htmlFor="description" className="text-sm font-medium">
                  Meta-Beschreibung
                </Label>
                <CharCounter value={description} min={120} max={155} />
              </div>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Wird automatisch aus dem Text generiert"
                rows={2}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-none"
              />
            </div>

            {/* Category */}
            <div>
              <Label htmlFor="category" className="text-sm font-medium">Kategorie</Label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Keywords */}
            <div>
              <Label htmlFor="keywords" className="text-sm font-medium">Stichwörter (kommagetrennt)</Label>
              <Input
                id="keywords"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                placeholder="z.B. Ammersee, Wandern, Ausflug"
                className="mt-1"
              />
            </div>

            {/* FAQ */}
            <div>
              <Label className="text-sm font-medium mb-2 block">FAQ-Bereich (optional)</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Häufige Fragen und Antworten werden am Ende des Beitrags angezeigt und helfen bei Google.
              </p>
              <FaqEditor items={faqItems} onChange={setFaqItems} />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          type="button"
          variant="outline"
          onClick={() => handleSave(false)}
          disabled={saving || publishing}
          className="flex-1 sm:flex-initial"
        >
          {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Save className="w-4 h-4 mr-2" />}
          Entwurf speichern
        </Button>
        {isEditing && initialData?.id && (
          <Button
            type="button"
            variant="outline"
            onClick={() => window.open(`/admin/${initialData.id}/vorschau`, '_blank')}
            className="flex-1 sm:flex-initial"
          >
            <Eye className="w-4 h-4 mr-2" />
            Vorschau
          </Button>
        )}
        <Button
          type="button"
          onClick={() => handleSave(true)}
          disabled={saving || publishing}
          className="flex-1 sm:flex-initial bg-forest hover:bg-forest/90 text-white"
        >
          {publishing ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
          Veröffentlichen
        </Button>
      </div>

      {/* Publish Success Dialog */}
      {showSuccess && (
        <PublishSuccess
          slug={slug}
          title={title}
          onClose={() => {
            setShowSuccess(false);
            router.push('/admin');
            router.refresh();
          }}
        />
      )}
    </div>
  );
}
