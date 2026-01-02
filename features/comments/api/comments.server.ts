"use server";

import { AxiosResponse } from "axios";
import {
  COMMENT_PAGE_LIMIT,
  CommentResponseData,
  MyCommentItem,
} from "@/features/comments";
import { createServerApi } from "@/lib/server/createServerApi";
import { ApiResponse } from "@/types";

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
  const api = await createServerApi();

  const { data } = await api.post<AxiosResponse<ApiResponse>>(
    `v1/comment/${blogId}`,
    {
      content,
      parentId,
    }
  );
  return data.data;
};

export const deleteComment = async (id: number) => {
  const api = await createServerApi();

  const res = await api.delete<ApiResponse<null>>(`v1/comment/${id}`);
  return res.data;
};

export const getMyComments = async ({ pageParam = 1 }) => {
  const api = await createServerApi();
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
