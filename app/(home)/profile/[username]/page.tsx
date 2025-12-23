import { Spinner } from "@/components/ui/spinner";
import { User } from "@/features/auth/types";
import ProfilePreview from "@/features/user/components/profile/profile";
import { ApiResponse } from "@/types";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Profile = User & { is_followed_by_you: boolean; is_following: boolean };
type PageProps = {
  params: Promise<{ username: string }>;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const username = (await params).username;
  const decodedUsername = decodeURIComponent(username);
  const cleanUsername = decodedUsername.replace(/^@/, "");

  const { data: profile } = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/user/profile/${cleanUsername}`,
    {
      next: {
        revalidate: 60,
      },
    }
  ).then((res) => res.json());

  if (!profile) {
    return {
      title: "پروفایل یافت نشد",
      description: "این کاربر وجود ندارد یا حذف شده است.",
    };
  }

  return {
    title: ` ${profile.username} پروفایل `,
    description: `پروفایل کاربری ${profile.username} شامل نوشته‌ها، فعالیت‌ها و اطلاعات منتشرشده.`,
  };
}

export default async function ProfilePage({ params }: PageProps) {
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
