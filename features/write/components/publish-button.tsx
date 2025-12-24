"use client";

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import { useIsMobile } from "@/hooks/use-mobile";
import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ShieldAlert, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createBlog } from "../api/createBlog";
import { updateBlog } from "../api/updateBlog";
import { usePostMode } from "../hooks/usePostMode";
import { postSchema } from "../schemas/postSchema";
import { usePostDraft } from "../store/usePostDraft";

type PublishBtnProps = {
  size?: "default" | "sm" | "lg" | "icon" | "icon-sm" | "icon-lg";
};

const PublishButton = ({ size }: PublishBtnProps) => {
  const isMobile = useIsMobile();
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
      published_at: published_at ?? null,
      visibility,
    });
    if (!res.success) {
      const list = res.error.issues.map((issue, idx) => (
        <div key={idx} className="flex items-center gap-1">
          <ShieldAlert className="size-5" /> {issue.message}
        </div>
      ));

      showToast(
        <div className="!space-y-2 !font-vazirmatn">{list}</div>,
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
      size={size ? size : isMobile ? "icon" : "default"}
      onClick={handlePublish}
      disabled={isPublishing}
    >
      {isPublishing ? (
        <span className="flex gap-2 items-center">
          در حال انتشار <Spinner />
        </span>
      ) : mode === "create" ? (
        isMobile ? (
          <Upload />
        ) : (
          "انتشار پست"
        )
      ) : isMobile ? (
        <Upload />
      ) : (
        "ویرایش پست"
      )}
    </Button>
  );
};

export default PublishButton;
