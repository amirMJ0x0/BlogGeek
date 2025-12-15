"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useMemo, useRef, useState } from "react";

import { Search } from "lucide-react";
import { useSearchBlogs } from "../hooks/useSearchBlogs";
import SearchResultItem from "./searchResultItem";
import { debounce } from "@/lib/utils";

export default function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Ensure the input retains focus when the popover opens
  const handleOpenChange = (value: boolean) => {
    setOpen(value);
    if (value) {
      // schedule focus to run after content mounts and any focus-stealing
      // from child components occurs
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };

  const debouncedSetQuery = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedQuery(value);
        if (value.trim()) handleOpenChange(true);
      }, 300),
    []
  );
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchQuery(value);

    // Don't open the popover immediately on every keystroke to avoid
    // the popover/content stealing focus from the input. Let the
    // debounced setter control opening instead.
    if (!value.trim()) {
      setDebouncedQuery("");
    }

    debouncedSetQuery(value);
  };

  const { data: results, isLoading } = useSearchBlogs(debouncedQuery);

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="جستجو بلاگ، کاربر، یا تگ..."
            className="pl-10"
            value={searchQuery}
            onChange={handleInputChange}
            onClick={() => handleOpenChange(true)}
            ref={inputRef}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>

      {open && (
        <PopoverContent
          className="w-[var(--radix-popover-trigger-width)] p-0"
          align="start"
        >
          <Command>
            {searchQuery && (
              <CommandGroup
                heading={`نتایج برای "${searchQuery}"`}
              ></CommandGroup>
            )}

            <CommandList className="max-h-80 overflow-y-auto">
              {isLoading && <CommandEmpty>...در حال جستجو</CommandEmpty>}

              {!isLoading &&
                results &&
                results.length === 0 &&
                searchQuery.trim() && (
                  <CommandEmpty>
                    نتیجه‌ای برای "{searchQuery}" یافت نشد.
                  </CommandEmpty>
                )}

              {results && results.length > 0 && (
                <CommandGroup>
                  {results.map((item, index) => (
                    <SearchResultItem key={index} item={item} />
                  ))}
                </CommandGroup>
              )}

              {!searchQuery.trim() && (
                <CommandEmpty>
                  شروع به تایپ کنید تا نتایج جستجو را ببینید.
                </CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      )}
    </Popover>
  );
}
