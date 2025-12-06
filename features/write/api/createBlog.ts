import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { Blog } from "@/features/blogs/blogTypes";

export const createBlog = async (data: any) => {
  const response = await api.post<ApiResponse<Blog>>("v1/blog", data);
  return response.data;
};
