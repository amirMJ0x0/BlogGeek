import api from "@/lib/api";
import { SendOtpRequest, SendOtpResponseData } from "../types";
import { ApiResponse } from "@/types";

/**
 * @desc POST send/resend otp code
 * @route POST https://bloggeek.ir/api/v1/auth/send-otp
 */
export const sendOTP = async (
  data: SendOtpRequest
): Promise<ApiResponse<SendOtpResponseData>> => {
  const res = await api.post("v1/auth/send-otp", data);
  return res.data;
};
