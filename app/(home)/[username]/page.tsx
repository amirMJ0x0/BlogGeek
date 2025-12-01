import { Spinner } from "@/components/ui/spinner";
import { getUserProfile } from "@/features/user/api/fetch-user-profile";
import ProfilePreview from "@/features/user/components/profile/profile";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  try {
    const { username: encodedUsername } = await params;
    const decodedUsername = decodeURIComponent(encodedUsername);
    const cleanUsername = decodedUsername.replace(/^@/, ""); // @username => username

    const profile = await getUserProfile(cleanUsername);
    return (
      <main className="max-h-min">
        <Suspense fallback={<Spinner className="size-6" />}>
          <ProfilePreview profile={profile} />
        </Suspense>
      </main>
    );
  } catch (error) {
    notFound();
  }
}
