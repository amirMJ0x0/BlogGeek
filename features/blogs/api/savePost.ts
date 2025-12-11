import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const savePost = async ({
  id,
  saveAction,
}: {
  id: number;
  saveAction: "save" | "unsave";
}) => {
  const response = await api.post<ApiResponse<null>>(
    `v1/blog/${id}/${saveAction}`
  );
  return response;
};
