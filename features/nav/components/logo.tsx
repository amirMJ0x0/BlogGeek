"use client";
import Image from "next/image";
import Link from "next/link";
import darkModeLogo from "@/public/BlogGeek-logo-darkmode.png";
import lightModeLogo from "@/public/BlogGeek-logo2.png";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;
  const logoSrc = currentTheme === "dark" ? darkModeLogo : lightModeLogo;

  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">لوگوی بلاگیک</span>
      <Image
        src={logoSrc}
        alt="Bloggeek logo"
        className="h-8 w-auto transition-opacity duration-300"
        priority
      />
    </Link>
  );
};

export default Logo;
