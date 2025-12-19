import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const getUserProfile = async (
  username: string
): Promise<User | null> => {
  try {
    const res = await api.get<ApiResponse<User>>(
      `/v1/user/profile/${username}`
    );

    return res.data?.data ?? null;
  } catch (err: any) {
    console.error("getUserProfile failed:", {
      username,
      status: err?.response?.status,
    });

    return null;
  }
};
