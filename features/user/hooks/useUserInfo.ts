"use client";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUserInfo } from "../api/fetch-userinfo";
import { useUserStore } from "../store/useUserStore";

export function useUserInfo() {
  const { setUser, clearUser } = useUserStore();

  const query = useQuery({
    queryKey: ["userInfo"],
    queryFn: fetchUserInfo,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data) {
      setUser(query.data);
    }
  }, [query.isSuccess, query.data, setUser]);

  useEffect(() => {
    if (query.isError) {
      clearUser();
    }
  }, [query.isError, clearUser]);

  return query;
}
