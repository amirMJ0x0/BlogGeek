import api from "@/lib/api";
import { BlogsResponse } from "../blogTypes";
import { ApiResponse } from "@/types";

export const getAllBlogs = async ({ pageParam = 1 }) => {
  const { data } = await api.get<ApiResponse<BlogsResponse>>("/v1/blog", {
    params: {
      page: pageParam,
      limit: 10,
    },
  });
  return data.data;
};
