"use client";

import EmptyComponent from "@/components/empty-component";
import { Button } from "@/components/ui/button";
import PostCard from "@/features/blogs/components/post-card";
import { PostCardSkeleton } from "@/features/blogs/components/post-card-skeleton";
import { useTagBlogsQuery } from "@/features/tags";
import { numberToPersian } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useCallback, useRef } from "react";

const TagBlogsClient = ({ slug }: { slug: string }) => {
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useTagBlogsQuery({ slug });

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Observer Logic
  const observer = useRef<IntersectionObserver | null>(null);

  const lastBlogCardRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        {
          threshold: 0.2,
        }
      );

      if (node) observer.current.observe(node);
    },
    [isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const blogs = data?.pages.flatMap((page) => page?.blogs) ?? [];
  const isEmpty = !isLoading && blogs?.length === 0;

  return (
    <section
      className="flex flex-col gap-2 p-2 min-h-screen"
      ref={scrollContainerRef}
    >
      {isEmpty ? (
        <EmptyComponent message="بلاگی با این تگ وجود ندارد!" />
      ) : (
        <div>
          <h2 className="text-lg font-semibold">
            بلاگ های با تگ{" "}
            <span className="font-extrabold">"{data?.pages[0]?.title}"</span> (
            {numberToPersian(data?.pages[0]?.totalCount!)})
          </h2>
          <div className="divide-y">
            {blogs.map((blog, blogIndex) => {
              const isLastItem = blogIndex === blogs.length - 1;
              return (
                <div
                  key={`${blog?.id}-${blogIndex}`}
                  ref={isLastItem ? lastBlogCardRef : null}
                >
                  <PostCard item={blog as any} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {isFetchingNextPage ||
        (isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ))}
    </section>
  );
};

export default TagBlogsClient;
