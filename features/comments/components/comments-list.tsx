"use client";
import type { CommentItem } from "@/features/comments";
import { useCreateComment, useDeleteComment } from "@/features/comments";
import { CommentNode } from "./comment-node";

type Props = {
  blogId: number;
  comments: CommentItem[];
};

function buildTree(comments: CommentItem[]) {
  const map = new Map<number, CommentItem>();
  console.log(map);
  comments.forEach((c) => map.set(c.id, { ...c, replies: [] }));

  const roots: CommentItem[] = [];

  for (const c of map.values()) {
    if (!c.parent_id) roots.push(c);
    else {
      const parent = map.get(c.parent_id);
      if (parent) parent.replies.push(c);
      else roots.push(c); // fallback
    }
  }

  return roots.sort(
    (a, b) =>
      new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  );
}

export default function CommentsList({ blogId, comments }: Props) {
  const roots = buildTree(comments || []);
  const { mutate: create, isPending: isCreating } = useCreateComment(blogId);
  const { mutate: remove, isPending: isDeleting } = useDeleteComment(blogId);

  function handleReply(parentId: number, content: string) {
    create({ content, parentId: parentId });
  }

  function handleDelete(id: number) {
    remove(id);
  }

  return (
    <div>
      {roots.length === 0 && (
        <p className="text-sm text-secondary-dark dark:text-secondary-light text-center p-5">
          هنوز نظری ثبت نشده است.
        </p>
      )}

      {roots.map((c) => (
        <CommentNode
          key={c.id}
          node={c}
          blogId={blogId}
          onReply={handleReply}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
