import { useMutation } from "@tanstack/react-query";
import { checkOTP } from "../api/check-otp";
import { CheckOtpRequest, ApiResponse } from "../types";

export const useCheckOtp = () => {
  return useMutation<ApiResponse<null>, Error, CheckOtpRequest>({
    mutationFn: checkOTP,
  });
};
