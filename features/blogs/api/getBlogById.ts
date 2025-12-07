import api from "@/lib/api";

export const getBlogById = async (id: number) => {
  const res = await api.get(`v1/blog/${id}`);
  return res.data.data;
};
