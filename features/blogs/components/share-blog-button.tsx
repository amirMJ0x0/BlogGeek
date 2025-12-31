"use client";

import { useEffect, useState } from "react";
import { Share2, Check, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

export default function ShareBlogButton() {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(decodeURI(window.location.href));
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Copy failed", e);
    }
  };

  return (
    <Dialog>
      <DialogTrigger
        asChild
        className="cursor-pointer hover:opacity-60"
        arial-label="Share"
      >
        <Share className="h-5 w-5" />
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>اشتراک‌گذاری لینک</DialogTitle>
        </DialogHeader>

        <div className="flex items-center gap-2">
          <Input
            dir="ltr"
            value={url}
            readOnly
            onFocus={(e) => e.target.select()}
          />
          <Button onClick={handleCopy} className="shrink-0">
            {copied ? (
              <Check className="h-4 w-4" />
            ) : (
              <Share2 className="h-4 w-4" />
            )}
          </Button>
        </div>

        {copied && (
          <p className="text-sm text-muted-foreground">لینک کپی شد ✔</p>
        )}
      </DialogContent>
    </Dialog>
  );
}
