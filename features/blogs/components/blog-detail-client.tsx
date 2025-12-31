"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Blog, BlogTag } from "@/features/blogs/blogTypes";
import BlogContent from "@/features/blogs/components/blog-content";
import HiddenViewElement from "@/features/blogs/components/HiddenViewElement";
import LikeButton from "@/features/blogs/components/like-button";
import SaveButton from "@/features/blogs/components/save-button";
import ShareBlogButton from "@/features/blogs/components/share-blog-button";
import BlogComments from "@/features/comments/components/blog-comments";
import FollowButton from "@/features/user/components/profile/follow-button";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { faIR } from "date-fns/locale";
import { Eye, MessageCircleMore } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { getBlogById } from "@/features/blogs/api/getBlogById";
import {
  QueryClient,
  QueryClientProvider,
  HydrationBoundary,
  useQuery,
  type DehydratedState,
} from "@tanstack/react-query";

type Props = { id: number; dehydratedState: DehydratedState; blog: Blog };

function BlogDetailInner({
  id,
  initialBlog,
}: {
  id: number;
  initialBlog: Blog;
}) {
  const { data: blog } = useQuery({
    queryKey: ["blog-detail", id],
    queryFn: () => getBlogById(id),
    initialData: initialBlog,
    staleTime: 1000 * 60,
  });

  if (!blog) return <div>بلاگ پیدا نشد</div>;

  return (
    <article className="max-w-3xl mx-auto p-2 md:p-4 text-right" dir="rtl">
      <HiddenViewElement id={id} />
      {/* Author */}
      <div className="flex justify-between">
        <div className="flex gap-2 items-center">
          <Avatar>
            <AvatarImage src={blog.author?.profile_image || ""} />
            <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
              {blog.author?.first_name
                ? blog.author?.first_name?.substring(0, 1)
                : blog.author?.username?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <h4 className="font-light text-sm">
            {blog.author?.first_name || blog.author?.last_name
              ? `${blog.author?.first_name ?? ""} ${
                  blog.author?.last_name ?? ""
                }`.trim()
              : blog.author.username}
          </h4>

          <Separator orientation="vertical" className="!h-3" />
          <p className="text-xs text-muted-foreground">
            {formatDistanceToNow(new Date(blog.created_at), {
              addSuffix: true,
              locale: faIR,
            })}
          </p>
        </div>
        <div className="flex gap-4 items-center ">
          <ShareBlogButton />
        </div>
      </div>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold !my-4">{blog.title}</h1>

      {/* Summary text */}
      <p className="text-muted-foreground ">{blog.summary}</p>

      {/* Banner Image */}
      <div className="relative w-full overflow-hidden rounded-sm my-8 aspect-[16/9]">
        <Image
          src={blog.banner_image!}
          alt={blog.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <BlogContent content={blog.content} />

      {/* Tags */}
      <div className="flex gap-2 mb-5">
        {blog.tags.map(({ tag }: BlogTag) => (
          <Badge key={tag.id}>{tag.title}</Badge>
        ))}
      </div>

      {/* Statistics */}
      <div className="flex justify-between mb-2">
        <div className="flex gap-3 md:gap-5 text-xs text-muted-foreground ">
          <LikeButton
            blogId={blog.id}
            likesCount={blog._count.likes}
            liked={blog.liked}
          />
          <span className="flex justify-center items-center gap-1">
            <Button
              variant={"link"}
              className="!p-0 cursor-pointer hover:text-blue-400"
            >
              <MessageCircleMore className="size-5" />
            </Button>
            {blog._count.comments}
          </span>
          <span className="flex justify-center items-center gap-1">
            <Button
              variant={"link"}
              className="!p-0 cursor-pointer hover:text-blue-400"
            >
              <Eye className="size-5" />
            </Button>
            {blog._count.views}
          </span>
        </div>

        <div className="flex gap-2">
          <SaveButton
            blogId={blog.id}
            savedCount={blog._count.saved_blogs}
            saved={blog.saved}
          />
          <span className="flex justify-center items-center gap-2">
            <ShareBlogButton />
          </span>
        </div>
      </div>
      <Separator />

      {/* Author Info for mobile  */}
      <div className="my-6">
        <div className="flex justify-between">
          <div className="flex gap-2 items-start justify-items-start">
            <div className="flex">
              <Avatar className="size-12">
                <AvatarImage src={blog.author?.profile_image || ""} />
                <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
                  {blog.author?.first_name
                    ? blog.author?.first_name?.substring(0, 1)
                    : blog.author?.username?.substring(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="pr-3">
                <h4 className="font-semibold pt-1">
                  {blog.author?.first_name || blog.author?.last_name
                    ? `${blog.author?.first_name ?? ""} ${
                        blog.author?.last_name ?? ""
                      }`.trim()
                    : blog.author.username}
                </h4>
                <p className="max-w-5/6 text-xs text-muted-foreground">
                  {blog.author?.bio}
                </p>
              </div>
            </div>
          </div>
          <FollowButton
            userId={blog.author_id}
            followOptions={{
              is_followed_by_you: blog.is_followed_by_you,
              is_following: blog.is_following,
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Comments */}
      <BlogComments blog={blog} />
    </article>
  );
}

export default function BlogDetailClient({ id, dehydratedState, blog }: Props) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState as DehydratedState}>
        <BlogDetailInner id={id} initialBlog={blog} />
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
