import { useMutation } from "@tanstack/react-query";
import { checkOTP } from "../api/check-otp";
import { CheckOtpRequest } from "../types";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export const useCheckOtp = () => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse>,
    CheckOtpRequest
  >({
    mutationFn: checkOTP,
  });
};
