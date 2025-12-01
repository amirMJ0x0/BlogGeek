"use client";
import EmptyComponent from "@/components/empty-component";
import { useCallback, useRef } from "react";
import { Blog } from "../blogTypes";
import { useInfiniteBlogsList } from "../hooks/useInfiniteBlogs";
import PostCard from "./post-card";
import { PostCardSkeleton } from "./post-card-skeleton";

const BlogList = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteBlogsList();

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
    <section className="flex flex-col gap-2 p-2" ref={scrollContainerRef}>
      {isEmpty ? (
        <EmptyComponent />
      ) : (
        <div className="divide-y">
          {blogs.map((blog, blogIndex) => {
            const isLastItem = blogIndex === blogs.length - 1;
            return (
              <div
                key={`${blog?.id}-${blogIndex}`}
                ref={isLastItem ? lastBlogCardRef : null}
              >
                <PostCard item={blog as Blog} />
              </div>
            );
          })}
        </div>
      )}

      {isFetchingNextPage ||
        (isLoading && (
          <div className="flex flex-col gap-2">
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ))}
    </section>
  );
};

export default BlogList;
