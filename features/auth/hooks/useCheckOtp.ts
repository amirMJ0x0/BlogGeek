import { useMutation } from "@tanstack/react-query";
import { setSessionTokens } from "../server/authCookies.server";
import { CheckOtpReqBody, checkOTP } from "@/features/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export const useCheckOtp = () => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse>,
    CheckOtpReqBody
  >({
    mutationFn: checkOTP,
    onSuccess: (res: any) => {
      const { accessToken, refreshToken } = res?.data;
      setSessionTokens({ accessToken, refreshToken });
    },
  });
};
