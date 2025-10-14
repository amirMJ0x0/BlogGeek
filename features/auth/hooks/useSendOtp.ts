import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../api/send-otp";
import { SendOtpRequest, SendOtpResponseData } from "../types";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export const useSendOtp = () => {
  return useMutation<
    ApiResponse<SendOtpResponseData>,
    AxiosError<ApiResponse>,
    SendOtpRequest
  >({
    mutationFn: sendOTP,
  });
};
