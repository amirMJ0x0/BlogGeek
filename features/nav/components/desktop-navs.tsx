"use client";
import { Button } from "@/components/ui/button";
import { DesktopNavs } from "../constants";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DesktopNav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col justify-center  gap-2">
      {DesktopNavs.map((item) => {
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
  );
};

export default DesktopNav;
