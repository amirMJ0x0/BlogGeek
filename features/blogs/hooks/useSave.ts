import { savePost } from "@/features/blogs";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Blog } from "../blogTypes";

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
  const { showToast } = useCustomToast();

  return useMutation({
    mutationFn: ({ id, saveAction }: SaveData) => savePost({ id, saveAction }),

    onSuccess: (_, { id, saveAction }) => {
      const isSaving = saveAction === "save";

      /* =================== BLOG LIST =================== */
      queryClient.setQueryData(
        ["blogs"],
        (oldData: InfiniteBlogData | undefined) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              blogs: page.blogs.map((post) => {
                if (post.id !== id) return post;

                return {
                  ...post,
                  saved: isSaving,
                  _count: {
                    ...post._count,
                    saved_blogs: isSaving
                      ? post._count.saved_blogs + 1
                      : Math.max(0, post._count.saved_blogs - 1),
                  },
                };
              }),
            })),
          };
        }
      );

      /* =================== BLOG DETAIL =================== */
      queryClient.setQueryData(["blog-detail", id], (old: Blog | undefined) => {
        if (!old) return old;

        return {
          ...old,
          saved: isSaving,
          _count: {
            ...old._count,
            saved_blogs: isSaving
              ? old._count.saved_blogs + 1
              : Math.max(0, old._count.saved_blogs - 1),
          },
        };
      });
    },
    onError: (err: any) => {
      if (err.message === "UNAUTHORIZED") {
        showToast("لطفاً دوباره وارد شوید", "error");
      }
    },
  });
};
