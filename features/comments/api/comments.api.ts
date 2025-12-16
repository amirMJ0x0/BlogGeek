// GET - v1/blog/{id}/comments
import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { Comment_PAGE_LIMIT, CommentResponseData } from "@/features/comments";

type getCommentsProps = {
  id: number;
  pageParam: number;
};

export const getComments = async ({ id, pageParam = 1 }: getCommentsProps) => {
  const { data } = await api.get<ApiResponse<CommentResponseData>>(
    `v1/blog/${id}/comments`,
    {
      params: {
        page: pageParam,
        limit: Comment_PAGE_LIMIT,
      },
    }
  );
  return data.data;
};

type CreateCommentProps = {
  blogId: number;
  content: string;
  parent_id?: number | null;
};

export const createComment = async ({
  blogId,
  content,
  parent_id = null,
}: CreateCommentProps) => {
  const { data } = await api.post<ApiResponse<any>>(`v1/comment/${blogId}`, {
    content,
    parent_id,
  });
  return data.data;
};

export const deleteComment = async (id: number) => {
  await api.delete<ApiResponse<null>>(`v1/comment/${id}`);
  return id;
};
