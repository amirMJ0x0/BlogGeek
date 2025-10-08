import { Bell, ChevronDown, Search, SquarePen } from "lucide-react";

import logo from "@/public/BlogGeek-logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const user = true;
  return (
    <header className="bg-white border-b">
      <nav
        className="mx-auto grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_2fr_1fr] max-w-svw items-center  p-4 md:p-6 lg:px-8 max-md:gap-2 max-lg:gap-5"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex justify-start">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">لوگوی بلاگیک</span>
            <Image className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        {/* SearchBox */}
        <div className="flex lg:gap-x-12">
          <div className="relative flex items-center w-full ">
            <Search className="absolute left-2 size-4 " />
            <Input
              placeholder="جستجوی مقالات ، عناوین ، نویسنده ها ..."
              //   value={search}
              //   onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
            />
          </div>
        </div>
        {/* Other Items */}
        <div className="hidden lg:flex lg:justify-end gap-2">
          {user ? (
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
          <Button className="relative" variant={"link"}>
            <Badge variant={'default'} className="absolute top-0 right-1 size-5" >3</Badge>
            <Bell className="size-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
