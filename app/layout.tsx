import type { Metadata } from "next";
import { Spectral, Hanken_Grotesk, Petit_Formal_Script } from "next/font/google";
import "./globals.css";
import { TrackingInit } from "@/components/tracking-init";

const spectral = Spectral({
  variable: "--font-spectral",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const petitFormal = Petit_Formal_Script({
  variable: "--font-script",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.sonnenhof-herrsching.de'),
  title: {
    template: '%s | Sonnenhof Herrsching',
    default: 'Sonnenhof | Pension & Ferienwohnung in Herrsching am Ammersee',
  },
  description: "Pension am Ammersee: Familiengeführte Ferienwohnungen und Gästezimmer in Herrsching am Ammersee. Persönlich, naturverbunden und nur wenige Schritte vom See entfernt.",
  openGraph: {
    type: 'website',
    locale: 'de_DE',
    siteName: 'Sonnenhof Herrsching',
    images: [
      {
        url: '/images/hero/hero-sonnenhof.jpg',
        width: 1200,
        height: 630,
        alt: 'Sonnenhof Herrsching am Ammersee',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sonnenhof | Pension & Ferienwohnung in Herrsching am Ammersee',
    description: 'Pension am Ammersee: Familiengeführte Ferienwohnungen und Gästezimmer in Herrsching.',
    images: ['/images/hero/hero-sonnenhof.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body
        className={`${hanken.variable} ${spectral.variable} ${petitFormal.variable} antialiased`}
      >
        <TrackingInit />
        {children}
      </body>
    </html>
  );
}
