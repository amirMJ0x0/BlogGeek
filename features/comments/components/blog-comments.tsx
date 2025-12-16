"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommentItem, useCommentsQuery } from "@/features/comments";
import { useEffect } from "react";
import { Blog } from "../../blogs/blogTypes";
import CommentsList from "./comments-list";
import InputComment from "./input-comment";
import { Skeleton } from "@/components/ui/skeleton";
import { PostCardSkeleton } from "@/features/blogs/components/post-card-skeleton";

const BlogComments = ({ blog }: { blog: Blog }) => {
  const { data, isLoading } = useCommentsQuery(blog.id);
  const comments = data?.pages.flatMap((page) => page?.comments) ?? [];

  useEffect(() => {
    const hash = window.location.hash;

    if (hash === "#comments") {
      // A delay , so the DOM being created
      setTimeout(() => {
        const el = document.getElementById("comments");
        if (el) el.scrollIntoView({ behavior: "smooth" });

        // Delete hash from url after scroll
        history.replaceState(null, "", window.location.pathname);
      }, 100);
    }
  }, []);

  if (isLoading) {
    return (
      <section className="flex flex-col mt-4 pt-4 space-y-4">
        <Skeleton className="h-5 w-1/5" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-1/4" />
        </div>
        <Skeleton className="h-10 w-full" />
        <div className="space-y-4 mt-4">
          <Skeleton className=" h-24 w-full" />
          <Skeleton className=" h-24 w-full" />
          <Skeleton className=" h-24 w-full" />
        </div>
      </section>
    );
  }
  return (
    <section className="mt-4 pt-4" id="comments">
      <div className="">
        <h3 className="font-bold text-lg">
          پاسخ ها ({data?.pages[0]?.totalCount})
        </h3>
      </div>
      <div className="flex gap-2 items-center mt-4">
        <Avatar>
          <AvatarImage src={blog.author?.profile_image!} />
          <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
            {blog.author?.first_name
              ? blog.author?.first_name?.substring(0, 1)
              : blog.author?.username?.substring(0, 1)}
          </AvatarFallback>
        </Avatar>

        <h4 className="font-light">
          {blog.author?.first_name || blog.author?.last_name
            ? `${blog.author?.first_name ?? ""} ${
                blog.author?.last_name ?? ""
              }`.trim()
            : blog.author.username}
        </h4>
      </div>

      <div className="mt-4">
        <InputComment blogId={blog.id} />
      </div>

      <div className="mt-6">
        <CommentsList blogId={blog.id} comments={comments as CommentItem[]} />
      </div>
    </section>
  );
};

export default BlogComments;
