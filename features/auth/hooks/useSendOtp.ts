import { useMutation } from "@tanstack/react-query";
import { SendOtpReqBody, SendOtpResponseData, sendOTP } from "@/features/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export const useSendOtp = () => {
  return useMutation<
    ApiResponse<SendOtpResponseData>,
    AxiosError<ApiResponse>,
    SendOtpReqBody
  >({
    mutationFn: sendOTP,
  });
};
