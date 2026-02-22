import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ammersee erleben | Wandern, Radfahren & Ausflugsziele Herrsching",
  description: "Herrsching & Ammersee erleben: Wanderungen zum Kloster Andechs, Ammersee-Rundweg Radtour, Ausflüge nach München & Neuschwanstein. Ihr Urlaubsparadies im Fünfseenland.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/erleben',
  },
  openGraph: {
    title: "Ammersee erleben | Wandern, Radfahren & Ausflugsziele in Herrsching",
    description: "Wanderungen, Radtouren, Wassersport, Kloster Andechs und Ausflüge nach München & Neuschwanstein rund um den Ammersee.",
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
