'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'sonner';
import { Star } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';

const formSchema = z.object({
  name: z.string().min(2, 'Bitte Name angeben'),
  ort: z.string().optional(),
  stayPeriod: z.string().optional(),
  accommodation: z.string().optional(),
  rating: z.number().int().min(1).max(5).optional(),
  message: z.string().min(10, 'Bitte mindestens 10 Zeichen schreiben').max(2000, 'Maximal 2000 Zeichen'),
  email: z.string().email('Ungültige E-Mail').optional().or(z.literal('')),
  // Honeypot
  website: z.string().max(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export function GuestbookForm({ onSubmitted }: { onSubmitted?: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [rating, setRating] = useState<number | undefined>(undefined);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      ort: '',
      stayPeriod: '',
      accommodation: '',
      message: '',
      email: '',
      website: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await fetch('/api/guestbook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, rating }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        toast.error(json.error || 'Eintrag konnte nicht gespeichert werden');
        return;
      }
      setSubmitted(true);
      onSubmitted?.();
    } catch {
      toast.error('Eintrag konnte nicht gespeichert werden');
    }
  };

  if (submitted) {
    return (
      <Card className="w-full bg-stone/40 border-forest/20">
        <CardContent className="p-8 text-center">
          <h3 className="font-serif text-2xl text-forest mb-3">Vielen Dank!</h3>
          <p className="text-text-primary/80">
            Ihr Eintrag wurde erfolgreich übermittelt. Conny prüft ihn kurz und schaltet ihn dann frei —
            so bleibt das Gästebuch ein schöner Ort.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="schreiben" className="w-full bg-white shadow-xl border-none scroll-mt-24">
      <CardContent className="p-6 md:p-10">
        <h3 className="font-serif text-2xl md:text-3xl text-forest mb-2">
          Hinterlassen Sie einen Eintrag
        </h3>
        <p className="text-text-primary/70 mb-6">
          Wir freuen uns über jede Zeile. Conny gibt Ihren Eintrag persönlich frei.
        </p>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...form.register('website')}
              style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', opacity: 0 }}
              aria-hidden="true"
            />

            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ihr Name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ort"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Ort (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="z. B. München" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="stayPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Aufenthalt (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="z. B. Mai 2026" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="accommodation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Unterkunft (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="z. B. Ferienwohnung Sonne" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormItem>
              <FormLabel className="text-forest font-semibold">Bewertung (optional)</FormLabel>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(rating === n ? undefined : n)}
                    aria-label={`${n} Sterne`}
                    className="p-1 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-7 w-7 ${rating && n <= rating ? 'fill-amber-400 text-amber-400' : 'text-stone-300'}`}
                    />
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
            </FormItem>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-forest font-semibold">Ihr Eintrag *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Was hat Ihnen besonders gefallen? Was möchten Sie zukünftigen Gästen sagen?"
                      className="min-h-[160px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-forest font-semibold">E-Mail (optional, nicht öffentlich)</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="ihre@email.de" {...field} className="h-12" />
                  </FormControl>
                  <p className="text-xs text-text-primary/60 mt-1">
                    Nur falls Conny Sie zu Ihrem Eintrag erreichen möchte. Wird nicht veröffentlicht.
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-forest hover:bg-forest/90 disabled:opacity-50"
            >
              {form.formState.isSubmitting ? 'Wird gesendet...' : 'Eintrag absenden'}
            </Button>

            <p className="text-xs text-text-primary/60 text-center">
              * Pflichtfelder. Ihr Eintrag erscheint erst nach Freischaltung durch Conny.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
