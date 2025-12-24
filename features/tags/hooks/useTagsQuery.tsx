import { getAllTags, getTagBlogs } from "@/features/tags/api/tags.api";
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
    select(data) {
      return data?.pages.flatMap((page) => page?.tags) ?? [];
    },
  });
}
type TagBlogsQueryProps = {
  slug: string;
  limit?: number;
};

export function useTagBlogsQuery({
  slug,
  limit = TAGS_PAGE_LIMIT,
}: TagBlogsQueryProps) {
  return useInfiniteQuery({
    queryKey: ["tags", slug],
    queryFn: ({ pageParam = 1 }) => getTagBlogs(pageParam, limit, slug),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPage) => {
      const fetchedCount = lastPage?.blogs.length!;

      if (fetchedCount < limit) return undefined;

      return allPage.length + 1;
    },
  });
}
