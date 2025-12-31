import axios from "axios";
import { cookies } from "next/headers";

export const createServerApi = async (cookieHeader?: string) => {
  const cookieStore = await cookies();

  const cookieFromArg = cookieHeader ?? cookieStore.toString();
  return axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: cookieFromArg ? { Cookie: cookieFromArg } : {},
    withCredentials: true,
  });
};
