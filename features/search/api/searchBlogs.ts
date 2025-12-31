// src/services/searchService.ts

import { ApiResponse } from "@/types";
import { SearchResponseData } from "../types/search";
import api from "@/lib/client/api";

const SEARCH_ENDPOINT = "/v1/search";

export async function searchAPI(
  query: string
): Promise<ApiResponse<SearchResponseData>> {
  if (!query.trim()) {
    return {
      data: { searchList: [], searchResultCount: 0 },
      message: "",
      statusCode: 200,
    };
  }

  const response = await api.get<ApiResponse<SearchResponseData>>(
    SEARCH_ENDPOINT,
    {
      params: { q: query },
    }
  );

  return response.data;
}
