import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserStatus from "./user-status";
import { ModeToggle } from "@/components/ui/toggle-mode";
import Logo from "./logo";
import Notifications from "./notifications";

export default function Header() {
  return (
    <header className="bg-white dark:!bg-secondary-dark border-b">
      <nav
        className="mx-auto flex justify-between max-w-svw items-center  p-4 md:p-6 lg:px-8 max-md:gap-2 max-lg:gap-5"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex justify-start">
          <Logo />
        </div>
        {/* SearchBox */}
        <div className="flex lg:gap-x-2 gap-x-1 w-sm md:w-full lg:w-[60%]">
          <div className="relative flex items-center w-full ">
            <Search className="absolute left-2 size-4 " />
            <Input
              placeholder="جستجوی مقالات ، عناوین ، نویسنده ها ..."
              //   value={search}
              //   onChange={(event) => setSearch(event.target.value)}
              className="pl-8"
            />
          </div>
          <ModeToggle />
        </div>
        {/* Other Items */}
        <div className="hidden lg:flex lg:justify-end gap-2">
          <UserStatus />
          <Notifications />
        </div>
      </nav>
    </header>
  );
}
