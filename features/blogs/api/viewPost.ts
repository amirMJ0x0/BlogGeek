import api from "@/lib/api";

type ViewResponse = {
  data: null;
  message: null;
  statusCode: number;
};

export const viewPost = async (id: number) => {
  const response = await api.post<ViewResponse>(`v1/blog/${id}/view`);
  return response;
};
