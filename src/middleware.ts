// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Add paths that should be accessible without authentication
const publicPaths = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Add paths that require authentication
const protectedPaths = [
  '/organizations',
  '/messages',
  '/profile',
  '/settings',
  '/dashboard',
  '/admin',
  '/workflows',
  '/actions',
];

// Cache the URL objects for better performance
const HOME_URL = '/';

function isPublicPath(pathname: string): boolean {
  return publicPaths.some(path => pathname.startsWith(path));
}

function isProtectedPath(pathname: string): boolean {
  return protectedPaths.some(path => pathname.startsWith(path));
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Get the Authentication cookie from the request - add more detailed logging
  const authToken = req.cookies.get('Authentication');

  // Log all cookies for debugging
  console.log('All cookies:', req.cookies.getAll());
  console.log('Auth cookie details:', {
    name: authToken?.name,
    value: authToken?.value,
  });
  

  const isAuthenticated = !!authToken?.value;

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.startsWith('/api/public') ||
    pathname.includes('favicon.ico')
  ) {
    return NextResponse.next();
  }

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthenticated && pathname === '/') {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthenticated && isPublicPath(pathname)) {
    const response = NextResponse.redirect(new URL(HOME_URL, req.url));
    return response;
  }

  // If user is not authenticated and tries to access protected routes
  if (!isAuthenticated && isProtectedPath(pathname)) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    const response = NextResponse.redirect(loginUrl);
    return response;
  }

  const response = NextResponse.next();

  return response;
}

// Configure the paths where middleware should run
export const config = {
  matcher: [
    // Protected Routes
    '/organizations/:path*',
    '/messages/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/dashboard/:path*',
    '/admin/:path*',
    '/workflows/:path*',
    '/actions/:path*',
    // Auth Routes
    '/auth/:path*',
    // API Routes
    '/api/:path*',
    // Exclude static files and public API routes
    '/((?!_next/static|favicon.ico|api/public).*)',
  ],
};
