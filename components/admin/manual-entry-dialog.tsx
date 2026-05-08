'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Upload, Loader2, Camera } from 'lucide-react';
import { toast } from 'sonner';

interface Props {
  open: boolean;
  onClose: () => void;
  onCreated: (entry: ManualEntryResult) => void;
}

interface ManualEntryResult {
  id: number;
  name: string;
  ort: string | null;
  stayPeriod: string | null;
  accommodation: string | null;
  rating: number | null;
  message: string;
  submitterEmail: string | null;
  status: 'pending' | 'approved' | 'rejected';
  source: string;
  photoUrl: string | null;
  approvedAt: string | null;
  createdAt: string;
}

export function ManualEntryDialog({ open, onClose, onCreated }: Props) {
  const [name, setName] = useState('');
  const [ort, setOrt] = useState('');
  const [stayPeriod, setStayPeriod] = useState('');
  const [accommodation, setAccommodation] = useState('');
  const [rating, setRating] = useState<number | undefined>(undefined);
  const [message, setMessage] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!open) return null;

  const reset = () => {
    setName('');
    setOrt('');
    setStayPeriod('');
    setAccommodation('');
    setRating(undefined);
    setMessage('');
    setPhotoUrl(null);
  };

  const handleClose = () => {
    if (!saving && !uploading) {
      reset();
      onClose();
    }
  };

  const handleUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Bitte ein Bild hochladen (JPG / PNG / WebP)');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Bild ist zu groß (max. 10 MB)');
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || 'Upload fehlgeschlagen');
        return;
      }
      setPhotoUrl(json.url);
      toast.success('Foto hochgeladen');
    } catch {
      toast.error('Upload fehlgeschlagen');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (asPending: boolean) => {
    if (!name.trim()) {
      toast.error('Bitte Name angeben');
      return;
    }
    if (!message.trim()) {
      toast.error('Bitte den Text vom Zettel abtippen');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          ort: ort.trim() || null,
          stayPeriod: stayPeriod.trim() || null,
          accommodation: accommodation.trim() || null,
          rating,
          message: message.trim(),
          photoUrl,
          source: photoUrl ? 'handwritten' : 'admin',
          status: asPending ? 'pending' : 'approved',
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        toast.error(json.error || 'Fehler beim Speichern');
        return;
      }
      onCreated(json.entry as ManualEntryResult);
      reset();
    } catch {
      toast.error('Fehler beim Speichern');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start md:items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl my-8 max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-stone-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <div>
            <h2 className="font-serif text-xl text-forest flex items-center gap-2">
              <Camera className="w-5 h-5" /> Handschriftlichen Zettel hinzufügen
            </h2>
            <p className="text-sm text-text-primary/70 mt-0.5">
              Foto vom Zettel hochladen + Text abtippen — Eintrag wird sofort online geschaltet.
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-text-primary/60 hover:text-text-primary"
            aria-label="Schließen"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* Foto-Upload */}
          <div>
            <label className="block text-forest font-semibold mb-2">Foto vom Zettel (optional)</label>
            {photoUrl ? (
              <div className="relative">
                <img src={photoUrl} alt="Zettel" className="max-h-64 rounded-lg border border-stone-200" />
                <button
                  onClick={() => setPhotoUrl(null)}
                  className="absolute top-2 right-2 bg-white/95 rounded-full p-1.5 shadow hover:bg-white"
                  aria-label="Foto entfernen"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                className="w-full border-2 border-dashed border-stone-300 rounded-lg p-8 text-center hover:bg-stone/30 transition-colors disabled:opacity-50"
              >
                {uploading ? (
                  <span className="flex items-center justify-center gap-2 text-text-primary/70">
                    <Loader2 className="w-5 h-5 animate-spin" /> Lädt hoch...
                  </span>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-2 text-text-primary/50" />
                    <p className="text-sm text-text-primary/70">
                      Klicken oder Foto vom Handy hochladen
                    </p>
                    <p className="text-xs text-text-primary/50 mt-1">JPG / PNG / WebP · max. 10 MB</p>
                  </>
                )}
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleUpload(f);
                e.target.value = '';
              }}
            />
            <p className="text-xs text-text-primary/60 mt-2">
              Tipp: Auf dem Handy öffnet sich direkt die Kamera. Du kannst den Zettel abfotografieren
              und hier hochladen.
            </p>
          </div>

          {/* Felder */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-forest mb-1">Name *</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Wer hat geschrieben?"
                className="w-full h-11 px-3 border border-stone-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-forest mb-1">Ort (optional)</label>
              <input
                value={ort}
                onChange={(e) => setOrt(e.target.value)}
                placeholder="z. B. München"
                className="w-full h-11 px-3 border border-stone-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-forest mb-1">
                Aufenthalt (optional)
              </label>
              <input
                value={stayPeriod}
                onChange={(e) => setStayPeriod(e.target.value)}
                placeholder="z. B. Mai 2026"
                className="w-full h-11 px-3 border border-stone-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-forest mb-1">
                Unterkunft (optional)
              </label>
              <input
                value={accommodation}
                onChange={(e) => setAccommodation(e.target.value)}
                placeholder="z. B. Ferienwohnung Sonne"
                className="w-full h-11 px-3 border border-stone-300 rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-1">Bewertung (optional)</label>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setRating(rating === n ? undefined : n)}
                  className={`text-3xl transition-transform hover:scale-110 ${
                    rating && n <= rating ? 'text-amber-400' : 'text-stone-300'
                  }`}
                  aria-label={`${n} Sterne`}
                >
                  ★
                </button>
              ))}
              {rating && (
                <button
                  type="button"
                  onClick={() => setRating(undefined)}
                  className="ml-3 text-sm text-text-primary/60 underline"
                >
                  zurücksetzen
                </button>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-forest mb-1">Text vom Zettel *</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tippe den handschriftlichen Text hier ab..."
              className="w-full p-3 border border-stone-300 rounded-lg min-h-[160px] resize-y"
            />
          </div>
        </div>

        <div className="sticky bottom-0 bg-white border-t border-stone-200 px-6 py-4 flex flex-wrap items-center justify-end gap-2 rounded-b-2xl">
          <Button variant="outline" onClick={handleClose} disabled={saving}>
            Abbrechen
          </Button>
          <Button
            variant="outline"
            onClick={() => handleSave(true)}
            disabled={saving || uploading}
          >
            {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : null}
            Erstmal als Entwurf speichern
          </Button>
          <Button
            onClick={() => handleSave(false)}
            disabled={saving || uploading}
            className="bg-forest hover:bg-forest/90 text-white"
          >
            {saving ? <Loader2 className="w-4 h-4 mr-1 animate-spin" /> : null}
            Speichern und freischalten
          </Button>
        </div>
      </div>
    </div>
  );
}
