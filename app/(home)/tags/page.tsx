import TagsListClient from "@/features/tags/components/tags-list-client";

export default async function TagsPage({
  searchParams,
}: {
  searchParams?: { q?: string | string[] | undefined };
}) {
  const rawQ = searchParams?.q;
  const query = Array.isArray(rawQ) ? rawQ[0] : rawQ ?? "";

  const initialTags = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}v1/tag`,
    {
      cache: "no-store",
    }
  ).then((res) => {
    if (!res.ok) {
      throw new Error("Failed to fetch tags");
    }
    return res.json();
  });

  return (
    <main className="min-h-screen">
      <h1 className="text-xl font-bold">برچسب‌ها</h1>
      <TagsListClient initialData={initialTags.data} searchQuery={query} />
    </main>
  );
}
