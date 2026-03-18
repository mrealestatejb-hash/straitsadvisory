import { NextRequest, NextResponse } from 'next/server';

// Routes that require authentication (checked via session cookie)
const protectedRoutes = ['/clients', '/agent', '/admin'];
// Auth-related routes (no special handling needed beyond protection)
const authRoutes = ['/login', '/pending', '/clients', '/agent', '/admin'];

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Block old Next.js i18n routes — redirect to homepage
  if (pathname.startsWith('/en-SG') || pathname.startsWith('/zh-SG') || pathname.startsWith('/ms-MY')) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Static old site pages — serve from public/
  const staticPages = ['/', '/buy', '/sell', '/rent', '/services', '/why-work-with-us'];
  if (staticPages.includes(pathname) || pathname.startsWith('/properties/')) {
    const target = pathname === '/' ? '/index.html' : `${pathname}.html`;
    return NextResponse.rewrite(new URL(target, request.url));
  }

  // Auth routes
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

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|studio|.*\\..*).*)'],
};
