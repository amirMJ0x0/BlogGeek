import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const deleteBlogById = async (blogId: number) => {
  const { data } = await api.delete<ApiResponse<null>>(`/v1/blog/${blogId}`);
  return data;
};
