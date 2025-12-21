"use client";
import { useUserStore } from "@/features/user/store/useUserStore";
import { LogIn, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { mobileNavigationItems } from "../constants";
import ProfileDrawer from "./profile-drawer";

const MobileNav = () => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserStore();
  const [openDrawer, setOpenDrawer] = useState(false);

  const navItems = mobileNavigationItems(isAuthenticated, user?.username);

  return (
    <>
      <div className="fixed lg:hidden bottom-0 left-0 w-full py-3 flex gap-3 justify-around font-light z-10 shadow-md bg-white/40 dark:!bg-secondary-dark !backdrop-filter !backdrop-blur-sm border-t border-gray-200 dark:border-black">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              href={item.href}
              key={item.label}
              className={`flex flex-col items-center ${
                isActive && "font-bold"
              }`}
            >
              <item.icon />
              {item.label}
            </Link>
          );
        })}

        {isAuthenticated ? (
          <button
            onClick={() => setOpenDrawer(true)}
            className="flex flex-col items-center"
          >
            <User />
            پروفایل
          </button>
        ) : (
          <Link href={"/login"}>
            <LogIn />
            ورود
          </Link>
        )}
      </div>

      <ProfileDrawer open={openDrawer} onOpenChange={setOpenDrawer} />
    </>
  );
};

export default MobileNav;
