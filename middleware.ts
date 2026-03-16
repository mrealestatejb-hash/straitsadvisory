import { NextRequest, NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './lib/i18n';

const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localeDetection: true,
});

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

  // All other routes go through i18n middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
