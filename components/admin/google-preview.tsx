'use client';

interface GooglePreviewProps {
  title: string;
  description: string;
  slug: string;
}

export function GooglePreview({ title, description, slug }: GooglePreviewProps) {
  const displayTitle = title
    ? `${title} — Sonnenhof Herrsching`
    : 'Titel eingeben...';
  const displayDescription = description || 'Die Meta-Beschreibung wird hier angezeigt...';
  const displayUrl = `sonnenhof-herrsching.de › blog › ${slug || '...'}`;

  // Google truncates title at ~60 chars and description at ~155 chars
  const truncatedTitle = displayTitle.length > 63
    ? displayTitle.substring(0, 60) + '...'
    : displayTitle;
  const truncatedDesc = displayDescription.length > 158
    ? displayDescription.substring(0, 155) + '...'
    : displayDescription;

  return (
    <div className="rounded-lg border border-border bg-white p-4">
      <p className="text-xs text-muted-foreground mb-2">So sieht dein Beitrag bei Google aus:</p>
      <div className="space-y-0.5">
        <p className="text-xs text-[#202124]" style={{ fontFamily: 'Arial, sans-serif' }}>
          {displayUrl}
        </p>
        <p
          className="text-lg leading-snug"
          style={{ fontFamily: 'Arial, sans-serif', color: '#1a0dab' }}
        >
          {truncatedTitle}
        </p>
        <p
          className="text-sm leading-relaxed"
          style={{ fontFamily: 'Arial, sans-serif', color: '#4d5156' }}
        >
          {truncatedDesc}
        </p>
      </div>
    </div>
  );
}
