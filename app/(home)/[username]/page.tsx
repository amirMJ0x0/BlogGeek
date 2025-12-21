import { Spinner } from "@/components/ui/spinner";
import { User } from "@/features/auth/types";
import ProfilePreview from "@/features/user/components/profile/profile";
import { ApiResponse } from "@/types";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Profile = User & { is_followed_by_you: boolean; is_following: boolean };

export default async function ProfilePage({
  params,
}: {
  params: { username: string };
}) {
  try {
    const { username: encodedUsername } = await params;
    const decodedUsername = decodeURIComponent(encodedUsername);
    const cleanUsername = decodedUsername.replace(/^@/, ""); // @username => username
    const cookieStore = await cookies();

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/profile/${cleanUsername}`,
      {
        cache: "no-store",
        credentials: "include",
        headers: {
          Cookie: cookieStore.toString(),
        },
      }
    );

    const data: ApiResponse<Profile> = await res.json();
    const profile = data.data;
    if (!profile) {
      notFound();
    }
    return (
      <main className="max-h-min">
        <Suspense fallback={<Spinner className="size-6" />}>
          <ProfilePreview profile={profile as any} />
        </Suspense>
      </main>
    );
  } catch (error) {
    console.log(error);
    notFound();
  }
}
