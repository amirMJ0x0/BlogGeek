import api from "@/lib/client/api";
import { Blog } from "../blogTypes";

export const getBlogById = async (id: number): Promise<Blog> => {
  const res = await api.get(`v1/blog/${id}`);
  return res.data.data;
};
