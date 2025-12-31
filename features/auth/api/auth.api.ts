import api from "@/lib/client/api";
import {
  CheckOtpReqBody,
  LoginResponseData,
  LoginWithPassReqBody,
  SendOtpReqBody,
  SendOtpResponseData,
} from "@/features/auth";
import { ApiResponse } from "@/types";

export const checkOTP = async (
  data: CheckOtpReqBody
): Promise<ApiResponse<LoginResponseData>> => {
  const { data: response } = await api.post("v1/auth/check-otp", data);
  return response;
};

export const sendOTP = async (
  data: SendOtpReqBody
): Promise<ApiResponse<SendOtpResponseData>> => {
  const { data: response } = await api.post("v1/auth/send-otp", data);
  return response;
};

export const loginWithPass = async (
  data: LoginWithPassReqBody
): Promise<ApiResponse<LoginResponseData>> => {
  const { data: response } = await api.post(
    "v1/auth/login-with-password",
    data
  );
  return response;
};

export const logout = async (): Promise<ApiResponse<null>> => {
  const { data: response } = await api.get("v1/auth/logout");
  return response;
};
