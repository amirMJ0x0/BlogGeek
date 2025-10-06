import { useMutation } from "@tanstack/react-query";
import { checkOTP } from "../api/check-otp";
import { CheckOtpRequest, ApiResponse } from "../types";
import { AxiosError } from "axios";

export const useCheckOtp = () => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse>,
    CheckOtpRequest
  >({
    mutationFn: checkOTP,
  });
};
