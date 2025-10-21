"use client";
import { useUserStore } from "@/features/user/store/useUserStore";
import { useParams } from "next/navigation";
import PrivateProfile from "./private-profile";
import PublicProfile from "./public-profile";

export default function ProfileClient({ userId }: { userId?: string }) {
  const params = useParams();
  const profileUserId = userId || (params?.userId as string);
  const { user } = useUserStore();

  const isOwner = "@" + user?.username === decodeURIComponent(profileUserId);
  return isOwner ? (
    <section className="space-y-10 md:space-y-14">
      <PrivateProfile />
    </section>
  ) : (
    <section className="space-y-10 md:space-y-14">
      <PublicProfile />
    </section>
  );
}
