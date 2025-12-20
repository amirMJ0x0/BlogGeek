import { getAllTags } from "@/features/tags/api/tags.api";
import { useInfiniteQuery } from "@tanstack/react-query";
import { TAGS_PAGE_LIMIT } from "@/features/tags";

type TagsQueryProps = {
  search: string;
  limit: number;
  enabled?: boolean;
};

export function useTagsQuery({
  search = "",
  limit = TAGS_PAGE_LIMIT,
  enabled,
}: TagsQueryProps) {
  return useInfiniteQuery({
    queryKey: ["tags", search],
    queryFn: ({ pageParam = 1 }) => getAllTags(pageParam, limit, search),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const fetchedCount = lastPage?.tags.length!;

      if (fetchedCount < limit) return undefined;

      return allPage.length + 1;
    },
    ...(enabled !== undefined && { enabled }),
  });
}
