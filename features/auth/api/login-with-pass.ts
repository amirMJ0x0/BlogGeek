import api from "@/lib/api";
import { LoginWithPassRequest } from "../types";
import { ApiResponse } from "@/types";

/**
 * @desc POST login with
 * @route POST https://bloggeek.ir/api/v1/auth/login-with-password
 */
export const loginWithPass = async (
  data: LoginWithPassRequest
): Promise<ApiResponse<{ accessToken?: string; refreshToken?: string }>> => {
  const { data: response } = await api.post(
    "v1/auth/login-with-password",
    data
  );
  return response;
};
