"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../api/follow-user";
import { AxiosError } from "axios";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";

type FollowAction = "follow" | "unfollow";

export function useFollowAction() {
  const qc = useQueryClient();
  const { showToast } = useCustomToast();
  const mutation = useMutation({
    mutationFn: async ({
      id,
      action,
    }: {
      id: number;
      action: FollowAction;
    }) => {
      return followUser({ id, followAction: action });
    },
    onSuccess: (_, { id }) => {
      // Invalidate follow-list queries so UI updates (followers/following counts/lists)
      qc.invalidateQueries({ queryKey: ["follow-list", id, "follower"] });
      // In case profile or current user data is cached under these keys
      //   qc.invalidateQueries({ queryKey: ["profile"] });
      //   qc.invalidateQueries({ queryKey: ["current-user"] });
    },
    onError: (error) => {
      const err = error as AxiosError<any>;

      const status = err.response?.status;
      const errorData = err.response?.data;

      if (err) showToast(errorData.message);
    },
  });

  const follow = (id: number) => mutation.mutate({ id, action: "follow" });
  const unfollow = (id: number) => mutation.mutate({ id, action: "unfollow" });

  const toggleFollow = (id: number, shouldFollow: boolean) =>
    mutation.mutate({ id, action: shouldFollow ? "follow" : "unfollow" });

  return {
    ...mutation,
    follow,
    unfollow,
    toggleFollow,
  } as const;
}

export default useFollowAction;
