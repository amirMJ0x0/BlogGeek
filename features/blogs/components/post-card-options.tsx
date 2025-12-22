"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis, FilePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Blog } from "../blogTypes";
import { useDeleteBlog } from "../hooks/useDeleteBlog";

const PostCardOptions = ({ item }: { item: Blog }) => {
  const [open, setOpen] = useState(false);
  const { mutate: deleteBlog } = useDeleteBlog();
  return (
    <>
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger asChild>
          <Button size="icon-sm" variant="ghost">
            <Ellipsis className="size-[1.3rem]" />
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="center" className="ml-6">
          <DropdownMenuLabel className="text-center py-1 font-semibold">
            بلاگ {item.id}
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link href={`/edit-post/${item.id}`}>
              <FilePen />
              ویرایش بلاگ
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem
            className="!text-red-800 hover:!text-red-700"
            onSelect={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
          >
            <Trash2 className="text-red-600" />
            حذف بلاگ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent showCloseButton={false} className="sm:max-w-[425px]">
          <DialogHeader className="!text-right font-bold">
            حذف بلاگ
          </DialogHeader>

          <DialogDescription>
            آیا از حذف این بلاگ با عنوان {item.title.slice(0, 20)} اطمینان
            دارید؟
          </DialogDescription>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>
              انصراف
            </Button>

            <Button
              variant="destructive"
              onClick={() => {
                deleteBlog(item.id);
                setOpen(false);
              }}
            >
              بله، حذفش کن
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PostCardOptions;
