"use client";

import { getAllUsers } from "@/features/user/api/getAllUsers";
import { useQuery } from "@tanstack/react-query";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FollowButton from "@/features/user/components/profile/follow-button";
import { Users } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Skeleton } from "@/components/ui/skeleton";

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
    <div className="max-lg:hidden w-1/6 bg-white dark:!bg-secondary-dark rounded-2xl p-4 !shadow-sm mx-auto gap-4 !h-screen sticky left-0 top-5 ">
      <h3 className="font-bold flex lg:gap-1 xl:gap-2 items-center lg:text-sm xl:text-md !tracking-tighter">
        <Users className="size-[1.3rem]" /> نویسنده های پیشنهادی
      </h3>
      <div className="flex-col gap-2 mt-2">
        {isLoading ? (
          <div className="w-full flex flex-col gap-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[60px]" />
            ))}
          </div>
        ) : (
          data?.map((user) => {
            return (
              <div key={user?.id} className="w-full">
                <div className="flex gap-2 items-center w-full">
                  <Avatar className="size-12">
                    <AvatarImage src={user?.profile_image || ""} />
                    <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark">
                      {user?.first_name
                        ? user?.first_name.substring(0, 1)
                        : user?.username.substring(0, 1)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-col items-center mt-2">
                    <h4 className="text-md font-semibold text-justify">
                      {user?.first_name || user?.last_name
                        ? `${user?.first_name ?? ""} ${
                            user?.last_name ?? ""
                          }`.trim()
                        : user?.username}
                    </h4>
                    <div className="w-full justify-end -mt-1 mr-1">
                      <FollowButton
                        userId={user.id}
                        followOptions={{
                          is_followed_by_you: user.is_followed_by_you,
                          is_following: user.is_following,
                        }}
                        className="text-sm gap-0 p-0 text-blue-600 "
                        // hasIcon={false}
                        variant={"link"}
                        size={"sm"}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default SideBar;
