import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

/**
 * @desc PATCH change user's username
 * @route PATCH https://bloggeek.ir/api/v1/user/update/information
 */
export const changeUsername = async (data: {
  username: string;
}): Promise<ApiResponse<User>> => {
  const { data: response } = await api.patch(
    "v1/user/update/information",
    data
  );
  return response;
};
