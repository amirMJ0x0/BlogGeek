"use client";
import { useQuery } from "@tanstack/react-query";
import { getBlogById } from "../api/getBlogById";

export const useBlogDetail = (id: number) => {
  return useQuery({
    queryKey: ["blog", id],
    queryFn: () => getBlogById(id),
    enabled: !!id,
    // staleTime: 1000 * 60 * 5,
  });
};
