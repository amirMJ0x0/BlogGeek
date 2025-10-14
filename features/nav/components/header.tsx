import { Bell, Search } from "lucide-react";

import logo from "@/public/BlogGeek-logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useUserStore } from "@/features/user/store/useUserStore";
import UserStatus from "./user-status";

export default function Header() {
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
          <UserStatus />
          <Button className="relative" variant={"link"}>
            <Badge
              variant={"default"}
              className="absolute top-0 right-1 size-5"
            >
              3
            </Badge>
            <Bell className="size-6" />
          </Button>
        </div>
      </nav>
    </header>
  );
}
