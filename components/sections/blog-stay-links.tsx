import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

// Internal-linking block: every blog article links to the three booking pages
// with descriptive anchors. Rationale (GSC 2026-08): blog posts collect ~80 %
// of organic clicks while /wohnen/* and /preise sit on page 2 — this block
// routes readers (and link equity) from guides to the money pages.
const CATEGORY_LEAD: Record<string, string> = {
  "Urlaub mit Hund": "dog",
  "Familienurlaub": "family",
};

export function BlogStayLinks({ category }: { category?: string }) {
  const t = useTranslations("BlogStayLinks");
  const leadKey = (category && CATEGORY_LEAD[category]) || "default";

  const links = [
    { href: "/wohnen/ferienwohnungen", title: t("apartmentsTitle"), sub: t("apartmentsSub") },
    { href: "/wohnen/zimmer", title: t("roomsTitle"), sub: t("roomsSub") },
    { href: "/preise", title: t("pricesTitle"), sub: t("pricesSub") },
  ] as const;

  return (
    <aside aria-label={t("heading")} className="mt-16 pt-10 border-t border-forest/20">
      <p className="font-serif text-2xl text-forest mb-2">{t("heading")}</p>
      <p className="text-text-primary/70 mb-6">{t(`lead_${leadKey}`)}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group block rounded-2xl border border-forest/10 bg-white px-5 py-4 transition-colors hover:border-wood/40"
          >
            <span className="block font-medium text-forest group-hover:text-wood">
              {l.title}
            </span>
            <span className="mt-1 block text-sm text-text-primary/60">{l.sub}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
