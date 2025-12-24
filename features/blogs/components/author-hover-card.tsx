"use client";

import Link from "next/link";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserProfile } from "@/features/user/api/fetch-user-profile";
import HoverSkeleton from "./hover-skeleton";
import FollowButton from "@/features/user/components/profile/follow-button";

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="text-center">
      <p className="font-medium">{value}</p>
      <p className="text-muted-foreground">{label}</p>
    </div>
  );
}

export function AuthorHoverCard({ username }: { username: string }) {
  const [open, setOpen] = useState(false);

  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", username],
    queryFn: () => getUserProfile(username),
    enabled: open,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: 1,
  });

  const fullName =
    profile?.first_name || profile?.last_name
      ? `${profile?.first_name ?? ""} ${profile?.last_name ?? ""}`.trim()
      : profile?.username ?? username;

  return (
    <HoverCard open={open} onOpenChange={setOpen} openDelay={200}>
      <HoverCardTrigger asChild>
        <Link
          href={`/@${username}`}
          className="text-sm font-light hover:underline"
        >
          {fullName}
        </Link>
      </HoverCardTrigger>

      <HoverCardContent side="top" align="start" className="w-80 p-4">
        {isLoading || !profile ? (
          <HoverSkeleton />
        ) : (
          <div className="flex gap-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={profile.profile_image} />
              <AvatarFallback>
                {profile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <Link
                href={`/@${profile.username}`}
                className="font-medium hover:underline"
              >
                {fullName}
              </Link>

              <p dir="ltr" className="text-xs text-right text-muted-foreground">
                @{profile.username}
              </p>

              <div className="mt-2 flex justify-between text-xs">
                <Stat label="پست " value={profile._count.blogs} />
                <Stat label="دنبال کننده" value={profile._count.followers} />
                <Stat label="دنبال شونده" value={profile._count.following} />
              </div>

              <FollowButton
                userId={profile.id}
                followOptions={{
                  is_followed_by_you: profile.is_followed_by_you,
                  is_following: profile.is_following,
                }}
                size={"sm"}
                className="mt-4 w-full"
                hasIcon={false}
              />
            </div>
          </div>
        )}
      </HoverCardContent>
    </HoverCard>
  );
}
