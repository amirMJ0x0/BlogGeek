"use server";
import { createServerApi } from "@/lib/server/createServerApi";
import { ApiResponse } from "@/types";

export const logout = async (): Promise<ApiResponse<null>> => {
  const api = await createServerApi();
  const { data: response } = await api.get("v1/auth/logout");
  return response;
};
