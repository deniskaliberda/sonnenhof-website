import Link from "next/link";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";

export default function NotFound() {
  return (
    <>
      <Navigation />
      <main className="pt-20 min-h-screen bg-stone flex items-center justify-center px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif font-medium text-4xl md:text-[54px] leading-[1.1] text-forest mb-6">
            Unterkunft nicht gefunden
          </h1>
          <p className="text-[17px] leading-[1.7] text-[#5A5142] mb-10">
            Die von Ihnen gesuchte Unterkunft existiert leider nicht oder ist nicht mehr verfügbar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/wohnen"
              className="inline-block bg-forest text-stone hover:bg-forest-deep transition-colors rounded-md text-[15px] font-semibold px-8 py-3.5"
            >
              Alle Unterkünfte ansehen
            </Link>
            <Link
              href="/"
              className="inline-block bg-wood text-[#241B0F] hover:bg-[#D3AC6E] transition-colors rounded-md text-[15px] font-semibold px-8 py-3.5"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
