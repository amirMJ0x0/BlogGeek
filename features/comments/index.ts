//constants
export const COMMENT_PAGE_LIMIT = 10;

// types
export type {
  CommentAuthor,
  CommentItem,
  CommentResponseData,
  MyCommentItem,
} from "./types";

// api
export { getComments } from "./api/comments.api";
export { createComment, deleteComment } from "./api/comments.server";

// hooks
export { useCommentsQuery, useMyCommentsQuery } from "./hooks/useCommentsQuery";

export {
  useCreateComment,
  useDeleteComment,
} from "./hooks/useCommentMutations";
