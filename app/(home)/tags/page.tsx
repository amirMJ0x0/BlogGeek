import TagsListClient from "@/features/tags/components/tags-list-client";

export default async function TagsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const params = await searchParams;
  const query = params?.q ?? "";

  const initialTags = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/tag`,
    {
      cache: "no-store",
    }
  );
  // console.log(initialTags);
  return (
    <main className="min-h-screen">
      <h1 className="text-xl font-bold">برچسب‌ها</h1>
      <TagsListClient initialData={initialTags} searchQuery={query} />
    </main>
  );
}
