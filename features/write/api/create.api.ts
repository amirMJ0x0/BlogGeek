"use server";

import { createServerApi } from "@/lib/server/createServerApi";
import { ApiResponse } from "@/types";
import { CreateBlogReqBody } from "../types";
import { Blog } from "@/features/blogs/blogTypes";

/* ===================== CREATE BLOG ===================== */
export const createBlog = async (data: CreateBlogReqBody) => {
  const api = await createServerApi();
  const response = await api.post<ApiResponse<Blog>>("v1/blog", data);
  return response.data;
};

/* ===================== UPDATE BLOG ===================== */

export const updateBlog = async (id: number, data: CreateBlogReqBody) => {
  const api = await createServerApi();
  const res = await api.patch<ApiResponse<Blog>>(`v1/blog/${id}`, data);
  return res.data;
};
