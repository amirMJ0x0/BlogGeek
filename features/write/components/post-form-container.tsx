"use client";
import { useEffect, useState } from "react";
import { usePostDraft } from "../store/usePostDraft";
import PostForm from "./post-form";
import { getBlogById } from "@/features/blogs/api/getBlogById";
import { Spinner } from "@/components/ui/spinner";
type PostFormProps = {
  mode: string;
  id?: number | undefined;
};
const PostFormContainer = ({ mode, id }: PostFormProps) => {
  const { clear, setField, ...draft } = usePostDraft();
  const [loading, setLoading] = useState(mode === "edit");

  useEffect(() => {
    if (mode === "edit" && id!) {
      const fillFieldsForEdit = async () => {
        try {
          const { blog } = await getBlogById(id);
          const normalizedTags = blog.tags.map((t: any) => ({
            id: t.tag.id,
            title: t.tag.title,
          }));

          setField("title", blog.title);
          setField("summary", blog.summary);
          setField("banner_image", blog.banner_image);
          setField("tags", normalizedTags);
          setField("content", blog.content);
          setField("visibility", blog.visibility);
          setField("published_at", blog.published_at);
        } catch {
          console.error("Failed to load blog data.");
        } finally {
          setLoading(false);
          console.log(draft);
        }
      };

      fillFieldsForEdit();
    } else {
      clear();
      setLoading(false);
    }
  }, [mode, id]);

  if (loading) return <Spinner className="text-center" />;

  return <PostForm mode={mode} id={id!} />;
};

export default PostFormContainer;
