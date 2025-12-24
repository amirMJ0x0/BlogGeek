"use client";

import { ModeToggle } from "@/components/ui/toggle-mode";
import PublishSetting from "./publish-setting";
import PublishButton from "./publish-button";
import ProfileDropdown from "@/features/user/components/profile-dropdown";
import { useIsMobile } from "@/hooks/use-mobile";

const ClientHeaderItems = () => {
  const isMobile = useIsMobile();
  return (
    <div className="flex items-center justify-end gap-3 md:gap-4">
      <div className="flex gap-1 md:gap-2 items-center">
        <ModeToggle size={isMobile ? "icon" : "default"} />
        <PublishSetting size={isMobile ? "icon" : "default"} />
      </div>
      <PublishButton />
      <ProfileDropdown />
    </div>
  );
};

export default ClientHeaderItems;
