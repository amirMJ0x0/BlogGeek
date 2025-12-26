import { clearSession, setSession } from "@/features/auth/api/session.api";
import { ApiResponse } from "@/types";
import axios, { AxiosError, AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const originalConfig = err.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const { data } = await axios.get<ApiResponse<{ accessToken: string }>>(
          `${BASE_URL}v1/auth/refresh-token`,
          {
            withCredentials: true,
          }
        );
        if (data) {
          await setSession({
            accessToken: data.data?.accessToken,
          });
          return api(originalConfig);
        }
      } catch (error) {
        await clearSession();
        return Promise.reject(error);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
