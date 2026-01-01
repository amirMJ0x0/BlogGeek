"use client";
import { Button } from "@/components/ui/button";
import { numberToPersian } from "@/lib/utils";
import { Heart } from "lucide-react";
import { useLike } from "../hooks/useLike";
type LikeButtonProps = {
  blogId: number;
  likesCount: number;
  liked: boolean;
};
const LikeButton = ({ blogId, likesCount, liked }: LikeButtonProps) => {
  const { mutate, isPending } = useLike();

  const handleClick = () => {
    mutate({ id: blogId, likeAction: liked ? "unlike" : "like" });
  };

  return (
    <span className="flex justify-center items-center gap-1">
      <Button
        variant={"link"}
        className="!p-0 cursor-pointer hover:opacity-60"
        onClick={handleClick}
        disabled={isPending}
      >
        <Heart
          className={`size-4 md:size-5 text-red-500`}
          fill={`${liked ? "#fb2c36" : "transparent"}`}
        />
      </Button>
      <span>{numberToPersian(likesCount)}</span>
    </span>
  );
};

export default LikeButton;
