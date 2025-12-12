import { Button } from "@/components/ui/button";
import { UserRoundPlus } from "lucide-react";
import useFollowAction from "../../hooks/useFollowAction";

type FollowButtonProps = {
  userId: number;
};
const FollowButton = ({ userId }: FollowButtonProps) => {
  const { follow, unfollow, isError, error:err, isPending } = useFollowAction();

  const handleClick = () => {
    try {
        follow(userId);
    } catch (error) {
        console.log(err, isError);
        console.log(error)
    }
    // unfollow(userId);
  };
  return (
    <div>
      <Button onClick={handleClick} disabled={isPending}>
        دنبال کردن <UserRoundPlus />
      </Button>
    </div>
  );
};

export default FollowButton;
