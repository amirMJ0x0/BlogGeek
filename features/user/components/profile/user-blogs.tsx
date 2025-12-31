"use client";
import EmptyComponent from "@/components/empty-component";
import PostCard from "@/features/blogs/components/post-card";
import { PostCardSkeleton } from "@/features/blogs/components/post-card-skeleton";
import { useMyBlogs } from "@/features/blogs/hooks/useInfiniteBlogs";

const UserBlogs = ({
  username,
  isOwner,
}: {
  username: string;
  isOwner: boolean;
}) => {
  const { data: blogs, isLoading } = useMyBlogs(username);

  const isEmpty = !isLoading && blogs?.length === 0;

  return (
    <section className="flex flex-col gap-2 p-2">
      {isEmpty ? (
        <EmptyComponent />
      ) : (
        <div className="divide-y">
          {blogs?.map((blog, blogIndex) => (
            <div key={`${blog?.id}-${blogIndex}`} className="relative">
              <PostCard item={blog as any} hasSetting={isOwner} />
            </div>
          ))}
        </div>
      )}

      {isLoading && (
        <div>
          {Array.from({ length: 10 }).map((_, index) => (
            <PostCardSkeleton key={index} />
          ))}
        </div>
      )}
    </section>
  );
};

export default UserBlogs;
