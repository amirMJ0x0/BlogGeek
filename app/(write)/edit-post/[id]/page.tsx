import PostFormContainer from "@/features/write/components/post-form-container";
type EditBlogProps = {
  params: {
    id: number;
  };
};
export default function Page({ params }: EditBlogProps) {
  return <PostFormContainer mode="edit" id={params.id} />;
}
