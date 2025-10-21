import { Spinner } from "@/components/ui/spinner";
import ProfileClient from "@/features/user/components/profile/profile-client";
import { ProtectRoute } from "@/lib/hoc/ProtectRoute";
import { Suspense } from "react";

export default async function ProfilePage({
  params,
}: {
  params: {
    userId: string;
  };
}) {
  const { userId } = await params;

  return (
    <main className="max-h-min">
      <Suspense fallback={<Spinner className="size-6" />}>
        <ProtectRoute>
          <ProfileClient userId={userId} />
        </ProtectRoute>
      </Suspense>
    </main>
  );
}
