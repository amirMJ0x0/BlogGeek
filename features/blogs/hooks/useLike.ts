import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { likePost } from "../api/likePost";
import { Blog } from "../blogTypes";
import { revalidateBlogDetail } from "../blogUtils";

type LikeData = {
  id: number;
  likeAction: "like" | "unlike";
};

type InfiniteBlogData = {
  pages: {
    blogs: Blog[];
    totalPage: number;
    totalCount: number;
  }[];
  pageParams: (number | undefined)[];
};

export const useLike = () => {
  const queryClient = useQueryClient();
  const { showToast } = useCustomToast();
  return useMutation({
    mutationFn: ({ id, likeAction }: LikeData) => likePost({ id, likeAction }),
    onSuccess: (res, { id, likeAction }) => {
      queryClient.setQueryData(
        ["blogs"],
        (oldData: InfiniteBlogData | undefined) => {
          if (!oldData) return oldData;

          const updatedPages = oldData.pages.map((page) => {
            const updatedBlogs = page.blogs.map((post: Blog) => {
              if (post.id === id) {
                const isLiking = likeAction === "like";
                const newCount = isLiking
                  ? post._count.likes + 1
                  : post._count.likes - 1;

                return {
                  ...post,
                  liked: isLiking,
                  _count: {
                    ...post._count,
                    likes: newCount < 0 ? 0 : newCount,
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
