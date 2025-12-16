"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useRef, useState } from "react";
import { useCreateComment } from "@/features/comments";

const InputComment = ({ blogId }: { blogId: number }) => {
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const { user } = useUserStore();
  const { mutate: createComment, isPending: isCreating } =
    useCreateComment(blogId);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const reset = () => {
    setContent("");
    setIsActive(false);
    if (inputRef.current) inputRef.current.blur();
  };
  return (
    <div className="flex gap-2 items-start">
      <div className="flex-1">
        <Textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="peer min-h-10 max-h-27 resize-none bg-secondary-light dark:text-secondary-light text-secondary-dark transition-all ease-in-out focus:min-h-20"
          placeholder="نظر خود را درمورد این پست بنویسید"
          onFocus={() => setIsActive(true)}
          onBlur={() => {
            if (!content.trim()) reset();
          }}
          ref={inputRef}
        />
        {isActive && (
          <div className="mt-2 hidden justify-end peer-focus:flex gap-2">
            <Button
              variant={"cancel"}
              size={"sm"}
              onMouseDown={(e) => e.preventDefault()}
              onClick={reset}
            >
              انصراف
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (!content.trim()) return;
                createComment({ content: content.trim(), parent_id: null });
                reset();
              }}
              onMouseDown={(e) => e.preventDefault()}
              disabled={!user || isCreating}
            >
              ارسال
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InputComment;
