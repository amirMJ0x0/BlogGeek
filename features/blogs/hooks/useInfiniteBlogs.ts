import { useInfiniteQuery } from "@tanstack/react-query";
import { getSavedBlogs } from "../api/fetchSavedBlogs";
import { getLikedBlogs } from "../api/fetchLikedBlogs";

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
