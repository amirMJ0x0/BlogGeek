import Logo from "@/features/nav/components/logo";
import ProfileDropdown from "@/features/user/components/profile-dropdown";
import PublishButton from "./publish-button";
import PublishSetting from "./publish-setting";
import { ModeToggle } from "@/components/ui/toggle-mode";
import ClientHeaderItems from "./client-header-items";

export default function WritePageHeader() {
  return (
    <header className="bg-white dark:bg-primary-dark border-b">
      <nav
        className="mx-auto flex justify-between max-w-svw items-center p-4 md:py-6 md:px-10 max-md:gap-2 max-lg:gap-5"
        aria-label="Global"
      >
        {/* Logo */}
        <div className="flex justify-start">
          <Logo width={130} height={35} />
        </div>
        {/* Other Items */}
        <ClientHeaderItems />
      </nav>
    </header>
  );
}
