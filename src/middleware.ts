import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {


  const sessionToken = req.cookies.has('orga_sid');

  // console.log("USER TOKEN", userToken)

  const host = req.nextUrl.protocol + req.headers.get('host');

  // user login control
  if (sessionToken && req.nextUrl.pathname === '/login') {
    return NextResponse.redirect(new URL(`${host}/`));
  }

  if (!sessionToken && req.nextUrl.pathname.includes('/user')) {
    return NextResponse.redirect(new URL(`${host}/login`));
  }
  // Add a closing bracket here
  if (!sessionToken && req.nextUrl.pathname.includes('/notifications')) {
    return NextResponse.redirect(new URL(`${host}/login`));
  }
}

export const config = {
  matcher: ['/user/:path*', '/login/:path*', '/notifications/:path*'], // Add "/profile" path here
};
