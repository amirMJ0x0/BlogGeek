"use client";
import { Button } from "@/components/ui/button";
import { DesktopNavs } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col justify-center p-6 gap-2">
      {DesktopNavs.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Button
            key={item.label}
            variant={isActive ? "default" : "ghost"}
            className={`w-full flex gap-3 justify-start`}
          >
            <item.logo />
            <Link href={item.href}>{item.label}</Link>
          </Button>
        );
      })}
    </nav>
  );
};

export default DesktopNav;
