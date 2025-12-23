"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { debounce } from "@/lib/utils";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { getAllTags } from "../api/tags.api";
import { TagItemType, TagsResponse } from "@/features/tags";
import TagItem from "./tag-item";

export default function TagsListClient({
  initialData,
  searchQuery: serverSearchQuery,
}: {
  initialData: TagsResponse;
  searchQuery: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const [inputValue, setInputValue] = useState(serverSearchQuery || "");

  const [debouncedQuery, setDebouncedQuery] = useState(serverSearchQuery || "");

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);

        const params = new URLSearchParams();
        if (value) params.set("q", value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 500),
    [pathname, router]
  );

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isPending } =
    useInfiniteQuery({
      queryKey: ["tags", debouncedQuery],
      queryFn: async ({ pageParam = 1 }) =>
        await getAllTags(pageParam, 12, debouncedQuery),
      initialPageParam: 1,
      initialData:
        debouncedQuery === serverSearchQuery
          ? {
              pages: [initialData],
              pageParams: [1],
            }
          : undefined,

      getNextPageParam: (lastPage, allPages) => {
        const currentPage = allPages.length;
        return currentPage < lastPage!.totalPage ? currentPage + 1 : undefined;
      },
      staleTime: 1000 * 60 * 5,
    });

  const tags = data?.pages.flatMap((page) => page!.tags) ?? [];

  return (
    <div className="mt-5">
      <Input
        type="text"
        value={inputValue}
        onChange={(e) => {
          const val = e.target.value;
          setInputValue(val);
          debouncedUpdate(val);
        }}
        placeholder="جستجوی تگ..."
        className="w-2/3 p-2 border rounded-md"
      />

      {isPending ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 ">
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
          <Skeleton className="w-full h-[82px]" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {tags.map((tag: TagItemType) => {
            return <TagItem tag={tag} key={tag.id} />;
          })}
        </div>
      )}

      {hasNextPage && (
        <Button
          variant={"ghost"}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
          className="mt-8 px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {isFetchingNextPage ? "در حال بارگذاری..." : "مشاهده بیشتر..."}
        </Button>
      )}

      {!isFetchingNextPage && !isPending && tags.length === 0 && (
        <div className="text-center mt-10 text-gray-500">موردی پیدا نشد.</div>
      )}
    </div>
  );
}
