import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore.toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/auth/refresh-token`,
    {
      method: "GET",
      headers: { Cookie: cookieHeader },
    }
  );

  const data = await res.json();
  const nextRes = NextResponse.json(data);
  return nextRes;
}
