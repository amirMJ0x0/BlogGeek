"use client";

import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const notNeededSidebar = ["/profile"];
  if (notNeededSidebar.includes(pathname)) {
    return null;
  }

  return (
    <div className="max-md:hidden w-1/6 bg-white dark:bg-[#222831]/70 rounded-2xl p-2 flex flex-col items-center gap-10 max-h-max sticky left-0 top-5">
      <div>Sidebar</div>
      <div>Sidebar</div>
      <div>Sidebar</div>
      <div>Sidebar</div>
      <div>Sidebar</div>
    </div>
  );
};

export default SideBar;
