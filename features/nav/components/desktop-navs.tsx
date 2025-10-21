"use client";
import { Button } from "@/components/ui/button";
import { getNavigationConstants } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/features/user/store/useUserStore";

const DesktopNav = () => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserStore();

  const navItems = getNavigationConstants(isAuthenticated, user?.username);

  return (
    <nav className="flex flex-col justify-center  gap-2">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

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
  );
};

export default DesktopNav;
