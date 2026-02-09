import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gästezimmer Herrsching | 7 Zimmer am Ammersee",
  description: "7 komfortable Gästezimmer mit Teeküche. Einzel- und Doppelzimmer (mit/ohne Balkon). Ab 85€/Nacht. Ideal für Paare, Geschäftsreisende. Mindestaufenthalt 2 Nächte.",
  alternates: {
    canonical: 'https://www.sonnenhof-herrsching.de/wohnen/zimmer',
  },
  openGraph: {
    title: "7 Gästezimmer in Herrsching am Ammersee",
    description: "Einzel- und Doppelzimmer mit eigenem Bad. Ab 85€/Nacht. Min. 2 Nächte.",
    url: 'https://www.sonnenhof-herrsching.de/wohnen/zimmer',
    type: 'website',
    locale: 'de_DE',
  },
};

export default function ZimmerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
