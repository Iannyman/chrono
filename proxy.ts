import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$|api).*)"],
};
