'use client';

import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqEditorProps {
  items: FaqItem[];
  onChange: (items: FaqItem[]) => void;
}

export function FaqEditor({ items, onChange }: FaqEditorProps) {
  const addItem = () => {
    onChange([...items, { question: '', answer: '' }]);
  };

  const removeItem = (index: number) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const updateItem = (index: number, field: 'question' | 'answer', value: string) => {
    const updated = items.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    );
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div key={index} className="relative border border-border rounded-lg p-4 bg-white">
          <button
            type="button"
            onClick={() => removeItem(index)}
            className="absolute top-3 right-3 text-muted-foreground hover:text-destructive transition-colors"
            title="FAQ entfernen"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          <div className="space-y-3 pr-8">
            <div>
              <Label className="text-xs text-muted-foreground">Frage</Label>
              <Input
                value={item.question}
                onChange={(e) => updateItem(index, 'question', e.target.value)}
                placeholder="z.B. Kann ich meinen Hund mitbringen?"
                className="mt-1"
              />
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Antwort</Label>
              <Input
                value={item.answer}
                onChange={(e) => updateItem(index, 'answer', e.target.value)}
                placeholder="Die Antwort auf die Frage..."
                className="mt-1"
              />
            </div>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={addItem}
        className="w-full border-dashed"
      >
        <Plus className="w-4 h-4 mr-2" />
        FAQ hinzufügen
      </Button>
    </div>
  );
}
