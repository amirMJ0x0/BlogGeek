import api from "@/lib/client/api";
import { ApiResponse } from "@/types";
import {
  COMMENT_PAGE_LIMIT,
  CommentItem,
  CommentResponseData,
  MyCommentItem,
} from "@/features/comments";

type getCommentsProps = {
  id: number;
  pageParam: number;
};

export const getComments = async ({ id, pageParam = 1 }: getCommentsProps) => {
  const { data } = await api.get<
    ApiResponse<CommentResponseData<CommentItem[]>>
  >(`v1/blog/${id}/comments`, {
    params: {
      page: pageParam,
      limit: COMMENT_PAGE_LIMIT,
    },
  });
  return data.data;
};

