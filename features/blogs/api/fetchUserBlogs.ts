import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { MyPostType } from "../blogTypes";

export const getUserBlogs = async () => {
  const { data } = await api.get<ApiResponse<MyPostType[]>>("/v1/user/blogs");
  return data.data;
};
