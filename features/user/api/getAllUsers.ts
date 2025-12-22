import api from "@/lib/api";

import { ApiResponse } from "@/types";
import { SuggestedUser } from "../userTypes";

export const getAllUsers = async () => {
  const { data } = await api.get<ApiResponse<SuggestedUser[]>>("/v1/user");
  return data.data;
};
