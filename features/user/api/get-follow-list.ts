import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { FollowRelation } from "../userTypes";

export async function getFollowList(
  userId: number,
  listType: "followers" | "following"
  // page: number = 1,
  // limit: number = 20
) {
  const response = await api.get<ApiResponse<FollowRelation[]>>(
    `v1/user/${userId}/${listType}/list`
    // {
    //     params: {
    //         page,
    //         limit,
    //     },
    // }
  );
  return response.data.data ?? [];
}
