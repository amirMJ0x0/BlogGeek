// /api/v1/user/{id}/{followAction}

import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const followUser = async ({
  id,
  followAction,
}: {
  id: number;
  followAction: "follow" | "unfollow";
}) => {
  const response = await api.post<ApiResponse<null>>(
    `v1/user/${id}/${followAction}`
  );
  return response;
};
