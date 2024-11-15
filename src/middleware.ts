// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('orga_sid')?.value;

  // If the session token is not present and the user is not on the login page, redirect to the login page
  if (!sessionToken && req.nextUrl.pathname !== '/auth/login') {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }

  // If the session token is present and the user is on the login page, redirect to the home page
  if (sessionToken && req.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // If the session token is present or the user is on the login page, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: ['/messages/:path*', '/organizations/:path*', '/auth/:path*'], // Apply middleware to all routes under /protected
};