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
    default: 'Sonnenhof Herrsching | Ferienwohnungen & Gästezimmer am Ammersee',
  },
  description: "Familiengeführte Ferienwohnungen und Gästezimmer in Herrsching am Ammersee. Persönlich, naturverbunden und nur wenige Schritte vom See entfernt.",
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
