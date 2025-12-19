"use client";
import EmptyComponent from "@/components/empty-component";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { PostCardSkeleton } from "@/features/blogs/components/post-card-skeleton";
import { useUserStore } from "@/features/user/store/useUserStore";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { faIR } from "date-fns/locale";
import { ArrowUpLeft, BookOpen, MessageCircleMore } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useRef } from "react";
import { useMyCommentsQuery, MyCommentItem } from "@/features/comments";

const MyCommentsSection = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useMyCommentsQuery();
  const { user } = useUserStore();
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

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

  const comments = data?.pages.flatMap((page) => page?.comments) ?? [];

  const isEmpty = !isLoading && comments?.length === 0;

  return (
    <section className="flex flex-col gap-2 p-2" ref={scrollContainerRef}>
      {isEmpty ? (
        <EmptyComponent />
      ) : (
        <div className="divide-y">
          {comments.map((comment, commentIndex: number) => {
            const correctSlug = `-${comment?.blog.title
              .trim()
              .replace(/\s+/g, "-")
              .replace(/[^a-zA-Z0-9آ-ی-]/g, "")}`;

            const isLastItem = commentIndex === comments.length - 1;

            return (
              <div
                key={`${comment?.id}-${commentIndex}`}
                ref={isLastItem ? lastBlogCardRef : null}
              >
                <Card
                  className="bg-transparent rounded-none shadow-none transition max-sm:py-3 !border-b border-light dark:border-gray-700 !border-x-0 !border-t-0 gap-3 group relative cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/@${user?.username}/${comment?.id}-${correctSlug}#comments`
                    )
                  }
                  dir="rtl"
                >
                  <CardContent className="max-sm:!px-3">
                    <span className="hidden group-hover:block absolute left-7 top-7 text-secondary-dark dark:text-secondary-light/70 ">
                      <ArrowUpLeft />
                    </span>
                    {/* Avatar & username + Content + banner  */}
                    <div className="flex flex-col items-start ">
                      <div className="flex gap-2 items-center">
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment?.created_at!), {
                            addSuffix: true,
                            locale: faIR,
                          })}
                        </p>
                      </div>

                      <div className="flex flex-col gap-2 justify-between w-full mt-2">
                        <h2 className="md:text-lg font-semibold text-right flex gap-2 items-center ">
                          <BookOpen size={"1.2rem"} />
                          {comment?.blog.title}
                        </h2>
                        <div className="flex items-center gap-3 text-xs md:text-sm text-muted-foreground line-clamp-3 text-right md:leading-normal">
                          <MessageCircleMore size={"1rem"} />
                          {comment?.content}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between max-sm:!px-3">
                    <div className="flex gap-1 md:gap-2 max-w-[55%] flex-wrap">
                      {comment?.blog?.tags &&
                        comment.blog.tags.map(({ tag }: any) => (
                          <Badge className="max-sm:!text-[10px]" key={tag.id}>
                            {tag.title}
                          </Badge>
                        ))}
                    </div>
                    {/* <div className="flex gap-3 md:gap-5 text-xs text-muted-foreground">
                      <LikeButton
                        blogId={item.id}
                        likesCount={item._count.likes}
                        liked={item.liked}
                      />
                      <span className="flex justify-center items-center gap-1">
                        <Button
                          variant={"link"}
                          className="!p-0 cursor-pointer hover:text-blue-400"
                        >
                          <Link
                            href={`/@${item.author?.username}/${correctSlug}#comments`}
                            scroll={false}
                          >
                            <MessageCircleMore className="size-5" />
                          </Link>
                        </Button>
                        {numberToPersian(item._count.comments)}
                      </span>
                      <SaveButton
                        blogId={item.id}
                        savedCount={item._count.saved_blogs}
                        saved={item.saved}
                        showCounter
                      />
                    </div> */}
                  </CardFooter>
                </Card>
              </div>
            );
          })}
        </div>
      )}

      {isFetchingNextPage ||
        (isLoading && (
          <div>
            {Array.from({ length: 10 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ))}
    </section>
  );
};

export default MyCommentsSection;
