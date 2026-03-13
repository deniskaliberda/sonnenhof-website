import { NextRequest, NextResponse } from 'next/server';

const INDEXNOW_KEY = 'fbb73408974ee1a0e053f763c1f2090c';
const HOST = 'www.sonnenhof-herrsching.de';

export async function POST(request: NextRequest) {
  // Simple auth check via Authorization header
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.INDEXNOW_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const urls: string[] = Array.isArray(body.urls) ? body.urls : [body.url].filter(Boolean);

  if (urls.length === 0) {
    return NextResponse.json({ error: 'No URLs provided' }, { status: 400 });
  }

  // Normalize URLs to full URLs
  const fullUrls = urls.map((url) =>
    url.startsWith('http') ? url : `https://${HOST}${url.startsWith('/') ? '' : '/'}${url}`
  );

  try {
    const response = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList: fullUrls,
      }),
    });

    return NextResponse.json({
      success: response.ok,
      status: response.status,
      urlsSubmitted: fullUrls.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to submit to IndexNow', details: String(error) },
      { status: 500 }
    );
  }
}
