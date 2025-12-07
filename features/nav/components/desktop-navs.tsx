"use client";
import { Button } from "@/components/ui/button";
import { useUserStore } from "@/features/user/store/useUserStore";
import { User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { mobileNavigationItems } from "../constants";

const DesktopNav = () => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useUserStore();

  const navItems = mobileNavigationItems(isAuthenticated, user?.username);

  return (
    <nav className="flex flex-col justify-center gap-2">
      {navItems.map((item) => {
        const isActive =
          pathname === item.href || pathname.startsWith(`${item.href}/`);

        return (
          <Link href={item.href} key={item.label}>
            <Button
              variant={isActive ? "default" : "ghost"}
              className={`w-full flex gap-3 justify-start`}
            >
              <item.icon />
              {item.label}
            </Button>
          </Link>
        );
      })}
      <Button asChild variant={"ghost"}>
        <Link
          href={isAuthenticated ? `/@${user?.username}` : `/login`}
          className={`w-full flex gap-3 justify-start`}
        >
          <User />
          پروفایل
        </Link>
      </Button>
    </nav>
  );
};

export default DesktopNav;
