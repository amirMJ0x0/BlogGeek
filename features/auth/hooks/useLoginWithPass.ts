import { useMutation } from "@tanstack/react-query";
import { LoginWithPassReqBody, loginWithPass } from "@/features/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export const useLoginWithPass = () => {
  return useMutation<
    ApiResponse<{ accessToken?: string; refreshToken?: string }>,
    AxiosError<ApiResponse>,
    LoginWithPassReqBody
  >({
    mutationFn: loginWithPass,
  });
};
