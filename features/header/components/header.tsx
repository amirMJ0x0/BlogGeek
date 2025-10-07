"use client";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import logo from "@/public/BlogGeek-logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MobileNavs } from "../constants";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathName = usePathname();

  return (
    <header className="bg-white border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-4 md:p-6 lg:px-8 max-md:gap-2 max-lg:gap-5"
        aria-label="Global"
      >
        {/* Logo (on both desktop and mobile) */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">لوگوی بلاگ گیک</span>
            <Image className="h-8 w-auto" src={logo} alt="" />
          </Link>
        </div>
        {/* Mobile  */}
        <div
          dir="ltr"
          className="fixed lg:hidden bottom-0 left-0 w-full py-3 border-t flex gap-3 justify-around font-light"
        >
          {MobileNavs.map((item) => {
            const isActive = pathName === item.href;

            return (
              <Link
                href={item.href}
                key={item.label}
                className={`flex flex-col justify-center items-center ${
                  isActive && "font-bold"
                }`}
              >
                <item.logo className={`stroke-2 ${isActive && "stroke-3"}`} />
                {item.label}
              </Link>
            );
          })}
        </div>
        {/* SearchBox (on both desktop and mobile) */}
        <div className="flex lg:gap-x-12 flex-1">
          <div className="relative flex items-center w-full ">
            <Search className="absolute left-2 h-4 w-4 -translate-y-1/2 transform" />
            <Input
              placeholder="جستجوی مقالات ، عناوین ، نویسنده ها ..."
              //   value={search}
              //   onChange={(event) => setSearch(event.target.value)}
              className=" pl-8"
            />
          </div>
        </div>
        {/* Login */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/login"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            ورود <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
