import api from "@/lib/client/api";
import { ApiResponse } from "@/types";
import { MyPostType } from "../blogTypes";

export const getUserBlogs = async (username: string) => {
  const { data } = await api.get<ApiResponse<MyPostType[]>>(
    `v1/user/${username}/blogs`
  );
  return data.data;
};
