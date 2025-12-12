"use client";
import {
  Github,
  Instagram,
  Linkedin,
  Telegram,
  Twitter,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { User } from "@/features/auth/types";
import { useUserStore } from "@/features/user/store/useUserStore";
import { toPersianFrom } from "@/lib/utils";
import { Calendar, PenBox, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import { FollowListPopover } from "./followers-list-popover";
import ProfileHeader from "./profile-header";
import ProfileTabs from "./profile-tabs";
import FollowButton from "./follow-button";

type SocialKey = "instagram" | "twitter" | "telegram" | "linkedin" | "github";

const socialLabels: Record<SocialKey, ReactNode> = {
  instagram: (
    <Button
      variant={"ghost"}
      className="hover:!text-white hover:!bg-purple-600 size-6"
    >
      <Instagram className="size-5" />
    </Button>
  ),
  twitter: (
    <Button
      variant={"ghost"}
      className="hover:!text-white hover:!bg-black size-6"
    >
      <Twitter className="size-4" />
    </Button>
  ),
  telegram: (
    <Button
      variant={"ghost"}
      className="hover:text-white hover:!bg-blue-500 size-6"
    >
      <Telegram className="size-5" />
    </Button>
  ),
  linkedin: (
    <Button variant={"ghost"} className="hover:text-blue-500 size-6">
      <Linkedin className=" size-5 rounded" />
    </Button>
  ),
  github: (
    <Button variant={"ghost"} className="size-6">
      <Github className="size-5" />
    </Button>
  ),
};

export default function ProfilePreview({ profile }: { profile: User }) {
  const { user } = useUserStore();
  const isOwner = user?.username === profile?.username;

  return (
    <section className="space-y-10 md:space-y-14">
      <ProfileHeader
        profile={{
          profile_image: profile.profile_image,
          banner_image: profile.banner_image,
        }}
      />
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 px-5 ">
        <div className="flex flex-col items-center md:items-start w-full md:w-1/2 gap-2">
          {/* Profile Name */}
          <h3 className="text-2xl font-bold">
            {profile?.first_name || profile?.last_name
              ? `${profile?.first_name ?? ""} ${
                  profile?.last_name ?? ""
                }`.trim()
              : profile.username}
          </h3>

          {/* Membership Date & @username  */}
          <div
            className="text-sm text-gray-500 flex h-5 divide-x divide-gray-200 dark:divide-gray-700 max-sm:w-full"
            dir="ltr"
          >
            <span className="flex flex-1 px-2 items-center text-sm gap-1 justify-center">
              <p className="text-nowrap">
                {toPersianFrom(String(profile?.created_at))}
              </p>
              <Calendar size={"1rem"} />
            </span>
            <Separator orientation="vertical" className="hidden md:block" />
            <span className="font-mono flex-1 pl-2 max-sm:-translate-x-4">
              @{profile?.username}
            </span>
          </div>

          {/* Bio  */}
          <p className="text-center max-sm:max-w-2/3 md:text-justify text-gray-400 text-sm max-sm:mt-2">
            {profile?.bio}
          </p>

          {/* Social Medias */}
          <div className="mt-3 flex gap-2 text-center md:text-justify ">
            {profile?.social_media &&
              Object.values(profile.social_media).some(Boolean) &&
              Object.entries(profile.social_media)
                .filter(([, v]) => v)
                .map(([key, value]) => (
                  <Link href={value!} key={key} className="text-slate-500 ">
                    {socialLabels[key as SocialKey]}
                  </Link>
                ))}
          </div>
        </div>

        {/* (Edit Profile | Follow/Unfollow) Button */}
        {isOwner ? (
          <Link href={`/@${profile?.username}/settings`}>
            <Button className="p-4 ">
              ویرایش پروفایل <PenBox />
            </Button>
          </Link>
        ) : (
          <FollowButton userId={profile.id} />
        )}
      </div>

      {/* _count layout  */}
      <div className="flex w-full h-max font-semibold divide-x divide-gray-200 dark:divide-gray-700">
        <div className="flex-1 flex flex-col justify-center items-center cursor-default md:px-4">
          <span className="font-extrabold text-xl">
            {profile?._count.blogs}
          </span>
          <span className="font-sm text-gray-500">پست</span>
        </div>

        <div className="flex-1 flex items-center justify-center md:px-4">
          <FollowListPopover
            userId={profile.id}
            count={profile?._count.followers}
            listType="followers"
            className="w-full"
          />
        </div>

        <div className="flex-1 flex items-center justify-center md:px-4">
          <FollowListPopover
            userId={profile.id}
            count={profile._count.following}
            listType="following"
            className="w-full"
          />
        </div>
      </div>
      <ProfileTabs isOwner={isOwner} />
    </section>
  );
}
