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
  '/admin',
  '/workflows',
  '/actions',
];

export function middleware(req: NextRequest) {
  const authToken = req.cookies.get('Authentication')
  const { pathname } = req.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  // Check if the path requires authentication
  const isProtectedPath = protectedPaths.some(path =>
    pathname.startsWith(path)
  );

  // If user is authenticated and tries to access auth pages, redirect to home
  if (authToken && isPublicPath) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If user is not authenticated and tries to access protected routes
  if (!authToken && isProtectedPath) {
    const loginUrl = new URL('/auth/login', req.url);
    // Add the original URL as a callback parameter
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // For API routes, check authentication
  if (pathname.startsWith('/api') && !authToken) {
    return new NextResponse(
      JSON.stringify({ message: 'Authentication required' }),
      {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  return NextResponse.next();
}

// Configure the paths where middleware should run
export const config = {
  matcher: [
    // Protected Routes
    '/organizations/:path*',
    '/messages/:path*',
    '/profile/:path*',
    '/settings/:path*',
    '/admin/:path*',
    '/workflows/:path*',
    '/actions/:path*',
    // Auth Routes
    '/auth/:path*',
    // API Routes
    '/api/:path*',
    // Add more routes as needed
  ],
};
