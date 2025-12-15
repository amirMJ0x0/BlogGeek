// src/hooks/useSearchBlogs.ts
import { useQuery } from "@tanstack/react-query";
import { SearchItem } from "../types/search";
import { searchAPI } from "../api/searchBlogs";
import { debounce } from "@/lib/utils";

export function useSearchBlogs(query: string) {

  return useQuery({
    queryKey: ["search", query],
    queryFn: () => searchAPI(query),
    enabled: !!query.trim(),
    staleTime: 5 * 60 * 1000,

    select: (data): SearchItem[] => {
      if (!data.data?.searchList || data.data.searchList.length === 0) {
        return [];
      }

      const entry = data.data.searchList[0];

      const allResults: SearchItem[] = [
        ...entry.blogs,
        ...entry.users,
        ...entry.tags,
      ];

      return allResults;
    },
  });
}
