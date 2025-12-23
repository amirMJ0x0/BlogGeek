import PostFormContainer from "@/features/write/components/post-form-container";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ایجاد پست جدید",
};

export default function Page() {
  return <PostFormContainer mode="create" />;
}
