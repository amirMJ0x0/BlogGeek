"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/features/user/store/useUserStore";
import {
  Bookmark,
  ChevronDown,
  DoorOpen,
  Settings,
  SquarePen,
  User2,
} from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { logout } from "@/features/auth/api/logout";
import { useCustomToast } from "../hooks/useCustomToast";

const UserStatus = () => {
  const { isAuthenticated, user, clearUser } = useUserStore();
  const { showToast } = useCustomToast();

  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.statusCode === 200) {
        clearUser();
        showToast(res.message || "با موفقیت خارج شدید ✅", "info");
      } else {
        showToast(res.message || "خروج ناموفق بود 😕", "error");
      }
    } catch (error) {
      showToast("خطا در برقراری ارتباط با سرور ❌", "error");
    }
  };

  return (
    <div>
      {isAuthenticated ? (
        <>
          <div className="flex gap-4">
            <Link href={"/write"}>
              <Button size={"sm"}>
                نوشتن <SquarePen />
              </Button>
            </Link>

            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger className="flex items-center outline-none">
                <Avatar>
                  <AvatarImage src={user?.profile_image} />
                  <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark dark:!brightness-150">
                    {user?.first_name
                      ? user?.first_name?.substring(0, 1)
                      : user?.username?.substring(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="!text-slate-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center" className="ml-6">
                <DropdownMenuLabel className="text-center py-1">
                  {user?.username || "حساب کاربری من"}{" "}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User2 />
                  <Link href={`/@${user?.username}`}>پروفایل</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Bookmark />
                  <Link href={`/@${user?.username}/?tab=bookmarks`}>
                    نشان ها
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <Link href={`/@${user?.username}/settings`}>تنظیمات </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="!text-red-800 hover:!text-red-700 "
                  onClick={handleLogout}
                >
                  <DoorOpen className="text-red-700" />
                  <span>خروج</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          ورود <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
};

export default UserStatus;
