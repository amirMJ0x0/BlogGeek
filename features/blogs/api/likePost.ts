import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const likePost = async ({
  id,
  likeAction,
}: {
  id: number;
  likeAction: "like" | "unlike";
}) => {
  const response = await api.post<ApiResponse<null>>(
    `v1/blog/${id}/reaction/${likeAction}`
  );
  return response;
};
