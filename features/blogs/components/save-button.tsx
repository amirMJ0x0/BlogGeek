"use client";
import { Button } from "@/components/ui/button";
import { numberToPersian } from "@/lib/utils";
import { Bookmark, BookmarkPlus, Heart } from "lucide-react";
import { useLike } from "../hooks/useLike";
import { useSave } from "../hooks/useSave";
import { useTheme } from "next-themes";
type LikeButtonProps = {
  blogId: number;
  savedCount: number;
  saved: boolean;
  showCounter?: boolean;
};
const SaveButton = ({
  blogId,
  savedCount,
  saved,
  showCounter,
}: LikeButtonProps) => {
  const { mutate, isPending } = useSave();
  const { theme, systemTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const handleClick = () => {
    mutate({ id: blogId, saveAction: saved ? "unsave" : "save" });
  };

  return (
    <span className="flex justify-center items-center gap-1">
      <Button
        variant={"link"}
        className="!p-0 cursor-pointer hover:opacity-60"
        onClick={handleClick}
        disabled={isPending}
      >
        <Bookmark
          className={`size-4 md:size-5 ${saved ? "" : ""}`}
          fill={`${
            saved ? `${currentTheme === "light" ? "" : "#fff"}` : "transparent"
          }`}
        />
      </Button>
      {showCounter && <span>{numberToPersian(savedCount)}</span>}
    </span>
  );
};

export default SaveButton;
