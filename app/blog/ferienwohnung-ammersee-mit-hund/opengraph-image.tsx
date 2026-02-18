import { ImageResponse } from 'next/og';
import { readFileSync } from 'fs';
import { join } from 'path';

export const runtime = 'nodejs';

export const alt = 'Ferienwohnung am Ammersee mit Hund – Sonnenhof Herrsching';

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

function loadFont(): ArrayBuffer {
  const fontPath = join(process.cwd(), 'public', 'fonts', 'PlayfairDisplay-Bold.ttf');
  const fontBuffer = readFileSync(fontPath);
  return fontBuffer.buffer.slice(
    fontBuffer.byteOffset,
    fontBuffer.byteOffset + fontBuffer.byteLength
  ) as ArrayBuffer;
}

export default async function Image() {
  const title = 'Ferienwohnung am Ammersee mit Hund – So wird der Urlaub perfekt';

  const backgroundImageDataUrl = loadBackgroundImage();
  const playfairFont = loadFont();

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
              fontSize: '48px',
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
