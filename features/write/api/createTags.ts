import api from "@/lib/api";
import { ApiResponse } from "@/types";
import { TagItem, TagsCreateRequest } from "../types";

export const createTags = async (data: TagsCreateRequest) => {
  try {
    const response = await api.post<ApiResponse<TagItem>>("v1/tag", data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
