// features/blogs/hooks/useLike.ts
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { likePost } from "@/features/blogs";
import { Blog } from "../blogTypes";
import api from "@/lib/client/api";

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

    onSuccess: (_, { id, likeAction }) => {
      const isLiking = likeAction === "like";

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
                  liked: isLiking,
                  _count: {
                    ...post._count,
                    likes: isLiking
                      ? post._count.likes + 1
                      : Math.max(0, post._count.likes - 1),
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
          liked: isLiking,
          _count: {
            ...old._count,
            likes: isLiking
              ? old._count.likes + 1
              : Math.max(0, old._count.likes - 1),
          },
        };
      });
    },
    onError: (err: any) => {
      if (err.message === "UNAUTHORIZED") {
        showToast("لطفاً دوباره وارد شوید", "error");
      }
    },
    // onError: (error) => {
    //   const err = error as AxiosError<any>;
    //   if (err.response?.status === 401) {
    //     showToast(err.response?.data.message, "error");
    //   }
    // },
  });
};
