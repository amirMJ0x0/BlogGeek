"use client";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, PenBox, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatJoinDate, toPersianFrom } from "@/lib/utils";
import ProfileTabs from "./profile-tabs";
import { User } from "@/features/auth/types";

export default function ProfilePreview({ profile }: { profile: User }) {
  const { user } = useUserStore();
  const isOwner = user?.username === profile?.username;

  return (
    <section className="space-y-10 md:space-y-14">
      <div className="relative w-full h-28 md:h-44 opacity-70">
        {profile?.banner_image ? (
          <Image
            fill
            src={profile.banner_image}
            alt="banner"
            className="object-cover rounded-sm"
          />
        ) : (
          <div className="bg-muted size-full rounded-sm"></div>
        )}

        <Avatar className="absolute right-1/2 max-sm:!translate-x-1/2 md:right-7 -bottom-7 size-16 md:size-18 z-10  border border-gray-200 dark:border-white  !shadow-md">
          <AvatarImage src={profile?.profile_image as string} />
          <AvatarFallback>
            <User2 className="size-1/2" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 px-5 ">
        <div className="flex flex-col md:items-start md:w-1/2 gap-2">
          <h3 className="text-2xl font-bold">
            {profile?.first_name ? profile.first_name : "نام کاربری"}
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
          <p className="text-center md:text-justify text-gray-400 text-sm ">
            {profile?.bio}
          </p>
        </div>

        {isOwner && (
          <Link href={`/@${profile?.username}/settings`}>
            <Button className="p-4 ">
              ویرایش پروفایل <PenBox />
            </Button>
          </Link>
        )}
      </div>
      <div className="flex justify-evenly gap-4 font-semibold">
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{profile?._count.blogs}</span>
          <span className="font-sm text-gray-500">مقاله</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{profile?._count.followers}</span>
          <span className="font-sm text-gray-500">دنبال کننده</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{profile?._count.following}</span>
          <span className="font-sm text-gray-500">دنبال شونده</span>
        </div>
      </div>
      <ProfileTabs isOwner={isOwner} />
    </section>
  );
}
