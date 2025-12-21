import { useMutation } from "@tanstack/react-query";
import { LoginWithPassRequest } from "../types";
import { AxiosError } from "axios";
import { loginWithPass } from "../api/login-with-pass";
import { ApiResponse } from "@/types";

export const useLoginWithPass = () => {
  return useMutation<
    ApiResponse<{ accessToken?: string; refreshToken?: string }>,
    AxiosError<ApiResponse>,
    LoginWithPassRequest
  >({
    mutationFn: loginWithPass,
  });
};
