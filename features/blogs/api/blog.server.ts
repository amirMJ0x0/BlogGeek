"use server";

import { createServerApi } from "@/lib/server/createServerApi";
import { ApiResponse } from "@/types";
import { BLOG_PAGE_LIMIT, BlogsResponse } from "../blogTypes";

/* ===================== DELETE BLOG ===================== */

export const deleteBlogById = async (blogId: number) => {
  const api = await createServerApi();
  const { data } = await api.delete<ApiResponse<null>>(`/v1/blog/${blogId}`);
  return data;
};

/* ===================== LIKE POST  ===================== */

export const likePost = async ({
  id,
  likeAction,
}: {
  id: number;
  likeAction: "like" | "unlike";
}) => {
  const api = await createServerApi();
  try {
    const { data } = await api.post<ApiResponse<null>>(
      `/v1/blog/${id}/reaction/${likeAction}`
    );
    return data;
  } catch (e: any) {
    if (e.response?.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error("LIKE_FAILED");
  }
};
/* ===================== SAVE POST ===================== */
export const savePost = async ({
  id,
  saveAction,
}: {
  id: number;
  saveAction: "save" | "unsave";
}) => {
  try {
    const api = await createServerApi();
    const { data } = await api.post<ApiResponse<null>>(
      `v1/blog/${id}/${saveAction}`
    );
    return data;
  } catch (e: any) {
    if (e.response?.status === 401) {
      throw new Error("UNAUTHORIZED");
    }
    throw new Error("LIKE_FAILED");
  }
};

/* ===================== VIEW POST ===================== */
type ViewResponse = {
  data: null;
  message: null;
  statusCode: number;
};
export const viewPost = async (id: number) => {
  const api = await createServerApi();
  try {
    const response = await api.post<ViewResponse>(`v1/blog/${id}/view`);
    return response;
  } catch (error) {}
};

/* ===================== My Liked Blogs ===================== */
export const getLikedBlogs = async ({ pageParam = 1 }) => {
  const api = await createServerApi();
  const { data } = await api.get<ApiResponse<BlogsResponse>>(
    "v1/user/liked-blogs",
    {
      params: {
        page: pageParam,
        limit: BLOG_PAGE_LIMIT,
      },
    }
  );
  return data.data;
};

/* ===================== My Saved Blogs ===================== */

export const getSavedBlogs = async ({ pageParam = 1 }) => {
  const api = await createServerApi();
  const { data } = await api.get<ApiResponse<BlogsResponse>>(
    "v1/user/saved-blogs",
    {
      params: {
        page: pageParam,
        limit: BLOG_PAGE_LIMIT,
      },
    }
  );
  return data.data;
};
