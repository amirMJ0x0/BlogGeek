import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedBlogs } from "../api/fetchSavedBlogs";
import { getLikedBlogs } from "../api/fetchLikedBlogs";
import { getAllBlogs } from "../api/fetchAllBlogs";
import { BLOG_PAGE_LIMIT } from "../blogTypes";

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
  });
};


export function useInfiniteSavedBlogs() {
  return useInfiniteQuery({
    queryKey: ["savedBlogs"],
    queryFn: ({ pageParam }) => getSavedBlogs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
}

export function useInfiniteLikedBlogs() {
  return useInfiniteQuery({
    queryKey: ["likedBlogs"],
    queryFn: ({ pageParam }) => getLikedBlogs(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.currentPage < lastPage.totalPages) {
        return lastPage.currentPage + 1;
      }
      return undefined;
    },
  });
}
