import api from "@/lib/client/api";
import { ApiResponse } from "@/types";
import { TagsCreateRequest } from "../types";
import { TagItemType } from "@/features/tags";

export const createTags = async (data: TagsCreateRequest) => {
  try {
    const response = await api.post<ApiResponse<TagItemType>>("v1/tag", data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
