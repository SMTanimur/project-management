// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get('orga_sid');

  if (!sessionToken) {
    // If the session token is not present, redirect to the login page
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  console.log({pathName: req.nextUrl.pathname, sessionToken})

  if(sessionToken && req.nextUrl.pathname === '/auth/login') {
    return NextResponse.redirect(new URL('/', req.url))
  }

  // If the session token is present, continue with the request
  return NextResponse.next();
}

// Specify the paths where the middleware should be applied
export const config = {
  matcher: ['/messages/:path*','/organizations/:path*'], // Apply middleware to all routes under /protected
};