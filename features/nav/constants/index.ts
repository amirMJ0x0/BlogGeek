// navigationConstants.ts
import { Compass, House, Plus, User, LogIn } from "lucide-react";

export const getNavigationConstants = (
  isLoggedIn: boolean,
  username?: string
) => [
  { label: "خانه", logo: House, href: "/" },
  { label: "اکسپلور", logo: Compass, href: "#" },
  {
    label: isLoggedIn ? "نوشتن" : "نوشتن",
    logo: Plus,
    href: isLoggedIn ? "/write" : "/login",
  },
  {
    label: isLoggedIn ? "پروفایل" : "ورود",
    logo: isLoggedIn ? User : LogIn,
    href: isLoggedIn ? `/@${username}` : "/login",
  },
];
