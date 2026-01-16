import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-5xl md:text-6xl text-forest mb-6">
            Unterkunft nicht gefunden
          </h1>
          <p className="text-xl text-text-primary/80 mb-8">
            Die von Ihnen gesuchte Unterkunft existiert leider nicht oder ist nicht mehr verfügbar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-forest hover:bg-forest/90">
              <Link href="/wohnen">Alle Unterkünfte ansehen</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/">Zur Startseite</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
