import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { AxiosError } from "axios";

/**
 * @desc GET change user's username
 * @route GET https://bloggeek.ir/api/v1/user/{username}/check-username-exist
 */
export const checkUsernameExist = async (
  username: string
): Promise<ApiResponse<null>> => {
  try {
    const { data } = await api.get(`v1/user/${username}/check-username-exist`);
    return data;
  } catch (error: any) {
    console.log(error);
    if (error.response) return error.response.data;
    throw error;
  }
};
