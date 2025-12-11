"use client";
import { User } from "@/features/auth/types";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { ApiResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { editUserInfo } from "../api/edit-userinfo";
import { EditUserInfoRequest } from "../userTypes";

export const useEditUserInfo = () => {
  const { showToast } = useCustomToast();
  return useMutation<
    ApiResponse<User>,
    AxiosError<ApiResponse>,
    EditUserInfoRequest
  >({
    mutationFn: editUserInfo,
    onError: (error) => {
      const message = error.response?.data?.message || "خطا در ویرایش اطلاعات";
      showToast(message, "error");
    },
  });
};
