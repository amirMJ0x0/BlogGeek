import axios, { AxiosError, AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  withCredentials: true,
});

let isRefreshing = false;
let queue: {
  resolve: (value?: unknown) => void;
  reject: (err: any) => void;
}[] = [];

const processQueue = (error: unknown, tokenRefreshed = false) => {
  queue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(tokenRefreshed);
    }
  });

  queue = [];
};

api.interceptors.response.use(
  (res) => res,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    // if we got 401 and we haven't refreshed yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // if a req is refreshing , we must wait
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          queue.push({
            resolve: () => resolve(api(originalRequest)),
            reject,
          });
        });
      }

      isRefreshing = true;

      try {
        await api.get("/v1/auth/refresh-token");
        processQueue(null);
        return api(originalRequest); // retry the req
      } catch (err) {
        processQueue(err);
        window.location.href = "/login";
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
