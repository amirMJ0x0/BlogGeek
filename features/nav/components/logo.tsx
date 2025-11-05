"use client";
import Image from "next/image";
import Link from "next/link";
import lightLogo from "@/public/BlogGeek-logo-darkmode.png";
import darkLogo from "@/public/BlogGeek-logo2.png";
import { useTheme } from "next-themes";

const Logo = () => {
  const { theme } = useTheme();

  if (theme === "light" || theme === "dark") {
    const src = theme === "dark" ? lightLogo : darkLogo;
    return (
      <Link href="/" className="-m-1.5 p-1.5">
        <span className="sr-only">لوگوی بلاگیک</span>
        <Image src={src} alt="Bloggeek logo" className="h-8 w-auto" priority />
      </Link>
    );
  }

  return (
    <Link href="/" className="-m-1.5 p-1.5">
      <span className="sr-only">لوگوی بلاگیک</span>
      <picture>
        <source srcSet={lightLogo.src} media="(prefers-color-scheme: dark)" />
        <img
          src={darkLogo.src}
          alt="Bloggeek logo"
          className="h-8 w-auto"
          width={32}
          height={32}
        />
      </picture>
    </Link>
  );
};

export default Logo;
