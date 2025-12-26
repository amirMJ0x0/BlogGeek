import { CheckOtpReqBody, LoginResponseData, checkOTP } from "@/features/auth";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";

export const useCheckOtp = () => {
  return useMutation<
    ApiResponse<LoginResponseData>,
    AxiosError<ApiResponse>,
    CheckOtpReqBody
  >({
    mutationFn: checkOTP,
  });
};
