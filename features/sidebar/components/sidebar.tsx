"use client";

import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const notNeededSidebar = ["/profile", "/profile/settings", "/notfound"];
  if (notNeededSidebar.includes(pathname)) {
    return null;
  }

  return (
    <div className="max-md:hidden w-1/6 bg-white dark:!bg-secondary-dark rounded-2xl p-2 flex flex-col items-center gap-10 !h-screen sticky left-0 top-5">
      <div>Sidebar</div>
    </div>
  );
};

export default SideBar;
