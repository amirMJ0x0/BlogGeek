"use client";
import { Button } from "@/components/ui/button";
import ProfileDropdown from "@/features/user/components/profile-dropdown";
import { useUserStore } from "@/features/user/store/useUserStore";
import { SquarePen } from "lucide-react";
import Link from "next/link";

const UserStatus = () => {
  const { isAuthenticated } = useUserStore();

  return (
    <div>
      {isAuthenticated ? (
        <>
          <div className="flex gap-4">
            <Link href={"/write"}>
              <Button size={"sm"}>
                نوشتن <SquarePen />
              </Button>
            </Link>

            <ProfileDropdown />
          </div>
        </>
      ) : (
        <Link
          href="/login"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          ورود <span aria-hidden="true">&rarr;</span>
        </Link>
      )}
    </div>
  );
};

export default UserStatus;
