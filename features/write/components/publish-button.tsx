"use client";

import { Button } from "@/components/ui/button";
import { usePostDraft } from "../store/usePostDraft";
import { Loader2 } from "lucide-react";
import { createBlog } from "../api/createBlog";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { postSchema } from "../schemas/postSchema";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AxiosError } from "axios";
import { Spinner } from "@/components/ui/spinner";
import { useQueryClient } from "@tanstack/react-query";
import { getBlogById } from "@/features/blogs/api/getBlogById";
import { updateBlog } from "../api/updateBlog";
import { usePostMode } from "../hooks/usePostMode";

const PublishButton = () => {
  const { id, mode } = usePostMode();
  const draft = usePostDraft();
  const {
    title,
    summary,
    banner_image,
    tags,
    content,
    published_at,
    visibility,
    clear,
  } = draft;

  const router = useRouter();
  const { showToast } = useCustomToast();
  const [isPublishing, setIsPublishing] = useState(false);
  const queryClient = useQueryClient();

  const handlePublish = async () => {
    setIsPublishing(true);

    const res = postSchema.safeParse({
      title,
      summary,
      banner_image,
      tags,
      content,
      published_at,
      visibility,
    });

    if (!res.success) {
      const list = res.error.issues.map((issue, idx) => (
        <div key={idx}>• {issue.message}</div>
      ));

      showToast(
        <div className="!space-y-1 !font-vazirmatn">{list}</div>,
        "error"
      );

      setIsPublishing(false);
      return;
    }

    try {
      const payload = {
        blog_image: banner_image,
        ...res.data,
      };

      if (mode === "create") {
        const response = await createBlog(payload);
        showToast(response.message || "پست با موفقیت منتشر شد", "success");
      } else {
        const response = await updateBlog(Number(id), payload);
        showToast(response.message || "پست با موفقیت ویرایش شد", "success");
      }

      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      clear();
      router.push("/");
    } catch (error) {
      const err = error as AxiosError<any>;

      const status = err.response?.status;
      const errorData = err.response?.data;

      if (status === 400 && errorData?.data) {
        Object.values(errorData.data).forEach((info: any) =>
          showToast(info.message, "error")
        );
      } else {
        showToast(
          errorData?.message || err.message || "خطای غیرمنتظره رخ داد",
          "error"
        );
      }
    } finally {
      setIsPublishing(false);
    }
  };

  return (
    <Button
      size="sm"
       onClick={handlePublish}
      // onClick={() => console.log(id)}
      disabled={isPublishing}
    >
      {isPublishing ? (
        <span className="flex gap-2 items-center">
          در حال انتشار <Spinner />
        </span>
      ) : mode === "create" ? (
        "انتشار پست"
      ) : (
        "ویرایش پست"
      )}
    </Button>
  );
};

export default PublishButton;
