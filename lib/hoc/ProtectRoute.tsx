"use client";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

type ProtectRouteProps = {
  children: ReactNode;
};

export function ProtectRoute({ children }: ProtectRouteProps) {
  // const { isAuthenticated } = useUserStore();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isAuthenticated) {
  //     router.push("/login");
  //   }
  // }, [isAuthenticated, router]);

  // if (!isAuthenticated) {
  //   return null;
  // }

  return <>{children}</>;
}
