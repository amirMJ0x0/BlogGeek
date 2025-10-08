import { Search } from "lucide-react";

import logo from "@/public/BlogGeek-logo.png";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <nav
        className="mx-auto grid grid-cols-[1fr_3fr] lg:grid-cols-[1fr_3fr_1fr] max-w-7xl items-center  p-4 md:p-6 lg:px-8 max-md:gap-2 max-lg:gap-5"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">لوگوی بلاگ گیک</span>
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
        {/* Login (on mobile)*/}
        <div className="hidden lg:flex lg:justify-end">
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
