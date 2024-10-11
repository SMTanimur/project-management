import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const url = request.nextUrl.clone();

  // const publicRoutes = ["/auth/login", "/auth/signup"];
  // const sessionToken = cookies.has('orga_sid');
  
  // console.log("Request Path:", url.pathname);
  // console.log("Session Token Present:", sessionToken);

  // if (!sessionToken && !publicRoutes.includes(url.pathname)) {
  //   // If there's no auth cookie and the user is not on a public route, redirect to login
  //   url.pathname = "/auth/login";
  //   return NextResponse.redirect(url);
  // } else if (sessionToken && url.pathname === "/auth/login") {
  //   // If there is an auth cookie and the user is on the login page, redirect to home
  //   url.pathname = "/";
  //   return NextResponse.redirect(url);
  // }
  
  // Otherwise, allow the request to continue
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|logo-dark.svg|logo-light.svg|seo_image.png|images|assets|icons).*)",
  ],
};