import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer";
import { useUserStore } from "@/features/user/store/useUserStore";
import { profileDrawerItems } from "../constants";
import Link from "next/link";
import { useCustomToast } from "../hooks/useCustomToast";
import { logout } from "@/features/auth/api/logout";
import { clearSessionTokens } from "@/features/auth/authUtils";

const ProfileDrawer = ({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (val: boolean) => void;
}) => {
  const { user, clearUser } = useUserStore();
  const { showToast } = useCustomToast();
  const handleLogout = async () => {
    try {
      const res = await logout();

      if (res.statusCode === 200) {
        clearSessionTokens();
        clearUser();
        showToast(res.message || "با موفقیت خارج شدید ✅", "info");
      } else {
        showToast(res.message || "خروج ناموفق بود 😕", "error");
      }
    } catch (error) {
      showToast("خطا در برقراری ارتباط با سرور ❌", "error");
    }
  };

  const handleAction = (action?: string) => {
    if (action === "logout") handleLogout();
    onOpenChange(false);
  };

  const profileItems = profileDrawerItems(user?.username);

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="p-4">
        <DrawerTitle className="hidden"></DrawerTitle>
        <ul className="space-y-3 pr-4">
          {profileItems.map((item) => (
            <li key={item.label}>
              {item.href ? (
                <Link href={item.href} className="flex items-center gap-2">
                  <item.icon /> {item.label}
                </Link>
              ) : (
                <button
                  onClick={() => handleAction(item.action)}
                  className={`flex items-center gap-2 ${
                    item.action === "logout" && "text-red-600"
                  }`}
                >
                  <item.icon /> {item.label}
                </button>
              )}
            </li>
          ))}
        </ul>
      </DrawerContent>
    </Drawer>
  );
};

export default ProfileDrawer;
