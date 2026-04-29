import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { username, password } = await request.json();

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    return NextResponse.json(
      { status: response.status },
      { status: response.status }
    );
  }

  const data = await response.json();

  const res = NextResponse.json({ user: data.user });

  res.cookies.set("token", data.token, {
    path: "/",
    maxAge: Number(data.expiresIn),
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.cookies.set("user", encodeURIComponent(JSON.stringify(data.user)), {
    path: "/",
    maxAge: Number(data.expiresIn),
    sameSite: "lax",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  return res;
}
