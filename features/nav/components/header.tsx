import { ModeToggle } from "@/components/ui/toggle-mode";
import HeaderSearch from "@/features/search/components/header-search";
import Logo from "./logo";
import Notifications from "./notifications";
import UserStatus from "./user-status";

export default function Header() {
  return (
    <header className="bg-white dark:!bg-secondary-dark border-b">
      <nav
        className="mx-auto flex justify-between max-w-svw items-center p-4 md:py-6 md:px-10 max-md:gap-2 max-lg:gap-5"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex justify-start ">
          <Logo width={130} height={35} />
        </div>
        {/* SearchBox */}
        <div className="flex lg:gap-x-2 gap-x-1 w-sm md:w-[60%]">
          <HeaderSearch />
          <ModeToggle />
          <Notifications />
        </div>
        {/* Other Items */}
        <div className="hidden md:flex lg:justify-end gap-2">
          <UserStatus />
        </div>
      </nav>
    </header>
  );
}
