//constants
export const Comment_PAGE_LIMIT = 10;

// types
export type { CommentAuthor, CommentItem, CommentResponseData } from "./types";

// api
export { getComments, createComment, deleteComment } from "./api/comments.api";

// hooks
export { useCommentsQuery } from "./hooks/useCommentsQuery";

export {
  useCreateComment,
  useDeleteComment,
} from "./hooks/useCommentMutations";
