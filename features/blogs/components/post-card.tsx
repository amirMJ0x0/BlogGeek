import Link from "next/link";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { BlogItem } from "@/features/blogs/blogTypes";
import { Bookmark, Eye, Heart, MessageCircleMore } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { faIR } from "date-fns/locale";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import testImg from "@/public/og-image.png";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
interface PostCardProps {
  item: BlogItem;
}

export default function PostCard({ item }: PostCardProps) {
  const { blog, user } = item;

  console.log(blog.category);

  return (
    <Card
      className="rounded-xl shadow-sm hover:shadow-md transition "
      dir="rtl"
    >
      <CardContent className="flex gap-3">
        <div className="flex flex-col flex-1 items-start gap-2">
          <div className="flex gap-1 items-center">
            <Avatar>
              <AvatarImage src={user?.profile_image} />
              <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
                {user?.first_name
                  ? user?.first_name?.substring(0, 1)
                  : user?.username?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-light text-sm">
              {user?.first_name || user?.last_name
                ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
                : user.username}
            </h4>

            <Separator orientation="vertical" className="!h-3" />
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(blog.created_at), {
                addSuffix: true,
                locale: faIR,
              })}
            </p>
          </div>

          <div className="">
            <Link href={`/blog/${blog.slug}`}>
              <h2 className="text-lg font-semibold text-right">{blog.title}</h2>
            </Link>
            <p className="text-sm text-muted-foreground line-clamp-3 !mt-3 text-justify">
              {blog.content}
            </p>
          </div>
        </div>

        <div className="max-sm:hidden relative h-24 w-28 overflow-hidden rounded-sm">
          <Image src={testImg} alt={blog.title} fill className="object-cover" />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div>{blog?.category && <Badge>{blog?.category?.title}</Badge>}</div>
        <div className=" flex gap-6 text-xs text-muted-foreground ">
          <span className="flex justify-center items-center gap-2">
            <Button
              variant={"link"}
              className="!p-0 cursor-pointer hover:text-red-400"
            >
              <Heart className="size-5" />
            </Button>
            <span>{blog._count.likes}</span>
          </span>
          <span className="flex justify-center items-center gap-2">
            <MessageCircleMore className="size-5" /> {blog._count.comments}
          </span>
          <span className="flex justify-center items-center gap-2">
            <span>
              <Eye className="size-5" />
            </span>
            <span>{blog._count.views}</span>
          </span>
          <span className="flex justify-center items-center gap-2">
            <Button
              variant={"link"}
              className="!p-0 cursor-pointer hover:text-blue-400"
            >
              <Bookmark className="size-5" />
            </Button>
            <span>{blog._count.views}</span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
