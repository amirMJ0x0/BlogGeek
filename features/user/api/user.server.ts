"use server";

import {
  CheckOtpReqBody,
  SendOtpResponseData,
  User,
} from "@/features/auth/types";
import { createServerApi } from "@/lib/server/createServerApi";
import { ApiResponse } from "@/types";
import { EditUserInfoRequest } from "../userTypes";

/* ===================== ME ===================== */
export const fetchUserInfo = async (): Promise<User | null> => {
  try {
    const api = await createServerApi();
    const { data } = await api.get<ApiResponse<User>>("v1/user/me");
    return data.data;
  } catch (e: any) {
    if (e.response?.status === 401) return null;
    throw e;
  }
};

/* ===================== EMAIL OTP ===================== */
export const sendEmailOtp = async (data: {
  credential: string;
}): Promise<ApiResponse<SendOtpResponseData>> => {
  const api = await createServerApi();
  const { data: res } = await api.post("v1/user/update/email/send-otp", data);
  return res;
};

export const checkEmailOtp = async (
  data: CheckOtpReqBody
): Promise<ApiResponse<null>> => {
  const api = await createServerApi();
  const { data: res } = await api.post("v1/user/update/email/check-otp", data);
  return res;
};

/* ===================== PHONE OTP ===================== */
export const sendPhoneOtp = async (data: {
  credential: string;
}): Promise<ApiResponse<SendOtpResponseData>> => {
  const api = await createServerApi();
  const { data: res } = await api.post("v1/user/update/phone/send-otp", data);
  return res;
};

export const checkPhoneOtp = async (
  data: CheckOtpReqBody
): Promise<ApiResponse<null>> => {
  const api = await createServerApi();
  const { data: res } = await api.post("v1/user/update/phone/check-otp", data);
  return res;
};

/* ===================== PROFILE ===================== */
export const changeUsername = async (data: {
  username: string;
}): Promise<ApiResponse<User>> => {
  const api = await createServerApi();
  const { data: res } = await api.patch("v1/user/update/information", data);
  return res;
};

export const editUserInfo = async (
  data: EditUserInfoRequest
): Promise<ApiResponse<User>> => {
  const api = await createServerApi();
  const { data: res } = await api.patch("v1/user/update/information", data);
  return res;
};

/* ===================== FOLLOW ===================== */
export const followUser = async ({
  id,
  followAction,
}: {
  id: number;
  followAction: "follow" | "unfollow";
}): Promise<ApiResponse<null>> => {
  const api = await createServerApi();
  const { data } = await api.post(`v1/user/${id}/${followAction}`);
  return data;
};

/* ===================== PASSWORD ===================== */
export type ResPasswordError = {
  password: {
    message: string;
    source: string;
  };
};

export const updatePassword = async ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}): Promise<ApiResponse<ResPasswordError>> => {
  const api = await createServerApi();
  const { data } = await api.post("v1/user/update/password", {
    password,
    confirmPassword,
  });
  return data;
};

/* ===================== USERNAME CHECK ===================== */
export const checkUsernameExist = async (
  username: string
): Promise<ApiResponse<null>> => {
  const api = await createServerApi();
  try {
    const { data } = await api.get(`v1/user/${username}/check-username-exist`);
    return data;
  } catch (error: any) {
    if (error.response) return error.response.data;
    throw error;
  }
};
