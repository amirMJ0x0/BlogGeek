import PostFormContainer from "@/features/write/components/post-form-container";

type EditBlogProps = {
  params: Promise<{
    id: number;
  }>;
};

export async function generateMetadata({ params }: EditBlogProps) {
  const { id } = await params;
  return {
    title: `ویرایش پست ${id}`,
  };
}

export default async function Page({ params }: EditBlogProps) {
  const { id } = await params;
  return <PostFormContainer mode="edit" id={id} />;
}
