import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { numberToPersian } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { faIR } from "date-fns/locale";
import { MessageCircleMore } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Blog, BlogTag } from "../blogTypes";
import LikeButton from "./like-button";
import SaveButton from "./save-button";
interface PostCardProps {
  item: Blog;
}

export default function PostCard({ item }: PostCardProps) {
  const correctSlug = `${item.id}-${item.title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9آ-ی-]/g, "")}`;

  return (
    <Card
      className="bg-transparent rounded-none shadow-none transition max-sm:py-3 !border-b border-light dark:border-gray-700 !border-x-0 !border-t-0 max-md:!gap-1"
      dir="rtl"
    >
      <CardContent className="max-sm:!px-3">
        {/* Avatar & username + Content + banner  */}
        <div className="flex flex-col items-start gap-2">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={item.author?.profile_image!} />
              <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
                {item.author?.first_name
                  ? item.author?.first_name?.substring(0, 1)
                  : item.author?.username?.substring(0, 1)}
              </AvatarFallback>
            </Avatar>
            <h4 className="font-light text-sm">
              {item.author?.first_name || item.author?.last_name
                ? `${item.author?.first_name ?? ""} ${
                    item.author?.last_name ?? ""
                  }`.trim()
                : item.author?.username}
            </h4>

            <Separator orientation="vertical" className="!h-3" />
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(item.created_at), {
                addSuffix: true,
                locale: faIR,
              })}
            </p>
          </div>

          <div className="flex gap-3 justify-between w-full">
            {/* Content and title  */}
            <div className="max-w-[55%] ">
              <Link href={`/@${item.author?.username}/${correctSlug}`}>
                <h2 className="md:text-lg font-semibold text-right">
                  {item.title}
                </h2>
              </Link>
              <div className="text-xs md:text-sm text-muted-foreground line-clamp-3 lg:!mt-3 text-right md:leading-normal">
                {item.summary}
              </div>
            </div>
            {/* banner image */}
            <div className="relative h-24 md:h-32 w-[40%] overflow-hidden rounded-sm">
              <Image
                src={item.banner_image as string}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between max-sm:!px-3">
        <div className="flex gap-1 md:gap-2 max-w-[55%] flex-wrap">
          {item?.tags &&
            item.tags.map(({ tag }: BlogTag) => (
              <Badge className="max-sm:!text-[10px]" key={tag.id}>
                {tag.title}
              </Badge>
            ))}
        </div>
        <div className="flex gap-3 md:gap-5 text-xs text-muted-foreground">
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
                href={`/@${item.author?.username}/${correctSlug}#reviews`}
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
        </div>
      </CardFooter>
    </Card>
  );
}
