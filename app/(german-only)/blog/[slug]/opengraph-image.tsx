import { ImageResponse } from 'next/og';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';

export const alt = 'Sonnenhof Herrsching Blog';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

async function loadFont(): Promise<ArrayBuffer> {
  const css = await fetch(
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&display=swap',
    { headers: { 'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36' } }
  ).then((res) => res.text());

  const fontUrl = css.match(/src: url\((.+?)\) format\('truetype'\)/)?.[1]
    ?? css.match(/src: url\((.+?)\)/)?.[1];

  if (!fontUrl) throw new Error('Could not extract font URL from Google Fonts CSS');

  return fetch(fontUrl).then((res) => res.arrayBuffer());
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.h1 ?? 'Sonnenhof Herrsching';
  const playfairFont = await loadFont();

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #1a5276, #2e86c1)',
          padding: '60px 80px',
        }}
      >
        {/* Blog title */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '48px',
              fontWeight: 700,
              color: '#ffffff',
              lineHeight: 1.3,
              maxWidth: '1040px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom branding */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}
        >
          <span
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '20px',
              fontWeight: 700,
              color: 'rgba(255, 255, 255, 0.8)',
            }}
          >
            Sonnenhof Herrsching
          </span>
          <span
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '16px',
              color: 'rgba(255, 255, 255, 0.6)',
            }}
          >
            sonnenhof-herrsching.de
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Playfair Display',
          data: playfairFont,
          style: 'normal',
          weight: 700,
        },
      ],
    }
  );
}
