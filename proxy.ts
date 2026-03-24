import createIntlMiddleware from 'next-intl/middleware';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import { routing } from './i18n/routing';

const SECRET = new TextEncoder().encode(process.env.AUTH_SECRET || 'dev-secret-change-in-production');

const intlMiddleware = createIntlMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin auth check (before i18n)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('admin_session')?.value;

    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    try {
      await jwtVerify(token, SECRET);
      return NextResponse.next();
    } catch {
      const response = NextResponse.redirect(new URL('/admin/login', request.url));
      response.cookies.delete('admin_session');
      return response;
    }
  }

  // Skip i18n for paths that should remain outside [locale]
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/blog') ||
    pathname === '/datenschutz' ||
    pathname === '/impressum' ||
    pathname.startsWith('/unterkunft/')
  ) {
    return NextResponse.next();
  }

  // Apply i18n middleware for all other routes
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    // Match all pathnames except static files and Next.js internals
    '/((?!_next|_vercel|.*\\..*).*)',
  ],
};
