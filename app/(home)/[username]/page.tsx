import { Spinner } from "@/components/ui/spinner";
import ProfilePreview from "@/features/user/components/profile/profile";
import { cookies } from "next/headers";
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
    const cookieStore = await cookies();
    // const cookiess = cookieStore
    //   .getAll()
    //   .map((v) => `${v.name}=${v.value}`)
    //   .join(";");
    const accessToken = cookieStore.get("access-token")?.value ?? "";
    const refreshToken = cookieStore.get("refresh-token")?.value ?? "";
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/profile/${cleanUsername}`,
      {
        cache: "no-store",
        credentials: "include",
        headers: {
          "access-token": accessToken,
          "refresh-token": refreshToken,
          Cookie: `access-token=${accessToken};refresh-token=${refreshToken}`,
        },
      }
    );
    console.log("res:", res);
    // Cookie: `access-token=${accessToken};refresh-token=${refreshToken}`,
    const data: any = await res.json();
    // console.log(data);
    const profile = data.data;
    console.log(profile);
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
