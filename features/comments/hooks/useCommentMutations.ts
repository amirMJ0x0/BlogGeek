"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment, deleteComment } from "@/features/comments";

export function useCreateComment(blogId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      parentId,
    }: {
      content: string;
      parentId?: number | null;
    }) => createComment({ blogId, content, parentId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["comments", blogId] });
    },
  });
}

export function useDeleteComment(blogId: number) {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteComment(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["comments", blogId] }),
  });
}
