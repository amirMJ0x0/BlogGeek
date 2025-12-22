"use client";

import { Button } from "@/components/ui/button";
import { UserCheck, UserMinus, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import useFollowAction from "../../hooks/useFollowAction";
import { useRouter } from "next/navigation";
import { useUserStore } from "../../store/useUserStore";
import { cn } from "@/lib/utils";

type FollowButtonProps = {
  userId: number | null;
  followOptions: {
    is_followed_by_you: boolean;
    is_following: boolean;
  };
  className?: string;
  hasIcon?: boolean;
  size?:
    | "default"
    | "sm"
    | "lg"
    | "icon"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
};

export default function FollowButton({
  userId,
  followOptions,
  className,
  hasIcon = true,
  size = "default",
}: FollowButtonProps) {
  const { follow, unfollow, isPending } = useFollowAction();
  const router = useRouter();
  const { user, isAuthenticated } = useUserStore();

  const [isFollowedByYou, setIsFollowedByYou] = useState(
    followOptions.is_followed_by_you
  );
  const [isFollowing, setIsFollowing] = useState(followOptions.is_following);

  useEffect(() => {
    setIsFollowedByYou(followOptions.is_followed_by_you);
    setIsFollowing(followOptions.is_following);
  }, [followOptions.is_followed_by_you, followOptions.is_following]);

  const followType = isFollowedByYou
    ? "unfollow"
    : isFollowing
    ? "mutual_follow"
    : "follow";

  const getLabelAndIcon = () => {
    if (followType === "unfollow")
      return { label: "دنبال نکردن", Icon: UserMinus };
    if (followType === "mutual_follow")
      return { label: "دنبال کردن متقابل", Icon: UserCheck };
    return { label: "دنبال کردن", Icon: UserPlus };
  };

  const { label, Icon } = getLabelAndIcon();

  const handleClick = async () => {
    if (!userId) return;

    try {
      if (followType === "unfollow") {
        await unfollow(userId);
        setIsFollowedByYou(false);
      } else {
        await follow(userId);
        setIsFollowedByYou(true);
      }
      router.refresh();
    } catch (e) {
      console.error("Follow action failed:", e);
    }
  };

  if (user?.id === userId) return null;

  return (
    <Button
      onClick={handleClick}
      disabled={isPending || !userId || !isAuthenticated}
      aria-pressed={isFollowedByYou}
      className={cn("", className)}
      size={size}
    >
      {label}
      {hasIcon && <Icon className="mr-1" size={16} />}
    </Button>
  );
}
