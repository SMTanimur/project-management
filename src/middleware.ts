import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { useGlobalLocalStateStore } from "./store";

export function middleware(request: NextRequest) {
  const { cookies } = request;
  const url = request.nextUrl.clone();

  const publicRoutes = ["/auth/login", "/auth/signup"];
  const sessionToken = cookies.has('orga_sid');
  
  if (!sessionToken && !publicRoutes.includes(url.pathname)) {
    // If there's no auth cookie and the user is not on a public route, redirect to login
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  } else if (sessionToken && url.pathname === "/auth/login") {
    // If there is an auth cookie and the user is on the login page, redirect to home
    url.pathname = `/`;
    return NextResponse.redirect(url);
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/:path*",
    "/auth/:path*",
  
  ],
};