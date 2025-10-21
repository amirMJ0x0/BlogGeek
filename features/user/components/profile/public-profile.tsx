"use client";
import Image from "next/image";
import Link from "next/link";
import { Calendar, PenBox, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useUserStore } from "../../store/useUserStore";

const PublicProfile = () => {
  const { user } = useUserStore(); // getUserInfoById ✅
  return (
    <>
      <div className="relative w-full h-28 md:h-44 opacity-70">
        {user?.banner_image ? (
          <Image
            fill
            src={user.banner_image}
            alt="banner"
            className="object-cover rounded-sm"
          />
        ) : (
          <div className="bg-muted size-full rounded-sm"></div>
        )}

        <Avatar className="absolute right-1/2 max-sm:!translate-x-1/2 md:right-7 -bottom-7 size-16 md:size-18 z-10  border border-gray-200 dark:border-white  !shadow-md">
          <AvatarImage src={user?.profile_image as string} />
          <AvatarFallback>
            <User2 className="size-1/2" />
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 px-5 ">
        <div className="flex flex-col md:items-start md:w-1/2 gap-2">
          <h3 className="text-2xl font-bold">
            {user?.first_name ? user.first_name : "نام کاربری"}
          </h3>
          <h5
            className="text-sm text-gray-500 flex gap-6 h-5 items-center justify-center"
            dir="ltr"
          >
            <span className="flex items-center text-sm gap-1 justify-center">
              {/* <p>عضو از {formatJoinDate(String(user?.created_at))}</p>{" "} */}
              <Calendar size={"1rem"} />
            </span>
            <Separator orientation="vertical" />
            <span className="font-mono">@{user?.username}</span>
          </h5>
          <p className="text-center md:text-justify text-gray-400 text-sm ">
            {user?.bio}
          </p>
        </div>

        <Link href={`/@${user?.username}/settings`}>
          <Button className="p-4 ">
            ویرایش پروفایل <PenBox />
          </Button>
        </Link>
      </div>
      <div className="flex justify-evenly gap-4 font-semibold">
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{user?._count.blogs}</span>
          <span className="font-sm text-gray-500">مقاله</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{user?._count.folowers}</span>
          <span className="font-sm text-gray-500">دنبال کننده</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="font-bold text-lg">{user?._count.following}</span>
          <span className="font-sm text-gray-500">دنبال شونده</span>
        </div>
      </div>
    </>
  );
};

export default PublicProfile;
