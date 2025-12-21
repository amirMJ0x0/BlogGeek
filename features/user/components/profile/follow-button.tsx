"use client";
import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import useFollowAction from "../../hooks/useFollowAction";

type FollowButtonProps = {
  userId: number | null;
  followType: "follow" | "unfollow";
};
const FollowButton = ({ userId, followType }: FollowButtonProps) => {
  const {
    follow,
    unfollow,
    isError,
    error: err,
    isPending,
  } = useFollowAction();

  const handleClick = () => {
    try {
      follow(userId!);
    } catch (error) {
      console.log(err, isError);
      console.log(error);
    }
    // unfollow(userId);
  };
  return (
    <div>
      <Button
        onClick={() =>
          followType === "follow" ? follow(userId!) : unfollow(userId!)
        }
        disabled={isPending || !userId}
      >
        دنبال کردن <UserRoundPlus />
      </Button>
    </div>
  );
};

export default FollowButton;
