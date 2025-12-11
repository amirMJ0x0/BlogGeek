import { User } from "@/features/auth/types";
import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { EditUserInfoRequest } from "../userTypes";

/**
 * @desc PATCH edit user about information
 * @route PATCH https://bloggeek.ir/api/v1/user/update/information
 */
export const editUserInfo = async (
  data: EditUserInfoRequest
): Promise<ApiResponse<User>> => {
  const { data: response } = await api.patch(
    "v1/user/update/information",
    data
  );
  return response;
};
