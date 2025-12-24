"use client";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calender";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { format } from "date-fns";

type BirthdayProps = {
  control: any;
  name?: string;
};

const BirthdayInput = ({ control, name = "birthday" }: BirthdayProps) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const selectedDate = field.value ? new Date(field.value) : undefined;

        return (
          <Field
            data-invalid={fieldState.invalid}
            className="min-h-[76px] flex flex-col gap-1"
          >
            <FieldLabel
              htmlFor={name}
              className="py-2 font-semibold text-slate-600"
            >
              تاریخ تولد:
            </FieldLabel>
            <div className="relative">
              <Input
                {...field}
                id={name}
                readOnly
                value={
                  selectedDate?.toLocaleDateString("fa-IR", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  }) || ""
                }
                onClick={() => setOpen((val) => !val)}
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                className="bg-background pr-10 min-h-9"
              />
              <FieldError errors={[fieldState.error]} />

              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="absolute top-1 right-1 size-7"
                  >
                    <CalendarIcon className="size-5 text-slate-600" />
                    <span className="sr-only">انتخاب تاریخ</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                  alignOffset={-8}
                  sideOffset={10}
                >
                  <Calendar
                    mode="single"
                    defaultMonth={selectedDate || new Date()}
                    selected={selectedDate}
                    onSelect={(selectedDate) => {
                      if (selectedDate) {
                        field.onChange(format(selectedDate, "yyyy-MM-dd")); // "2025-06-24"
                      } else {
                        field.onChange("");
                      }
                      setOpen(false);
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </Field>
        );
      }}
    />
  );
};

export default BirthdayInput;
