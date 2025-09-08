// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import { locales, defaultLocale, Locale } from './lib/locales';

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (!pathnameHasLocale) {
    // Detect user's preferred language or fallback to default
    const acceptLanguage = request.headers.get('accept-language')?.split(',')[0]?.slice(0, 2);
    const locale = locales.includes(acceptLanguage as Locale) ? acceptLanguage : defaultLocale;
    return NextResponse.redirect(new URL(`/${locale}${pathname || ''}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
