import { getAllTags } from "@/features/tags";
import TagsListClient from "@/features/tags/components/tags-list-client";

export default async function TagsPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q || "";

  const initialTags = await fetch(`v1/tag`, {
    cache: "no-store",
  });

  return (
    <main className="min-h-screen">
      <h1 className="text-xl font-bold">برچسب‌ها</h1>
      <TagsListClient initialData={initialTags} searchQuery={query} />
    </main>
  );
}
