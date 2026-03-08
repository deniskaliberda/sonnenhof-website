'use client';

import { useRouter } from 'next/navigation';
import { FileText, MapPin, UtensilsCrossed, Sun, HelpCircle, X } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  category: string;
  content: string;
}

const TEMPLATES: Template[] = [
  {
    id: 'leer',
    name: 'Leerer Beitrag',
    description: 'Starte mit einer leeren Seite',
    icon: <FileText className="w-5 h-5" />,
    category: 'Unterkunft & Tipps',
    content: '',
  },
  {
    id: 'ausflug',
    name: 'Ausflugsziel vorstellen',
    description: 'Perfekt für Orte und Aktivitäten',
    icon: <MapPin className="w-5 h-5" />,
    category: 'Ausflugsziele',
    content: '<h2>Anfahrt &amp; Lage</h2><p>Wie kommt man dort hin? Wie weit ist es vom Sonnenhof?</p><h2>Was euch erwartet</h2><p>Beschreibe das Ausflugsziel und was man dort erleben kann.</p><h2>Unser Tipp</h2><p>Was macht diesen Ort besonders? Dein persönlicher Geheimtipp.</p><h2>Gut zu wissen</h2><p>Öffnungszeiten, Preise, Parkmöglichkeiten und andere praktische Infos.</p>',
  },
  {
    id: 'restaurant',
    name: 'Restaurant-Empfehlung',
    description: 'Für Restaurants, Cafés und Biergärten',
    icon: <UtensilsCrossed className="w-5 h-5" />,
    category: 'Kulinarik',
    content: '<h2>Warum dieses Restaurant?</h2><p>Was hat dich hierher geführt? Erste Eindrücke.</p><h2>Was wir empfehlen</h2><p>Die besten Gerichte, Getränke oder Spezialitäten.</p><h2>Atmosphäre &amp; Ambiente</h2><p>Wie sieht es dort aus? Wie fühlt es sich an?</p><h2>Praktische Infos</h2><p>Adresse, Öffnungszeiten, Reservierung nötig? Preisrahmen.</p>',
  },
  {
    id: 'saison',
    name: 'Saisonaler Tipp',
    description: 'Für Jahreszeiten-Themen und Events',
    icon: <Sun className="w-5 h-5" />,
    category: 'Veranstaltungen',
    content: '<h2>Was diese Jahreszeit besonders macht</h2><p>Was passiert gerade am Ammersee? Was macht die Stimmung aus?</p><h2>Unsere Top-Aktivitäten</h2><p>Die besten Dinge, die man in dieser Saison machen kann.</p><h2>Packliste &amp; Vorbereitung</h2><p>Was sollte man mitbringen? Worauf achten?</p>',
  },
  {
    id: 'faq',
    name: 'Gäste-FAQ',
    description: 'Häufige Fragen eurer Gäste beantworten',
    icon: <HelpCircle className="w-5 h-5" />,
    category: 'Unterkunft & Tipps',
    content: '<h2>Die häufigsten Fragen unserer Gäste</h2><p>Hier beantworten wir die Fragen, die uns am häufigsten gestellt werden.</p><h3>Frage 1</h3><p>Antwort hier...</p><h3>Frage 2</h3><p>Antwort hier...</p><h3>Frage 3</h3><p>Antwort hier...</p>',
  },
];

interface TemplatePickerProps {
  open: boolean;
  onClose: () => void;
}

export function TemplatePicker({ open, onClose }: TemplatePickerProps) {
  const router = useRouter();

  if (!open) return null;

  const handleSelect = (template: Template) => {
    const params = new URLSearchParams({
      category: template.category,
    });
    if (template.content) {
      params.set('template', template.id);
    }
    router.push(`/admin/neu?${params.toString()}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full max-h-[85vh] overflow-auto">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="font-serif text-xl text-forest">Vorlage wählen</h2>
          <button onClick={onClose} className="text-muted-foreground hover:text-text-primary p-1">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 grid gap-3">
          {TEMPLATES.map((template) => (
            <button
              key={template.id}
              onClick={() => handleSelect(template)}
              className="w-full text-left flex items-start gap-4 p-4 rounded-xl border border-border hover:border-wood/40 hover:bg-wood/5 transition-all group"
            >
              <div className="w-10 h-10 rounded-full bg-forest/10 flex items-center justify-center shrink-0 group-hover:bg-forest/20 transition-colors text-forest">
                {template.icon}
              </div>
              <div>
                <p className="font-medium text-forest">{template.name}</p>
                <p className="text-sm text-muted-foreground mt-0.5">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export function getTemplateContent(templateId: string): string {
  return TEMPLATES.find((t) => t.id === templateId)?.content || '';
}
