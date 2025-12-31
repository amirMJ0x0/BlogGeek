import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSavedBlogs, getLikedBlogs } from "@/features/blogs";
import { getAllBlogs } from "../api/fetchAllBlogs";
import { BLOG_PAGE_LIMIT } from "../blogTypes";
import { getUserBlogs } from "../api/fetchUserBlogs";
import { useUserStore } from "@/features/user/store/useUserStore";
export const useInfiniteBlogsList = () => {
  return useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.blogs?.length!;

      if (fetchedCount < BLOG_PAGE_LIMIT) {
        return undefined;
      }

      return allPages.length + 1;
    },
    select(data) {
      return data.pages.flatMap((page) => page!.blogs) ?? [];
    },
  });
};

export const useInfiniteSavedBlogs = () => {
  return useInfiniteQuery({
    queryKey: ["savedBlogs"],
    queryFn: getSavedBlogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.blogs?.length!;

      if (fetchedCount < BLOG_PAGE_LIMIT) {
        return undefined;
      }

      return allPages.length + 1;
    },
    select(data) {
      return data?.pages.flatMap((page) => page?.blogs) ?? [];
    },
  });
};

export const useInfiniteLikedBlogs = () => {
  return useInfiniteQuery({
    queryKey: ["likedBlogs"],
    queryFn: getLikedBlogs,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.blogs?.length!;

      if (fetchedCount < BLOG_PAGE_LIMIT) {
        return undefined;
      }

      return allPages.length + 1;
    },
    select(data) {
      return data?.pages.flatMap((page) => page?.blogs) ?? [];
    },
  });
};

export const useMyBlogs = (username: string) => {
  return useQuery({
    queryKey: ["user-blogs", username],
    queryFn: () => getUserBlogs(username),
    // staleTime: 1000 * 60 * 2,
  });
};
