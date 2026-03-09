import Link from "next/link";
import { Button } from "@/components/ui/button";

export function BlogCTA() {
  return (
    <aside className="my-12 py-8 px-6 bg-white rounded-2xl border border-forest/10 max-w-2xl mx-auto text-center">
      <p className="font-serif text-2xl text-forest mb-3">
        Neugierig geworden?
      </p>
      <p className="text-text-primary/70 mb-6">
        Schreiben Sie uns eine unverbindliche Anfrage – Conny meldet sich persönlich bei Ihnen.
      </p>
      <Button
        asChild
        size="lg"
        className="bg-wood hover:bg-wood/90 text-white px-8 py-5"
      >
        <Link href="/kontakt">Jetzt unverbindlich anfragen</Link>
      </Button>
      <p className="mt-4 text-sm text-text-primary/50">
        ★ 4,8 · 127 Google-Bewertungen · Seit 40 Jahren
      </p>
    </aside>
  );
}
