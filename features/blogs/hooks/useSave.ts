import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Blog } from "../blogTypes";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { revalidateBlogDetail } from "../blogUtils";
import { savePost } from "../api/savePost";

type SaveData = {
  id: number;
  saveAction: "save" | "unsave";
};

type InfiniteBlogData = {
  pages: {
    blogs: Blog[];
    totalPage: number;
    totalCount: number;
  }[];
  pageParams: (number | undefined)[];
};

export const useSave = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { showToast } = useCustomToast();
  return useMutation({
    mutationFn: ({ id, saveAction }: SaveData) => savePost({ id, saveAction }),
    onSuccess: (res, { id, saveAction }) => {
      queryClient.setQueryData(
        ["blogs"],
        (oldData: InfiniteBlogData | undefined) => {
          // console.log(oldData);
          if (!oldData) return oldData;

          const updatedPages = oldData.pages.map((page) => {
            const updatedBlogs = page.blogs.map((post: Blog) => {
              if (post.id === id) {
                const isSaving = saveAction === "save";
                const newCount = isSaving
                  ? post._count.saved_blogs + 1
                  : post._count.saved_blogs - 1;

                return {
                  ...post,
                  saved: isSaving,
                  _count: {
                    ...post._count,
                    saved_blogs: newCount < 0 ? 0 : newCount,
                  },
                };
              }
              return post;
            });
            return { ...page, blogs: updatedBlogs };
          });

          return { ...oldData, pages: updatedPages };
        }
      );
      // router.refresh();
      revalidateBlogDetail(id);
    },
    onError: (error) => {
      const err = error as AxiosError<any>;
      const status = err.response?.status;

      if (status === 401) {
        showToast(err.response?.data.message, "error");
      }
    },
  });
};
