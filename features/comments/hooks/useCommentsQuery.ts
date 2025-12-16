import { useInfiniteQuery } from "@tanstack/react-query";
import { Comment_PAGE_LIMIT, getComments } from "@/features/comments";

export function useCommentsQuery(blogId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", blogId],
    queryFn: ({ pageParam }) => getComments({ id: blogId, pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const fetchedCount = lastPage?.comments.length!;

      if (fetchedCount < Comment_PAGE_LIMIT) return undefined;

      return allPages.length + 1;
    },
  });
}
