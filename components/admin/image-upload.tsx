'use client';

import { useCallback, useState } from 'react';
import { Upload, X, ImageIcon } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleUpload = useCallback(async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || 'Fehler beim Hochladen');
        return;
      }

      const { url } = await res.json();
      onChange(url);
    } catch {
      alert('Fehler beim Hochladen des Bildes');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleUpload(file);
    }
  }, [handleUpload]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleUpload(file);
      e.target.value = '';
    }
  }, [handleUpload]);

  if (value) {
    return (
      <div className="relative rounded-lg overflow-hidden bg-stone border border-border">
        <div className="relative h-48 md:h-64">
          <Image
            src={value}
            alt="Hero-Bild Vorschau"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized={value.startsWith('http')}
          />
        </div>
        <button
          type="button"
          onClick={() => onChange('')}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-colors"
          title="Bild entfernen"
        >
          <X className="w-4 h-4 text-text-primary" />
        </button>
      </div>
    );
  }

  return (
    <label
      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      className={`
        flex flex-col items-center justify-center gap-3 h-48 md:h-64
        border-2 border-dashed rounded-lg cursor-pointer transition-colors
        ${dragOver ? 'border-forest bg-forest/5' : 'border-border hover:border-forest/50'}
        ${uploading ? 'opacity-50 pointer-events-none' : ''}
      `}
    >
      {uploading ? (
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-forest border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-muted-foreground">Wird hochgeladen...</p>
        </div>
      ) : (
        <>
          <div className="w-12 h-12 rounded-full bg-forest/10 flex items-center justify-center">
            {dragOver ? <ImageIcon className="w-6 h-6 text-forest" /> : <Upload className="w-6 h-6 text-forest" />}
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-text-primary">
              Hero-Bild hochladen
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Ziehe ein Bild hierher oder klicke zum Auswählen
            </p>
            <p className="text-xs text-muted-foreground">
              JPEG, PNG, WebP oder AVIF (max. 5 MB)
            </p>
          </div>
        </>
      )}
      <input
        type="file"
        accept="image/jpeg,image/png,image/webp,image/avif"
        onChange={handleFileInput}
        className="hidden"
      />
    </label>
  );
}
