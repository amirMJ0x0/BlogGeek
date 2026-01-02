import { useInfiniteQuery } from "@tanstack/react-query";
import { COMMENT_PAGE_LIMIT, getComments } from "@/features/comments";
import { getMyComments } from "../api/comments.server";

export function useCommentsQuery(blogId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", blogId],
    queryFn: ({ pageParam }) => getComments({ id: blogId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.comments.length!;

      if (fetchedCount < COMMENT_PAGE_LIMIT) return undefined;

      return allPages.length + 1;
    },
  });
}

export function useMyCommentsQuery() {
  return useInfiniteQuery({
    queryKey: ["my-comments"],
    queryFn: getMyComments,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.comments.length!;

      if (fetchedCount < COMMENT_PAGE_LIMIT) return undefined;

      return allPages.length + 1;
    },
    select(data) {
      return data?.pages.flatMap((page) => page?.comments) ?? [];
    },
  });
}
