import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getSavedBlogs } from "../api/fetchSavedBlogs";
import { getLikedBlogs } from "../api/fetchLikedBlogs";
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
  });
};

export const useMyBlogs = () => {
  const { isAuthenticated } = useUserStore();
  return useQuery({
    queryKey: ["blogs", "me"],
    queryFn: getUserBlogs,
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 2,
    retry: (failureCount, error: any) => {
      if (error?.response?.status === 401) return false;
      return failureCount < 2;
    },
  });
};
