'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Check, Copy, ExternalLink, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PublishSuccessProps {
  slug: string;
  title: string;
  onClose: () => void;
}

export function PublishSuccess({ slug, title, onClose }: PublishSuccessProps) {
  const [copied, setCopied] = useState(false);
  const url = `https://www.sonnenhof-herrsching.de/blog/${slug}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const input = document.createElement('input');
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand('copy');
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center">
        {/* Success animation */}
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5 animate-[scale-in_0.3s_ease-out]">
          <Check className="w-8 h-8 text-green-600" strokeWidth={3} />
        </div>

        <h2 className="font-serif text-2xl text-forest mb-2">
          Dein Beitrag ist jetzt live!
        </h2>
        <p className="text-muted-foreground text-sm mb-6">
          &ldquo;{title}&rdquo; ist jetzt für alle sichtbar.
        </p>

        {/* Link copy */}
        <div className="flex items-center gap-2 bg-stone rounded-lg px-3 py-2 mb-6">
          <p className="text-xs text-muted-foreground truncate flex-1 text-left">{url}</p>
          <button
            onClick={handleCopy}
            className="shrink-0 text-forest hover:text-wood transition-colors"
            title="Link kopieren"
          >
            {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {copied && (
          <p className="text-xs text-green-600 mb-4 -mt-4">Link kopiert!</p>
        )}

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <Link href={`/blog/${slug}`} target="_blank" onClick={onClose}>
            <Button className="w-full bg-forest hover:bg-forest/90 text-white">
              <ExternalLink className="w-4 h-4 mr-2" />
              Beitrag ansehen
            </Button>
          </Link>
          <Link href="/admin/neu" onClick={onClose}>
            <Button variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Neuen Beitrag schreiben
            </Button>
          </Link>
          <button
            onClick={onClose}
            className="text-sm text-muted-foreground hover:text-text-primary transition-colors"
          >
            Zurück zur Übersicht
          </button>
        </div>
      </div>
    </div>
  );
}
