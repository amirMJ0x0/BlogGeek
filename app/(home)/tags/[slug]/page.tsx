import TagBlogsClient from "@/features/tags/components/TagBlogsClient";

const TagBlogsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;
  
  return (
    <section>
        <TagBlogsClient slug={slug}/>
    </section>
  );
};

export default TagBlogsPage;
