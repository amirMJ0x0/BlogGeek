"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllUsers } from "@/features/user/api/getAllUsers";
import FollowButton from "@/features/user/components/profile/follow-button";
import { useQuery } from "@tanstack/react-query";
import { Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const hideSidebar =
    /^\/@[^/]+$/.test(pathname) || /^\/@[^/]+\/settings$/.test(pathname);

  if (hideSidebar) return null;

  const { data, isLoading } = useQuery({
    queryKey: ["users-list"],
    queryFn: getAllUsers,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });

  return (
    <div className="max-lg:hidden w-1/6 bg-white dark:!bg-secondary-dark rounded-2xl p-2 xl:p-4 !shadow-sm mx-auto gap-4 !h-screen sticky left-0 top-5 ">
      <h3 className="font-bold flex lg:gap-1 xl:gap-2 items-center lg:text-sm xl:text-md !tracking-tighter">
        <Users className="size-[1.3rem]" /> نویسنده های پیشنهادی
      </h3>
      <div className="flex-col mt-5 space-y-3">
        {isLoading ? (
          <div className="w-full flex flex-col gap-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="w-full h-[60px]" />
            ))}
          </div>
        ) : (
          data?.map((user) => {
            return (
              <div key={user?.id} className="w-full">
                <div className="flex gap-2 items-center w-full">
                  <Avatar className="size-10">
                    <AvatarImage src={user?.profile_image || ""} />
                    <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark text-xs text-gray-400"/>
                  </Avatar>
                  <div className="flex-col items-center mt-2">
                    <Link href={`/@${user.username}`}>
                      <h4 className="text-md font-semibold text-justify">
                        {user?.first_name || user?.last_name
                          ? `${user?.first_name ?? ""} ${
                              user?.last_name ?? ""
                            }`.trim()
                          : user?.username}
                      </h4>
                    </Link>
                    <div className="w-full justify-end -mt-1 mr-1 xl:mr-2">
                      <FollowButton
                        userId={user.id}
                        followOptions={{
                          is_followed_by_you: user.is_followed_by_you,
                          is_following: user.is_following,
                        }}
                        className="text-sm gap-0 p-0 text-blue-600 dark:text-blue-400 "
                        hasIcon={false}
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
