import api from "@/lib/api";

type ViewResponse = {
  data: null;
  message: null;
  statusCode: number;
};
export const viewPost = async (id: number) => {
  try {
    const response = await api.post<ViewResponse>(`v1/blog/${id}/view`);
    return response;
  } catch (error) {
    throw error;
  }
};
