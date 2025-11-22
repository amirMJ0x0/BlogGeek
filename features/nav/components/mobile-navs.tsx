"use client";
import Link from "next/link";
import { getNavigationConstants } from "../constants";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/features/user/store/useUserStore";
import { House } from "lucide-react";

const MobileNav = () => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserStore();

  const navItems = getNavigationConstants(isAuthenticated, user?.username);
  return (
    <div className="fixed md:hidden bottom-0 left-0 w-full py-3 flex gap-3 justify-around font-light z-10 shadow-md bg-white/40 dark:!bg-secondary-dark !backdrop-filter !backdrop-blur-sm border-t border-gray-200 dark:border-black">
      {navItems.map((item) => {
        const isActive = pathname === item.href;

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
  );
};

export default MobileNav;
