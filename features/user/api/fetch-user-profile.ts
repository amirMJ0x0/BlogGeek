import { User } from "@/features/auth/types";
import api from "@/lib/client/api";
import { ApiResponse } from "@/types";

type Profile = User & { is_followed_by_you: boolean; is_following: boolean };

export const getUserProfile = async (
  username: string
): Promise<Profile | null> => {
  try {
    const res = await api.get<ApiResponse<Profile>>(
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
