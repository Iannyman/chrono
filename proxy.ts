import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const publicRoutes = ["/login"];

// Returns true if token is valid, false if explicitly invalid, null on network error
async function validateToken(token: string): Promise<boolean | null> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      signal: controller.signal,
    });
    return res.ok;
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

export async function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (token) {
    const valid = await validateToken(token);

    // Backend explicitly rejected the token — clear cookies and redirect
    if (valid === false) {
      const res = NextResponse.redirect(new URL("/login", request.url));
      res.cookies.set("token", "", { path: "/", maxAge: 0 });
      res.cookies.set("user", "", { path: "/", maxAge: 0 });
      return res;
    }

    // null = network error — let the request through, don't log out on flaky connections
    if (pathname === "/login") {
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next();
  }

  if (!publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
