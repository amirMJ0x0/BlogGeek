// GET - v1/blog/{id}/comments
import api from "@/lib/api";
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

type CreateCommentProps = {
  blogId: number;
  content: string;
  parentId?: number | null;
};

export const createComment = async ({
  blogId,
  content,
  parentId = null,
}: CreateCommentProps) => {
  const { data } = await api.post<ApiResponse<any>>(`v1/comment/${blogId}`, {
    content,
    parentId,
  });
  return data.data;
};

export const deleteComment = async (id: number) => {
  await api.delete<ApiResponse<null>>(`v1/comment/${id}`);
  return id;
};

export const getMyComments = async ({ pageParam = 1 }) => {
  const { data } = await api.get<
    ApiResponse<CommentResponseData<MyCommentItem[]>>
  >("v1/user/my-comments", {
    params: {
      page: pageParam,
      limit: COMMENT_PAGE_LIMIT,
    },
  });
  return data.data;
};
