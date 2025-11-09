import api from "@/lib/api";
import { ApiResponse } from "@/types";

/**
 * @desc POST change user's password
 * @route POST https://bloggeek.ir/api/v1/user/update/password
 */

export type ResPasswordError = {
  password: {
    message: string;
    source: string;
  };
};

export const updatePassword = async ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}): Promise<ApiResponse<ResPasswordError>> => {
  const { data } = await api.post("v1/user/update/password", {
    password,
    confirmPassword,
  });
  return data;
};
