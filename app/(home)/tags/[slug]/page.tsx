import TagBlogsClient from "@/features/tags/components/TagBlogsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return {
    title: `${slug} مطالب با تگ`,
  };
}

const TagBlogsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  return (
    <section>
      <TagBlogsClient slug={slug} />
    </section>
  );
};

export default TagBlogsPage;
