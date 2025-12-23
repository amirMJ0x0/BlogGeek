"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Settings } from "lucide-react";
import { usePostDraft } from "../store/usePostDraft";
import { PublishTimePicker } from "./publish-date-picker";

const PublishSetting = () => {
  const draft = usePostDraft();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg" showCloseButton={false}>
        <DialogClose className="absolute left-3 top-3">
          <ArrowLeft size={"20px"} />
        </DialogClose>
        <DialogHeader className="!text-right">
          <DialogTitle>تنظیمات انتشار بلاگ</DialogTitle>
          <DialogDescription>
            در این بخش میتوانید وضعیت نمایش و زمان انتشار بلاگ خود را تنظیم
            کنید.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <h3>انتخاب وضعیت نمایش</h3>
            <Select
              defaultValue={draft.visibility}
              value={draft.visibility}
              onValueChange={(value) => {
                draft.setField("visibility", value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="PUBLIC">عمومی</SelectItem>
                  <SelectItem value="DRAFT">پیش نویس</SelectItem>
                  <SelectItem value="PRIVATE">خصوصی</SelectItem>
                  <SelectItem value="SCHEDULED">زمانبندی شده</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {draft.visibility === "SCHEDULED" && (
            <div className="grid gap-3">
              <h3 className="py-2">انتخاب زمان انتشار</h3>
              <PublishTimePicker />
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PublishSetting;
