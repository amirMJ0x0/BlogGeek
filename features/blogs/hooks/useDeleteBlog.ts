import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { deleteBlogById } from "@/features/blogs";

export const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  const { showToast } = useCustomToast();
  return useMutation({
    mutationFn: (blogId: number) => deleteBlogById(blogId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["blogs", "me"] });
      showToast(res.message, "success");
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      const status = err.response?.status;

      if (err) {
        showToast(err.response?.data.message, "error");
      }
    },
  });
};
