"use server";

import { createServerApi } from "@/lib/server/createServerApi";
import { ApiResponse } from "@/types";
import { CreateBlogReqBody } from "../types";
import { Blog } from "@/features/blogs/blogTypes";

/* ===================== CREATE BLOG ===================== */
export const createBlog = async (data: CreateBlogReqBody) => {
  try {
    const api = await createServerApi();
    const response = await api.post<ApiResponse<Blog>>("v1/blog", data);
    return response.data;
  } catch (e: any) {
    console.log(e);
    if (e.response?.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error("LIKE_FAILED");
  }
};

/* ===================== UPDATE BLOG ===================== */

export const updateBlog = async (id: number, data: CreateBlogReqBody) => {
  try {
    const api = await createServerApi();
    const res = await api.patch<ApiResponse<Blog>>(`v1/blog/${id}`, data);
    return res.data;
  } catch (e: any) {
    if (e.response?.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error("LIKE_FAILED");
  }
};
