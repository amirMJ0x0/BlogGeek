// src/components/search/HeaderSearch.tsx
"use client";

import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandList,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command";

import { Search } from "lucide-react";
import { useSearchBlogs } from "../hooks/useSearchBlogs";
import SearchResultItem from "./searchResultItem";
import { debounce } from "@/lib/utils";

export default function HeaderSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const { data: results, isLoading } = useSearchBlogs(searchQuery);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) inputRef.current.focus();
    setSearchQuery(event.target.value);
    setOpen(true);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="جستجو بلاگ، کاربر، یا تگ..."
            className="pl-10"
            value={searchQuery}
            onChange={handleInputChange}
            onClick={() => setOpen(true)}
            ref={inputRef}
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        </div>
      </PopoverTrigger>

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
    </Popover>
  );
}
