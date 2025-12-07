import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { Blog } from "@/features/blogs/blogTypes";
import { CreateBlogReqBody } from "../types";

export const createBlog = async (data: CreateBlogReqBody) => {
  const response = await api.post<ApiResponse<Blog>>("v1/blog", data);
  return response.data;
};
