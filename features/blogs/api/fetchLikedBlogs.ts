import api from "@/lib/api";
import { BlogsResponse } from "../blogTypes";
import { ApiResponse } from "@/types";

export const getLikedBlogs = async (page: number): Promise<BlogsResponse> => {
  const { data: response } = await api.get<ApiResponse<BlogsResponse>>(
    `v1/user/liked-blogs?page=${page}`
  );
  return {
    blogs: response.data?.blogs!,
    totalCount: response.data?.totalCount!,
    totalPages: response.data?.totalPages!,
    currentPage: page,
  };
};
