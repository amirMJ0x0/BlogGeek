"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment } from "@/features/comments";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { AxiosError } from "axios";

export function useCreateComment(blogId: number) {
  const qc = useQueryClient();
  const { showToast } = useCustomToast();
  return useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: number | null;
    }) => createComment({ blogId, content, parentId }),
    onSuccess: (res) => {
      console.log(res)
      showToast(res?.message || "کامنت شما با موفقیت ثبت شد", "success");
      qc.invalidateQueries({ queryKey: ["comments", blogId] });
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      const errorData = err.response?.data;
      showToast(errorData.message || "خطایی رخ داده است", "error");
    },
  });
}

export function useDeleteComment(blogId: number) {
  const qc = useQueryClient();
  const { showToast } = useCustomToast();

  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: (res) => {
      showToast(res?.message, "success");
      qc.invalidateQueries({ queryKey: ["comments", blogId] });
    },
    onError: (error: any) => {
      const err = error as AxiosError<any>;
      const errorData = err.response?.data;
      showToast(errorData.message || "خطایی رخ داده است", "error");
    },
  });
}
