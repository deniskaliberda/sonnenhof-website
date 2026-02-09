import type { NextConfig } from "next";

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
    ],
    // Bildoptimierung
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 31536000, // 1 Jahr Cache
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

export default nextConfig;

