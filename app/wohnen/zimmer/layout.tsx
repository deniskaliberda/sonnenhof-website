import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gästezimmer Herrsching | Pension am Ammersee ab 85€",
  description: "Pension Herrsching: 7 komfortable Gästezimmer mit Teeküche. Einzel- und Doppelzimmer ab 85€/Nacht. Ideale Übernachtung am Ammersee für Paare und Geschäftsreisende.",
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
