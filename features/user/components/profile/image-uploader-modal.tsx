"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { useCustomToast } from "@/features/nav/hooks/useCustomToast";
import api from "@/lib/api";
import { Progress } from "@/components/ui/progress";
import { Loader2, X } from "lucide-react";

type Props = {
  open: boolean;
  onClose: () => void;
  type: "profile" | "banner";
  currentImage?: string;
  onUpdate: (url: string) => void; // returns uploaded URL
};

export default function ImageUploaderModal({
  open,
  onClose,
  type,
  currentImage,
  onUpdate,
}: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { showToast } = useCustomToast();
  const [controller, setController] = useState<AbortController | null>(null);

  useEffect(() => {
    if (open) {
      setFile(null);
      setImageSrc(null);
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  }, [open, type]);

  // handle file select
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0];
      if (!selected) return;

      // ✅ Validate file type
      if (!selected.type.startsWith("image/")) {
        showToast("فقط فایل تصویری مجاز است", "error");
        return;
      }

      // ✅ Validate file size (2MB max)
      if (selected.size > 5 * 1024 * 1024) {
        showToast("حجم عکس نباید بیشتر از 5MB باشد", "error");
        return;
      }

      // ✅ Validate dimensions (banner vs profile)
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          if (type === "banner" && img.width <= img.height) {
            showToast("نسبت تصویر بنر باید افقی باشد", "error");
            return;
          }
          // if (type === "profile" && img.height <= img.width) {
          //   showToast("نسبت تصویر پروفایل باید عمودی یا مربعی باشد", "error");
          //   return;
          // }
          setFile(selected);
          setImageSrc(e.target?.result as string);
        };
      };
      reader.readAsDataURL(selected);
    },
    [type]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const getCroppedImage = async () => {
    if (!imageSrc || !croppedAreaPixels) return null;

    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const { x, y, width, height } = croppedAreaPixels;
    canvas.width = width;
    canvas.height = height;
    ctx?.drawImage(image, x, y, width, height, 0, 0, width, height);

    return new Promise<Blob | null>((resolve) => {
      canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
  };

  const handleUpload = async () => {
    const abortCtrl = new AbortController();
    setController(abortCtrl);

    try {
      setLoading(true);
      setUploadProgress(0);

      const croppedBlob = await getCroppedImage();
      if (!croppedBlob) return;

      const formData = new FormData();
      formData.append("file", croppedBlob);

      // 1. Upload to /api/v1/upload
      const uploadRes = await api.post("v1/upload", formData, {
        signal: abortCtrl.signal,
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total!
          );
          setUploadProgress(percentCompleted);
        },
      });
      const url = uploadRes.data.data.url;

      // 2. Update user info
      await api.patch(
        "v1/user/update/information",
        {
          [type === "banner" ? "banner_image" : "profile_image"]: url,
        },
        { signal: abortCtrl.signal }
      );

      onUpdate(url);
      showToast("تصویر با موفقیت آپلود شد ✅", "success");
      onClose();
    } catch (err) {
      console.log(err);
      showToast("خطا در آپلود عکس", "error");
    } finally {
      setLoading(false);
      setUploadProgress(0);
      setController(null);
    }
  };

  const handleClose = () => {
    if (controller) controller.abort(); // abort the req that is pending
    onClose(); // close modal
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogClose
          className="absolute left-3 top-3"
          onClick={() => onClose()}
        >
          <X size={"20px"} />
        </DialogClose>
        <DialogHeader className="!text-right">
          <DialogTitle>
            {type === "banner" ? "ویرایش بنر" : "ویرایش تصویر پروفایل"}
          </DialogTitle>
        </DialogHeader>

        {!imageSrc ? (
          <div
            {...getRootProps()}
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-md p-6 text-center cursor-pointer transition-colors ${
              isDragActive
                ? "border-primary/70 bg-muted"
                : "border-muted-foreground/40"
            }`}
          >
            <input {...getInputProps()} />
            {currentImage ? (
              <div className="relative w-full h-40 mb-2">
                <img
                  src={currentImage}
                  alt="current"
                  className="object-cover w-full h-full rounded-md"
                />
              </div>
            ) : null}
            <p className="text-sm text-muted-foreground">
              فایل را بکشید یا برای انتخاب کلیک کنید
            </p>
          </div>
        ) : (
          <div className="relative w-full h-64 bg-black">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={type === "banner" ? 16 / 6 : 1}
              onCropChange={setCrop}
              onCropComplete={(_, croppedPixels) =>
                setCroppedAreaPixels(croppedPixels)
              }
              onZoomChange={setZoom}
              style={{
                containerStyle: {
                  pointerEvents: loading ? "none" : "auto",
                  opacity: loading ? 0.6 : 1,
                },
              }}
            />
            <div className="absolute bottom-2 left-0 right-0 px-4">
              <Slider
                min={1}
                max={3}
                step={0.1}
                value={[zoom]}
                onValueChange={(val) => setZoom(val[0])}
                disabled={loading}
              />
            </div>
          </div>
        )}
        {loading && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-2 text-white">
            <Loader2 className="size-6 animate-spin" />
            <span className="text-sm">در حال آپلود...</span>
          </div>
        )}
        {loading && (
          <div className="mt-4 w-full flex flex-col items-center">
            <Progress value={uploadProgress} className="w-[80%]" />
            <p className="text-sm text-muted-foreground mt-2">
              {uploadProgress}%
            </p>
          </div>
        )}

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={handleClose}>
            انصراف
          </Button>
          <Button onClick={handleUpload} disabled={loading || !file}>
            {loading ? "در حال آپلود..." : "ذخیره"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* Utility to create image element */
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.src = url;
  });
