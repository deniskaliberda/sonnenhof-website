import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
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
    <html lang="de">
      <body
        className={`${inter.variable} ${playfair.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
