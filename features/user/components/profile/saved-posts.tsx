"use client";
import PostCard from "@/features/blogs/components/post-card";
import { PostCardSkeleton } from "@/features/blogs/components/post-card-skeleton";
import { useInfiniteSavedBlogs } from "@/features/blogs/hooks/useInfiniteBlogs";
import {
  CircleOff,
  FolderOpen,
  Image,
  Newspaper,
  PackageOpen,
} from "lucide-react";
import { useEffect, useRef } from "react";

const SavedPostsSection = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteSavedBlogs();

  const loadMoreRef = useRef(null);

  useEffect(() => {
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 0.2,
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }
    return () => observer.disconnect();
  }, [hasNextPage]);

  if (data?.pages.length! > 0 && !isLoading)
    return (
      <div className="flex flex-col justify-center h-48 items-center p-6 gap-2 text-center text-gray-500">
        <FolderOpen className="size-10" />
        پستی وجود ندارد
      </div>
    );

  return (
    <section className="flex flex-col gap-2 p-2">
      {(isFetchingNextPage || isLoading) && <PostCardSkeleton />}
      {data?.pages.map((page, pageIndex) =>
        page.blogs.map((item, i) => {
          const isLast =
            pageIndex === data.pages.length - 1 && i === page.blogs.length - 1;

          if (isLast) {
            return (
              <div ref={loadMoreRef} key={item.blog.id}>
                <PostCard item={item} />
              </div>
            );
          }

          return <PostCard key={item.blog.id} item={item} />;
        })
      )}
    </section>
  );
};

export default SavedPostsSection;
