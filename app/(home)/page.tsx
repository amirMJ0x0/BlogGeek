import BlogList from "@/features/blogs/components/blogs-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "خانه",
};

export default function Home() {
  return (
    <div>
      <BlogList />
    </div>
  );
}
