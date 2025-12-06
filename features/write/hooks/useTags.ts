import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getTags } from "../api/getTags";
import { TAGS_LIMIT } from "../types";

export const useTags = (search: string = "") => {
  // write useQuery to fetch tags (no need to infinite scroll)
  return useQuery({
    queryKey: ["tags", search],
    queryFn: () => getTags(1, TAGS_LIMIT, search),
  });
};
