"use client";
import { memo, useState } from "react";
import { CommentItem } from "@/features/comments";
import { useUserStore } from "@/features/user/store/useUserStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { faIR } from "date-fns/locale";
import { TrashIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

export const CommentNode = memo(function CommentNode({
  node,
  blogId,
  onReply,
  onDelete,
  isReply,
}: {
  node: CommentItem;
  blogId: number;
  onReply: (id: number, content: string) => void;
  onDelete: (id: number) => void;
  isReply?: boolean;
}) {
  const [openReply, setOpenReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const { user } = useUserStore();

  return (
    <div
      className={`mt-5 p-2 bg-accent dark:bg-secondary-dark ${
        isReply && "brightness-95 dark:brightness-115"
      } rounded-sm`}
    >
      {/* Avatar */}
      <div className="flex gap-3">
        <Avatar>
          <AvatarImage src={node.author.profile_image || ""} />
          <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark">
            {node.author.first_name
              ? node.author.first_name.substring(0, 1)
              : node.author.username.substring(0, 1)}
          </AvatarFallback>
        </Avatar>

        {/* username + commentDate */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h5 className="font-medium text-sm">
              {node.author.first_name || node.author.last_name
                ? `${node.author.first_name ?? ""} ${
                    node.author.last_name ?? ""
                  }`.trim()
                : node.author.username}
            </h5>
            <span className="text-xs dark:text-secondary-light/50 text-secondary-dark">
              {formatDistanceToNow(new Date(node.created_at), {
                addSuffix: true,
                locale: faIR,
              })}
            </span>
          </div>

          {/* Content */}
          <p className="mt-2 text-sm text-gray-400">{node.content}</p>

          {/* reply & delete buttons  */}
          <div className="flex items-center gap-2 mt-2">
            {user?.username === node.author.username && (
              <Dialog>
                <DialogTrigger>
                  <Button
                    variant={"link"}
                    className="text-sm text-destructive flex items-center gap-1 "
                    title="حذف نظر"
                  >
                    <TrashIcon className="size-4" />
                    حذف
                  </Button>
                </DialogTrigger>
                <DialogContent
                  showCloseButton={false}
                  className="sm:max-w-[425px]"
                >
                  <DialogHeader className="!text-right font-bold">
                    حذف نظر
                  </DialogHeader>
                  <DialogDescription>
                    آیا از حذف نظر خود اطمینان دارید؟
                  </DialogDescription>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">انصراف</Button>
                    </DialogClose>
                    <Button
                      variant={"destructive"}
                      onClick={() => onDelete(node.id)}
                    >
                      بله ، حذفش کن
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            )}
            <button
              className="text-sm text-primary hover:underline"
              onClick={() => setOpenReply((s) => !s)}
            >
              پاسخ
            </button>
            {node.replies.length > 0 && (
              <span className="text-xs text-slate-600 -mr-1">
                ({node.replies.length})
              </span>
            )}
          </div>

          {/* reply input  */}
          {openReply && (
            <div className="mt-3">
              <Textarea
                value={replyContent}
                onChange={(e) => setReplyContent(e.target.value)}
                placeholder="پاسخ خود را بنویسید"
                className="min-h-10 max-h-30"
              />
              <div className="mt-2 flex gap-2">
                <Button
                  size="sm"
                  onClick={() => {
                    setReplyContent("");
                    setOpenReply(false);
                  }}
                  variant="cancel"
                >
                  انصراف
                </Button>
                <Button
                  size="sm"
                  onClick={() => {
                    if (!replyContent.trim()) return;
                    onReply(node.id, replyContent.trim());
                    setReplyContent("");
                    setOpenReply(false);
                  }}
                >
                  ارسال
                </Button>
              </div>
            </div>
          )}

          {/* children */}
          {node.replies.length > 0 && (
            <div className="mt-4 border-r dark:border-secondary-light/10 pr-4">
              {node.replies.map((r) => (
                <CommentNode
                  key={r.id}
                  node={r}
                  blogId={blogId}
                  onReply={onReply}
                  onDelete={onDelete}
                  isReply
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
