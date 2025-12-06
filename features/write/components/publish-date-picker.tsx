"use client";

import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calender";
import { usePostDraft } from "../store/usePostDraft";
import { useEffect, useState } from "react";

export function PublishTimePicker() {
  const draft = usePostDraft();
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(
    draft.published_at ? new Date(draft.published_at) : undefined
  );
  const [time, setTime] = useState<string | undefined>(
    draft.published_at
      ? new Date(draft.published_at).toTimeString().split(" ")[0]
      : undefined
  );
  useEffect(() => {
    if (draft.visibility !== "SCHEDULED") {
      setDate(undefined);
      setTime(undefined);
      draft.setField("published_at", null);
    }
  }, [draft.visibility]);

  useEffect(() => {
    if (date) {
      if (time) {
        const [hours, minutes, seconds] = time.split(":").map(Number);
        date.setHours(hours, minutes, seconds);
      }
      const isoString = date.toISOString();
      draft.setField("published_at", isoString);
    }
  }, [date, time]);
  return (
    <div className="flex gap-4">
      <div className="flex flex-col gap-3">
        <Label htmlFor="date-picker" className="px-1">
          تاریخ
        </Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              id="date-picker"
              className="w-min justify-between font-normal"
            >
              {date
                ? date.toLocaleDateString("fa-IR")
                : "لطفا تاریخ را انتخاب کنید"}
              <ChevronDownIcon />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(date) => {
                console.log(date);
                setDate(date);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex flex-col gap-3">
        <Label htmlFor="time-picker" className="px-1">
          زمان
        </Label>
        <Input
          type="time"
          id="time-picker"
          step="1"
          defaultValue="00:00:00"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
          }}
          className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
      </div>
    </div>
  );
}
