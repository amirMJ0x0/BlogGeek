"use client";
import ImageUploader from "@/components/shared/image-uploader";
import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/features/user/store/useUserStore";
import TagSelection from "@/features/write/components/tags";
import { postSchema } from "@/features/write/schemas/postSchema";
import { usePostDraft } from "@/features/write/store/usePostDraft";
import { cn } from "@/lib/utils";
import { Pencil, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function PostForm() {
  const [openModal, setOpenModal] = useState(false);
  const { setField, clear, ...draftState } = usePostDraft();
  const { isAuthenticated } = useUserStore();

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  return (
    <section className="flex flex-col gap-4 my-2 overflow-x-hidden">
      <div className="!mx-[2%] lg:!mx-[10%] w-full md:!p-10 flex flex-col gap-3">
        <Input
          value={draftState.title}
          onChange={(e) => setField("title", e.target.value)}
          className="relative !border-none !outline-none focus:outline-blue-500 !text-xl lg:!text-2xl font-semibold !bg-transparent caret-purple-600"
          placeholder="عنوان بلاگ را اینجا بنویسید"
          autoComplete="off"
          required
        />
        <Input
          value={draftState.summary}
          onChange={(e) => setField("summary", e.target.value)}
          className="border-none outline-0 !text-lg font-extralight !bg-transparent caret-purple-600"
          placeholder="توضیح مختصر درباره بلاگ را اینجا بنویسید"
          autoComplete="off"
        />
        <div
          className="relative w-1/2 h-28 md:h-64 rounded-sm overflow-hidden group my-2 hover:opacity-80 cursor-pointer"
          onClick={handleOpenModal}
          title="برای آپلود یا تغییر تصویر بنر کلیک کنید"
        >
          {draftState.banner_image ? (
            <Image
              fill
              src={draftState.banner_image}
              alt="banner"
              className="object-cover"
            />
          ) : (
            <div className="bg-transparent border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors size-full flex justify-center items-center text-primary-light/50 font-extralight group-hover:text-primary-light/10">
              آپلود تصویر بنر برای بلاگ
            </div>
          )}

          <button
            onClick={handleOpenModal}
            className={cn(
              "size-16 absolute top-[50%] left-[50%] !-translate-x-1/2 !-translate-y-1/2 text-gray-700 dark:text-gray-100  p-3 transition-all opacity-0 group-hover:opacity-100 flex justify-center items-center cursor-pointer"
            )}
          >
            <Pencil className="size-6" />
          </button>
        </div>
        <TagSelection
          value={draftState.tags}
          onUpdate={(tags) => setField("tags", tags)}
        />
        <Dialog open={openModal} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-lg" showCloseButton={false}>
            <DialogClose
              className="absolute left-3 top-3 outline-0"
              onClick={handleCloseModal}
            >
              <X size={"20px"} />
            </DialogClose>
            <DialogHeader className="!text-right">
              <DialogTitle>آپلود تصویر بنر برای بلاگ</DialogTitle>
            </DialogHeader>

            <ImageUploader
              type="banner"
              currentImage={draftState.banner_image}
              onUpdate={(url) => setField("banner_image", url)}
              message="آپلود تصویر بنر برای بلاگ"
              onCloseModal={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      </div>

      <SimpleEditor />
    </section>
  );
}
