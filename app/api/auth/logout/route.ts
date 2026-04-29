import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set("token", "", { path: "/", maxAge: 0 });
  res.cookies.set("user", "", { path: "/", maxAge: 0 });
  return res;
}
