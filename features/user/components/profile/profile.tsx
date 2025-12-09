"use client";
import { useUserStore } from "@/features/user/store/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { Calendar, PenBox, UserRoundPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toPersianFrom } from "@/lib/utils";
import ProfileTabs from "./profile-tabs";
import { User } from "@/features/auth/types";
import ProfileHeader from "./profile-header";
import {
  Github,
  Instagram,
  Linkedin,
  Telegram,
  Twitter,
} from "@/components/icons";
import { ReactNode } from "react";

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
        <div className="flex flex-col items-center md:items-start md:w-1/2 gap-2">
          <h3 className="text-2xl font-bold">
            {profile?.first_name || profile?.last_name
              ? `${profile?.first_name ?? ""} ${
                  profile?.last_name ?? ""
                }`.trim()
              : profile.username}
          </h3>

          <h5
            className="text-sm text-gray-500 flex gap-6 h-5 items-center justify-center"
            dir="ltr"
          >
            <span className="flex items-center text-sm gap-1 justify-center">
              <p>{toPersianFrom(String(profile?.created_at))}</p>
              <Calendar size={"1rem"} />
            </span>
            <Separator orientation="vertical" />
            <span className="font-mono">@{profile?.username}</span>
          </h5>

          <p className="text-center max-sm:max-w-2/3 md:text-justify text-gray-400 text-sm ">
            {profile?.bio}
          </p>
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

        {isOwner ? (
          <Link href={`/@${profile?.username}/settings`}>
            <Button className="p-4 ">
              ویرایش پروفایل <PenBox />
            </Button>
          </Link>
        ) : (
          <div>
            <Button>
              دنبال کردن <UserRoundPlus />
            </Button>
          </div>
        )}
      </div>

      <div className="flex justify-evenly gap-4 font-semibold h-lh">
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{profile?._count.blogs}</span>
          <span className="font-sm text-gray-500">مقاله</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{profile?._count.followers}</span>
          <span className="font-sm text-gray-500">دنبال کننده</span>
        </div>
        <Separator orientation="vertical" />
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{profile?._count.following}</span>
          <span className="font-sm text-gray-500">دنبال شونده</span>
        </div>
      </div>
      <ProfileTabs isOwner={isOwner} />
    </section>
  );
}
