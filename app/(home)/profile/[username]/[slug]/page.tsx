import { Blog } from "@/features/blogs/blogTypes";
import BlogDetailClient from "@/features/blogs/components/blog-detail-client";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { Metadata } from "next";
import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ username: string; slug: string }>;
};
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const decodedSlug = decodeURIComponent(slug);
  const parts = decodedSlug.split("-");
  const id = Number(parts[0]);

  const {
    data: { blog },
  } = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}v1/blog/${id}`, {
    next: {
      revalidate: 60,
    },
  }).then((res) => res.json());

  if (!blog) {
    return {
      title: "بلاگی یافت نشد",
      description: "این بلاگ وجود ندارد یا حذف شده است.",
    };
  }

  return {
    title: blog.title,
    description: blog.summary,
  };
}

export default async function BlogDetail({ params }: PageProps) {
  const { slug, username: encodedUsername } = await params;
  const decodedUsername = decodeURIComponent(encodedUsername);
  const rawUsername = decodedUsername.replace(/^@/, ""); // @username => username
  const decodedSlug = decodeURIComponent(slug);
  const parts = decodedSlug.split("-");
  const id = Number(parts[0]);

  const cookieStore = await cookies();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/blog/${id}`,
    {
      credentials: "include",
      headers: {
        Cookie: cookieStore.toString(),
      },
      next: {
        tags: [`blog-detail-${id}`],
      },
    }
  );
  if (!res.ok) return notFound();

  const {
    data: { blog },
  }: { data: { blog: Blog } } = await res.json();

  const correctSlug = `${blog.id}-${blog.title
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9آ-ی-]/g, "")}`;

  if (blog.author.username !== rawUsername) {
    const finalUrl = encodeURI(`/@${blog.author.username}/${correctSlug}`);
    redirect(finalUrl);
  }

  const qc = new QueryClient();
  qc.setQueryData(["blog-detail", id], blog);
  const dehydratedState = dehydrate(qc);

  return <BlogDetailClient id={id} dehydratedState={dehydratedState} blog={blog}/>;
}
