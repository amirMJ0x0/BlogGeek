"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiResponse } from "@/types";
import { editUserInfo } from "../api/edit-userinfo";
import { User } from "@/features/auth/types";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";

export const useEditUserInfo = () => {
  const queryClient = useQueryClient();
  const { showToast } = useCustomToast();
  return useMutation<
    ApiResponse<User>,
    AxiosError<ApiResponse>,
    EditUserInfoRequest
  >({
    mutationFn: editUserInfo,
    // onSuccess: (data) => {
    //   if (data.statusCode === 200) {
    //     queryClient.invalidateQueries({ queryKey: ["userInfo"] });
    //   }
    // },
    onError: (error) => {
      const message = error.response?.data?.message || "خطا در ویرایش اطلاعات";
      showToast(message, "error");
    },
  });
};
