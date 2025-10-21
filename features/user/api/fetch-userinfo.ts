import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const fetchUserInfo = async () => {
  const { data: response } = await api.get<ApiResponse<User>>("v1/user/me");

  return response.data;
};
