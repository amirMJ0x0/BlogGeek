import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../api/send-otp";
import { SendOtpRequest, ApiResponse, SendOtpResponseData } from "../types";
import { AxiosError } from "axios";

export const useSendOtp = () => {
  return useMutation<
    ApiResponse<SendOtpResponseData>,
    AxiosError<ApiResponse>,
    SendOtpRequest
  >({
    mutationFn: sendOTP,
  });
};
