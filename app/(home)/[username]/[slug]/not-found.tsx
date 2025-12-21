import { Button } from "@/components/ui/button";
import { BookX } from "lucide-react";
import Link from "next/link";

export default function ProfileNotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-6 text-center">
      {/* Icon */}
      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-muted dark:bg-secondary-dark">
        <BookX className="h-16 w-16 text-muted-foreground" />
      </div>

      {/* Text */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">بلاگ یافت نشد</h1>
        <p className="text-muted-foreground">
          بلاگی با این شناسه وجود ندارد یا حذف شده است
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button>
          <Link href="/">بازگشت به صفحه اصلی</Link>
        </Button>
      </div>
    </div>
  );
}
