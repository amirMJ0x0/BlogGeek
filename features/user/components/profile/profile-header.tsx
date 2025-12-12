"use client";

import ImageUploader from "@/components/shared/image-uploader";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { Pencil, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

type Props = {
  profile: {
    profile_image?: string;
    banner_image?: string;
  };
  isOwner: boolean;
};

export default function ProfileHeader({ profile, isOwner }: Props) {
  const [hovered, setHovered] = useState<"banner" | "profile" | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [type, setType] = useState<"banner" | "profile" | null>(null);
  const [updatedProfile, setUpdatedProfile] = useState(profile);

  const handleOpenModal = (type: "banner" | "profile") => {
    setType(type);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setType(null);
  };
  // const handleImageUpdate = (url: string) => {
  //   if (!uploadType) return;
  //   setUpdatedProfile((prev) => ({
  //     ...prev,
  //     [`${uploadType}_image`]: url,
  //   }));
  // };

  const handleImageUpdate = async (url: string) => {
    try {
      await api.patch("v1/user/update/information", {
        [type === "banner" ? "banner_image" : "profile_image"]: url,
      });

      // Update local state
      setUpdatedProfile((prev) => ({
        ...prev,
        [`${type}_image`]: url,
      }));
    } catch (err) {
      console.error("Error updating image:", err);
    }
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
          <div className="bg-secondary-light dark:bg-secondary-dark size-full" />
        )}

        {isOwner && (
          <button
            onClick={() => handleOpenModal("banner")}
            className={cn(
              "absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full transition-all opacity-0 group-hover:opacity-100"
            )}
          >
            <Pencil className="size-4" />
          </button>
        )}
      </div>

      <div
        className="absolute right-1/2 max-sm:!translate-x-1/2 md:right-7 -bottom-7 z-10 group"
        onMouseEnter={() => setHovered("profile")}
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative">
          <Avatar className="size-16 md:size-18 border border-black/80 dark:border-white/30 shadow-md">
            <AvatarImage src={updatedProfile.profile_image} />
            <AvatarFallback className="bg-secondary-light dark:bg-secondary-dark !brightness-60 ">
              U
            </AvatarFallback>
          </Avatar>

          {isOwner && (
            <button
              onClick={() => handleOpenModal("profile")}
              className={cn(
                "absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center transition-all opacity-0 group-hover:opacity-100"
              )}
            >
              <Pencil className="size-4" />
            </button>
          )}
        </div>
      </div>

      {type && (
        <Dialog open={modalOpen} onOpenChange={handleCloseModal}>
          <DialogContent className="sm:max-w-lg" showCloseButton={false}>
            <DialogClose
              className="absolute left-3 top-3"
              onClick={handleCloseModal}
            >
              <X size={"20px"} />
            </DialogClose>
            <DialogHeader className="!text-right">
              <DialogTitle>
                {type === "banner" ? "ویرایش بنر" : "ویرایش تصویر پروفایل"}
              </DialogTitle>
            </DialogHeader>
            <ImageUploader
              type={type === "banner" ? "banner" : "profile"}
              currentImage={
                type === "banner"
                  ? updatedProfile.banner_image
                  : updatedProfile.profile_image
              }
              onUpdate={handleImageUpdate}
              onCloseModal={handleCloseModal}
            />
          </DialogContent>
        </Dialog>
      )}

      {/* {type && (
        <ImageUploaderModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          type={type}
          currentImage={
            type === "banner"
              ? updatedProfile.banner_image
              : updatedProfile.profile_image
          }
          onUpdate={handleImageUpdate}
        />
      )} */}
    </div>
  );
}
