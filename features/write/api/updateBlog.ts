import api from "@/lib/api";
import { CreateBlogReqBody } from "../types";
import { Blog } from "@/features/blogs/blogTypes";
import { ApiResponse } from "@/types";

export const updateBlog = async (id: number, data: CreateBlogReqBody) => {
  const res = await api.patch<ApiResponse<Blog>>(`v1/blog/${id}`, data);
  return res.data;
};
