import { Spinner } from "@/components/ui/spinner";
import ProfileClient from "@/features/user/components/profile-client";
import { Suspense } from "react";

export default function ProfilePage() {
  return (
    <main>
      <Suspense fallback={<Spinner className="size-6" />}>
        <ProfileClient />
      </Suspense>
    </main>
  );
}
