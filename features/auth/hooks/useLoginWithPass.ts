import { useMutation } from "@tanstack/react-query";
import {
  LoginResponseData,
  LoginWithPassReqBody,
  loginWithPass,
} from "@/features/auth";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";

export const useLoginWithPass = () => {
  return useMutation<
    ApiResponse<LoginResponseData>,
    AxiosError<ApiResponse>,
    LoginWithPassReqBody
  >({
    mutationFn: loginWithPass,
  });
};
