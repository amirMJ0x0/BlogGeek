import { clearSession, setSession } from "@/features/auth/api/session.api";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalConfig = err.config as AxiosRequestConfig & {
      _retry?: boolean;
    };
    if (err.response?.status === 401 && !originalConfig._retry) {
      originalConfig._retry = true;
      try {
        const refreshRes = await fetch("/api/auth/refresh", {
          method: "GET",
          credentials: "include",
        });

        if (!refreshRes.ok) throw new Error("refresh failed");
        const data = await refreshRes.json();
        await setSession({ accessToken: data?.data?.accessToken });
        return api(originalConfig);
      } catch (e) {
        // await clearSession();
        return Promise.reject(e);
      }
    }
    return Promise.reject(err);
  }
);

export default api;
