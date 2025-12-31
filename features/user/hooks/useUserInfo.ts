"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "@/features/user";
import { useUserStore } from "../store/useUserStore";
import axios from "axios";

export function useUserInfo() {
  const { setUser, clearUser } = useUserStore();

  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
  }, [query.isSuccess, query.data, setUser]);

  useEffect(() => {
    if (!query.isError) return;

    const error = query.error as any;

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      clearUser();
    }
  }, [query.isError, query.error, clearUser]);

  return query;
}
