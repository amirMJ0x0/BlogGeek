"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getFollowList } from "../../api/get-follow-list";
import type { FollowRelation } from "../../userTypes";

type FollowListPopoverProps = {
  userId: number;
  count: number;
  listType: "followers" | "following";
  className?: string;
};

export function FollowListPopover({
  userId,
  count,
  listType,
  className,
}: FollowListPopoverProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const {
    data: followersData,
    isLoading,
    isError,
  } = useQuery<FollowRelation[]>({
    queryKey: ["follow-list", userId, listType],
    queryFn: () => getFollowList(userId, listType),
    enabled: open, // only fetch when popover is opened
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex flex-col justify-center items-center cursor-default hover:opacity-65",
            className
          )}
        >
          <span className="font-extrabold text-xl">{count}</span>
          <span className="font-sm text-gray-500">
            {listType === "followers" ? "دنبال کننده" : "دنبال شونده"}
          </span>
        </div>
      </PopoverTrigger>
      <PopoverContent className="ml-2 w-48">
        <div className="space-y-4">
          <h4 className="font-medium leading-none">
            {listType === "followers" ? "دنبال کننده ها" : "دنبال شونده ها"}
          </h4>
          <div className="space-y-3 max-h-96 overflow-y-auto mt-2">
            {isLoading ? (
              <div className="flex items-center justify-center py-6">
                <Spinner />
              </div>
            ) : isError ? (
              <p className="text-sm text-muted-foreground">خطا در بارگذاری</p>
            ) : Array.isArray(followersData) && followersData.length > 0 ? (
              followersData.map((info) => {
                if (!info) return null;

                const initial = (info.first_name ?? info.username ?? "").charAt(
                  0
                );
                const displayName =
                  info.first_name || info.last_name
                    ? `${info.first_name ?? ""} ${info.last_name ?? ""}`.trim()
                    : info.username;

                return (
                  <div
                    key={info.id}
                    className="flex items-center gap-3 cursor-pointer"
                    onClick={() => router.push(`/@${info.username}`)}
                  >
                    <div className="flex gap-2 items-center">
                      <Avatar>
                        <AvatarImage src={info.profile_image ?? undefined} />
                        <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
                          {initial}
                        </AvatarFallback>
                      </Avatar>
                      <h4 className="font-light text-sm text-muted-foreground">
                        {displayName}
                      </h4>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-muted-foreground">
                هنوز {listType === "followers" ? "دنبال کننده" : "دنبال شونده"}{" "}
                ای نداری
              </p>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
