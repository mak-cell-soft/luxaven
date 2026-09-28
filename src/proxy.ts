import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { DEFAULT_LOCALE, LOCALES } from '@/lib/i18n/config';

/**
 * Next.js 16 Proxy
 * Handles root redirect ( / -> /fr ) and ensures default locale routing.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Root redirect: / -> /fr
  if (pathname === '/') {
    return NextResponse.redirect(new URL(`/${DEFAULT_LOCALE}`, request.url));
  }

  // Check if pathname starts with a supported locale
  const pathnameHasLocale = LOCALES.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Let other paths (like invalid locales /xx or dynamic files) pass through to Next.js router
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Skip static assets, API, and Next.js internals
    '/((?!_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
