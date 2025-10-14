"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/features/user/store/useUserStore";
import { ChevronDown, SquarePen } from "lucide-react";
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

const UserStatus = () => {
  const { isAuthenticated, user } = useUserStore();
  return (
    <div>
      {isAuthenticated ? (
        <>
          <div className="flex gap-4">
            <Link href={"/write"}>
              <Button>
                نوشتن <SquarePen />
              </Button>
            </Link>

            <DropdownMenu dir="ltr">
              <DropdownMenuTrigger className="flex items-center outline-none">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>Avatar</AvatarFallback>
                </Avatar>
                <ChevronDown className="!text-slate-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuLabel>حساب کاربری من</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>پروفایل</DropdownMenuItem>
                <DropdownMenuItem>نشان ها</DropdownMenuItem>
                <DropdownMenuItem>تست</DropdownMenuItem>
                <DropdownMenuItem>عضویت</DropdownMenuItem>
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
