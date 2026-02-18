import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';
import { getPostBySlug } from '@/lib/blog';

export const runtime = 'nodejs';

export const alt = 'Sonnenhof Herrsching Blog';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

function loadBackgroundImage(): string {
  const imagePath = join(process.cwd(), 'public', 'images', 'hero', 'hero-ammersee.jpg');
  const imageBuffer = readFileSync(imagePath);
  return `data:image/jpeg;base64,${imageBuffer.toString('base64')}`;
}

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

  const backgroundImageDataUrl = loadBackgroundImage();
  const playfairFont = await loadFont();

  const FOREST = '#2C4F40';
  const WOOD = '#C59D5F';
  const STONE = '#F5F5F0';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Background photo */}
        <img
          src={backgroundImageDataUrl}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />

        {/* Forest-tinted overlay */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(44, 79, 64, 0.65)',
          }}
        />

        {/* Wood accent line at top */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '6px',
            backgroundColor: WOOD,
          }}
        />

        {/* Blog title */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '110px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px 80px',
          }}
        >
          <div
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: title.length > 60 ? '48px' : '58px',
              fontWeight: 700,
              color: STONE,
              textAlign: 'center',
              lineHeight: 1.25,
              textShadow: '0 2px 12px rgba(0,0,0,0.4)',
              maxWidth: '1040px',
            }}
          >
            {title}
          </div>
        </div>

        {/* Branding strip */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '110px',
            backgroundColor: FOREST,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 80px',
          }}
        >
          <span
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '28px',
              fontWeight: 700,
              color: STONE,
              letterSpacing: '0.02em',
            }}
          >
            Sonnenhof Herrsching
          </span>
          <span
            style={{
              fontFamily: '"Playfair Display"',
              fontSize: '18px',
              color: WOOD,
              letterSpacing: '0.04em',
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
