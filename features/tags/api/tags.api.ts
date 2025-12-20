import { TAGS_PAGE_LIMIT, TagsResponse } from "@/features/tags";
import api from "@/lib/api";
import { ApiResponse } from "@/types";

export const getAllTags = async (
  pageParam: number,
  limit: number = TAGS_PAGE_LIMIT,
  search: string = ""
) => {
  try {
    const response = await api.get<ApiResponse<TagsResponse>>("v1/tag", {
      params: {
        search,
        limit,
        page: pageParam,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
