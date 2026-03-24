import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

const nextConfig: NextConfig = {
  // HTTP-Komprimierung aktivieren (Gzip/Brotli)
  compress: true,

  // Produktions-Optimierungen
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.public.blob.vercel-storage.com',
        port: '',
        pathname: '/**',
      },
    ],
    // Bildoptimierung
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 Jahr Cache
    // Optimierte Breakpoints für responsive Bilder
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // 301 Redirects für alte/Ghost-URLs
  async redirects() {
    return [
      {
        source: '/Preise-Leistungen',
        destination: '/preise',
        permanent: true,
      },
      {
        source: '/Preise-Leistungen/',
        destination: '/preise',
        permanent: true,
      },
      {
        source: '/Ferienwohnungen/:path*',
        destination: '/wohnen/ferienwohnungen',
        permanent: true,
      },
    ];
  },

  // Headers für zusätzliche Optimierung
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
