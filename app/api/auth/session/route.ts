import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { accessToken, refreshToken } = await req.json();

  const res = NextResponse.json({ ok: true });
  const isProd = process.env.NODE_ENV === "production";

  if (accessToken) {
    res.cookies.set("access-token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 15 * 60, //seconds
    });
  }
  if (refreshToken) {
    res.cookies.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  return res;
}
