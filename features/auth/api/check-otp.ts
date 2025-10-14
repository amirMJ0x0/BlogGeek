import api from "@/lib/api";
import { CheckOtpRequest } from "../types";
import { ApiResponse } from "@/types";

/**
 * @desc POST check otp code
 * @route POST https://bloggeek.ir/api/v1/auth/check-otp
 */
export const checkOTP = async (
  data: CheckOtpRequest
): Promise<ApiResponse<null>> => {
  const res = await api.post("v1/auth/check-otp", data);
  return res.data;
};
