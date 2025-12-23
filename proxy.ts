import { NextRequest, NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access-token")?.value ?? "";
  const { pathname } = req.nextUrl;

  const isNewPost = pathname === "/new-post" || pathname === "/new-post/";
  const isEditPost = pathname.startsWith("/edit-post/");
  const isProfileSettings = /^\/@[^\/]+\/settings$/.test(pathname);
  const isProtected = isNewPost || isEditPost || isProfileSettings;

  if (isProtected && !accessToken) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  // Apply proxy to all routes except static assets and API routes
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
