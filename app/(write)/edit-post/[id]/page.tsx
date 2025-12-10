import PostFormContainer from "@/features/write/components/post-form-container";
type EditBlogProps = {
  params: {
    id: number;
  };
};
export default async function Page({ params }: EditBlogProps) {
  const { id } = await params;
  console.log(id);
  return <PostFormContainer mode="edit" id={id} />;
}
