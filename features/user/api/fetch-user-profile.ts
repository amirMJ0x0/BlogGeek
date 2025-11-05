import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const getUserProfile = async (username: string): Promise<User> => {
  try {

    const res = await api.get<ApiResponse<User>>(
      `/v1/user/profile/${username}`
    );

    if (!res.data || !res.data.data) {
      throw new Error("Profile not found");
    }
    return res.data.data;
  } catch (err) {
    // console.error("getUserProfile error:", err);
    throw err;
  }
};
