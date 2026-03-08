'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lightbulb, ChevronDown, ChevronUp, Sparkles, ArrowRight } from 'lucide-react';

interface Idea {
  title: string;
  category: string;
}

function getSeasonalIdeas(): { season: string; ideas: Idea[] } {
  const month = new Date().getMonth(); // 0-11

  if (month >= 2 && month <= 4) {
    return {
      season: 'Frühling',
      ideas: [
        { title: 'Die schönsten Frühlingswanderungen am Ammersee', category: 'Wandern & Natur' },
        { title: 'Wenn der Ammersee aufwacht — was im Frühling rund um Herrsching passiert', category: 'Ausflugsziele' },
        { title: 'Radtour im Frühling: Die besten Strecken rund um den Ammersee', category: 'Ausflugsziele' },
        { title: 'Gartenzeit in Herrsching — Blühende Gärten und Parks', category: 'Wandern & Natur' },
      ],
    };
  }
  if (month >= 5 && month <= 7) {
    return {
      season: 'Sommer',
      ideas: [
        { title: 'Geheime Badeplätze am Ammersee — unsere Lieblinge', category: 'Ausflugsziele' },
        { title: 'Sommerfest-Guide: Veranstaltungen rund um Herrsching', category: 'Veranstaltungen' },
        { title: 'Stand-Up-Paddling am Ammersee — Verleih, Tipps & beste Stellen', category: 'Ausflugsziele' },
        { title: 'Eis, Bier & Brotzeit: Die besten Sommerlokale am Ammersee', category: 'Kulinarik' },
      ],
    };
  }
  if (month >= 8 && month <= 10) {
    return {
      season: 'Herbst',
      ideas: [
        { title: 'Herbstfarben am Ammersee — die schönsten Fotospots', category: 'Wandern & Natur' },
        { title: 'Kastanienzeit: Biergarten-Wanderung nach Andechs', category: 'Ausflugsziele' },
        { title: 'Pilze, Kürbis, Erntedank — Herbst-Erlebnisse rund um Herrsching', category: 'Veranstaltungen' },
        { title: 'Die schönsten Herbstwanderungen mit Bergblick', category: 'Wandern & Natur' },
      ],
    };
  }
  return {
    season: 'Winter',
    ideas: [
      { title: 'Winterzauber in Herrsching — was die kalte Jahreszeit besonders macht', category: 'Ausflugsziele' },
      { title: 'Weihnachtsmärkte am Ammersee — unsere Empfehlungen', category: 'Veranstaltungen' },
      { title: 'Gemütliche Restaurants für kalte Tage rund um den Ammersee', category: 'Kulinarik' },
      { title: 'Winterwandern am Ammersee: Verschneite Wege und warmer Kakao', category: 'Wandern & Natur' },
    ],
  };
}

const EVERGREEN_IDEAS: Idea[] = [
  { title: 'Was unsere Gäste am häufigsten fragen', category: 'Unterkunft & Tipps' },
  { title: 'Ein Tag in Herrsching — mein persönlicher Guide', category: 'Ausflugsziele' },
  { title: 'Lieblingsrestaurants rund um den Ammersee', category: 'Kulinarik' },
  { title: 'Mit Kindern am Ammersee — unsere Familientipps', category: 'Familienurlaub' },
  { title: 'Regentag? Kein Problem! Indoor-Tipps für Herrsching', category: 'Ausflugsziele' },
  { title: 'Urlaub mit Hund am Ammersee — so klappt es perfekt', category: 'Urlaub mit Hund' },
];

export function WritingIdeas() {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();
  const { season, ideas: seasonalIdeas } = getSeasonalIdeas();

  const handleIdeaClick = (idea: Idea) => {
    const params = new URLSearchParams({
      title: idea.title,
      category: idea.category,
    });
    router.push(`/admin/neu?${params.toString()}`);
  };

  return (
    <div className="bg-white rounded-xl border border-border overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-stone/30 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-wood/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-wood" />
          </div>
          <span className="font-serif text-forest text-lg">Ideen für deinen nächsten Beitrag</span>
        </div>
        {expanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>

      {expanded && (
        <div className="px-5 pb-5 space-y-5">
          {/* Seasonal */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-wood" />
              <h4 className="text-sm font-medium text-forest">{season}-Ideen</h4>
            </div>
            <div className="grid gap-2">
              {seasonalIdeas.map((idea) => (
                <IdeaCard key={idea.title} idea={idea} onClick={() => handleIdeaClick(idea)} />
              ))}
            </div>
          </div>

          {/* Evergreen */}
          <div>
            <h4 className="text-sm font-medium text-forest mb-3">Immer aktuell</h4>
            <div className="grid gap-2">
              {EVERGREEN_IDEAS.map((idea) => (
                <IdeaCard key={idea.title} idea={idea} onClick={() => handleIdeaClick(idea)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function IdeaCard({ idea, onClick }: { idea: Idea; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left flex items-center justify-between gap-3 px-4 py-3 rounded-lg border border-border hover:border-wood/40 hover:bg-wood/5 transition-all group"
    >
      <div className="min-w-0">
        <p className="text-sm text-text-primary group-hover:text-forest transition-colors">{idea.title}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{idea.category}</p>
      </div>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-wood shrink-0 transition-colors" />
    </button>
  );
}
