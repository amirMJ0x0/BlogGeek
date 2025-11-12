"use client";

import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import ImageUploaderModal from "@/features/user/components/profile/image-uploader-modal";
import { cn } from "@/lib/utils";

type Props = {
  profile: {
    profile_image?: string;
    banner_image?: string;
  };
};

export default function ProfileHeader({ profile }: Props) {
  const [hovered, setHovered] = useState<"banner" | "profile" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"banner" | "profile" | null>(
    null
  );
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleOpenModal = (type: "banner" | "profile") => {
    setUploadType(type);
    setModalOpen(true);
  };

  const handleImageUpdate = (url: string) => {
    if (!uploadType) return;
    setUpdatedProfile((prev) => ({
      ...prev,
      [`${uploadType}_image`]: url,
    }));
  };

  return (
    <div className="relative w-full">
      <div
        className="relative w-full h-28 md:h-44 rounded-sm overflow-hidden group"
        onMouseEnter={() => setHovered("banner")}
        onMouseLeave={() => setHovered(null)}
      >
        {updatedProfile.banner_image ? (
          <Image
            fill
            src={updatedProfile.banner_image}
            alt="banner"
            className="object-cover"
          />
        ) : (
          <div className="bg-muted size-full" />
        )}

        {/* آیکون مداد */}
        <button
          onClick={() => handleOpenModal("banner")}
          className={cn(
            "absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100"
          )}
        >
          <Pencil className="size-4" />
        </button>
      </div>

      {/* آواتار */}
      <div
        className="absolute right-1/2 max-sm:!translate-x-1/2 md:right-7 -bottom-7 z-10 group"
        onMouseEnter={() => setHovered("profile")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative">
          <Avatar className="size-16 md:size-18 border border-gray-200 dark:border-white shadow-md">
            <AvatarImage src={updatedProfile.profile_image} />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>

          {/* آیکون مداد روی آواتار */}
          <button
            onClick={() => handleOpenModal("profile")}
            className={cn(
              "absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
            )}
          >
            <Pencil className="size-4" />
          </button>
        </div>
      </div>

      {/* مودال آپلود عکس */}
      {uploadType && (
        <ImageUploaderModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          type={uploadType}
          currentImage={
            uploadType === "banner"
              ? updatedProfile.banner_image
              : updatedProfile.profile_image
          }
          onUpdate={handleImageUpdate}
        />
      )}
    </div>
  );
}
