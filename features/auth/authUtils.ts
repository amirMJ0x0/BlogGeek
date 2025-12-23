"use server";

import { cookies } from "next/headers";

export const setSessionTokens = async ({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken?: string;
}) => {
  const cookieStore = await cookies();
  cookieStore.set("access-token", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 15 * 60 * 1000,
  });
  if (refreshToken)
    cookieStore.set("refresh-token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};

export const clearSessionTokens = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("access-token");
  cookieStore.delete("refresh-token");
};
