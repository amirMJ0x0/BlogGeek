"use client";

import { getAllUsers } from "@/features/user/api/getAllUsers";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/features/user/components/profile/follow-button";
import { Users } from "lucide-react";

const SideBar = () => {
  const pathname = usePathname();

  const notNeededSidebar = ["/profile", "/profile/settings", "/notfound"];
  if (notNeededSidebar.includes(pathname)) {
    return null;
  }
  const { data, isLoading } = useQuery({
    queryKey: ["users-list"],
    queryFn: getAllUsers,
  });

  return (
    <div className="max-lg:hidden w-1/5 bg-white dark:!bg-secondary-dark rounded-2xl p-4 flex flex-col items-start gap-7 !h-screen sticky left-0 top-5 ">
      <h3 className="font-bold flex lg:gap-1 xl:gap-2 items-center lg:text-sm xl:text-md !tracking-tighter">
        <Users className="size-[1.3rem]" /> نویسنده های پیشنهادی
      </h3>
      {data?.map((user) => {
        return (
          <div key={user?.id} className="flex justify-between w-full">
            <div className="flex gap-2 items-center">
              <Avatar>
                <AvatarImage src={user?.profile_image || ""} />
                <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark">
                  {/* {user?.first_name
                      ? user?.first_name.substring(0, 1)
                      : user?.username.substring(0, 1) || "U"} */}
                </AvatarFallback>
              </Avatar>
              <h4 className="text-sm font-semibold ">
                {user?.first_name || user?.last_name
                  ? `${user?.first_name ?? ""} ${user?.last_name ?? ""}`.trim()
                  : user?.username}
              </h4>
            </div>
            <FollowButton
              userId={user.id}
              followOptions={{
                is_followed_by_you: user.is_followed_by_you,
                is_following: user.is_following,
              }}
              className="text-xs gap-0 !py-0 "
              hasIcon={false}
              size={"sm"}
            />
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
