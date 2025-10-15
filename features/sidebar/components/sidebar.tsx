"use client";

import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const notNeededSidebar = ["/profile"];
  if (notNeededSidebar.includes(pathname)) {
    return null;
  }

  return (
    <div className="max-md:hidden w-1/6 bg-white dark:bg-[#222831]/70 rounded-2xl p-2">
      <div>Sidebar</div>
    </div>
  );
};

export default SideBar;
