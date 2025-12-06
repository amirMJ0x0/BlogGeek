import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { TagsResponse } from "../types";

export const getTags = async (
  page: number = 1,
  limit: number = 10,
  search: string = ""
) => {
  try {
    const response = await api.get<ApiResponse<TagsResponse>>("v1/tag", {
      params: {
        search,
        limit,
        page,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
