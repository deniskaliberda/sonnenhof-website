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
    <aside aria-label={t("heading")} className="mt-16 pt-10 border-t border-[rgba(166,121,78,0.28)]">
      <p className="font-serif text-2xl text-forest mb-2">{t("heading")}</p>
      <p className="text-[#5A5142] mb-6">{t(`lead_${leadKey}`)}</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="group block rounded-xl bg-white px-5 py-4 shadow-[0_1px_2px_rgba(42,36,28,0.06)] border border-[#EFE7D6] transition-all hover:border-wood/40 hover:shadow-[0_10px_26px_rgba(42,36,28,0.10)]"
          >
            <span className="block font-serif font-medium text-lg text-forest group-hover:text-wood-dark transition-colors">
              {l.title}
            </span>
            <span className="mt-1 block text-sm text-[#9A8C72] group-hover:text-wood-dark transition-colors">{l.sub}</span>
          </Link>
        ))}
      </div>
    </aside>
  );
}
