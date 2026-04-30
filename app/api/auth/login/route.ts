import { NextResponse } from "next/server";

const UPSTREAM_TIMEOUT = 10_000;

export async function POST(request: Request) {
  let username: string, password: string;
  try {
    const body = await request.json();
    username = body.username;
    password = body.password;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!username || !password) {
    return NextResponse.json({ error: "Username and password are required" }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT);

  let response: Response;
  try {
    response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      signal: controller.signal,
    });
  } catch {
    return NextResponse.json({ error: "Authentication service unavailable" }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    return NextResponse.json(
      { status: response.status },
      { status: response.status }
    );
  }

  const data = await response.json();

  let maxAge = 3600;
  if (data.expiresAt) {
    const diff = Math.floor((new Date(data.expiresAt).getTime() - Date.now()) / 1000);
    if (diff > 0) maxAge = diff;
  } else if (data.expiresIn) {
    const parsed = Number(data.expiresIn);
    if (Number.isFinite(parsed) && parsed > 0) maxAge = parsed;
  }

  const res = NextResponse.json({ user: data.user });

  res.cookies.set("token", data.token, {
    path: "/",
    maxAge: maxAge,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookies.set("user", encodeURIComponent(JSON.stringify(data.user)), {
    path: "/",
    maxAge: maxAge,
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
