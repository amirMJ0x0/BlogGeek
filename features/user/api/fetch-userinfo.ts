import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const fetchUserInfo = async () => {
  const res = await api.get<ApiResponse<User>>("v1/user/me");

  return res.data.data;
};
