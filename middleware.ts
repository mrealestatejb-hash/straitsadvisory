import { NextRequest, NextResponse } from 'next/server';

const locales = ['en-SG', 'zh-SG', 'ms-MY'];
const defaultLocale = 'en-SG';

// Routes that require authentication (checked via session cookie)
const protectedRoutes = ['/clients', '/agent', '/admin'];
// Routes that bypass i18n (auth-related)
const authRoutes = ['/login', '/pending', '/clients', '/agent', '/admin'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip i18n for auth routes — they don't need localization
  if (authRoutes.some((route) => pathname.startsWith(route))) {
    // For protected routes, check if user has a session cookie
    if (protectedRoutes.some((route) => pathname.startsWith(route))) {
      const sessionCookie =
        request.cookies.get('authjs.session-token') ||
        request.cookies.get('__Secure-authjs.session-token');

      if (!sessionCookie) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }

    return NextResponse.next();
  }

  // Check if pathname already has a locale prefix
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || '';
  let detectedLocale = defaultLocale;

  if (acceptLanguage.includes('zh')) {
    detectedLocale = 'zh-SG';
  } else if (acceptLanguage.includes('ms')) {
    detectedLocale = 'ms-MY';
  }

  // Redirect to locale-prefixed path
  const newUrl = new URL(`/${detectedLocale}${pathname}`, request.url);
  newUrl.search = request.nextUrl.search;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
