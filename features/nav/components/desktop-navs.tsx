"use client";
import { Button } from "@/components/ui/button";
import { navigationConstants } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <div className="max-lg:hidden w-1/6 bg-white dark:bg-[#222831]/70 rounded-2xl p-2 !shadow-sm border-gray-100 max-h-min sticky right-0 top-5">
      <nav className="flex flex-col justify-center  gap-2">
        {navigationConstants.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link href={item.href} key={item.label}>
              <Button
                variant={isActive ? "default" : "ghost"}
                className={`w-full flex gap-3 justify-start`}
              >
                <item.logo />
                {item.label}
              </Button>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default DesktopNav;
