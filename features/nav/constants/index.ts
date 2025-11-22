// navigationConstants.ts
import {
  Bookmark,
  Compass,
  House,
  LogOut,
  Plus,
  Settings,
  User,
} from "lucide-react";

export const mobileNavigationItems = (
  isLoggedIn: boolean,
  username?: string
) => [
  { label: "خانه", icon: House, href: "/" },
  { label: "اکسپلور", icon: Compass, href: "#" },
  {
    label: "نوشتن",
    icon: Plus,
    href: isLoggedIn ? "/write" : "/login",
  },
];

export const profileDrawerItems = (username?: string) => [
  { label: "پروفایل", icon: User, href: `/@${username}` },
  { label: "تنظیمات", icon: Settings, href: `/@${username}/settings` },
  {
    label: "ذخیره‌شده‌ها",
    icon: Bookmark,
    href: `/@${username}?tab=bookmarks`,
  },
  {
    label: "خروج",
    icon: LogOut,
    action: "logout", // به جای href چون نیاز به منطق داره
  },
];
