import { Spinner } from "@/components/ui/spinner";
import ProfileClient from "@/features/user/components/profile/profile-client";
import { Suspense } from "react";

export default function ProfilePage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  return (
    <main className="max-h-min">
      <Suspense fallback={<Spinner className="size-6" />}>
        <ProfileClient />
      </Suspense>
    </main>
  );
}
