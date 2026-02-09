import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ammersee erleben | Ausflugsziele Herrsching",
  description: "Entdecken Sie Herrsching & Ammersee: Wandern, Radfahren, Wassersport, Kloster Andechs, Dampferfahrten. 5-Seen-Land, München & Alpen in Reichweite. Ihr Urlaubsparadies!",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/erleben',
  },
  openGraph: {
    title: "Ammersee erleben | Ausflugsziele in Herrsching",
    description: "Wandern, Radfahren, Wassersport, Kloster Andechs und Dampferfahrten rund um den Ammersee.",
    url: 'https://www.sonnenhof-herrsching.de/erleben',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function ErlebenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
