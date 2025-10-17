import api from "@/lib/api";
import { ApiResponse } from "@/types";

/**
 * @desc POST logout
 * @route POST https://bloggeek.ir/api/v1/auth/logout
 */
export const logout = async (): Promise<ApiResponse<null>> => {
  const res = await api.get("v1/auth/logout");
  return res.data;
};
