'use client';

import { Info, X } from 'lucide-react';
import { useState } from 'react';

interface SeoHintsProps {
  title: string;
  content: string;
  description: string;
}

interface Hint {
  id: string;
  message: string;
}

export function SeoHints({ title, content, description }: SeoHintsProps) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  const hints: Hint[] = [];

  // Title length
  if (title.length > 0 && title.length < 30) {
    hints.push({ id: 'title-short', message: 'Der Titel könnte etwas länger sein (mindestens 30 Zeichen wirkt besser in Suchergebnissen).' });
  }
  if (title.length > 65) {
    hints.push({ id: 'title-long', message: 'Der Titel ist recht lang. Google zeigt meistens nur ca. 60 Zeichen an.' });
  }

  // Description
  if (description.length > 0 && description.length < 80) {
    hints.push({ id: 'desc-short', message: 'Die Beschreibung könnte ausführlicher sein (120-155 Zeichen sind ideal).' });
  }

  // Content hints
  const plainText = content.replace(/<[^>]+>/g, '');
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;

  if (wordCount > 300 && !content.includes('<img')) {
    hints.push({ id: 'no-image', message: 'Ein Bild im Text lockert den Beitrag auf und hält Leser bei der Stange.' });
  }

  if (wordCount > 200 && !content.includes('<h2') && !content.includes('<h3')) {
    hints.push({ id: 'no-headings', message: 'Zwischenüberschriften (H2) helfen Lesern, sich im Text zurechtzufinden.' });
  }

  if (wordCount > 0 && wordCount < 300) {
    hints.push({ id: 'short-content', message: `Dein Text hat ${wordCount} Wörter. Ab ca. 500 Wörtern rankt ein Beitrag oft besser.` });
  }

  const visibleHints = hints.filter((h) => !dismissed.has(h.id));
  if (visibleHints.length === 0) return null;

  return (
    <div className="space-y-2">
      {visibleHints.map((hint) => (
        <div
          key={hint.id}
          className="flex items-start gap-2 bg-wood/10 border border-wood/20 rounded-lg px-3 py-2 text-sm"
        >
          <Info className="w-4 h-4 text-wood shrink-0 mt-0.5" />
          <p className="text-text-primary/80 flex-1">{hint.message}</p>
          <button
            type="button"
            onClick={() => setDismissed((prev) => new Set([...prev, hint.id]))}
            className="text-text-primary/40 hover:text-text-primary/60 shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export function CharCounter({ value, min, max }: { value: string; min: number; max: number }) {
  const len = value.length;
  const color = len === 0
    ? 'text-muted-foreground'
    : len >= min && len <= max
      ? 'text-green-600'
      : 'text-amber-600';

  return (
    <span className={`text-xs ${color}`}>
      {len}/{max} Zeichen
    </span>
  );
}
