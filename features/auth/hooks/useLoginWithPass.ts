import { useMutation } from "@tanstack/react-query";
import { ApiResponse, LoginWithPassRequest } from "../types";
import { AxiosError } from "axios";
import { loginWithPass } from "../api/login-with-pass";

export const useLoginWithPass = () => {
  return useMutation<
    ApiResponse<null>,
    AxiosError<ApiResponse>,
    LoginWithPassRequest
  >({
    mutationFn: loginWithPass,
  });
};
