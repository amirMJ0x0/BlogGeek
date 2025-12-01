import api from "@/lib/api";
import { BLOG_PAGE_LIMIT, BlogsResponse } from "../blogTypes";
import { ApiResponse } from "@/types";

export const getLikedBlogs = async ({ pageParam = 1 }) => {
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
