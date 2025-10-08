import { Compass, House, Plus, User, Bookmark } from "lucide-react";

export const MobileNavs = [
  { label: "خانه", logo: House, href: "/" },
  { label: "اکسپلور", logo: Compass, href: "#" },
  { label: "نوشتن", logo: Plus, href: "/write" },
  { label: "پروفایل", logo: User, href: "/profile" },
];

export const DesktopNavs = [
  ...MobileNavs,
  { label: "نشان ها", logo: Bookmark, href: "#" },
];
